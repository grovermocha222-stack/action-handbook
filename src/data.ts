/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChecklistItem,
  MachineWatchPoint,
  SoundIndicator,
  SmokeIndicator,
  LeakIndicator,
  DeceptionTactic
} from "./types";

export const DAILY_CHECKLIST: ChecklistItem[] = [
  {
    id: "d1",
    category: "fluids",
    task: "Check Engine Oil level on the dipstick (must be between MIN and MAX).",
    notes: "Use Cat DEOI or quality 15W-40 oil."
  },
  {
    id: "d2",
    category: "fluids",
    task: "Check Coolant Level in the radiator overflow reservoir.",
    notes: "Always top up with 50/50 pre-mix coolant. Avoid mineral-heavy fluids or untreated water that deposit scale inside the radiator tubes and lead to chronic afternoon overheating."
  },
  {
    id: "d3",
    category: "fluids",
    task: "Check Hydraulic Oil level sight glass.",
    notes: "Top up only to mid-range to prevent cavitation."
  },
  {
    id: "d4",
    category: "fluids",
    task: "Drain water from the primary fuel filter / water separator trap.",
    notes: "Varying diesel quality with water and sand sediments is extremely common. The water separator filter is the single most critical guard on fully mechanical CAT units to prevent catastrophic injection system failure."
  },
  {
    id: "d5",
    category: "undercarriage",
    task: "Check Track Tension or tire condition/pressures.",
    notes: "Excavator sag: 20-35mm. Dozer V-Track sag: 10-25mm on top strand."
  },
  {
    id: "d6",
    category: "fluids",
    task: "Grease swing bearing and major attachment pins.",
    notes: "3-5 pumps of NLGI #2 grease per point daily."
  },
  {
    id: "d7",
    category: "filters",
    task: "Empty the dust pre-cleaner and check the air filter area.",
    notes: "Halve intervals under high-dust Nigerian dry-season shifts."
  },
  {
    id: "d8",
    category: "hoses",
    task: "Do a slow 360-degree walk-around looking for oil leaks or loose bolts.",
    notes: "Ground archaeology: stare at the ground beneath the machine for fresh stains."
  },
  {
    id: "d9",
    category: "operator",
    task: "Check dashboard gauges, warning lights, seatbelt and cab safety guard.",
    notes: "Never ignore active dashboard warning lights."
  }
];

export const WEEKLY_CHECKLIST: ChecklistItem[] = [
  {
    id: "w1",
    category: "fluids",
    task: "Full cycle greasing of all points (even hidden ones).",
    notes: "Ensure nipples are clean first; rusty nipples mean neglect."
  },
  {
    id: "w2",
    category: "structure",
    task: "Check all pin and bushing clearances for excessive wear/play.",
    notes: "Play > 3mm requires bushing replacement."
  },
  {
    id: "w3",
    category: "electrical",
    task: "Inspect battery terminals for tightness and clean corrosion.",
    notes: "Loose terminals damage the alternator charging circuit."
  },
  {
    id: "w4",
    category: "filters",
    task: "Inspect radiator fins and blow out dust.",
    notes: "Blow compressed air or low-pressure water from inside engine compartment outwards."
  },
  {
    id: "w5",
    category: "structure",
    task: "Inspect bucket teeth, cutting edges, or dozer/grader blades.",
    notes: "Worn teeth slow work and increase fuel consumption by 15%."
  },
  {
    id: "w6",
    category: "hoses",
    task: "Inspect hydraulic cylinder rods for scratches or weeping.",
    notes: "Scratched rods destroy new seals instantly."
  }
];

export const HOUR_SCHEDULE = [
  {
    hours: "Every Day / Shift",
    tasks: ["Check all fluids", "Walk-around visual leak inspection", "Empty air pre-cleaner bowl", "Test all cab controls & gauges"]
  },
  {
    hours: "Around 50 Hours",
    tasks: ["Grease all points", "Check V-belt tension", "Inspect battery connections", "Clean radiator outer screen"]
  },
  {
    hours: "Around 250 Hours",
    tasks: ["Engine oil change", "Replace engine oil filter", "Replace fuel primary filter", "Wipe down battery terminals", "Check track/tire wear trends"]
  },
  {
    hours: "Around 500 Hours",
    tasks: ["Replace secondary fuel filter", "Replace hydraulic return filter", "Check circle drive or swing drive oil level", "Clean radiator fins deeply"]
  },
  {
    hours: "Around 1000 Hours",
    tasks: ["Major service", "Full transmission oil & filter change", "Full final drive oil change", "Full coolant system flush", "Replace secondary air filter", "Check engine valve lash"]
  },
  {
    hours: "Around 2000 Hours",
    tasks: ["Deep structural & hydraulic system overhaul check", "Hydraulic pump flow test", "Full cylinder seal replacement review", "Track chain wear analysis"]
  }
];

