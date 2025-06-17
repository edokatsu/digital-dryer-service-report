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

interface HeatedDryerFormProps {
  onSubmit: (data: any) => void
}

export function HeatedDryerForm({ onSubmit }: HeatedDryerFormProps) {
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
    serviceType: "",
    // Adsorption
    dewPoint: "",
    adsorptionHours: "",
    adsorptionMinutes: "",
    pressureReleaseMinutes: "",
    desorptionMinutes: "",
    tir101: "",
    pir101: "",
    dewpointControl: true,
    // Regeneration
    standByHours: "",
    standByMinutes: "",
    pressureBuildUpMinutes: "",
    coolingMinutes: "",
    tir102: "",
    pir102: "",
    timeControl: false,
    // Former values
    regenerationCycles: "",
    previousAdsCycleHours: "",
    previousAdsCycleMinutes: "",
    // Operating conditions
    inletVolume: "",
    operatingPressure: "",
    airInletTemp: "",
    airOutletTemp: "",
    // Inter-cooler
    chilledWaterInletTemp: "",
    chilledWaterOutletTemp: "",
    chilledWaterInletPress: "",
    chilledWaterOutletPress: "",
    // Pre-cooler
    preInletAirTemp: "",
    preOutletAirTemp: "",
    preChilledWaterInletTemp: "",
    preChilledWaterOutletTemp: "",
    preChilledWaterInletPress: "",
    preChilledWaterOutletPress: "",
    // Checklist items
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
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="general">General Info</TabsTrigger>
          <TabsTrigger value="adsorption">Adsorption</TabsTrigger>
          <TabsTrigger value="operating">Operating Conditions</TabsTrigger>
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

          <div className="space-y-2">
            <Label htmlFor="serialNumber">S/N</Label>
            <Input
              id="serialNumber"
              value={formData.serialNumber}
              onChange={(e) => handleChange("serialNumber", e.target.value)}
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

        <TabsContent value="adsorption" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Adsorption</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dewPoint">Dew Point</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="dewPoint"
                        value={formData.dewPoint}
                        onChange={(e) => handleChange("dewPoint", e.target.value)}
                      />
                      <span className="text-sm">°C</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adsorptionTime">Adsorption</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="adsorptionHours"
                        value={formData.adsorptionHours}
                        onChange={(e) => handleChange("adsorptionHours", e.target.value)}
                        placeholder="Hours"
                      />
                      <span className="text-sm">hrs</span>
                      <Input
                        id="adsorptionMinutes"
                        value={formData.adsorptionMinutes}
                        onChange={(e) => handleChange("adsorptionMinutes", e.target.value)}
                        placeholder="Minutes"
                      />
                      <span className="text-sm">min</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pressureRelease">Press. Release</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="pressureRelease"
                        value={formData.pressureReleaseMinutes}
                        onChange={(e) => handleChange("pressureReleaseMinutes", e.target.value)}
                      />
                      <span className="text-sm">min</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="desorption">Desorption</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="desorption"
                        value={formData.desorptionMinutes}
                        onChange={(e) => handleChange("desorptionMinutes", e.target.value)}
                      />
                      <span className="text-sm">min</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tir101">TIR 101</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="tir101"
                        value={formData.tir101}
                        onChange={(e) => handleChange("tir101", e.target.value)}
                      />
                      <span className="text-sm">°C</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pir101">PIR 101</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="pir101"
                        value={formData.pir101}
                        onChange={(e) => handleChange("pir101", e.target.value)}
                      />
                      <span className="text-sm">Bar</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>DEWPOINT CONTROL</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.dewpointControl}
                        onCheckedChange={(checked) => handleChange("dewpointControl", checked === true)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Regeneration</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="standBy">Stand By</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="standByHours"
                        value={formData.standByHours}
                        onChange={(e) => handleChange("standByHours", e.target.value)}
                        placeholder="Hours"
                      />
                      <span className="text-sm">hrs</span>
                      <Input
                        id="standByMinutes"
                        value={formData.standByMinutes}
                        onChange={(e) => handleChange("standByMinutes", e.target.value)}
                        placeholder="Minutes"
                      />
                      <span className="text-sm">min</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pressBuildUp">Press. Build Up</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="pressBuildUp"
                        value={formData.pressureBuildUpMinutes}
                        onChange={(e) => handleChange("pressureBuildUpMinutes", e.target.value)}
                      />
                      <span className="text-sm">min</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cooling">Cooling</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="cooling"
                        value={formData.coolingMinutes}
                        onChange={(e) => handleChange("coolingMinutes", e.target.value)}
                      />
                      <span className="text-sm">min</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tir102">TIR 102</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="tir102"
                        value={formData.tir102}
                        onChange={(e) => handleChange("tir102", e.target.value)}
                      />
                      <span className="text-sm">°C</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pir102">PIR 102</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="pir102"
                        value={formData.pir102}
                        onChange={(e) => handleChange("pir102", e.target.value)}
                      />
                      <span className="text-sm">Bar</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>TIME CONTROL</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.timeControl}
                        onCheckedChange={(checked) => handleChange("timeControl", checked === true)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-4">Former Values</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regenerationCycles">Regeneration Cycles</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="regenerationCycles"
                      value={formData.regenerationCycles}
                      onChange={(e) => handleChange("regenerationCycles", e.target.value)}
                    />
                    <span className="text-sm">pcs</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="previousAdsCycle">Previous Ads.Cycle</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="previousAdsCycleHours"
                      value={formData.previousAdsCycleHours}
                      onChange={(e) => handleChange("previousAdsCycleHours", e.target.value)}
                      placeholder="Hours"
                    />
                    <span className="text-sm">hrs</span>
                    <Input
                      id="previousAdsCycleMinutes"
                      value={formData.previousAdsCycleMinutes}
                      onChange={(e) => handleChange("previousAdsCycleMinutes", e.target.value)}
                      placeholder="Minutes"
                    />
                    <span className="text-sm">min</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operating" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-4">Operating Conditions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inletVolume">Inlet Volume</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="inletVolume"
                      value={formData.inletVolume}
                      onChange={(e) => handleChange("inletVolume", e.target.value)}
                    />
                    <span className="text-sm">m³/h</span>
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
                    <span className="text-sm">Bar</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="airInletTemp">Air Inlet Temperature</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="airInletTemp"
                      value={formData.airInletTemp}
                      onChange={(e) => handleChange("airInletTemp", e.target.value)}
                    />
                    <span className="text-sm">°C</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="airOutletTemp">Air Outlet Temperature</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="airOutletTemp"
                      value={formData.airOutletTemp}
                      onChange={(e) => handleChange("airOutletTemp", e.target.value)}
                    />
                    <span className="text-sm">°C</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-4">Inter-Cooler</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chilledWaterInletTemp">Chilled Water Inlet Temp.</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="chilledWaterInletTemp"
                      value={formData.chilledWaterInletTemp}
                      onChange={(e) => handleChange("chilledWaterInletTemp", e.target.value)}
                    />
                    <span className="text-sm">°C</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chilledWaterOutletTemp">Chilled Water Outlet Temp.</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="chilledWaterOutletTemp"
                      value={formData.chilledWaterOutletTemp}
                      onChange={(e) => handleChange("chilledWaterOutletTemp", e.target.value)}
                    />
                    <span className="text-sm">°C</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chilledWaterInletPress">Chilled Water Inlet Press.</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="chilledWaterInletPress"
                      value={formData.chilledWaterInletPress}
                      onChange={(e) => handleChange("chilledWaterInletPress", e.target.value)}
                    />
                    <span className="text-sm">Bar</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chilledWaterOutletPress">Chilled Water Outlet Press.</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="chilledWaterOutletPress"
                      value={formData.chilledWaterOutletPress}
                      onChange={(e) => handleChange("chilledWaterOutletPress", e.target.value)}
                    />
                    <span className="text-sm">Bar</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-4">Pre-Cooler</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preInletAirTemp">Inlet Air Temp.</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="preInletAirTemp"
                      value={formData.preInletAirTemp}
                      onChange={(e) => handleChange("preInletAirTemp", e.target.value)}
                    />
                    <span className="text-sm">°C</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preOutletAirTemp">Outlet Air Temp.</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="preOutletAirTemp"
                      value={formData.preOutletAirTemp}
                      onChange={(e) => handleChange("preOutletAirTemp", e.target.value)}
                    />
                    <span className="text-sm">°C</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preChilledWaterInletTemp">Chilled Water Inlet Temp.</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="preChilledWaterInletTemp"
                      value={formData.preChilledWaterInletTemp}
                      onChange={(e) => handleChange("preChilledWaterInletTemp", e.target.value)}
                    />
                    <span className="text-sm">°C</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preChilledWaterOutletTemp">Chilled Water Outlet Temp.</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="preChilledWaterOutletTemp"
                      value={formData.preChilledWaterOutletTemp}
                      onChange={(e) => handleChange("preChilledWaterOutletTemp", e.target.value)}
                    />
                    <span className="text-sm">°C</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preChilledWaterInletPress">Chilled Water Inlet Press.</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="preChilledWaterInletPress"
                      value={formData.preChilledWaterInletPress}
                      onChange={(e) => handleChange("preChilledWaterInletPress", e.target.value)}
                    />
                    <span className="text-sm">Bar</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preChilledWaterOutletPress">Chilled Water Outlet Press.</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="preChilledWaterOutletPress"
                      value={formData.preChilledWaterOutletPress}
                      onChange={(e) => handleChange("preChilledWaterOutletPress", e.target.value)}
                    />
                    <span className="text-sm">Bar</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
