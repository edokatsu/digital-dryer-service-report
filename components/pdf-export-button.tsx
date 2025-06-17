"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import dynamic from "next/dynamic"

// Dynamically import the PDF generation functions to ensure they only run on the client
const { generateRefrigerantDryerPDF, generateHeatedDryerPDF } = dynamic(() => import("@/utils/generate-pdf"), {
  ssr: false,
}) as any

interface PDFExportButtonProps {
  data: any
  type: "refrigerant" | "heated"
  filename?: string
}

export function PDFExportButton({ data, type, filename }: PDFExportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    try {
      setIsGenerating(true)

      toast({
        title: "Generating PDF",
        description: "Please wait while we prepare your report...",
      })

      // Small delay to allow UI to update
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Import the PDF generation functions dynamically
      const { generateRefrigerantDryerPDF, generateHeatedDryerPDF } = await import("@/utils/generate-pdf")

      // Generate the PDF based on the type
      const doc = type === "refrigerant" ? generateRefrigerantDryerPDF(data) : generateHeatedDryerPDF(data)

      // Generate default filename if not provided
      const defaultFilename = type === "refrigerant" ? "refrigerant-dryer-report" : "heated-dryer-report"
      const reportDate = data.date ? format(new Date(data.date), "yyyy-MM-dd") : new Date().toISOString().split("T")[0]
      const fullFilename = `${filename || defaultFilename}-${reportDate}.pdf`

      // Save the PDF
      doc.save(fullFilename)

      toast({
        title: "PDF Generated Successfully",
        description: `Your report has been downloaded as ${fullFilename}`,
        variant: "success",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error Generating PDF",
        description: "There was a problem creating your PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button onClick={handleExport} disabled={isGenerating} className="flex items-center gap-2">
      {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {isGenerating ? "Generating..." : "Export PDF"}
    </Button>
  )
}