export const MACHINE_WATCHPOINTS: Record<string, MachineWatchPoint> = {
  excavator: {
    modelName: "CAT Excavator Series (320, 325, 330, 345)",
    checks: [
      "Boom, arm, bucket hydraulic response speed",
      "Swing gear rotation smoothness & swing motor noise",
      "Travel motor balance (does machine track straight?)",
      "Boom cylinder drift (holding load test)"
    ],
    badSigns: [
      "One side travel tracks slower than the other (pulling to side)",
      "Hydraulic pump screams or whines under normal lift",
      "Boom drifts down by itself more than 10cm in 5 minutes"
    ],
    extraTest: {
      name: "Bucket Load Hold Test",
      description: "Lift a bucket filled with heavy soil or concrete, bring stick half-way out, turn off engine. Wait 5 minutes to verify if boom holds steady."
    }
  },
  grader: {
    modelName: "CAT Motor Grader Series (12G, 14G)",
    checks: [
      "Front wheel steering response & alignment play",
      "Moldboard (blade) lift, lower, tilt, and side-shift response",
      "Circle rotation gear play & drawbar saddle wear",
      "Articulation joint play and articulation control"
    ],
    badSigns: [
      "Blade jerks or falls unexpectedly during movement",
      "Steering feels loose or grader wanders on flat road",
      "Brakes feel spongy or fail to hold on slope",
      "Articulation joint has heavy metal-on-metal play when twisting"
    ],
    extraTest: {
      name: "Blade Full Range Check",
      description: "Operate the blade through its absolute full range (full side shift, full lift, circle spin) to check for cylinder skips or mechanical gear binds."
    }
  },
  dozer: {
    modelName: "CAT Dozer D6 V-Track Series",
    checks: [
      "Equal track pulling power (does it push straight?)",
      "Final drive outer seals (check for leaks inside track shoes)",
      "Track roller & carrier roller rotations (no seized rollers)",
      "Blade lift and tilt response speed under resistance"
    ],
    badSigns: [
      "Machine pulls/drifts to one side when pushing heavy load",
      "Loud grinding/clicking track noise (worn bushing or sprocket)",
      "Final drive oil leaking over the chain links",
      "Blade slow to lift or engine chokes down too easily when pushing"
    ],
    extraTest: {
      name: "Stress Push & Turn Test",
      description: "Push blade gently into a mound of earth, then engage left and right track steering under load to verify clutch packs."
    }
  }
};

export const SOUND_GUIDE: SoundIndicator[] = [
  {
    sound: "Repetitive clicking or rattling ('kekekekekek') on start",
    source: "Keystarter (Starter motor / Solenoid)",
    cause: "The keystarter solenoid or contacts are worn or weak. It struggles and makes a clicking ('kekekekekek') sound before picking. Eventually, the starter will fail completely and prevent the machine from starting at all.",
    urgency: "HIGH"
  },
  {
    sound: "Heavy Metallic Knocking from lower engine",
    source: "Engine crankcase / cylinder bottoms",
    cause: "Worn rod bearings or main bearings. Engine about to seize.",
    urgency: "CRITICAL"
  },
  {
    sound: "Rapid Tapping/Clicking from top of engine",
    source: "Engine valve cover area",
    cause: "Incorrect valve clearance, a worn gudgeon pin, or a dry camshaft.",
    urgency: "HIGH"
  },
  {
    sound: "High-pitched Screaming/Whining from hydraulic area",
    source: "Main hydraulic pump",
    cause: "Pump cavitation. Oil is too low, air is entering suction line, or pump is worn out.",
    urgency: "CRITICAL"
  },
  {
    sound: "Grinding/Heavy Metal Click from undercarriage",
    source: "Travel motor or final drive gears",
    cause: "Worn planetary gears, dry final drive oil, or completely seized rollers.",
    urgency: "HIGH"
  },
  {
    sound: "Loud Hissing from engine or control valves",
    source: "Hoses or valve block manifold",
    cause: "High-pressure hydraulic leak or split hose. Dangerous spray risk!",
    urgency: "CRITICAL"
  }
];

