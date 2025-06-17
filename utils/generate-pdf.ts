"use client"

import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { format } from "date-fns"

// Helper function to add a title to the PDF
const addTitle = (doc: jsPDF, text: string) => {
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text(text, 14, 22)
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
}

// Helper function to add a section header
const addSectionHeader = (doc: jsPDF, text: string, y: number) => {
  // Check if we need a new page
  if (y > 270) {
    doc.addPage()
    y = 20
  }

  doc.setFillColor(230, 236, 245)
  doc.rect(14, y, 182, 8, "F")
  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.text(text, 16, y + 5.5)
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  return y + 10
}

// Helper function to add a field with label and value
const addField = (doc: jsPDF, label: string, value: string, x: number, y: number, width = 90) => {
  // Check if we need a new page
  if (y > 270) {
    doc.addPage()
    y = 20
  }

  doc.setFont("helvetica", "bold")
  doc.text(label, x, y)
  doc.setFont("helvetica", "normal")
  doc.text(value || "-", x + width / 2, y)
  return y + 6
}

// Helper function to safely add a table and handle pagination
const addTable = (doc: jsPDF, tableData: any, startY: number, title = "") => {
  // Check if we need a new page
  if (startY > 250) {
    doc.addPage()
    startY = 20
    if (title) {
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text(title, 14, startY)
      startY += 10
    }
  }

  autoTable(doc, {
    ...tableData,
    startY: startY,
    theme: "grid",
    headStyles: { fillColor: [100, 116, 139], textColor: 255, fontStyle: "bold" },
    styles: { fontSize: 9, cellPadding: 3 },
    margin: { left: 14, right: 14 },
    didDrawPage: (data) => {
      // Add header to each page
      doc.setFontSize(8)
      doc.setTextColor(100)
      doc.text("Dryer Service Report", data.settings.margin.left, 10)

      // Add footer to each page
      doc.setFontSize(8)
      doc.text(
        `Generated on: ${format(new Date(), "dd/MM/yyyy HH:mm")}`,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10,
      )
      doc.text(
        `Page ${doc.internal.getCurrentPageInfo().pageNumber}`,
        doc.internal.pageSize.width - 20,
        doc.internal.pageSize.height - 10,
      )
    },
  })

  return (doc as any).lastAutoTable.finalY + 10
}

