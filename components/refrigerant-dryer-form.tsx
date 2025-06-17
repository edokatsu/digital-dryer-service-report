"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"

interface RefrigerantDryerFormProps {
  onSubmit: (data: any) => void
}

export function RefrigerantDryerForm({ onSubmit }: RefrigerantDryerFormProps) {
  const [formData, setFormData] = useState({
    company: "",
    checkBy: "",
    refNo: "",
    date: "",
    time: "",
    location: "",
    modelNumber: "",
    dryerNumber: "",
    serialNumber: "",
    nominalCapacity: "",
    refrigerantType: "",
    serviceType: "",
    dewPoint: "",
    inletTemp: "",
    outletTemp: "",
    suctionTemp: "",
    dischargeTemp: "",
    ambientTemp: "",
    condensingTemp: "",
    evaporatingTemp: "",
    dischargePressure: "",
    suctionPressure: "",
    nextChangePreFilter: "",
    autoDrainPreFilter: "function",
    nextChangeAfterFilter: "",
    autoDrainAfterFilter: "function",
    operatingPressure: "",
    ampCompressorL1: "",
    ampCompressorL2: "",
    ampCompressorL3: "",
    ampFanL1: "",
    ampFanL2: "",
    ampFanL3: "",
    condensateDrain: "function",
    checklistItems: {
      cleanCondenser: true,
      checkParameters: true,
      checkGasPressure: true,
      checkAutodrain: true,
      checkFilterPressure: true,
      checkCompressorAndFan: true,
      inspectLeakage: true,
      cleanHousing: true,
    },
    photos: [],
    remarks: "",
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleChecklistChange = (item: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      checklistItems: {
        ...prev.checklistItems,
        [item]: checked,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="general">General Info</TabsTrigger>
          <TabsTrigger value="dryer-status">Dryer Status</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="photos">Photos & Remarks</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" value={formData.company} onChange={(e) => handleChange("company", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkBy">Check By</Label>
              <Input id="checkBy" value={formData.checkBy} onChange={(e) => handleChange("checkBy", e.target.value)} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="refNo">Ref. No.</Label>
              <Input id="refNo" value={formData.refNo} onChange={(e) => handleChange("refNo", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modelNumber">Model Number</Label>
              <Input
                id="modelNumber"
                value={formData.modelNumber}
                onChange={(e) => handleChange("modelNumber", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dryerNumber">Dryer Number</Label>
              <Input
                id="dryerNumber"
                value={formData.dryerNumber}
                onChange={(e) => handleChange("dryerNumber", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serialNumber">S/N</Label>
              <Input
                id="serialNumber"
                value={formData.serialNumber}
                onChange={(e) => handleChange("serialNumber", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nominalCapacity">Nominal Capacity</Label>
              <Input
                id="nominalCapacity"
                value={formData.nominalCapacity}
                onChange={(e) => handleChange("nominalCapacity", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="refrigerantType">Refrigerant Gas Type & Weight</Label>
            <Input
              id="refrigerantType"
              value={formData.refrigerantType}
              onChange={(e) => handleChange("refrigerantType", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 gap-4 pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="repair"
                checked={formData.serviceType === "repair"}
                onCheckedChange={(checked) => {
                  if (checked) handleChange("serviceType", "repair")
                }}
              />
              <Label htmlFor="repair">Repair</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inspection"
                checked={formData.serviceType === "inspection"}
                onCheckedChange={(checked) => {
                  if (checked) handleChange("serviceType", "inspection")
                }}
              />
              <Label htmlFor="inspection">Inspection</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="minorService"
                checked={formData.serviceType === "minorService"}
                onCheckedChange={(checked) => {
                  if (checked) handleChange("serviceType", "minorService")
                }}
              />
              <Label htmlFor="minorService">Minor Service</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="annualService"
                checked={formData.serviceType === "annualService"}
                onCheckedChange={(checked) => {
                  if (checked) handleChange("serviceType", "annualService")
                }}
              />
              <Label htmlFor="annualService">Annual Service</Label>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="dryer-status" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Description</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Recommendations</TableHead>
                <TableHead>Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Dew Point (T1)</TableCell>
                <TableCell>
                  <Input value={formData.dewPoint} onChange={(e) => handleChange("dewPoint", e.target.value)} />
                </TableCell>
                <TableCell>0... 5 °C</TableCell>
                <TableCell>°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Inlet Temperature (T2)</TableCell>
                <TableCell>
                  <Input value={formData.inletTemp} onChange={(e) => handleChange("inletTemp", e.target.value)} />
                </TableCell>
                <TableCell>+45°C Max.</TableCell>
                <TableCell>°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Outlet Temperature</TableCell>
                <TableCell>
                  <Input value={formData.outletTemp} onChange={(e) => handleChange("outletTemp", e.target.value)} />
                </TableCell>
                <TableCell>+45°C Max.</TableCell>
                <TableCell>°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Suction Temp. (T3)</TableCell>
                <TableCell>
                  <Input value={formData.suctionTemp} onChange={(e) => handleChange("suctionTemp", e.target.value)} />
                </TableCell>
                <TableCell>0... 35 °C</TableCell>
                <TableCell>°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Discharge Temp. (T4)</TableCell>
                <TableCell>
                  <Input
                    value={formData.dischargeTemp}
                    onChange={(e) => handleChange("dischargeTemp", e.target.value)}
                  />
                </TableCell>
                <TableCell>30... 90 °C</TableCell>
                <TableCell>°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ambient Temp.</TableCell>
                <TableCell>
                  <Input value={formData.ambientTemp} onChange={(e) => handleChange("ambientTemp", e.target.value)} />
                </TableCell>
                <TableCell>20... 35 °C</TableCell>
                <TableCell>°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Condensing Temp.</TableCell>
                <TableCell>
                  <Input
                    value={formData.condensingTemp}
                    onChange={(e) => handleChange("condensingTemp", e.target.value)}
                  />
                </TableCell>
                <TableCell>30... 45 °C</TableCell>
                <TableCell>°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Evaporating Temp.</TableCell>
                <TableCell>
                  <Input
                    value={formData.evaporatingTemp}
                    onChange={(e) => handleChange("evaporatingTemp", e.target.value)}
                  />
                </TableCell>
                <TableCell>1... 10°C</TableCell>
                <TableCell>°C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Discharge Pressure (HP)</TableCell>
                <TableCell>
                  <Input
                    value={formData.dischargePressure}
                    onChange={(e) => handleChange("dischargePressure", e.target.value)}
                  />
                </TableCell>
                <TableCell>12... 25 Bar(g)</TableCell>
                <TableCell>Bar(g)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Suction Pressure (LP)</TableCell>
                <TableCell>
                  <Input
                    value={formData.suctionPressure}
                    onChange={(e) => handleChange("suctionPressure", e.target.value)}
                  />
                </TableCell>
                <TableCell>4... 6 Bar(g)</TableCell>
                <TableCell>Bar(g)</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="nextChangePreFilter">Next Change: Pre-Filter</Label>
              <Input
                id="nextChangePreFilter"
                value={formData.nextChangePreFilter}
                onChange={(e) => handleChange("nextChangePreFilter", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="autoDrainPreFilter">Auto Drain Pre-Filter Condition</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="preDrainFunction"
                    checked={formData.autoDrainPreFilter === "function"}
                    onCheckedChange={(checked) => {
                      if (checked) handleChange("autoDrainPreFilter", "function")
                    }}
                  />
                  <Label htmlFor="preDrainFunction">Function</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="preDrainMalfunction"
                    checked={formData.autoDrainPreFilter === "malfunction"}
                    onCheckedChange={(checked) => {
                      if (checked) handleChange("autoDrainPreFilter", "malfunction")
                    }}
                  />
                  <Label htmlFor="preDrainMalfunction">Malfunction</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nextChangeAfterFilter">Next Change: After-Filter</Label>
              <Input
                id="nextChangeAfterFilter"
                value={formData.nextChangeAfterFilter}
                onChange={(e) => handleChange("nextChangeAfterFilter", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="autoDrainAfterFilter">Auto Drain After-Filter Condition</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="afterDrainFunction"
                    checked={formData.autoDrainAfterFilter === "function"}
                    onCheckedChange={(checked) => {
                      if (checked) handleChange("autoDrainAfterFilter", "function")
                    }}
                  />
                  <Label htmlFor="afterDrainFunction">Function</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="afterDrainMalfunction"
                    checked={formData.autoDrainAfterFilter === "malfunction"}
                    onCheckedChange={(checked) => {
                      if (checked) handleChange("autoDrainAfterFilter", "malfunction")
                    }}
                  />
                  <Label htmlFor="afterDrainMalfunction">Malfunction</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="operatingPressure">Operating Pressure</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="operatingPressure"
                value={formData.operatingPressure}
                onChange={(e) => handleChange("operatingPressure", e.target.value)}
              />
              <span className="text-sm">Bar(g)</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Amp Compressor</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="ampCompressorL1" className="text-sm">
                  L1
                </Label>
                <Input
                  id="ampCompressorL1"
                  value={formData.ampCompressorL1}
                  onChange={(e) => handleChange("ampCompressorL1", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ampCompressorL2" className="text-sm">
                  L2
                </Label>
                <Input
                  id="ampCompressorL2"
                  value={formData.ampCompressorL2}
                  onChange={(e) => handleChange("ampCompressorL2", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ampCompressorL3" className="text-sm">
                  L3
                </Label>
                <Input
                  id="ampCompressorL3"
                  value={formData.ampCompressorL3}
                  onChange={(e) => handleChange("ampCompressorL3", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Amp Fan</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="ampFanL1" className="text-sm">
                  L1
                </Label>
                <Input
                  id="ampFanL1"
                  value={formData.ampFanL1}
                  onChange={(e) => handleChange("ampFanL1", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ampFanL2" className="text-sm">
                  L2
                </Label>
                <Input
                  id="ampFanL2"
                  value={formData.ampFanL2}
                  onChange={(e) => handleChange("ampFanL2", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ampFanL3" className="text-sm">
                  L3
                </Label>
                <Input
                  id="ampFanL3"
                  value={formData.ampFanL3}
                  onChange={(e) => handleChange("ampFanL3", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condensateDrain">Condensate Drain Condition</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="drainFunction"
                  checked={formData.condensateDrain === "function"}
                  onCheckedChange={(checked) => {
                    if (checked) handleChange("condensateDrain", "function")
                  }}
                />
                <Label htmlFor="drainFunction">Function</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="drainMalfunction"
                  checked={formData.condensateDrain === "malfunction"}
                  onCheckedChange={(checked) => {
                    if (checked) handleChange("condensateDrain", "malfunction")
                  }}
                />
                <Label htmlFor="drainMalfunction">Malfunction</Label>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80%]">Checklist</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1. Clean condenser with air gun.</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={formData.checklistItems.cleanCondenser}
                        onCheckedChange={(checked) => handleChecklistChange("cleanCondenser", checked === true)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2. Check parameter of dryer.</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={formData.checklistItems.checkParameters}
                        onCheckedChange={(checked) => handleChecklistChange("checkParameters", checked === true)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3. Check low and high gas pressure.</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={formData.checklistItems.checkGasPressure}
                        onCheckedChange={(checked) => handleChecklistChange("checkGasPressure", checked === true)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>4. Check Autodrain condition.</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={formData.checklistItems.checkAutodrain}
                        onCheckedChange={(checked) => handleChecklistChange("checkAutodrain", checked === true)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>5. Check filter differential pressure condition.</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={formData.checklistItems.checkFilterPressure}
                        onCheckedChange={(checked) => handleChecklistChange("checkFilterPressure", checked === true)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>6. Check running Amp compressor and fan.</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={formData.checklistItems.checkCompressorAndFan}
                        onCheckedChange={(checked) => handleChecklistChange("checkCompressorAndFan", checked === true)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>7. Inspect refrigerant leakage at access valve and piping.</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={formData.checklistItems.inspectLeakage}
                        onCheckedChange={(checked) => handleChecklistChange("inspectLeakage", checked === true)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>8. Clean up the housing of dryer.</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={formData.checklistItems.cleanHousing}
                        onCheckedChange={(checked) => handleChecklistChange("cleanHousing", checked === true)}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="photos">Photos</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="h-40 bg-muted flex items-center justify-center mb-2">
                    <span className="text-muted-foreground">Photo {index}</span>
                  </div>
                  <Input type="file" className="mt-2" />
                  <Input placeholder={`Description for photo ${index}`} className="mt-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks / Recommendations</Label>
            <Textarea
              id="remarks"
              rows={6}
              value={formData.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
              placeholder="Enter any additional remarks or recommendations here..."
            />
          </div>
        </TabsContent>
      </Tabs>

      <Button id="submit-form" type="submit" className="hidden">
        Submit
      </Button>
    </form>
  )
}
