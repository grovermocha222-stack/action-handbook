/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ClipboardList, ShieldAlert, CheckCircle, XCircle, Save, FileText, AlertTriangle } from "lucide-react";
import { InspectionForm, MachineType } from "../types";

interface PreHireInspectionProps {
  onSave: (form: InspectionForm) => void;
}

export default function PreHireInspection({ onSave }: PreHireInspectionProps) {
  const [formData, setFormData] = useState({
    machineType: "excavator" as MachineType,
    model: "",
    owner: "",
    site: "",
    
    // Checks (true = PASS/YES, false = FAIL/NO)
    engineStartsWell: true,
    smokeNormal: true,
    noEngineKnocking: true,
    noOverheating: true,
    
    strongHydraulicResponse: true,
    noHydraulicLeaks: true,
    pumpSoundNormal: true,
    
    travelBothSidesEqual: true,
    noPullsToSide: true,
    brakesSteeringOk: true,
    
    noStructuralCracks: true,
    pinsAndBushingsOk: true,
    
    alternatorCharging: true,
    starterOk: true,
    lightsHornOk: true,
    
    // Field Psychology & Deception checks
    checkedColdStart: false,
    checkedGroundArchaeology: false,
    checkedFreshWashDown: false,
    spokeToOperatorSeparately: false,
    
    notes: ""
  });

  const [notification, setNotification] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.model || !formData.owner) {
      alert("Please fill in Machine Model and Owner Name before saving!");
      return;
    }

    // Determine final decision based on critical checkboxes
    let finalDecision: "accept" | "repair_needed" | "reject" = "accept";
    
    // Critical failures (Engine knock, overheating, pump cavitation, heavy leaks, cracks)
    const hasCriticalFailure = 
      !formData.noEngineKnocking || 
      !formData.noOverheating || 
      !formData.noStructuralCracks || 
      !formData.brakesSteeringOk || 
      !formData.noHydraulicLeaks;

    // Major issues but repairable
    const hasRepairableFailure = 
      !formData.engineStartsWell || 
      !formData.smokeNormal || 
      !formData.strongHydraulicResponse || 
      !formData.pumpSoundNormal || 
      !formData.travelBothSidesEqual || 
      !formData.noPullsToSide || 
      !formData.pinsAndBushingsOk || 
      !formData.alternatorCharging || 
      !formData.starterOk || 
      !formData.lightsHornOk;

    if (hasCriticalFailure) {
      finalDecision = "reject";
    } else if (hasRepairableFailure) {
      finalDecision = "repair_needed";
    }

    const report: InspectionForm = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString("en-NG", { year: 'numeric', month: 'long', day: 'numeric' }),
      ...formData,
      finalDecision
    };

    onSave(report);
    
    // Show success notification
    setNotification("Inspection report saved successfully!");
    setTimeout(() => setNotification(""), 4000);

    // Reset Form
    setFormData({
      machineType: "excavator",
      model: "",
      owner: "",
      site: "",
      engineStartsWell: true,
      smokeNormal: true,
      noEngineKnocking: true,
      noOverheating: true,
      strongHydraulicResponse: true,
      noHydraulicLeaks: true,
      pumpSoundNormal: true,
      travelBothSidesEqual: true,
      noPullsToSide: true,
      brakesSteeringOk: true,
      noStructuralCracks: true,
      pinsAndBushingsOk: true,
      alternatorCharging: true,
      starterOk: true,
      lightsHornOk: true,
      checkedColdStart: false,
      checkedGroundArchaeology: false,
      checkedFreshWashDown: false,
      spokeToOperatorSeparately: false,
      notes: ""
    });
  };

  // Predict decision based on current checkboxes
  const isReject = !formData.noEngineKnocking || !formData.noOverheating || !formData.noStructuralCracks || !formData.brakesSteeringOk || !formData.noHydraulicLeaks;
  const isRepair = !isReject && (!formData.engineStartsWell || !formData.smokeNormal || !formData.strongHydraulicResponse || !formData.pumpSoundNormal || !formData.travelBothSidesEqual || !formData.noPullsToSide || !formData.pinsAndBushingsOk || !formData.alternatorCharging || !formData.starterOk || !formData.lightsHornOk);

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
      <div className="flex items-center gap-3 mb-6 border-b-4 border-black pb-4">
        <span className="flex h-12 w-12 items-center justify-center bg-black text-[#CCFF00] border-4 border-black shrink-0">
          <ClipboardList className="h-6 w-6 stroke-[2.5]" />
        </span>
        <div>
          <span className="bg-black text-[#CCFF00] font-mono text-xs font-black uppercase tracking-widest px-2.5 py-1">FIELD AUDIT FORM</span>
          <h2 className="text-2xl font-black uppercase text-black mt-2">Run Pre-Hire Inspection</h2>
          <p className="text-sm font-bold text-zinc-600 uppercase">Fill this out on-site during the cold start & working test drive.</p>
        </div>
      </div>

      {notification && (
        <div className="mb-6 border-4 border-black bg-[#CCFF00] p-4 text-sm font-black text-black animate-fadeIn flex items-center gap-2 shadow-[3px_3px_0px_0px_#000]">
          <CheckCircle className="h-5 w-5 shrink-0 stroke-[2.5]" />
          <span>{notification}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Machine Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-black text-black uppercase mb-1">Machine Class</label>
            <select
              name="machineType"
              value={formData.machineType}
              onChange={handleInputChange}
              className="w-full border-2 border-black px-3 py-2 text-sm font-bold bg-white focus:outline-none focus:bg-[#CCFF00]/10"
            >
              <option value="excavator">Excavator (320-345)</option>
              <option value="grader">Grader (12G-14G)</option>
              <option value="dozer">Dozer (D6 V-Track)</option>
              <option value="general">Other Machine</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-black uppercase mb-1">Model / Number</label>
            <input
              type="text"
              name="model"
              placeholder="e.g. 330 #04, 14G"
              value={formData.model}
              onChange={handleInputChange}
              className="w-full border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#CCFF00]/10 placeholder:text-zinc-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black text-black uppercase mb-1">Owner Name</label>
            <input
              type="text"
              name="owner"
              placeholder="e.g. Alhaji Bello"
              value={formData.owner}
              onChange={handleInputChange}
              className="w-full border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#CCFF00]/10 placeholder:text-zinc-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black text-black uppercase mb-1">Site / Location</label>
            <input
              type="text"
              name="site"
              placeholder="e.g. Lekki Tollgate"
              value={formData.site}
              onChange={handleInputChange}
              className="w-full border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#CCFF00]/10 placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* 6 core visual & operational check groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Engine Section */}
          <div className="border-4 border-black p-4.5 bg-zinc-50 shadow-[4px_4px_0px_0px_#000]">
            <span className="font-mono text-xs font-black text-white bg-black px-2 py-0.5 uppercase block mb-4 border-b-2 border-black pb-1.5">
              1. Engine Checks
            </span>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black">Starts normally (no long delay/cranking)</span>
                <button
                  type="button"
                  onClick={() => handleToggle("engineStartsWell")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.engineStartsWell
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.engineStartsWell ? "PASS" : "FAIL"}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black">Exhaust smoke is normal once warm</span>
                <button
                  type="button"
                  onClick={() => handleToggle("smokeNormal")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.smokeNormal
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.smokeNormal ? "PASS" : "FAIL"}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black flex items-center gap-1">
                  No engine knocking sound <span className="text-[#FF3E00] font-black">*</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleToggle("noEngineKnocking")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.noEngineKnocking
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.noEngineKnocking ? "PASS" : "CRITICAL"}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black flex items-center gap-1">
                  No overheating signs <span className="text-[#FF3E00] font-black">*</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleToggle("noOverheating")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.noOverheating
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.noOverheating ? "PASS" : "CRITICAL"}
                </button>
              </div>
            </div>
          </div>

          {/* Hydraulics Section */}
          <div className="border-4 border-black p-4.5 bg-zinc-50 shadow-[4px_4px_0px_0px_#000]">
            <span className="font-mono text-xs font-black text-white bg-black px-2 py-0.5 uppercase block mb-4 border-b-2 border-black pb-1.5">
              2. Hydraulic Systems
            </span>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black">Strong speed and breakout response</span>
                <button
                  type="button"
                  onClick={() => handleToggle("strongHydraulicResponse")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.strongHydraulicResponse
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.strongHydraulicResponse ? "PASS" : "FAIL"}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black flex items-center gap-1">
                  No active hydraulic oil leaks <span className="text-[#FF3E00] font-black">*</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleToggle("noHydraulicLeaks")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.noHydraulicLeaks
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.noHydraulicLeaks ? "PASS" : "CRITICAL"}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black">Pump sounds normal (no screams/cavitation)</span>
                <button
                  type="button"
                  onClick={() => handleToggle("pumpSoundNormal")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.pumpSoundNormal
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.pumpSoundNormal ? "PASS" : "FAIL"}
                </button>
              </div>
            </div>
          </div>

          {/* Travel & Steering Section */}
          <div className="border-4 border-black p-4.5 bg-zinc-50 shadow-[4px_4px_0px_0px_#000]">
            <span className="font-mono text-xs font-black text-white bg-black px-2 py-0.5 uppercase block mb-4 border-b-2 border-black pb-1.5">
              3. Travel & Steering
            </span>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black">Both tracks/wheels pull with equal strength</span>
                <button
                  type="button"
                  onClick={() => handleToggle("travelBothSidesEqual")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.travelBothSidesEqual
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.travelBothSidesEqual ? "PASS" : "FAIL"}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black">Machine travels straight (no drift)</span>
                <button
                  type="button"
                  onClick={() => handleToggle("noPullsToSide")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.noPullsToSide
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.noPullsToSide ? "PASS" : "FAIL"}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black flex items-center gap-1">
                  Brakes & steering fully functional <span className="text-[#FF3E00] font-black">*</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleToggle("brakesSteeringOk")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.brakesSteeringOk
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.brakesSteeringOk ? "PASS" : "CRITICAL"}
                </button>
              </div>
            </div>
          </div>

          {/* Structure & Play Section */}
          <div className="border-4 border-black p-4.5 bg-zinc-50 shadow-[4px_4px_0px_0px_#000]">
            <span className="font-mono text-xs font-black text-white bg-black px-2 py-0.5 uppercase block mb-4 border-b-2 border-black pb-1.5">
              4. Structure & Pins
            </span>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black flex items-center gap-1">
                  No boom, arm, or blade cracks/welds <span className="text-[#FF3E00] font-black">*</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleToggle("noStructuralCracks")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.noStructuralCracks
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.noStructuralCracks ? "PASS" : "CRITICAL"}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black">Pins and bushings tight (&lt; 3mm play)</span>
                <button
                  type="button"
                  onClick={() => handleToggle("pinsAndBushingsOk")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.pinsAndBushingsOk
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.pinsAndBushingsOk ? "PASS" : "FAIL"}
                </button>
              </div>
            </div>
          </div>

          {/* Electrical Section */}
          <div className="border-4 border-black p-4.5 bg-zinc-50 shadow-[4px_4px_0px_0px_#000]">
            <span className="font-mono text-xs font-black text-white bg-black px-2 py-0.5 uppercase block mb-4 border-b-2 border-black pb-1.5">
              5. Electrical systems
            </span>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black">Alternator is charging battery correctly</span>
                <button
                  type="button"
                  onClick={() => handleToggle("alternatorCharging")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.alternatorCharging
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.alternatorCharging ? "PASS" : "FAIL"}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black">Starter engages cleanly (no "kekekekekek" sound before it picks)</span>
                <button
                  type="button"
                  onClick={() => handleToggle("starterOk")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.starterOk
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.starterOk ? "PASS" : "FAIL"}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-black">Dashboard gauges, horn & lights working</span>
                <button
                  type="button"
                  onClick={() => handleToggle("lightsHornOk")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.lightsHornOk
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-[#FF3E00] text-white shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.lightsHornOk ? "PASS" : "FAIL"}
                </button>
              </div>
            </div>
          </div>

          {/* Field Psychology & Anti-Deception Protocols */}
          <div className="border-4 border-black p-4.5 bg-amber-100 shadow-[4px_4px_0px_0px_#000]">
            <span className="font-mono text-xs font-black text-white bg-[#FF3E00] px-2 py-0.5 uppercase block mb-4 border-b-2 border-black pb-1.5">
              6. Anti-Deception Verification
            </span>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-black uppercase text-black">I checked the engine cold (not pre-warmed)</span>
                <button
                  type="button"
                  onClick={() => handleToggle("checkedColdStart")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.checkedColdStart
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-white text-zinc-500 shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.checkedColdStart ? "VERIFIED" : "NOT DONE"}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-black uppercase text-black">I dug the ground for buried oil stains</span>
                <button
                  type="button"
                  onClick={() => handleToggle("checkedGroundArchaeology")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.checkedGroundArchaeology
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-white text-zinc-500 shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.checkedGroundArchaeology ? "VERIFIED" : "NOT DONE"}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-black uppercase text-black">I checked behind fresh wash-down spots</span>
                <button
                  type="button"
                  onClick={() => handleToggle("checkedFreshWashDown")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.checkedFreshWashDown
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-white text-zinc-500 shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.checkedFreshWashDown ? "VERIFIED" : "NOT DONE"}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-black uppercase text-black">I spoke to the operator separately from owner</span>
                <button
                  type="button"
                  onClick={() => handleToggle("spokeToOperatorSeparately")}
                  className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    formData.spokeToOperatorSeparately
                      ? "bg-[#CCFF00] text-black shadow-[2px_2px_0px_0px_#000]"
                      : "bg-white text-zinc-500 shadow-[2px_2px_0px_0px_#000]"
                  }`}
                >
                  {formData.spokeToOperatorSeparately ? "VERIFIED" : "NOT DONE"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-black text-black uppercase mb-1">Inspection Notes & Found Faults</label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Describe overall appearance, minor leaks, what the operator said, or agreements with the owner..."
            value={formData.notes}
            onChange={handleInputChange}
            className="w-full border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#CCFF00]/5 placeholder:text-zinc-400 bg-white"
          />
        </div>

        {/* Real-time calculated Decision Alert */}
        <div className="border-4 border-black p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50 shadow-[4px_4px_0px_0px_#000]">
          <div>
            <span className="font-mono text-[10px] uppercase font-black text-zinc-500 block">Automated Safety Decision</span>
            
            {isReject ? (
              <div className="flex items-center gap-2 text-[#FF3E00] font-black text-base mt-2.5 uppercase tracking-tight">
                <XCircle className="h-6 w-6 shrink-0 stroke-[3]" />
                <span>REJECT — Machine has critical failures! Do not hire.</span>
              </div>
            ) : isRepair ? (
              <div className="flex items-center gap-2 text-amber-600 font-black text-base mt-2.5 uppercase tracking-tight">
                <AlertTriangle className="h-6 w-6 shrink-0 stroke-[3]" />
                <span>ACCEPT ONLY AFTER REPAIR — Fix minor issues first.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-600 font-black text-base mt-2.5 uppercase tracking-tight">
                <CheckCircle className="h-6 w-6 shrink-0 stroke-[3]" />
                <span>ACCEPT — Machine is clean, sound, and ready for site.</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-[#CCFF00] border-4 border-black px-6 py-3 font-mono text-sm font-black uppercase tracking-wider hover:bg-[#CCFF00] hover:text-black transition-all shadow-[4px_4px_0px_0px_#000] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="h-5 w-5 stroke-[2.5]" />
            <span>Save Inspection Report</span>
          </button>
        </div>
      </form>
    </div>
  );
}
