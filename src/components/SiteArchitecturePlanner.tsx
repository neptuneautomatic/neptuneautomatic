import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  ShieldAlert, 
  Car, 
  Layers, 
  Cpu, 
  Radio, 
  Eye, 
  CheckCircle2, 
  Download, 
  Sliders, 
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';
import { PRODUCTS } from '../data/companyData';
import { Product } from '../types';

interface SitePreset {
  id: string;
  name: string;
  category: string;
  desc: string;
  icon: string;
  recommendedHardware: string[];
  metrics: {
    throughput: string;
    authSpeed: string;
    securityLevel: string;
    powerBackup: string;
  };
}

const PRESETS: SitePreset[] = [
  {
    id: 'commercial-hq',
    name: 'Grade-A Corporate HQ & IT Park',
    category: 'Commercial Enterprise',
    desc: 'High-frequency vehicle and visitor automation with ticketless FASTag, ANPR neural cameras, and optical flap barriers.',
    icon: '🏢',
    recommendedHardware: [
      'Neptune TurboPass High-Speed Barrier (0.9s)',
      'Dual-Band FASTag / UHF Reader (12m range)',
      'Neural AI ANPR License Plate Camera (99.4%)',
      'SlimSpeed Optical Flap Barrier Pedestrian Turnstile'
    ],
    metrics: {
      throughput: '1,200 vehicles/hr',
      authSpeed: '< 0.9 sec',
      securityLevel: 'Enterprise Level 3',
      powerBackup: '6 Hours Inverter Ready'
    }
  },
  {
    id: 'defense-embassy',
    name: 'Defense, Embassy & Critical Perimeter',
    category: 'High-Security HVM',
    desc: 'Certified hostile vehicle mitigation (HVM) with crash-rated K12 bollards, shallow mount road blockers, and under-vehicle scanners.',
    icon: '🛡️',
    recommendedHardware: [
      'Neptune K12 Crash-Rated Hydraulic Bollard (1,852 kJ)',
      'Shallow Mount Hydraulic Road Blocker (250mm foundation)',
      'DeepScan Under-Vehicle Surveillance System (UVSS)',
      'Bi-Directional Electro-Mechanical Tyre Killer'
    ],
    metrics: {
      throughput: '350 vehicles/hr',
      authSpeed: '< 1.5 sec EFO deploy',
      securityLevel: 'Military PAS68 / K12',
      powerBackup: 'Manual Override + Dual HPU'
    }
  },
  {
    id: 'toll-highway',
    name: 'Toll Plaza & Freight Logistics Hub',
    category: 'Express Transit',
    desc: 'Continuous duty cycle 24/7 boom barriers with multi-lane gantry integration, weight sensors, and zero-latency clearance.',
    icon: '🛣️',
    recommendedHardware: [
      'Neptune TurboPass Toll-Grade Servo Barrier (0.6s–0.9s)',
      'Dual Inductive Safety Loop Detector & Laser Curtain',
      'Overhead Heavy-Duty FASTag Antenna Gantry',
      'Red/Green LED Wayfinding Traffic Signal Column'
    ],
    metrics: {
      throughput: '1,600 vehicles/hr',
      authSpeed: '< 0.5 sec',
      securityLevel: 'Transit Express L4',
      powerBackup: '100% Continuous 24/7'
    }
  },
  {
    id: 'mall-parking',
    name: 'Smart Retail Mall & Multi-Level Parking',
    category: 'Smart Mobility',
    desc: 'Ticketless automated parking with ultrasonic space vacancy indicators, variable message LED guidance, and UPI/FASTag billing.',
    icon: '🚗',
    recommendedHardware: [
      'Articulated Arm Basement Boom Barrier (Low Clearance)',
      'Ultrasonic Bay Occupancy Sensors with Dual RGB LEDs',
      'Multi-Tier Dynamic Variable Message Wayfinding Display',
      'Automated Touchless UPI & FASTag Pay Kiosk'
    ],
    metrics: {
      throughput: '900 vehicles/hr',
      authSpeed: '< 1.8 sec',
      securityLevel: 'Smart Mobility L2',
      powerBackup: '4 Hours UPS Backup'
    }
  }
];