// Generate PDF for Refrigerant Dryer
export const generateRefrigerantDryerPDF = (data: any) => {
  const doc = new jsPDF()

  // Add logo or header
  addTitle(doc, "Refrigerant Dryer Service Report")

  // Add date and report info
  doc.text(`Date: ${data.date ? format(new Date(data.date), "dd/MM/yyyy") : "N/A"}`, 14, 30)
  doc.text(`Time: ${data.time || "N/A"}`, 80, 30)
  doc.text(`Location: ${data.location || "N/A"}`, 140, 30)

  // Company Information
  let y = addSectionHeader(doc, "COMPANY INFORMATION", 40)
  y = addField(doc, "Company:", data.company || "N/A", 14, y)
  y = addField(doc, "Check By:", data.checkBy || "N/A", 14, y)
  y = addField(doc, "Ref. No.:", data.refNo || "N/A", 14, y)

  // Equipment Information
  y = addSectionHeader(doc, "EQUIPMENT INFORMATION", y + 5)
  y = addField(doc, "Model Number:", data.modelNumber || "N/A", 14, y)
  y = addField(doc, "Dryer Number:", data.dryerNumber || "N/A", 14, y)
  y = addField(doc, "Serial Number:", data.serialNumber || "N/A", 14, y)
  y = addField(doc, "Nominal Capacity:", data.nominalCapacity || "N/A", 14, y)
  y = addField(doc, "Refrigerant Type:", data.refrigerantType || "N/A", 14, y)

  // Service Type
  y = addSectionHeader(doc, "SERVICE TYPE", y + 5)
  const serviceType = data.serviceType
    ? data.serviceType.charAt(0).toUpperCase() + data.serviceType.slice(1).replace(/([A-Z])/g, " $1")
    : "N/A"
  y = addField(doc, "Service Type:", serviceType, 14, y)

  // Dryer Status
  y = addSectionHeader(doc, "DRYER STATUS", y + 5)

  // Create a table for dryer status
  y = addTable(
    doc,
    {
      head: [["Description", "Value", "Recommendations", "Unit"]],
      body: [
        ["Dew Point (T1)", data.dewPoint || "-", "0... 5 °C", "°C"],
        ["Inlet Temperature (T2)", data.inletTemp || "-", "+45°C Max.", "°C"],
        ["Outlet Temperature", data.outletTemp || "-", "+45°C Max.", "°C"],
        ["Suction Temp. (T3)", data.suctionTemp || "-", "0... 35 °C", "°C"],
        ["Discharge Temp. (T4)", data.dischargeTemp || "-", "30... 90 °C", "°C"],
        ["Ambient Temp.", data.ambientTemp || "-", "20... 35 °C", "°C"],
        ["Condensing Temp.", data.condensingTemp || "-", "30... 45 °C", "°C"],
        ["Evaporating Temp.", data.evaporatingTemp || "-", "1... 10°C", "°C"],
        ["Discharge Pressure (HP)", data.dischargePressure || "-", "12... 25 Bar(g)", "Bar(g)"],
        ["Suction Pressure (LP)", data.suctionPressure || "-", "4... 6 Bar(g)", "Bar(g)"],
      ],
    },
    y,
  )

  // Filter and Drain Information
  y = addSectionHeader(doc, "FILTER & DRAIN INFORMATION", y)

  // Format drain condition values for better readability
  const formatDrainCondition = (condition: string) => {
    if (!condition) return "N/A"
    return condition === "function" ? "Functioning" : "Malfunctioning"
  }

  y = addField(doc, "Next Change: Pre-Filter:", data.nextChangePreFilter || "N/A", 14, y)
  y = addField(doc, "Auto Drain Pre-Filter:", formatDrainCondition(data.autoDrainPreFilter), 14, y)
  y = addField(doc, "Next Change: After-Filter:", data.nextChangeAfterFilter || "N/A", 14, y)
  y = addField(doc, "Auto Drain After-Filter:", formatDrainCondition(data.autoDrainAfterFilter), 14, y)
  y = addField(doc, "Condensate Drain:", formatDrainCondition(data.condensateDrain), 14, y)

  // Operating Information
  y = addSectionHeader(doc, "OPERATING INFORMATION", y + 5)
  y = addField(doc, "Operating Pressure:", `${data.operatingPressure || "N/A"} Bar(g)`, 14, y)

  // Electrical Information
  y = addSectionHeader(doc, "ELECTRICAL INFORMATION", y + 5)

  // Create a table for electrical information
  y = addTable(
    doc,
    {
      head: [["Component", "L1 (A)", "L2 (A)", "L3 (A)"]],
      body: [
        ["Compressor", data.ampCompressorL1 || "-", data.ampCompressorL2 || "-", data.ampCompressorL3 || "-"],
        ["Fan", data.ampFanL1 || "-", data.ampFanL2 || "-", data.ampFanL3 || "-"],
      ],
    },
    y,
  )

  // Checklist
  y = addSectionHeader(doc, "CHECKLIST", y + 5)

  const checklistItems = [
    { name: "Clean condenser with air gun", checked: data.checklistItems?.cleanCondenser },
    { name: "Check parameter of dryer", checked: data.checklistItems?.checkParameters },
    { name: "Check low and high gas pressure", checked: data.checklistItems?.checkGasPressure },
    { name: "Check Autodrain condition", checked: data.checklistItems?.checkAutodrain },
    { name: "Check filter differential pressure condition", checked: data.checklistItems?.checkFilterPressure },
    { name: "Check running Amp compressor and fan", checked: data.checklistItems?.checkCompressorAndFan },
    { name: "Inspect refrigerant leakage at access valve and piping", checked: data.checklistItems?.inspectLeakage },
    { name: "Clean up the housing of dryer", checked: data.checklistItems?.cleanHousing },
  ]

  y = addTable(
    doc,
    {
      head: [["Checklist Item", "Status"]],
      body: checklistItems.map((item, index) => [`${index + 1}. ${item.name}`, item.checked ? "✓" : "✗"]),
    },
    y,
  )

  // Remarks
  y = addSectionHeader(doc, "REMARKS / RECOMMENDATIONS", y)

  // Add multiline text with word wrap
  const remarks = data.remarks || "No remarks provided."
  const splitRemarks = doc.splitTextToSize(remarks, 180)

  // Check if we need a new page for remarks
  if (y + splitRemarks.length * 5 > 270) {
    doc.addPage()
    y = 20
    doc.text("REMARKS / RECOMMENDATIONS (continued)", 14, y)
    y += 10
  }

  doc.text(splitRemarks, 14, y)

  // Add signature fields
  y = y + splitRemarks.length * 5 + 20

  // Check if we need a new page for signatures
  if (y > 270) {
    doc.addPage()
    y = 40
  }

  doc.line(14, y, 80, y)
  doc.line(110, y, 176, y)
  doc.text("Technician Signature", 14, y + 5)
  doc.text("Customer Signature", 110, y + 5)

  // Add date and page numbers in footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.text(`Generated on: ${format(new Date(), "dd/MM/yyyy HH:mm")}`, 14, 290)
    doc.text(`Page ${i} of ${pageCount}`, 176, 290)
  }

  return doc
}

