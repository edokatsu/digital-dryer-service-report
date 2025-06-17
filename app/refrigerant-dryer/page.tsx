"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefrigerantDryerForm } from "@/components/refrigerant-dryer-form"
import { PDFExportButton } from "@/components/pdf-export-button"
import { PDFPreviewDialog } from "@/components/pdf-preview-dialog"

export default function RefrigerantDryerPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data)
    setFormData(data)
    setIsSubmitted(true)
    // In a real app, you would save this data to a database
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Refrigerant Dryer Service Report</h1>
        {isSubmitted && (
          <div className="flex flex-wrap gap-2">
            <PDFPreviewDialog data={formData} type="refrigerant" />
            <PDFExportButton
              data={formData}
              type="refrigerant"
              filename={`refrigerant-dryer-${formData.dryerNumber || "report"}`}
            />
          </div>
        )}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Refrigerant Dryer Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <RefrigerantDryerForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => router.push("/")}>
          Back to Home
        </Button>
        <Button type="button" onClick={() => document.getElementById("submit-form")?.click()}>
          Submit Report
        </Button>
      </div>
    </div>
  )
}
