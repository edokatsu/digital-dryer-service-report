"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, Loader2 } from "lucide-react"

interface PDFPreviewDialogProps {
  data: any
  type: "refrigerant" | "heated"
}

export function PDFPreviewDialog({ data, type }: PDFPreviewDialogProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handlePreview = async () => {
    try {
      setIsLoading(true)

      // Import the PDF generation functions dynamically
      const { generateRefrigerantDryerPDF, generateHeatedDryerPDF } = await import("@/utils/generate-pdf")

      // Generate the PDF based on the type
      const doc = type === "refrigerant" ? generateRefrigerantDryerPDF(data) : generateHeatedDryerPDF(data)

      // Convert to blob URL for preview
      const blob = doc.output("blob")
      const url = URL.createObjectURL(blob)
      setPreviewUrl(url)
    } catch (error) {
      console.error("Error generating PDF preview:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Clean up the blob URL when the dialog closes
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open && previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => {
            setIsOpen(true)
            handlePreview()
          }}
        >
          <Eye className="h-4 w-4" />
          Preview PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>PDF Preview</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="ml-2">Loading preview...</p>
          </div>
        ) : previewUrl ? (
          <iframe src={previewUrl} className="w-full h-full border rounded-md" title="PDF Preview" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Failed to generate preview</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