// Generate PDF for Heated Desiccant Dryer
export const generateHeatedDryerPDF = (data: any) => {
  const doc = new jsPDF()

  // Add logo or header
  addTitle(doc, "Heated Desiccant Dryer Service Report")

  // Add date and report info
  doc.text(`Date: ${data.date ? format(new Date(data.date), "dd/MM/yyyy") : "N/A"}`, 14, 30)
  doc.text(`Time: ${data.time || "N/A"}`, 80, 30)
  doc.text(`Location: ${data.location || "N/A"}`, 140, 30)

  // Company Information
  let y = addSectionHeader(doc, "COMPANY INFORMATION", 40)
  y = addField(doc, "Company:", data.company || "N/A", 14, y)
  y = addField(doc, "Check By:", data.checkBy || "N/A", 14, y)
  y = addField(doc, "Ref. No.:", data.refNo || "N/A", 14, y)

  // Equipment Information
  y = addSectionHeader(doc, "EQUIPMENT INFORMATION", y + 5)
  y = addField(doc, "Model Number:", data.modelNumber || "N/A", 14, y)
  y = addField(doc, "Dryer Number:", data.dryerNumber || "N/A", 14, y)
  y = addField(doc, "Serial Number:", data.serialNumber || "N/A", 14, y)

  // Service Type
  y = addSectionHeader(doc, "SERVICE TYPE", y + 5)
  const serviceType = data.serviceType
    ? data.serviceType.charAt(0).toUpperCase() + data.serviceType.slice(1).replace(/([A-Z])/g, " $1")
    : "N/A"
  y = addField(doc, "Service Type:", serviceType, 14, y)

  // Dryer Status - Adsorption
  y = addSectionHeader(doc, "DRYER STATUS - ADSORPTION", y + 5)

  // Format adsorption time
  const adsorptionTime =
    data.adsorptionHours || data.adsorptionMinutes
      ? `${data.adsorptionHours || "0"} hrs ${data.adsorptionMinutes || "0"} min`
      : "N/A"

  // Create a table for adsorption status
  y = addTable(
    doc,
    {
      head: [["Parameter", "Value", "Unit"]],
      body: [
        ["Dew Point", data.dewPoint || "N/A", "°C"],
        ["Adsorption", adsorptionTime, ""],
        ["Press. Release", `${data.pressureReleaseMinutes || "N/A"} min`, ""],
        ["Desorption", `${data.desorptionMinutes || "N/A"} min`, ""],
        ["TIR 101", data.tir101 || "N/A", "°C"],
        ["PIR 101", data.pir101 || "N/A", "Bar"],
        ["Dewpoint Control", data.dewpointControl ? "✓" : "✗", ""],
      ],
    },
    y,
  )

  // Dryer Status - Regeneration
  y = addSectionHeader(doc, "DRYER STATUS - REGENERATION", y)

  // Format stand by time
  const standByTime =
    data.standByHours || data.standByMinutes
      ? `${data.standByHours || "0"} hrs ${data.standByMinutes || "0"} min`
      : "N/A"

  // Create a table for regeneration status
  y = addTable(
    doc,
    {
      head: [["Parameter", "Value", "Unit"]],
      body: [
        ["Stand By", standByTime, ""],
        ["Press. Build Up", `${data.pressureBuildUpMinutes || "N/A"} min`, ""],
        ["Cooling", `${data.coolingMinutes || "N/A"} min`, ""],
        ["TIR 102", data.tir102 || "N/A", "°C"],
        ["PIR 102", data.pir102 || "N/A", "Bar"],
        ["Time Control", data.timeControl ? "✓" : "✗", ""],
      ],
    },
    y,
  )

  // Former Values
  y = addSectionHeader(doc, "FORMER VALUES", y)

  // Format previous adsorption cycle
  const prevAdsCycle =
    data.previousAdsCycleHours || data.previousAdsCycleMinutes
      ? `${data.previousAdsCycleHours || "0"} hrs ${data.previousAdsCycleMinutes || "0"} min`
      : "N/A"

  y = addField(doc, "Regeneration Cycles:", `${data.regenerationCycles || "N/A"} pcs`, 14, y)
  y = addField(doc, "Previous Ads.Cycle:", prevAdsCycle, 14, y)

  // Operating Conditions
  y = addSectionHeader(doc, "OPERATING CONDITIONS", y + 5)

  y = addTable(
    doc,
    {
      head: [["Parameter", "Value", "Unit"]],
      body: [
        ["Inlet Volume", data.inletVolume || "N/A", "m³/h"],
        ["Operating Pressure", data.operatingPressure || "N/A", "Bar"],
        ["Air Inlet Temperature", data.airInletTemp || "N/A", "°C"],
        ["Air Outlet Temperature", data.airOutletTemp || "N/A", "°C"],
      ],
    },
    y,
  )

  // Inter-Cooler
  y = addSectionHeader(doc, "INTER-COOLER", y)

  y = addTable(
    doc,
    {
      head: [["Parameter", "Value", "Unit"]],
      body: [
        ["Chilled Water Inlet Temp.", data.chilledWaterInletTemp || "N/A", "°C"],
        ["Chilled Water Outlet Temp.", data.chilledWaterOutletTemp || "N/A", "°C"],
        ["Chilled Water Inlet Press.", data.chilledWaterInletPress || "N/A", "Bar"],
        ["Chilled Water Outlet Press.", data.chilledWaterOutletPress || "N/A", "Bar"],
      ],
    },
    y,
  )

  // Pre-Cooler
  y = addSectionHeader(doc, "PRE-COOLER", y)

  y = addTable(
    doc,
    {
      head: [["Parameter", "Value", "Unit"]],
      body: [
        ["Inlet Air Temp.", data.preInletAirTemp || "N/A", "°C"],
        ["Outlet Air Temp.", data.preOutletAirTemp || "N/A", "°C"],
        ["Chilled Water Inlet Temp.", data.preChilledWaterInletTemp || "N/A", "°C"],
        ["Chilled Water Outlet Temp.", data.preChilledWaterOutletTemp || "N/A", "°C"],
        ["Chilled Water Inlet Press.", data.preChilledWaterInletPress || "N/A", "Bar"],
        ["Chilled Water Outlet Press.", data.preChilledWaterOutletPress || "N/A", "Bar"],
      ],
    },
    y,
  )

  // Checklist
  y = addSectionHeader(doc, "CHECKLIST", y)

  const checklistItems = [
    { name: "Clean condenser with air gun", checked: data.checklistItems?.cleanCondenser },
    { name: "Check parameter of dryer", checked: data.checklistItems?.checkParameters },
    { name: "Check low and high gas pressure", checked: data.checklistItems?.checkGasPressure },
    { name: "Check Autodrain condition", checked: data.checklistItems?.checkAutodrain },
    { name: "Check filter differential pressure condition", checked: data.checklistItems?.checkFilterPressure },
    { name: "Check running Amp compressor and fan", checked: data.checklistItems?.checkCompressorAndFan },
    { name: "Inspect refrigerant leakage at access valve and piping", checked: data.checklistItems?.inspectLeakage },
    { name: "Clean up the housing of dryer", checked: data.checklistItems?.cleanHousing },
  ]

  y = addTable(
    doc,
    {
      head: [["Checklist Item", "Status"]],
      body: checklistItems.map((item, index) => [`${index + 1}. ${item.name}`, item.checked ? "✓" : "✗"]),
    },
    y,
  )

  // Remarks
  y = addSectionHeader(doc, "REMARKS / RECOMMENDATIONS", y)

  // Add multiline text with word wrap
  const remarks = data.remarks || "No remarks provided."
  const splitRemarks = doc.splitTextToSize(remarks, 180)

  // Check if we need a new page for remarks
  if (y + splitRemarks.length * 5 > 270) {
    doc.addPage()
    y = 20
    doc.text("REMARKS / RECOMMENDATIONS (continued)", 14, y)
    y += 10
  }

  doc.text(splitRemarks, 14, y)

  // Add signature fields
  y = y + splitRemarks.length * 5 + 20

  // Check if we need a new page for signatures
  if (y > 270) {
    doc.addPage()
    y = 40
  }

  doc.line(14, y, 80, y)
  doc.line(110, y, 176, y)
  doc.text("Technician Signature", 14, y + 5)
  doc.text("Customer Signature", 110, y + 5)

  // Add date and page numbers in footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.text(`Generated on: ${format(new Date(), "dd/MM/yyyy HH:mm")}`, 14, 290)
    doc.text(`Page ${i} of ${pageCount}`, 176, 290)
  }

  return doc
}
