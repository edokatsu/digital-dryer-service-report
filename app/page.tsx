import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Digital Service Report System</h1>
      <p className="text-center mb-10 text-muted-foreground">
        Select the type of dryer service report you want to create
      </p>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Refrigerant Dryer</CardTitle>
            <CardDescription>Create a service report for refrigerant-based compressed air dryers</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/refrigerant-dryer">
              <Button className="w-full">Create Report</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Heated Desiccant Dryer</CardTitle>
            <CardDescription>Create a service report for heated desiccant compressed air dryers</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/heated-dryer">
              <Button className="w-full">Create Report</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
