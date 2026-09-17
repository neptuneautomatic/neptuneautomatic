import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Settings, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Thermometer, 
  Layers, 
  Maximize2, 
  CheckCircle2, 
  RotateCw,
  Eye,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';

interface HardwareComponentHotspot {
  id: string;
  name: string;
  category: string;
  desc: string;
  spec: string;
  benefit: string;
  position: { top: string; left: string };
}

interface HardwareModel {
  id: string;
  name: string;
  tagline: string;
  category: string;
  mcbf: string;
  speed: string;
  rating: string;
  hotspots: HardwareComponentHotspot[];
  specs: { label: string; value: string }[];
}

const HARDWARE_MODELS: HardwareModel[] = [
  {
    id: 'turbopass-barrier',
    name: 'TurboPass 0.9s Brushless Servo Barrier',
    tagline: 'Flagship Toll & Enterprise Heavy-Duty Barrier Gate',
    category: 'Vehicle Access Automation',
    mcbf: '10 Million Cycles',
    speed: '0.9s – 3.0s Configurable',
    rating: 'IP65 Die-Cast Marine Grade',
    hotspots: [
      {
        id: 'motor',
        name: '24V High-Torque BLDC Servo Drive',
        category: 'Powertrain',
        desc: 'Brushless DC motor delivering instant sinusoidal torque without carbon brushes or gearbox wear.',
        spec: '140 Nm Peak Torque • 100% Continuous Duty',
        benefit: 'Silent operation and zero scheduled mechanical maintenance for 5+ years.',
        position: { top: '55%', left: '42%' }
      },
      {
        id: 'controller',
        name: '32-Bit Microprocessor Core with Modbus',
        category: 'Electronics',
        desc: 'Digital PID motor governor with dual built-in induction loop detector logic and CAN/RS485 telemetry.',
        spec: 'ARM Cortex-M4 • 0.1ms Loop Response',
        benefit: 'Seamless plug-and-play integration with FASTag, RFID, and central building BMS.',
        position: { top: '30%', left: '46%' }
      },
      {
        id: 'spring',
        name: 'Fatigue-Tested Dual Compression Springs',
        category: 'Mechanical',
        desc: 'Precision balanced counterweight springs calibrated for exact boom lengths up to 6 meters.',
        spec: '500,000 Cycles Spring Life • Quick-Tuning Screw',
        benefit: 'Eliminates motor strain and enables effortless manual clutch release during power cuts.',
        position: { top: '68%', left: '48%' }
      },
      {
        id: 'boom',
        name: 'Aerodynamic Octagonal LED Impact Boom',
        category: 'Structural',
        desc: 'High-strength aluminum alloy profile with dual-color LED status illumination and bottom rubber buffer.',
        spec: 'Wind Load 120 km/h • Anti-UV Polyester Coat',
        benefit: 'High nighttime visibility prevents vehicle collision damage.',
        position: { top: '22%', left: '72%' }
      },
      {
        id: 'enclosure',
        name: 'IP65 Die-Cast Aluminum Monocoque Chassis',
        category: 'Protection',
        desc: 'Corrosion-resistant chassis with double electrostatic powder coating designed for tropical monsoon and desert conditions.',
        spec: 'Operating Temp: -35°C to +70°C • IP65 Sealed',
        benefit: 'Resists saline coastal rust, dust ingress, and intense heat without external shading.',
        position: { top: '78%', left: '38%' }
      }
    ],
    specs: [
      { label: 'Motor Type', value: '24V Brushless DC Servo (BLDC)' },
      { label: 'Operating Speed', value: '0.9s to 3.0s Variable' },
      { label: 'Arm Length', value: 'Up to 6.0 Meters (Articulated Available)' },
      { label: 'Duty Cycle', value: '100% Continuous Duty (24/7)' },
      { label: 'MTBF Rating', value: '10,000,000 Cycles' },
      { label: 'Communication', value: 'RS485, Modbus, Wiegand, TCP/IP' },
      { label: 'Power Input', value: '110V - 240V AC, 50/60 Hz (Solar Ready)' }
    ]
  },
  {
    id: 'k12-bollard',
    name: 'Neptune K12 Crash-Rated Hydraulic Bollard',
    tagline: 'Hostile Vehicle Mitigation (HVM) ASTM M50 / PAS68 Certified',
    category: 'Perimeter Defense',
    mcbf: '3 Million Cycles',
    speed: '1.5s EFO / 3.5s Standard',
    rating: 'IP68 Submersible Hydraulic Unit',
    hotspots: [
      {
        id: 'cylinder',
        name: '304/316 Marine Stainless Steel Cylinder',
        category: 'Structural Impact',
        desc: 'Hardened heavy-wall cylinder tested to halt a 7,500 kg truck traveling at 80 km/h with zero perimeter breach.',
        spec: 'Wall Thickness: 25mm • Height: 1,000mm',
        benefit: 'Protects embassies, airports, and critical energy assets against ramming attacks.',
        position: { top: '35%', left: '48%' }
      },
      {
        id: 'hpu',
        name: 'Built-in IP68 Hydraulic Power Pack (HPU)',
        category: 'Hydraulics',
        desc: 'Submersible dual-piston hydraulic pump with mineral biodegradable fluid and thermal self-protection.',
        spec: 'Pressure: 120 Bar • Immersion Rated IP68',
        benefit: 'Eliminates external underground oil piping leaks and minimizes excavation footprint.',
        position: { top: '70%', left: '52%' }
      },
      {
        id: 'efo',
        name: 'Emergency Fast Operation (EFO) Accumulator',
        category: 'Tactical Defense',
        desc: 'Pressurized gas accumulator that triggers instantaneous emergency deployment in under 1.5 seconds.',
        spec: 'Deploy Time: < 1.5s • Panic Button Triggered',
        benefit: 'Provides critical milliseconds to stop hostile intruder vehicles.',
        position: { top: '55%', left: '38%' }
      },
      {
        id: 'light',
        name: 'High-Lumen Optical LED Warning Crown',
        category: 'Signaling',
        desc: 'Flashing perimeter LED ring with integrated audible buzzer and 3M diamond-grade retroreflective tape.',
        spec: '360° Viewing Angle • Night Distance: 500m',
        benefit: 'Clear traffic guidance prevents accidental civil vehicle impacts.',
        position: { top: '18%', left: '50%' }
      }
    ],
    specs: [
      { label: 'Crash Rating', value: 'ASTM F2656 M50 / K12 (1,852 kJ)' },
      { label: 'Cylinder Diameter', value: '275 mm (11 inches)' },
      { label: 'Cylinder Height', value: '1,000 mm (39 inches)' },
      { label: 'Rise Speed (Standard)', value: '3.5 Seconds' },
      { label: 'EFO Fast Rise', value: '1.5 Seconds' },
      { label: 'Material', value: 'High-Tensile Carbon Steel / AISI 316' },
      { label: 'Protection Class', value: 'IP68 Submersible' }
    ]
  }
];