export const SMOKE_GUIDE: SmokeIndicator[] = [
  {
    color: "Persistent White Smoke",
    causes: [
      "Coolant leaking into combustion chamber (blown head gasket)",
      "Severe fuel injector spray failure (unburned fuel vapor)",
      "Water mixed with diesel fuel in the tank",
      "Engine compression is extremely weak (cold start cylinder miss)"
    ]
  },
  {
    color: "Heavy Black Smoke under NO load",
    causes: [
      "Clogged air filter (engine is choking for oxygen)",
      "Faulty turbocharger (if fitted) failing to pump air",
      "Over-fueling from bad mechanical injection pump setting",
      "Damaged fuel injectors spitting raw diesel"
    ]
  },
  {
    color: "Persistent Blue Smoke",
    causes: [
      "Engine is burning its own lubricating oil",
      "Worn piston rings letting engine oil bypass into cylinder",
      "Worn valve stem seals dripping oil into exhaust/intake",
      "Severe engine wear requiring full top-end or bottom overhaul"
    ]
  }
];

export const LEAK_GUIDE: LeakIndicator[] = [
  {
    type: "Engine Oil Leak",
    origins: [
      "Valve cover gasket (common and easy to replace)",
      "Oil sump bowl bottom gasket or damaged drain plug",
      "Crankshaft front or rear main lip seals (requires splitting)",
      "Oil filter base adapter gasket"
    ]
  },
  {
    type: "Hydraulic Oil Leak",
    origins: [
      "Cylinder rod gland seals (very common on high-hour machines)",
      "Cracked/chafed hose lines hidden under dust or inside boom guards",
      "Loose hose fittings or worn O-rings at the main control valve bank",
      "Hydraulic reservoir tank seams or cooling radiator line joints"
    ]
  },
  {
    type: "Fuel / Diesel Leak",
    origins: [
      "Cracked fuel lines from vibration (especially mechanical injector pipes)",
      "Fuel secondary filter seal not seated properly",
      "Mechanical injection pump shaft seal or body casing",
      "Fuel tank bottom seam crack or loose drain valve"
    ]
  },
  {
    type: "Coolant Leak",
    origins: [
      "Radiator core cracks (usually caused by fan vibration or dust/stones)",
      "Water pump shaft weeping seal (look behind fan pulley)",
      "Rotten rubber heater hoses or loose steel clamps",
      "Engine core plugs / expansion plugs leaking from block wall"
    ]
  }
];

export const DECEPTION_TACTICS: DeceptionTactic[] = [
  {
    title: "The Fresh Wash-Down",
    description: "The owner washes the machine immediately before you arrive. Water hides fresh oil leaks, making everything look shiny and clean.",
    counterAction: "Look underneath the belly guard where water can't dry. Touch hidden corners with your fingers to feel for wet, fresh oil mixed with water."
  },
  {
    title: "The Pre-Warming Tactic",
    description: "The owner runs the engine for 1-2 hours before you arrive so it is fully warm. This hides cold-start knocking sounds, masks weak starting batteries/starters, and hides white smoke issues.",
    counterAction: "Always insist on a true COLD START. Request them not to touch the key until you arrive. If the block is hot when you touch it, wait, or suspect they are hiding a starting defect."
  },
  {
    title: "Mixed or Wrong Hydraulic Oil",
    description: "Owners sometimes top up with cheap, incorrect fluids like engine oil, transmission fluid, or wrong viscosity grades to save money.",
    counterAction: "Check inside the hydraulic filler cap. Correct oil is clear amber. If it is dark brown, thick, reddish, or milky (water-contaminated), reject the machine to avoid sudden pump failure."
  },
  {
    title: "The Silent Operator Briefing",
    description: "The owner briefs the machine operator to avoid high load during your test or to hide any engine/hydraulic sluggishness.",
    counterAction: "Politely ask the operator to step down. Speak with them separately from the owner to ask directly about the machine's true character."
  },
  {
    title: "Disconnected Warning Lights (The Bulb Trick)",
    description: "Owners sometimes remove warning bulbs or cut wires to hide active engine overheating or low oil pressure alerts.",
    counterAction: "Turn the key to 'ON' position before starting. All dashboard warning lights must light up as a bulb check. If any light is dead, a sensor might be intentionally disabled."
  },
  {
    title: "Adulterated Fuel & Blackmarket Diesel",
    description: "Owners often supply low-grade diesel contaminated with water, sand sediments, or cheaper fuels like petrol to inflate profit margins.",
    counterAction: "Run the lighter test: try to ignite a small diesel sample on a safe surface. Real diesel has a high flash point and won't ignite. If it catches fire immediately, it is mixed with petrol."
  }
];
