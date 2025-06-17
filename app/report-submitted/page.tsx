import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ReportSubmitted() {
  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Report Submitted Successfully</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Your service report has been submitted successfully. You can view or download the report from your dashboard.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
        <Button variant="outline">View Report</Button>
      </div>
    </div>
  )
}
