import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  Flag, 
  Trash2, 
  Megaphone, 
  PhoneCall, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ArrowRight,
  Clock,
  Building,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { reportingSteps, emergencyContacts } from '../data/reportingData';

export const ReportingProcessView: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);

  const activeStep = reportingSteps[selectedStepIndex];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>INCIDENT RESPONSE STANDARD OPERATING PROCEDURE</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Safe Phishing Reporting Procedure
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              The 5-stage human-layer containment lifecycle: STOP → VERIFY → REPORT → DELETE → WARN. Learn exact actions to neutralize threats before they propagate.
            </p>
          </div>

          <div className="bg-[#070b14] border border-cyan-500/30 rounded-xl p-3.5 shrink-0 flex items-center space-x-3 text-xs font-mono">
            <PhoneCall className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Emergency SOC Hotline</div>
              <div className="text-sm font-bold text-cyan-300">{emergencyContacts.socHotline}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual 5-Step Process Timeline Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {reportingSteps.map((step, idx) => {
          const isSelected = selectedStepIndex === idx;
          return (
            <button
              key={step.stepNumber}
              onClick={() => setSelectedStepIndex(idx)}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-b from-[#112344] to-[#0c162e] border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-[#0c1322] border-[#1e2e4f] hover:border-slate-500 hover:bg-[#111c33]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                  isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-[#16233f] text-slate-400'
                }`}>
                  0{step.stepNumber}
                </span>
                <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${
                  isSelected ? 'text-cyan-400' : 'text-slate-500'
                }`}>
                  {step.codeName}
                </span>
              </div>
              <div className="text-sm font-bold text-white mb-1 truncate">{step.title}</div>
              <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{step.shortDesc}</div>
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Card */}
      <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e2e4f] pb-4">
          <div className="flex items-center space-x-3">
            <span className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-mono font-extrabold text-lg">
              {activeStep.stepNumber}
            </span>
            <div>
              <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
                STAGE {activeStep.stepNumber}: {activeStep.codeName}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{activeStep.title}</h2>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-[#070b14] px-3 py-1.5 rounded-lg border border-[#1e2e4f]">
            {activeStep.shortDesc}
          </div>
        </div>

        {/* Dos and Don'ts Two-Column Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mandatory DO's */}
          <div className="bg-[#070b14] border border-emerald-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 pb-2 border-b border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase font-mono tracking-wider">Mandatory Actions (DO)</h3>
            </div>
            <ul className="space-y-2.5">
              {activeStep.dos.map((item, i) => (
                <li key={i} className="text-xs text-slate-200 flex items-start space-x-2.5 leading-relaxed">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strict DON'Ts */}
          <div className="bg-[#070b14] border border-red-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-red-400 pb-2 border-b border-red-500/20">
              <XCircle className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase font-mono tracking-wider">Prohibited Actions (NEVER)</h3>
            </div>
            <ul className="space-y-2.5">
              {activeStep.donts.map((item, i) => (
                <li key={i} className="text-xs text-slate-200 flex items-start space-x-2.5 leading-relaxed">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SOC Action Impact Footer */}
        <div className="p-4 rounded-xl bg-[#111c33]/70 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="font-mono uppercase font-bold text-cyan-400 text-[11px]">SOC Incident Response Impact:</span>
            <p className="text-slate-300 leading-relaxed">{activeStep.socAction}</p>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setSelectedStepIndex((prev) => (prev + 1) % reportingSteps.length)}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center space-x-1.5 transition-colors"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Evidence Preservation & What Users Should Do Summary Card */}
      <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <FileCheck className="w-5 h-5 text-cyan-400" />
          <span>Evidence Preservation & Corporate Compliance Protocol</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#070b14] border border-[#1e2e4f] space-y-2">
            <div className="font-bold text-slate-200 font-mono flex items-center space-x-1.5 text-cyan-300">
              <span>1. How to Forward Evidence</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Always forward suspected emails <strong>as an attachment (.eml or .msg)</strong>. Never forward as inline text, as this strips the sender envelope IP and DKIM cryptographic headers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#070b14] border border-[#1e2e4f] space-y-2">
            <div className="font-bold text-slate-200 font-mono flex items-center space-x-1.5 text-cyan-300">
              <span>2. If Credentials Were Disclosed</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Call the SOC hotline immediately (+1-800-SEC-TEAM). The incident response team will terminate active SSO sessions, rotate passwords, and revoke compromised OAuth tokens.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#070b14] border border-[#1e2e4f] space-y-2">
            <div className="font-bold text-slate-200 font-mono flex items-center space-x-1.5 text-cyan-300">
              <span>3. Contacting Real Entities</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Always use external verified channels: check physical bank cards, company intranet employee phonebooks, or type official domain names directly into a clean browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
