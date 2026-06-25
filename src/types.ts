/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ChecklistItem {
  id: string;
  category: "fluids" | "filters" | "hoses" | "undercarriage" | "operator" | "structure" | "electrical";
  task: string;
  notes?: string;
}

export type MachineType = "excavator" | "grader" | "dozer" | "general";

export interface MachineWatchPoint {
  modelName: string;
  checks: string[];
  badSigns: string[];
  extraTest: {
    name: string;
    description: string;
  };
}

export interface SoundIndicator {
  sound: string;
  source: string;
  cause: string;
  urgency: "CRITICAL" | "HIGH" | "MEDIUM";
}

export interface SmokeIndicator {
  color: string;
  causes: string[];
}

export interface LeakIndicator {
  type: string;
  origins: string[];
}

export interface DeceptionTactic {
  title: string;
  description: string;
  counterAction: string;
}

export interface InspectionForm {
  id: string;
  date: string;
  machineType: MachineType;
  model: string;
  owner: string;
  site: string;
  hours: string;
  
  // Section checklist responses: 'yes' (pass), 'no' (fail/issue)
  engineStartsWell: boolean;
  smokeNormal: boolean;
  noEngineKnocking: boolean;
  noOverheating: boolean;
  
  strongHydraulicResponse: boolean;
  noHydraulicLeaks: boolean;
  pumpSoundNormal: boolean;
  
  travelBothSidesEqual: boolean;
  noPullsToSide: boolean;
  brakesSteeringOk: boolean;
  
  noStructuralCracks: boolean;
  pinsAndBushingsOk: boolean;
  
  alternatorCharging: boolean;
  starterOk: boolean;
  lightsHornOk: boolean;
  
  // Field Psychology & Deception checks
  checkedColdStart: boolean;
  checkedGroundArchaeology: boolean; // checked for covered oil/leaks
  checkedFreshWashDown: boolean;
  spokeToOperatorSeparately: boolean;
  
  notes: string;
  finalDecision: "accept" | "repair_needed" | "reject";
}

export interface BlacklistEntry {
  id: string;
  machineName: string; // e.g., "330 #04"
  machineType: MachineType;
  owner: string;
  problemHistory: string;
  dateAdded: string;
}
