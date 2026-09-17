import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Radio, 
  Eye, 
  ShieldAlert, 
  ShieldCheck, 
  Activity,
  Car,
  Clock,
  Cpu
} from 'lucide-react';

interface InteractiveAccessSimulatorProps {
  onOpenQuoteModal?: (subject?: string) => void;
}

export const InteractiveAccessSimulator: React.FC<InteractiveAccessSimulatorProps> = ({ onOpenQuoteModal }) => {
  const [laneState, setLaneState] = useState<'idle' | 'scanning' | 'authorized' | 'barrier-open' | 'vehicle-crossing' | 'closing' | 'obstructed'>('idle');
  const [trafficLight, setTrafficLight] = useState<'red' | 'green'>('red');
  const [barrierAngle, setBarrierAngle] = useState<number>(0);
  const [vehiclePosition, setVehiclePosition] = useState<number>(10); // % across lane
  const [auditLogs, setAuditLogs] = useState<Array<{ time: string; msg: string; type: 'info' | 'success' | 'warning' | 'alert' }>>([
    { time: '10:00:00.120', msg: 'Neptune TurboPass Controller NP-BB-TP100 Online [IP: 192.168.1.104]', type: 'info' },
    { time: '10:00:00.150', msg: 'Optical dual-loop detector calibrated: No obstruction present', type: 'info' },
    { time: '10:00:01.000', msg: 'System armed and awaiting vehicle approach...', type: 'info' }
  ]);

  const addLog = (msg: string, type: 'info' | 'success' | 'warning' | 'alert' = 'info') => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
    setAuditLogs(prev => [
      { time: timeStr, msg, type },
      ...prev.slice(0, 7)
    ]);
  };

  const handleStartSimulation = () => {
    if (laneState !== 'idle' && laneState !== 'obstructed') return;

    setLaneState('scanning');
    setTrafficLight('red');
    setBarrierAngle(0);
    setVehiclePosition(15);
    addLog('Vehicle entered induction loop 1. FASTag / ANPR neural scanner active.', 'info');

    // Step 1: Scan Complete
    setTimeout(() => {
      setLaneState('authorized');
      addLog('FASTag Tag ID: 3416-FA89-C201 validated. Balance verified. ANPR Match: 99.8% (UP 16 BE 4400)', 'success');
      
      // Step 2: Open Barrier
      setTimeout(() => {
        setLaneState('barrier-open');
        setTrafficLight('green');
        setBarrierAngle(-85); // Upward angle
        addLog('Servo BLDC motor dispatched: Arm rising in 0.9s (High Speed Pass Mode)', 'info');

        // Step 3: Vehicle Crossing
        setTimeout(() => {
          setLaneState('vehicle-crossing');
          setVehiclePosition(60);
          addLog('Vehicle crossing safety zone. Optical safety curtains verified clear.', 'info');

          // Step 4: Vehicle Exited & Barrier Closing
          setTimeout(() => {
            setVehiclePosition(95);
            setLaneState('closing');
            setTrafficLight('red');
            setBarrierAngle(0);
            addLog('Loop 2 clearance acknowledged. Automatic soft-deceleration descent.', 'info');

            // Step 5: Idle
            setTimeout(() => {
              setLaneState('idle');
              setVehiclePosition(10);
              addLog('Transaction settled. Neptune Cloud PMS logged cycle #41,209.', 'success');
            }, 1200);
          }, 1500);
        }, 1200);
      }, 800);
    }, 900);
  };

  const handleTriggerObstruction = () => {
    setLaneState('obstructed');
    setTrafficLight('red');
    setBarrierAngle(-45);
    addLog('EMERGENCY BOUNCE: Optical safety beam interrupted! Arm auto-reversed in 0.12s.', 'alert');
  };

  const handleReset = () => {
    setLaneState('idle');
    setTrafficLight('red');
    setBarrierAngle(0);
    setVehiclePosition(10);
    addLog('Manual reset triggered. All safety interlocks restored to nominal state.', 'info');
  };

  return (
    <section id="access-simulator-section" className="py-16 sm:py-20 bg-gradient-to-b from-[#071526] via-[#091b33] to-[#071526] text-white relative overflow-hidden border-t-4 border-[#00A8E8]/70 border-b border-slate-800">
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00a8e8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#00a8e8]/20 border border-[#00a8e8]/40 text-[#00a8e8] text-xs font-mono font-bold mb-3">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVE INTERACTIVE HARDWARE BENCH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
              Real-Time High-Speed Access Gate Simulator
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Experience the millisecond-fast coordination between Neptune brushless servo barriers, dual vehicle loops, FASTag telemetry, and instant safety auto-reverse.
            </p>
          </div>

          {/* Action Simulation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleStartSimulation}
              disabled={laneState !== 'idle' && laneState !== 'obstructed'}
              className="px-5 py-2.5 rounded-sm bg-[#00a8e8] hover:bg-[#0092ca] disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-[#00a8e8]/20 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Vehicle Entry</span>
            </button>

            <button
              onClick={handleTriggerObstruction}
              className="px-4 py-2.5 rounded-sm bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              title="Test Instant Arm Bounce Obstacle Sensor"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Trigger Obstruction</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-sm bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title="Reset Simulator"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Lane Stage & Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Virtual Access Lane Visual Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-slate-950 rounded-sm border border-slate-800 p-6 relative overflow-hidden flex flex-col justify-between min-h-[360px] shadow-2xl">
            
            {/* Lane Info HUD Overlay */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
                  <Cpu className="w-3.5 h-3.5 text-[#00a8e8]" />
                  <span>NP-BB-TP100 [0.9s SERVO]</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    trafficLight === 'green' ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'
                  }`} />
                  <span className="text-xs font-mono uppercase font-bold text-slate-300">
                    {trafficLight === 'green' ? 'LANE OPEN (PASS)' : 'LANE SECURED (HALT)'}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                  laneState === 'scanning' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                  laneState === 'authorized' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' :
                  laneState === 'barrier-open' || laneState === 'vehicle-crossing' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                  laneState === 'obstructed' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {laneState === 'scanning' && <span className="animate-spin text-xs">⟳</span>}
                  {laneState === 'obstructed' && <AlertTriangle className="w-3 h-3 text-rose-400" />}
                  {laneState.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Virtual Roadway & Barrier Gate Assembly */}
            <div className="relative my-8 h-48 w-full border-y border-slate-800 bg-slate-900/60 flex items-center overflow-hidden">
              
              {/* Road Asphalt Texture & Painted Chevrons */}
              <div className="absolute inset-0 flex items-center justify-between px-8 opacity-20 pointer-events-none">
                <div className="w-full h-[2px] border-b-2 border-dashed border-white/60" />
              </div>

              {/* Under-Road Induction Loops (Sensors) */}
              <div className="absolute left-[20%] top-6 bottom-6 w-24 border-2 border-dashed border-[#00a8e8]/40 rounded-xs flex items-center justify-center">
                <span className="text-[9px] font-mono text-[#00a8e8]/70 tracking-widest uppercase rotate-90">
                  LOOP 1 (PRESENCE)
                </span>
              </div>

              <div className="absolute left-[65%] top-6 bottom-6 w-24 border-2 border-dashed border-emerald-400/40 rounded-xs flex items-center justify-center">
                <span className="text-[9px] font-mono text-emerald-400/70 tracking-widest uppercase rotate-90">
                  LOOP 2 (CLEARANCE)
                </span>
              </div>

              {/* Overhead ANPR Camera & FASTag Antenna Scanner */}
              <div className="absolute left-[30%] top-2 z-20 flex flex-col items-center">
                <div className="px-2 py-0.5 rounded-xs bg-[#00a8e8] text-[9px] font-mono font-bold text-white shadow-sm flex items-center gap-1">
                  <Eye className="w-2.5 h-2.5" />
                  <span>ANPR CAM</span>
                </div>
                {laneState === 'scanning' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 140 }}
                    className="w-32 bg-gradient-to-b from-[#00a8e8]/40 via-[#00a8e8]/10 to-transparent border-x border-[#00a8e8]/60 mt-1 pointer-events-none flex justify-center"
                  >
                    <div className="w-full h-[2px] bg-cyan-300 shadow-[0_0_8px_#67e8f9] animate-laser" />
                  </motion.div>
                )}
              </div>

              {/* Neptune Automatic Barrier Pedestal Unit */}
              <div className="absolute left-[48%] bottom-4 z-20 flex flex-col items-center">
                
                {/* Traffic Light Signal Column */}
                <div className="absolute -top-12 -left-6 bg-slate-950 p-1 rounded-sm border border-slate-700 flex flex-col gap-1 shadow-md">
                  <div className={`w-2.5 h-2.5 rounded-full transition-colors ${trafficLight === 'red' ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-rose-950'}`} />
                  <div className={`w-2.5 h-2.5 rounded-full transition-colors ${trafficLight === 'green' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-emerald-950'}`} />
                </div>

                {/* Boom Barrier Arm Pivot with Real-time CSS Rotation */}
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div 
                    className="absolute left-4 top-3 h-3 origin-left transition-transform duration-700 ease-out z-30"
                    style={{
                      transform: `rotate(${barrierAngle}deg)`,
                      width: '180px',
                      background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 12px, #0f172a 12px, #0f172a 24px)',
                      borderRadius: '2px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                    }}
                  >
                    {/* Integrated Red/Green LED Strip along arm */}
                    <div className={`h-[2px] w-full transition-colors ${trafficLight === 'green' ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-rose-500 shadow-[0_0_6px_#f43f5e]'}`} />
                  </div>

                  {/* Pivot Motor Hub */}
                  <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-slate-600 z-40 shadow-inner flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00a8e8]" />
                  </div>
                </div>

                {/* Barrier Cabinet Body (RAL 7016 Anthracite + Blue stripe) */}
                <div className="w-9 h-20 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-t-sm relative shadow-xl">
                  <div className="w-full h-2 bg-[#00a8e8] mt-2" />
                  <div className="text-[7px] font-mono text-center text-slate-400 mt-2 font-bold tracking-tighter">
                    NEPTUNE
                  </div>
                </div>
              </div>

              {/* Animated Vehicle Model */}
              <motion.div
                className="absolute z-30 flex items-center"
                animate={{ left: `${vehiclePosition}%` }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ bottom: '26px' }}
              >
                <div className="relative flex items-center">
                  {/* Vehicle Body Graphic */}
                  <div className="w-28 h-12 rounded-sm bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 border border-slate-500/80 shadow-lg relative flex items-center justify-between px-2">
                    {/* Headlights */}
                    <div className="absolute right-0 top-3 w-1.5 h-3 bg-amber-200 rounded-l-xs shadow-[0_0_12px_#fef08a]" />
                    <div className="absolute right-0 bottom-3 w-1.5 h-3 bg-amber-200 rounded-l-xs shadow-[0_0_12px_#fef08a]" />
                    
                    {/* FASTag on Windshield */}
                    <div className="w-3 h-2 bg-[#00a8e8] rounded-2xs border border-white/50 text-[5px] text-white flex items-center justify-center font-bold">
                      TAG
                    </div>
                    
                    {/* License Plate */}
                    <div className="px-1.5 py-0.5 bg-white text-slate-900 font-mono font-bold text-[8px] rounded-2xs border border-slate-400">
                      UP 16 BE 4400
                    </div>
                  </div>

                  {/* Wheels */}
                  <div className="absolute -bottom-2 left-3 w-4 h-4 rounded-full bg-black border border-slate-600" />
                  <div className="absolute -bottom-2 right-3 w-4 h-4 rounded-full bg-black border border-slate-600" />
                </div>
              </motion.div>

            </div>

            {/* Bottom Real-time Telemetry Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 text-xs">
              <div className="bg-slate-900/60 p-2 rounded-sm border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono">ACTUATION TIME</div>
                <div className="text-white font-mono font-bold text-sm text-[#00a8e8]">0.92 Seconds</div>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-sm border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono">MOTOR TEMP</div>
                <div className="text-white font-mono font-bold text-sm text-emerald-400">32.4°C [Nominal]</div>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-sm border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono">CYCLE COUNT</div>
                <div className="text-white font-mono font-bold text-sm">4,812,940</div>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-sm border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono">SAFETY INTERLOCK</div>
                <div className="text-emerald-400 font-mono font-bold text-sm flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ARMED 100%</span>
                </div>
              </div>
            </div>

          </div>

          {/* Real-time Controller Log Ticker (4 cols) */}
          <div className="lg:col-span-4 bg-slate-950 rounded-sm border border-slate-800 p-5 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-[#00a8e8] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-200">LIVE CONTROLLER TELEMETRY</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">● 100ms TICK</span>
              </div>

              {/* Event Stream Log */}
              <div className="space-y-2.5 font-mono text-xs overflow-y-auto max-h-[260px] pr-1">
                {auditLogs.map((log, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-sm border text-[11px] leading-relaxed transition-all ${
                      log.type === 'success' ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' :
                      log.type === 'alert' ? 'bg-rose-950/50 border-rose-800/80 text-rose-300 font-bold animate-pulse' :
                      log.type === 'warning' ? 'bg-amber-950/40 border-amber-800/60 text-amber-300' :
                      'bg-slate-900/50 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] text-slate-500 mb-0.5">
                      <span>TIMESTAMP</span>
                      <span>{log.time}</span>
                    </div>
                    <div>{log.msg}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Sizing CTA */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Ready for high-frequency gates?
              </span>
              <button
                onClick={() => onOpenQuoteModal?.('High-Cycle Barrier Lane Sizing Specs')}
                className="text-xs font-bold text-[#00a8e8] hover:underline cursor-pointer bg-transparent border-0 p-0"
              >
                Request Lane Specs →
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