interface SiteArchitecturePlannerProps {
  onOpenQuoteModal: (subject?: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export const SiteArchitecturePlanner: React.FC<SiteArchitecturePlannerProps> = ({
  onOpenQuoteModal,
  onSelectProduct
}) => {
  const [activePreset, setActivePreset] = useState<SitePreset>(PRESETS[0]);
  const [enabledLayers, setEnabledLayers] = useState({
    boomBarrier: true,
    anprCamera: true,
    fastagReader: true,
    crashBollards: false,
    pedestrianTurnstiles: true,
    safetyLoops: true,
    uvssInspection: false
  });
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>('barrier');
  const [showConfigSummary, setShowConfigSummary] = useState(false);

  const toggleLayer = (layer: keyof typeof enabledLayers) => {
    setEnabledLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleSelectPreset = (preset: SitePreset) => {
    setActivePreset(preset);
    if (preset.id === 'defense-embassy') {
      setEnabledLayers({
        boomBarrier: true,
        anprCamera: true,
        fastagReader: false,
        crashBollards: true,
        pedestrianTurnstiles: false,
        safetyLoops: true,
        uvssInspection: true
      });
      setSelectedHotspot('bollard');
    } else if (preset.id === 'toll-highway') {
      setEnabledLayers({
        boomBarrier: true,
        anprCamera: true,
        fastagReader: true,
        crashBollards: false,
        pedestrianTurnstiles: false,
        safetyLoops: true,
        uvssInspection: false
      });
      setSelectedHotspot('barrier');
    } else if (preset.id === 'mall-parking') {
      setEnabledLayers({
        boomBarrier: true,
        anprCamera: true,
        fastagReader: true,
        crashBollards: false,
        pedestrianTurnstiles: false,
        safetyLoops: true,
        uvssInspection: false
      });
      setSelectedHotspot('anpr');
    } else {
      setEnabledLayers({
        boomBarrier: true,
        anprCamera: true,
        fastagReader: true,
        crashBollards: false,
        pedestrianTurnstiles: true,
        safetyLoops: true,
        uvssInspection: false
      });
      setSelectedHotspot('barrier');
    }
  };

  return (
    <section id="architecture-planner-section" className="py-20 bg-[#071326] text-white relative overflow-hidden border-t border-slate-800">
      {/* Dynamic Background Tech Mesh and Ambient Glow */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#00a8e8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#00a8e8]/20 border border-[#00a8e8]/40 text-[#00a8e8] text-xs font-mono font-bold tracking-wider mb-3">
              <Sliders className="w-3.5 h-3.5" />
              <span>INTERACTIVE SYSTEM ARCHITECTURE PLANNER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
              Visual Perimeter & Lane Configurator
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Design and size your facility access automation in real-time. Select site requirements, customize hardware subsystems, and inspect live clearance telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSelectPreset(PRESETS[0])}
              className="px-4 py-2 rounded-sm bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Configuration</span>
            </button>
            <button
              onClick={() => onOpenQuoteModal(`Architecture Config: ${activePreset.name}`)}
              className="px-5 py-2.5 rounded-sm bg-[#00a8e8] hover:bg-[#0092ca] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export BOM & Get Sizing</span>
            </button>
          </div>
        </div>

        {/* Site Typology Presets Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {PRESETS.map((preset) => {
            const isSelected = activePreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-4 rounded-sm text-left transition-all border cursor-pointer relative ${
                  isSelected
                    ? 'bg-slate-900 border-[#00a8e8] shadow-[0_0_20px_rgba(0,168,232,0.2)]'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00a8e8] animate-ping" />
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{preset.icon}</span>
                  <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${
                    isSelected ? 'text-[#00a8e8]' : 'text-slate-400'
                  }`}>
                    {preset.category}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">
                  {preset.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Hardware Subsystems Checkbox Deck (Col 1-4) */}
          <div className="lg:col-span-4 bg-slate-950/90 rounded-sm border border-slate-800 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#00a8e8]" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Hardware Subsystems
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-xs border border-emerald-800">
                  LIVE INTERLOCK
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    key: 'boomBarrier',
                    name: 'High-Speed Servo Barrier',
                    spec: '0.9s BLDC, 5M MCBF',
                    icon: '🚧',
                    active: enabledLayers.boomBarrier
                  },
                  {
                    key: 'anprCamera',
                    name: 'AI Neural ANPR Camera',
                    spec: '99.4% LPR Accuracy, IR Night Vision',
                    icon: '👁️',
                    active: enabledLayers.anprCamera
                  },
                  {
                    key: 'fastagReader',
                    name: 'Long-Range FASTag / UHF',
                    spec: '12m Detection, EPC Gen 2',
                    icon: '📡',
                    active: enabledLayers.fastagReader
                  },
                  {
                    key: 'crashBollards',
                    name: 'K12 Hydraulic Crash Bollard',
                    spec: '1,852 kJ Impact, ASTM M50',
                    icon: '🛡️',
                    active: enabledLayers.crashBollards
                  },
                  {
                    key: 'pedestrianTurnstiles',
                    name: 'Optical Flap Turnstile',
                    spec: '55 Persons/Min, Anti-Tailgating',
                    icon: '🚶',
                    active: enabledLayers.pedestrianTurnstiles
                  },
                  {
                    key: 'safetyLoops',
                    name: 'Dual Induction Ground Loop',
                    spec: 'Instant Anti-Crush Auto-Reverse',
                    icon: '🔄',
                    active: enabledLayers.safetyLoops
                  },
                  {
                    key: 'uvssInspection',
                    name: 'Under-Vehicle Scanner (UVSS)',
                    spec: '4K Color Area Scan, AI Compare',
                    icon: '🔍',
                    active: enabledLayers.uvssInspection
                  }
                ].map((item) => (
                  <div
                    key={item.key}
                    onClick={() => toggleLayer(item.key as any)}
                    className={`p-3 rounded-sm border transition-all cursor-pointer flex items-center justify-between group ${
                      item.active
                        ? 'bg-slate-900 border-[#00a8e8]/50 text-white shadow-xs'
                        : 'bg-slate-950/50 border-slate-800/80 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">{item.icon}</span>
                      <div>
                        <div className={`text-xs font-bold group-hover:text-white ${item.active ? 'text-white' : 'text-slate-400'}`}>
                          {item.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {item.spec}
                        </div>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors ${
                      item.active
                        ? 'bg-[#00a8e8] border-[#00a8e8] text-white'
                        : 'border-slate-700 bg-slate-900'
                    }`}>
                      {item.active && <CheckCircle2 className="w-3 h-3 stroke-2" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Configurator Metrics Summary */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Peak Throughput:</span>
                <span className="font-mono text-white font-bold">{activePreset.metrics.throughput}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Clearance Latency:</span>
                <span className="font-mono text-[#00a8e8] font-bold">{activePreset.metrics.authSpeed}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Security Standard:</span>
                <span className="font-mono text-emerald-400 font-bold">{activePreset.metrics.securityLevel}</span>
              </div>
            </div>

          </div>

          {/* Interactive Visual Blueprint & Interactive Hotspots Canvas (Col 5-12) */}
          <div className="lg:col-span-8 bg-slate-950 rounded-sm border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            
            {/* Top Canvas Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 z-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-sm bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
                  <Cpu className="w-3.5 h-3.5 text-[#00a8e8]" />
                  <span>ARCHITECTURE BLUEPRINT: {activePreset.id.toUpperCase()}</span>
                </div>
                <span className="hidden sm:inline text-xs text-slate-400 font-medium">
                  Click any hotspot icon to inspect component engineering
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>INTERLOCK SYNCED</span>
              </div>
            </div>

            {/* Interactive Schematic Diagram (SVG + HTML Hotspots) */}
            <div className="relative my-6 h-96 w-full rounded-sm bg-slate-900/70 border border-slate-800 flex items-center justify-center overflow-hidden">
              
              {/* Lane Markings & Radial Grid */}
              <div className="absolute inset-0 flex flex-col justify-between py-6 px-4 pointer-events-none opacity-20">
                <div className="w-full border-b border-dashed border-slate-400" />
                <div className="w-full border-b-2 border-dashed border-[#00a8e8]" />
                <div className="w-full border-b border-dashed border-slate-400" />
              </div>

              {/* Lane Direction Arrows */}
              <div className="absolute left-8 flex flex-col gap-8 opacity-25 pointer-events-none">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00a8e8]">
                  <span>VEHICLE APPROACH →</span>
                </div>
              </div>

              {/* Induction Loop 1 Graphic */}
              {enabledLayers.safetyLoops && (
                <div 
                  onClick={() => setSelectedHotspot('loop1')}
                  className={`absolute left-[18%] top-[25%] bottom-[25%] w-24 border-2 border-dashed rounded-xs flex flex-col items-center justify-center cursor-pointer transition-all ${
                    selectedHotspot === 'loop1' ? 'border-[#00a8e8] bg-[#00a8e8]/20' : 'border-[#00a8e8]/40 hover:border-[#00a8e8]'
                  }`}
                >
                  <span className="text-[9px] font-mono text-[#00a8e8] uppercase tracking-wider font-bold">
                    LOOP 1
                  </span>
                  <span className="text-[8px] font-mono text-slate-400">PRESENCE</span>
                </div>
              )}

              {/* ANPR Overhead Camera Hotspot */}
              {enabledLayers.anprCamera && (
                <div 
                  onClick={() => setSelectedHotspot('anpr')}
                  className={`absolute left-[32%] top-6 z-30 cursor-pointer group flex flex-col items-center`}
                >
                  <div className={`p-2 rounded-full border shadow-lg transition-all ${
                    selectedHotspot === 'anpr' ? 'bg-[#00a8e8] border-white scale-110' : 'bg-slate-900 border-[#00a8e8]/60 hover:scale-105'
                  }`}>
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded-xs border border-slate-700 mt-1">
                    ANPR AI
                  </span>
                </div>
              )}

              {/* FASTag / UHF Reader Hotspot */}
              {enabledLayers.fastagReader && (
                <div 
                  onClick={() => setSelectedHotspot('fastag')}
                  className={`absolute left-[40%] top-6 z-30 cursor-pointer group flex flex-col items-center`}
                >
                  <div className={`p-2 rounded-full border shadow-lg transition-all ${
                    selectedHotspot === 'fastag' ? 'bg-[#00a8e8] border-white scale-110' : 'bg-slate-900 border-[#00a8e8]/60 hover:scale-105'
                  }`}>
                    <Radio className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded-xs border border-slate-700 mt-1">
                    FASTag RFID
                  </span>
                </div>
              )}

              {/* UVSS Under-Vehicle Inspection Hotspot */}
              {enabledLayers.uvssInspection && (
                <div 
                  onClick={() => setSelectedHotspot('uvss')}
                  className={`absolute left-[45%] bottom-10 z-30 cursor-pointer group flex flex-col items-center`}
                >
                  <div className={`p-2 rounded-full border shadow-lg transition-all ${
                    selectedHotspot === 'uvss' ? 'bg-amber-500 border-white scale-110' : 'bg-slate-900 border-amber-500/60 hover:scale-105'
                  }`}>
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-slate-900/90 px-2 py-0.5 rounded-xs border border-slate-700 mt-1">
                    UVSS 4K
                  </span>
                </div>
              )}

              {/* Crash Bollard Hotspot */}
              {enabledLayers.crashBollards && (
                <div 
                  onClick={() => setSelectedHotspot('bollard')}
                  className={`absolute left-[54%] top-[30%] bottom-[30%] flex flex-col justify-around z-30 cursor-pointer`}
                >
                  {[0, 1].map(i => (
                    <div key={i} className="flex items-center gap-1.5 group">
                      <div className={`w-5 h-10 rounded-xs border-2 shadow-xl transition-all ${
                        selectedHotspot === 'bollard' ? 'bg-amber-400 border-white shadow-[0_0_15px_#f59e0b]' : 'bg-amber-500/80 border-amber-300'
                      }`} />
                    </div>
                  ))}
                  <span className="text-[9px] font-mono font-bold text-amber-400 bg-slate-950 px-1.5 py-0.5 border border-amber-500/40 rounded-xs mt-1">
                    K12 BOLLARD
                  </span>
                </div>
              )}

              {/* TurboPass Barrier Gate Assembly Hotspot */}
              {enabledLayers.boomBarrier && (
                <div 
                  onClick={() => setSelectedHotspot('barrier')}
                  className={`absolute left-[62%] top-14 bottom-14 z-30 cursor-pointer flex flex-col items-center justify-center`}
                >
                  {/* Barrier Arm */}
                  <div 
                    className={`h-3 origin-left transition-all ${
                      selectedHotspot === 'barrier' ? 'shadow-[0_0_15px_#00a8e8]' : ''
                    }`}
                    style={{
                      width: '140px',
                      background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #0f172a 10px, #0f172a 20px)',
                      transform: 'rotate(-25deg)',
                      borderRadius: '2px'
                    }}
                  />
                  {/* Barrier Pedestal */}
                  <div className={`w-8 h-20 rounded-t-sm border shadow-2xl flex flex-col items-center justify-between py-1 transition-all ${
                    selectedHotspot === 'barrier' ? 'bg-[#00a8e8] border-white scale-105' : 'bg-slate-800 border-slate-600'
                  }`}>
                    <span className="text-[7px] font-mono font-bold text-white">NEPTUNE</span>
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded-xs border border-slate-700 mt-1">
                    0.9s SERVO
                  </span>
                </div>
              )}

              {/* Flap Barrier Pedestrian Turnstiles Hotspot */}
              {enabledLayers.pedestrianTurnstiles && (
                <div 
                  onClick={() => setSelectedHotspot('turnstile')}
                  className={`absolute right-10 top-12 bottom-12 z-30 cursor-pointer flex flex-col items-center justify-center`}
                >
                  <div className={`w-14 h-24 rounded-sm border p-2 flex flex-col justify-between items-center transition-all ${
                    selectedHotspot === 'turnstile' ? 'bg-[#00a8e8]/30 border-[#00a8e8] scale-105' : 'bg-slate-900/90 border-slate-700'
                  }`}>
                    <span className="text-[8px] font-mono text-cyan-300">WALKWAY</span>
                    <div className="w-8 h-1 bg-cyan-400 rounded-full" />
                    <span className="text-[8px] font-mono text-slate-400">55 P/MIN</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded-xs border border-slate-700 mt-1">
                    FLAP TURNSTILE
                  </span>
                </div>
              )}

              {/* Induction Loop 2 Graphic */}
              {enabledLayers.safetyLoops && (
                <div 
                  onClick={() => setSelectedHotspot('loop2')}
                  className={`absolute right-[22%] top-[25%] bottom-[25%] w-24 border-2 border-dashed rounded-xs flex flex-col items-center justify-center cursor-pointer transition-all ${
                    selectedHotspot === 'loop2' ? 'border-emerald-400 bg-emerald-400/20' : 'border-emerald-400/40 hover:border-emerald-400'
                  }`}
                >
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                    LOOP 2
                  </span>
                  <span className="text-[8px] font-mono text-slate-400">CLEARANCE</span>
                </div>
              )}

            </div>

            {/* Bottom Active Hotspot Engineering Insight Callout */}
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00a8e8] font-bold uppercase mb-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>ENGINEERING COMPONENT DETAILS</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {selectedHotspot === 'barrier' && 'Neptune TurboPass BLDC Servo Barrier (Model: NP-BB-TP100)'}
                    {selectedHotspot === 'bollard' && 'Neptune K12 Crash-Rated Hydraulic Bollard (ASTM M50 Certified)'}
                    {selectedHotspot === 'anpr' && 'Neptune Neural AI ANPR License Plate Recognition Camera (Model: NP-CAM-LP4K)'}
                    {selectedHotspot === 'fastag' && 'Dual-Frequency Long-Range FASTag / UHF Reader (Model: NP-RFID-U10)'}
                    {selectedHotspot === 'turnstile' && 'SlimSpeed Architectural Flap Barrier Turnstile (Model: NP-TS-F900)'}
                    {selectedHotspot === 'loop1' && 'Optical Inductive Vehicle Detection Safety Loop 1 (Presence Trigger)'}
                    {selectedHotspot === 'loop2' && 'Inductive Vehicle Clearance Safety Loop 2 (Auto Soft Descent)'}
                    {selectedHotspot === 'uvss' && 'DeepScan Under-Vehicle Surveillance Scanner (4K Color Area Array)'}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedHotspot === 'barrier' && 'Brushless 24V DC servo motor with sinusoidal linkage. 0.9s opening speed, 100% duty cycle, and 5 million MCBF.'}
                    {selectedHotspot === 'bollard' && 'Halt 7.5-ton vehicle traveling at 80 km/h with zero perimeter penetration. 1.5s Emergency Fast Operation (EFO).'}
                    {selectedHotspot === 'anpr' && 'Deep learning OCR engine trained for Indian license plate fonts, high retro-reflectivity, and night IR illumination.'}
                    {selectedHotspot === 'fastag' && 'Integrated with NPCI / NETC FASTag protocols for automated toll and corporate campus contactless egress.'}
                    {selectedHotspot === 'turnstile' && 'SUS304 stainless steel cabinet with brushless servo drive, optical safety curtain, and fire alarm override.'}
                    {selectedHotspot === 'loop1' && 'Embedded under asphalt to trigger camera exposure and prevent gate closure on approaching vehicles.'}
                    {selectedHotspot === 'loop2' && 'Signals the barrier motor to decelerate smoothly once the vehicle bumper has fully cleared the arm path.'}
                    {selectedHotspot === 'uvss' && 'Real-time composite stitched view of vehicle undercarriage to detect foreign objects or contraband.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onOpenQuoteModal(`Hardware Sizing: ${selectedHotspot?.toUpperCase()}`)}
                    className="px-4 py-2 rounded-sm bg-[#00a8e8] hover:bg-[#0092ca] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Request Datasheet
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
