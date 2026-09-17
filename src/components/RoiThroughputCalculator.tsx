import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Coins, 
  Leaf, 
  Car, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';

interface RoiThroughputCalculatorProps {
  onOpenQuoteModal: (subject?: string) => void;
}

export const RoiThroughputCalculator: React.FC<RoiThroughputCalculatorProps> = ({
  onOpenQuoteModal
}) => {
  const [lanes, setLanes] = useState<number>(4);
  const [dailyVehicles, setDailyVehicles] = useState<number>(3500);
  const [currentSystem, setCurrentSystem] = useState<'manual' | 'paper' | 'semi'>('manual');
  const [operatingHours, setOperatingHours] = useState<number>(18);

  // Computations
  const stats = useMemo(() => {
    // Clearance time per vehicle in seconds
    const currentTimePerCar = currentSystem === 'manual' ? 28 : currentSystem === 'paper' ? 19 : 10;
    const neptuneTimePerCar = 1.2; // FASTag / Neural ANPR + 0.9s Barrier

    const secondsSavedPerCar = currentTimePerCar - neptuneTimePerCar;
    const totalDailySecondsSaved = dailyVehicles * secondsSavedPerCar;
    const totalDailyHoursSaved = Math.round(totalDailySecondsSaved / 3600);
    const annualHoursSaved = Math.round((totalDailyHoursSaved * 365) / 100) * 100;

    // Financial calculations (INR)
    // Guards per lane for operating shifts:
    const shifts = operatingHours > 12 ? 3 : 2;
    const guardsPerLaneCurrent = currentSystem === 'manual' ? 2 : 1;
    const totalGuardsCurrent = lanes * shifts * guardsPerLaneCurrent;
    // With Neptune: 1 centralized supervisor console covers 4-8 lanes
    const totalGuardsNeptune = Math.max(1, Math.ceil(lanes / 4) * shifts);
    const guardsSaved = totalGuardsCurrent - totalGuardsNeptune;

    const avgGuardMonthlySalary = 24000; // INR
    const annualLaborSavings = guardsSaved * avgGuardMonthlySalary * 12; // in INR
    const annualLaborSavingsLakhs = (annualLaborSavings / 100000).toFixed(1);

    // Revenue leakage prevention (for commercial/toll/paid parking)
    const leakagePreventedPerYear = (dailyVehicles * 365 * 1.5) / 100000; // e.g. approx ₹ in lakhs
    const totalAnnualSavingsLakhs = (parseFloat(annualLaborSavingsLakhs) + leakagePreventedPerYear).toFixed(1);

    // Environmental Impact: Idling car emits ~0.26 kg CO2 per hour of idle
    const annualCo2TonsSaved = ((totalDailyHoursSaved * 365 * 0.26) / 1000).toFixed(1);

    // Estimated Payback Period in Months
    // Estimated turnkey hardware + installation investment: ~2.8L per lane
    const estimatedCapex = lanes * 280000;
    const monthlyBenefit = (annualLaborSavings + (leakagePreventedPerYear * 100000)) / 12;
    const paybackMonths = Math.max(2.5, Math.min(18, (estimatedCapex / monthlyBenefit))).toFixed(1);

    // Throughput Capacity
    const currentMaxPerHour = Math.round((3600 / currentTimePerCar) * lanes);
    const neptuneMaxPerHour = Math.round((3600 / neptuneTimePerCar) * lanes);

    return {
      currentTimePerCar,
      neptuneTimePerCar,
      secondsSavedPerCar,
      totalDailyHoursSaved,
      annualHoursSaved,
      guardsSaved,
      totalAnnualSavingsLakhs,
      annualCo2TonsSaved,
      paybackMonths,
      currentMaxPerHour,
      neptuneMaxPerHour
    };
  }, [lanes, dailyVehicles, currentSystem, operatingHours]);

  return (
    <section id="roi-calculator-section" className="py-20 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a8e8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0a1d37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0a1d37]/10 text-[#0a1d37] text-xs font-mono font-bold tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#00a8e8]" />
            <span>INTERACTIVE ENTERPRISE ROI & TRAFFIC CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#0a1d37]">
            Quantify Your Automated Access Savings
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Move the interactive parameters to estimate vehicle clearance latency reduction, guard staffing optimization, and payback timeline for your facility.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (Col 1-5) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-mono font-bold text-[#0a1d37] uppercase tracking-wider">
                Facility Operational Parameters
              </span>
              <span className="text-[11px] font-mono text-[#00a8e8] font-bold">
                REAL-TIME SIZING
              </span>
            </div>

            {/* Slider 1: Number of Entry/Exit Lanes */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-[#0a1d37] flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[#00a8e8]" />
                  <span>Number of Ingress / Egress Lanes</span>
                </label>
                <span className="font-mono font-bold text-sm text-[#00a8e8] bg-sky-50 px-2.5 py-0.5 rounded-sm border border-sky-200">
                  {lanes} {lanes === 1 ? 'Lane' : 'Lanes'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={16}
                step={1}
                value={lanes}
                onChange={(e) => setLanes(parseInt(e.target.value, 10))}
                className="w-full accent-[#00a8e8] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>1 Lane</span>
                <span>8 Lanes</span>
                <span>16 Lanes</span>
              </div>
            </div>

            {/* Slider 2: Daily Vehicle Volume */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-[#0a1d37] flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#00a8e8]" />
                  <span>Average Daily Vehicle Ingress</span>
                </label>
                <span className="font-mono font-bold text-sm text-[#00a8e8] bg-sky-50 px-2.5 py-0.5 rounded-sm border border-sky-200">
                  {dailyVehicles.toLocaleString('en-IN')} / day
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={25000}
                step={500}
                value={dailyVehicles}
                onChange={(e) => setDailyVehicles(parseInt(e.target.value, 10))}
                className="w-full accent-[#00a8e8] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>500</span>
                <span>10,000</span>
                <span>25,000+</span>
              </div>
            </div>

            {/* Radio / Pill Select: Current Gate System */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0a1d37] block">
                Current Access Control Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'manual', label: 'Manual Guard', speed: '~28s / car' },
                  { id: 'paper', label: 'Paper Ticket', speed: '~19s / car' },
                  { id: 'semi', label: 'Legacy RFID', speed: '~10s / car' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentSystem(item.id as any)}
                    className={`p-2.5 rounded-sm text-left border transition-all cursor-pointer ${
                      currentSystem === item.id
                        ? 'bg-[#0a1d37] text-white border-[#0a1d37] shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{item.label}</div>
                    <div className={`text-[10px] font-mono mt-0.5 ${currentSystem === item.id ? 'text-[#00a8e8]' : 'text-slate-400'}`}>
                      {item.speed}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 3: Daily Operating Hours */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-[#0a1d37] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00a8e8]" />
                  <span>Daily Operating Schedule</span>
                </label>
                <span className="font-mono font-bold text-sm text-slate-800">
                  {operatingHours === 24 ? '24/7 Continuous' : `${operatingHours} Hours / Day`}
                </span>
              </div>
              <input
                type="range"
                min={8}
                max={24}
                step={2}
                value={operatingHours}
                onChange={(e) => setOperatingHours(parseInt(e.target.value, 10))}
                className="w-full accent-[#00a8e8] cursor-pointer"
              />
            </div>

            {/* Consultation Prompt */}
            <div className="pt-2">
              <button
                onClick={() => onOpenQuoteModal(`ROI Sizing: ${lanes} Lanes, ${dailyVehicles} cars/day`)}
                className="w-full py-3 px-4 rounded-sm bg-[#00a8e8] hover:bg-[#0092ca] text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Request Custom Feasibility Study</span>
              </button>
            </div>

          </div>

          {/* Results Dynamic Dashboard (Col 6-12) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Big Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Card 1: Annual Financial Benefit */}
              <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold font-mono uppercase mb-2">
                  <Coins className="w-4 h-4" />
                  <span>Est. Annual Benefit</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-[#0a1d37]">
                  ₹{stats.totalAnnualSavingsLakhs} <span className="text-base font-normal text-slate-500">Lakhs</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                  Reduced guard deployment & zero cash leakage.
                </p>
              </div>

              {/* Card 2: Estimated Payback */}
              <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/10 rounded-bl-full pointer-events-none" />
                <div className="flex items-center gap-2 text-[#00a8e8] text-xs font-bold font-mono uppercase mb-2">
                  <Zap className="w-4 h-4" />
                  <span>CAPEX Payback</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-[#0a1d37]">
                  {stats.paybackMonths} <span className="text-base font-normal text-slate-500">Months</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                  Rapid ROI through turnkey automation.
                </p>
              </div>

              {/* Card 3: Carbon Offset */}
              <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/10 rounded-bl-full pointer-events-none" />
                <div className="flex items-center gap-2 text-teal-600 text-xs font-bold font-mono uppercase mb-2">
                  <Leaf className="w-4 h-4" />
                  <span>CO₂ Offset</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-[#0a1d37]">
                  {stats.annualCo2TonsSaved} <span className="text-base font-normal text-slate-500">Tons</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                  Avoided idling emissions per year.
                </p>
              </div>

            </div>

            {/* Visual Throughput Comparison Bar Chart */}
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#0a1d37]">
                  Peak Traffic Handling Comparison (Vehicles / Hour)
                </h4>
                <span className="text-xs font-mono text-emerald-600 font-bold">
                  + {Math.round((stats.neptuneMaxPerHour / stats.currentMaxPerHour) * 100 - 100)}% Throughput Boost
                </span>
              </div>

              {/* Current Speed Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Current System ({currentSystem.toUpperCase()} - {stats.currentTimePerCar}s / car)</span>
                  <span className="font-mono font-bold text-slate-800">{stats.currentMaxPerHour.toLocaleString('en-IN')} cars/hr</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-slate-400 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(10, Math.min(100, (stats.currentMaxPerHour / stats.neptuneMaxPerHour) * 100))}%`
                    }}
                  />
                </div>
              </div>

              {/* Neptune Automated Speed Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-[#0a1d37]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00a8e8]" />
                    <span>Neptune Intelligent FASTag + 0.9s Servo Barrier (1.2s / car)</span>
                  </span>
                  <span className="font-mono text-[#00a8e8]">{stats.neptuneMaxPerHour.toLocaleString('en-IN')} cars/hr</span>
                </div>
                <div className="w-full bg-sky-100 rounded-full h-3.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#00a8e8] to-[#0a1d37] h-full rounded-full transition-all duration-500"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-sm bg-sky-50/70 border border-sky-100 text-xs text-slate-600 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00a8e8] shrink-0 mt-0.5" />
                <span>
                  <strong>Eliminate Entry Bottlenecks:</strong> Peak shift morning and evening queues are resolved in seconds with automated FASTag RFID & dual inductive vehicle loop safety logic.
                </span>
              </div>
            </div>

            {/* Operational Impact Breakdown List */}
            <div className="bg-[#0a1d37] text-white p-6 rounded-sm border border-slate-800 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono text-[#00a8e8] font-bold uppercase tracking-wider">
                  Engineered Operational Impact
                </div>
                <span className="text-[10px] font-mono text-slate-300">
                  NEPTUNE ALGORITHM V2.4
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-sm bg-slate-900/80 border border-slate-800">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                    {stats.secondsSavedPerCar}s
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                    Saved Per Vehicle
                  </div>
                </div>

                <div className="p-3 rounded-sm bg-slate-900/80 border border-slate-800">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-[#00a8e8]">
                    {stats.totalDailyHoursSaved} hrs
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                    Daily Commute Saved
                  </div>
                </div>

                <div className="p-3 rounded-sm bg-slate-900/80 border border-slate-800">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">
                    {stats.guardsSaved} Staff
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                    Redeployed to Security
                  </div>
                </div>

                <div className="p-3 rounded-sm bg-slate-900/80 border border-slate-800">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-amber-300">
                    99.4%
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                    ANPR AI Accuracy
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