interface ProductXRayInspectorProps {
  onOpenQuoteModal: (subject?: string) => void;
}

export const ProductXRayInspector: React.FC<ProductXRayInspectorProps> = ({
  onOpenQuoteModal
}) => {
  const [activeModelIndex, setActiveModelIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'xray' | 'assembled'>('xray');
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('motor');
  const [isSimulatingActuation, setIsSimulatingActuation] = useState<boolean>(false);

  const model = HARDWARE_MODELS[activeModelIndex];
  const activeHotspot = model.hotspots.find(h => h.id === selectedHotspotId) || model.hotspots[0];

  const handleTriggerSimulation = () => {
    setIsSimulatingActuation(true);
    setTimeout(() => {
      setIsSimulatingActuation(false);
    }, 2500);
  };

  return (
    <section id="hardware-xray-section" className="py-20 bg-white border-t border-slate-200 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-sky-50 text-[#00a8e8] text-xs font-mono font-bold tracking-wider mb-3 border border-sky-200">
              <Cpu className="w-3.5 h-3.5" />
              <span>INTERACTIVE HARDWARE ENGINEERING X-RAY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#0a1d37]">
              Inspect Proprietary Industrial Engineering
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Explore the internal engineering cutaway of Neptune's automation systems. Click technical hotspots to inspect the motor cores, microprocessors, and mechanical kinematics.
            </p>
          </div>

          {/* Model Switcher & Mode Toggles */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Model Toggle */}
            <div className="p-1 rounded-sm bg-slate-100 border border-slate-200 flex items-center">
              {HARDWARE_MODELS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveModelIndex(idx);
                    setSelectedHotspotId(item.hotspots[0].id);
                  }}
                  className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer ${
                    activeModelIndex === idx
                      ? 'bg-[#0a1d37] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0a1d37]'
                  }`}
                >
                  {item.name.split(' ')[0]} {item.name.split(' ')[1]}
                </button>
              ))}
            </div>

            {/* X-Ray vs Assembled View Mode */}
            <div className="p-1 rounded-sm bg-slate-100 border border-slate-200 flex items-center">
              <button
                onClick={() => setViewMode('xray')}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'xray'
                    ? 'bg-[#00a8e8] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0a1d37]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Internal X-Ray</span>
              </button>
              <button
                onClick={() => setViewMode('assembled')}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'assembled'
                    ? 'bg-[#00a8e8] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0a1d37]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Assembled View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Stage Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-900 rounded-sm border border-slate-800 p-6 sm:p-8 text-white shadow-2xl overflow-hidden relative">
          
          {/* Ambient Tech Lighting */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00a8e8]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Interactive Visual Stage Canvas (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between relative min-h-[440px] bg-slate-950/80 rounded-sm border border-slate-800 p-6 overflow-hidden">
            
            {/* Top Bar on Stage */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white tracking-wider">
                  {model.name.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="text-[#00a8e8]">MCBF: {model.mcbf}</span>
                <span>•</span>
                <span>SPEED: {model.speed}</span>
              </div>
            </div>

            {/* Visual Schematic Interactive Canvas with Hotspots */}
            <div className="relative my-auto py-12 flex items-center justify-center">
              
              {/* Graphic Representation of Barrier or Bollard */}
              {model.id === 'turbopass-barrier' ? (
                <div className="relative w-72 h-80 flex flex-col items-center justify-end">
                  
                  {/* Barrier Boom Arm */}
                  <div 
                    className={`absolute top-12 left-28 h-4 origin-left rounded-sm transition-transform duration-700 shadow-lg ${
                      isSimulatingActuation ? '-rotate-75' : '-rotate-6'
                    }`}
                    style={{
                      width: '280px',
                      background: viewMode === 'xray'
                        ? 'repeating-linear-gradient(45deg, #00a8e8, #00a8e8 12px, #0f172a 12px, #0f172a 24px)'
                        : 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 15px, #0f172a 15px, #0f172a 30px)'
                    }}
                  >
                    {/* Embedded LED Ribbon */}
                    <div className="absolute top-1 bottom-1 left-2 right-2 rounded-full bg-emerald-400/80 shadow-[0_0_8px_#34d399]" />
                  </div>

                  {/* Main Cabinet Housing */}
                  <div className={`w-36 h-64 rounded-t-sm border-2 relative transition-all duration-500 overflow-hidden shadow-2xl ${
                    viewMode === 'xray'
                      ? 'bg-slate-900/90 border-[#00a8e8] shadow-[0_0_30px_rgba(0,168,232,0.3)]'
                      : 'bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-slate-600'
                  }`}>
                    {/* X-Ray Internal Visible Modules */}
                    {viewMode === 'xray' && (
                      <div className="absolute inset-0 p-3 flex flex-col justify-between">
                        {/* Microprocessor Board */}
                        <div className="w-full h-14 bg-emerald-950/80 border border-emerald-500/60 rounded-xs p-1.5 flex flex-col justify-between">
                          <span className="text-[7px] font-mono text-emerald-300 font-bold">ARM PID CONTROLLER</span>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-xs bg-emerald-400 animate-ping" />
                            <div className="w-full h-1 bg-emerald-700 rounded-full" />
                          </div>
                        </div>

                        {/* Brushless Servo Core */}
                        <div className="w-full h-20 bg-sky-950/90 border border-[#00a8e8] rounded-xs p-2 flex flex-col items-center justify-center relative">
                          <div className={`w-10 h-10 rounded-full border-2 border-[#00a8e8] flex items-center justify-center ${isSimulatingActuation ? 'animate-spin' : ''}`}>
                            <div className="w-3 h-3 bg-[#00a8e8] rounded-full" />
                          </div>
                          <span className="text-[8px] font-mono text-sky-200 mt-1 font-bold">BLDC SERVO 140Nm</span>
                        </div>

                        {/* Heavy-Duty Spring Kinematic Balancer */}
                        <div className="w-full h-16 bg-slate-950 border border-amber-500/50 rounded-xs p-1 flex items-center justify-around">
                          <div className="w-3 h-12 border-x-2 border-amber-400/80 flex flex-col justify-around py-0.5">
                            <div className="w-full h-0.5 bg-amber-400" />
                            <div className="w-full h-0.5 bg-amber-400" />
                            <div className="w-full h-0.5 bg-amber-400" />
                            <div className="w-full h-0.5 bg-amber-400" />
                          </div>
                          <span className="text-[7px] font-mono text-amber-300 font-bold">5M SPRING</span>
                        </div>
                      </div>
                    )}

                    {/* Outer Assembled Logo & Indicator */}
                    {viewMode === 'assembled' && (
                      <div className="absolute inset-0 p-4 flex flex-col justify-between items-center text-center">
                        <div className="w-full text-center">
                          <span className="text-xs font-mono font-bold text-white tracking-widest">NEPTUNE</span>
                          <div className="w-12 h-1 bg-[#00a8e8] mx-auto mt-1 rounded-full" />
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-slate-500 bg-slate-800 flex items-center justify-center shadow-inner">
                          <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <div className="text-[9px] font-mono text-slate-400">
                          TURBOPASS INDUSTRIAL
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Concrete Base Mount */}
                  <div className="w-48 h-6 bg-slate-800 border border-slate-700 rounded-b-xs shadow-inner flex items-center justify-around px-4">
                    <div className="w-2 h-2 rounded-full bg-slate-500" />
                    <span className="text-[8px] font-mono text-slate-400">FLANGE ANCHORS</span>
                    <div className="w-2 h-2 rounded-full bg-slate-500" />
                  </div>
                </div>
              ) : (
                /* K12 Bollard Schematic */
                <div className="relative w-72 h-80 flex flex-col items-center justify-end">
                  {/* Bollard Cylinder */}
                  <div className={`w-32 rounded-t-sm border-2 relative transition-all duration-700 shadow-2xl flex flex-col justify-between items-center ${
                    isSimulatingActuation ? 'h-52 -translate-y-8' : 'h-44'
                  } ${
                    viewMode === 'xray'
                      ? 'bg-slate-900/90 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)]'
                      : 'bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 border-slate-300'
                  }`}>
                    {/* Crown LED Ring */}
                    <div className="w-full h-4 bg-amber-500/90 flex items-center justify-around px-2">
                      {[1, 2, 3, 4].map(k => (
                        <div key={k} className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      ))}
                    </div>

                    {/* Internal Cutaway HPU & Accumulator */}
                    {viewMode === 'xray' ? (
                      <div className="p-2 w-full flex flex-col justify-around h-full">
                        <div className="p-1 bg-amber-950/60 border border-amber-500/50 rounded-xs text-center">
                          <span className="text-[7px] font-mono text-amber-200 font-bold">AISI 316 25mm STEEL</span>
                        </div>
                        <div className="p-1.5 bg-sky-950/80 border border-sky-400/50 rounded-xs text-center">
                          <span className="text-[7px] font-mono text-sky-200 font-bold">IP68 HYDRAULIC RAM</span>
                        </div>
                        <div className="p-1 bg-emerald-950/80 border border-emerald-400/50 rounded-xs text-center">
                          <span className="text-[7px] font-mono text-emerald-200 font-bold">EFO ACCUMULATOR</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-xs font-mono font-bold text-slate-800 tracking-wider">K12-M50</span>
                        <div className="w-16 h-2 bg-amber-500 mt-2 rounded-xs" />
                      </div>
                    )}
                  </div>

                  {/* Subterranean Outer Sleeve Box */}
                  <div className="w-44 h-24 bg-slate-950 border-2 border-slate-700 rounded-b-xs p-2 flex flex-col justify-between items-center text-center">
                    <span className="text-[8px] font-mono text-slate-400">GROUND LEVEL FLANGE</span>
                    <span className="text-[9px] font-mono text-amber-400 font-bold">1,852 kJ IMPACT ABSORPTION</span>
                    <span className="text-[8px] font-mono text-slate-500">CORROSION PROOF TANK</span>
                  </div>
                </div>
              )}

              {/* Clickable Hotspot Marker Buttons Overlaid */}
              {model.hotspots.map((hotspot) => {
                const isSelected = selectedHotspotId === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    onClick={() => setSelectedHotspotId(hotspot.id)}
                    style={{ top: hotspot.position.top, left: hotspot.position.left }}
                    className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full border shadow-xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#00a8e8] border-white scale-125 shadow-[0_0_15px_#00a8e8]'
                        : 'bg-slate-900 border-[#00a8e8]/70 hover:scale-110 hover:border-white'
                    }`}
                    title={hotspot.name}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </button>
                );
              })}

            </div>

            {/* Bottom Controls Bar on Stage */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 z-10">
              <button
                onClick={handleTriggerSimulation}
                disabled={isSimulatingActuation}
                className="px-4 py-2 rounded-sm bg-[#00a8e8] hover:bg-[#0092ca] disabled:bg-slate-700 text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isSimulatingActuation ? 'animate-spin' : ''}`} />
                <span>
                  {isSimulatingActuation 
                    ? 'Simulating Actuation Cycle...' 
                    : model.id === 'turbopass-barrier' ? 'Trigger 0.9s Gate Actuation' : 'Trigger 1.5s EFO Crash Rise'}
                </span>
              </button>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Click glowing nodes to inspect</span>
                </span>
              </div>
            </div>

          </div>

          {/* Technical Subsystem Deep Dive Panel (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Selected Hotspot Focus Card */}
            <div className="p-6 rounded-sm bg-slate-950 border border-slate-800 relative overflow-hidden shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-[10px] font-mono text-[#00a8e8] font-bold uppercase tracking-wider">
                  HOTSPOT INSPECTOR: {activeHotspot.category}
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  VERIFIED HARDWARE SPEC
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  {activeHotspot.name}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {activeHotspot.desc}
                </p>
              </div>

              <div className="p-3 rounded-sm bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-[#00a8e8] font-bold">
                  {activeHotspot.spec}
                </div>
                <div className="text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Advantage:</strong> {activeHotspot.benefit}</span>
                </div>
              </div>

              {/* Hotspot selection chips */}
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase font-bold mb-2">
                  Available Technical Hotspots:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {model.hotspots.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setSelectedHotspotId(h.id)}
                      className={`px-2.5 py-1 rounded-xs text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                        selectedHotspotId === h.id
                          ? 'bg-[#00a8e8] text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {h.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Complete Engineering Spec Sheet Table */}
            <div className="p-5 rounded-sm bg-slate-950/60 border border-slate-800/80 space-y-3">
              <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Hardware Datasheet</span>
                <span className="text-[#00a8e8]">ISO 9001:2015</span>
              </div>

              <div className="divide-y divide-slate-800/80 text-xs">
                {model.specs.map((spec, i) => (
                  <div key={i} className="py-2 flex justify-between items-center">
                    <span className="text-slate-400">{spec.label}</span>
                    <span className="font-mono text-white font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenQuoteModal(`Datasheet Request: ${model.name}`)}
                  className="w-full py-2.5 px-4 rounded-sm bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Download Complete PDF Engineering Drawing</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
