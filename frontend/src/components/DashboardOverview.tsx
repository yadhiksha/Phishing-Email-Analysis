import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Mail, 
  AlertTriangle, 
  FileCheck, 
  TrendingUp, 
  ArrowRight,
  Lock,
  Globe,
  Radio,
  CheckCircle2,
  XCircle,
  HelpCircle,
  UserCheck
} from 'lucide-react';
import { emailSamples } from '../data/emailData';

interface DashboardOverviewProps {
  onSelectEmail: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  onSelectEmail,
  onNavigateTab
}) => {
  const phishingCount = emailSamples.filter(s => s.type === 'phishing').length;
  const genuineCount = emailSamples.filter(s => s.type === 'genuine').length;
  const totalCount = emailSamples.length;

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0c162d] via-[#0f2042] to-[#0a1329] border border-cyan-500/30 p-6 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>PROJECT 03 • PHISHING EMAIL ANALYSIS & AWARENESS DEFENSE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Cybersecurity Email Threat Intelligence & Analysis
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Comprehensive triage and forensic dissection of five realistic email specimens. Learn to detect domain spoofing, unpack psychological urgency triggers, evaluate SPF/DKIM/DMARC alignment, and train enterprise staff.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('analysis')}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm flex items-center space-x-2 shadow-lg shadow-cyan-500/20 transition-all duration-150"
            >
              <Mail className="w-4 h-4" />
              <span>Inspect 5 Specimens</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('awareness')}
              className="px-4 py-2.5 rounded-lg bg-[#111c33] hover:bg-[#162544] text-cyan-300 border border-cyan-500/30 font-medium text-sm flex items-center space-x-2 transition-all duration-150"
            >
              <FileCheck className="w-4 h-4" />
              <span>Awareness Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Analyzed */}
        <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-5 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Total Analyzed</span>
            <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white font-mono">{totalCount}</span>
            <span className="text-xs text-slate-400">Representative Specimens</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>3 Phishing (60%) • 2 Genuine (40%)</span>
          </div>
        </div>

        {/* Phishing Neutralized */}
        <div className="bg-[#0c1322] border border-red-500/30 rounded-xl p-5 hover:border-red-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-red-300">Malicious Phishing</span>
            <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-red-400 font-mono">{phishingCount}</span>
            <span className="text-xs text-red-300/80">Identified & Flagged</span>
          </div>
          <div className="mt-3 text-xs text-red-300/80 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <span>Bank KYC, Job Offer, Parcel Scam</span>
          </div>
        </div>

        {/* Genuine Verified */}
        <div className="bg-[#0c1322] border border-emerald-500/30 rounded-xl p-5 hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-emerald-300">Verified Genuine</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">{genuineCount}</span>
            <span className="text-xs text-emerald-300/80">Safe Traffic</span>
          </div>
          <div className="mt-3 text-xs text-emerald-300/80 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>100% SPF, DKIM & DMARC Pass</span>
          </div>
        </div>

        {/* Prevention Score */}
        <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-5 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Triage Accuracy</span>
            <div className="w-9 h-9 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-purple-400 font-mono">100%</span>
            <span className="text-xs text-slate-400">Zero False Positives</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <span>Rigorous Heuristic Classification</span>
          </div>
        </div>
      </div>

      {/* Main Analysis Grid: Email Specimens Overview & Threat Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Specimens List (2 columns on lg) */}
        <div className="lg:col-span-2 bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>Forensic Email Specimens</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select any specimen to inspect raw headers, forensic breakdown, and callout evidence markers.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('analysis')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {emailSamples.map((email, idx) => {
              const isPhish = email.type === 'phishing';
              return (
                <div
                  key={email.id}
                  onClick={() => {
                    onSelectEmail(email.id);
                    onNavigateTab('analysis');
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isPhish
                      ? 'bg-[#120f1a]/80 border-red-500/20 hover:border-red-500/50 hover:bg-[#181124]'
                      : 'bg-[#0a1822]/80 border-emerald-500/20 hover:border-emerald-500/50 hover:bg-[#0c1f2e]'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`mt-0.5 p-2 rounded-lg shrink-0 ${
                      isPhish ? 'bg-red-950/80 text-red-400 border border-red-500/30' : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {isPhish ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#1e2e4f]/80 text-cyan-300 border border-cyan-500/20">
                          SPECIMEN 0{idx + 1}
                        </span>
                        <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                          isPhish ? 'bg-red-900/40 text-red-300 border border-red-500/40' : 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {email.verdict}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          Risk: {email.riskScore}/100
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-slate-100">{email.title.split(': ')[1]}</div>
                      <div className="text-xs text-slate-400 line-clamp-1">
                        <span className="text-slate-500 font-mono">From:</span> {email.senderDisplayName} ({email.actualSenderAddress})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center sm:self-center shrink-0 space-x-2 text-xs font-mono text-cyan-400 sm:border-l sm:border-[#1e2e4f] sm:pl-4">
                    <span>Inspect</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Threat Architecture & Authentication Summary (1 column on lg) */}
        <div className="space-y-6">
          {/* Authentication Triad Summary */}
          <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>Email Authentication Triad</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cryptographic protocol verification results across the 5 investigated specimens.
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[#070b14] border border-[#1e2e4f] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold text-slate-200">SPF (Sender Policy Framework)</span>
                  <span className="text-amber-400 font-mono font-bold">2 Pass / 3 Fail</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '40%' }}></div>
                </div>
                <div className="text-[11px] text-slate-400">Failed on all 3 phishing samples due to IP spoofing.</div>
              </div>

              <div className="p-3 rounded-lg bg-[#070b14] border border-[#1e2e4f] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold text-slate-200">DKIM (DomainKeys Identified Mail)</span>
                  <span className="text-amber-400 font-mono font-bold">2 Pass / 3 Fail</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '40%' }}></div>
                </div>
                <div className="text-[11px] text-slate-400">Missing or broken cryptographic body hashes.</div>
              </div>

              <div className="p-3 rounded-lg bg-[#070b14] border border-[#1e2e4f] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold text-slate-200">DMARC (Domain Alignment)</span>
                  <span className="text-amber-400 font-mono font-bold">2 Pass / 3 Fail</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '40%' }}></div>
                </div>
                <div className="text-[11px] text-slate-400">Strict alignment rejects unauthorized look-alike domains.</div>
              </div>
            </div>
          </div>

          {/* Quick Action Playbook Card */}
          <div className="bg-gradient-to-br from-[#111c33] to-[#0c1322] border border-cyan-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase">5-STEP RESPONSE LIFECYCLE</span>
            </div>
            <div className="text-sm font-bold text-white">STOP • VERIFY • REPORT • DELETE • WARN</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard operating procedure to guide employees from pause to containment within minutes.
            </p>
            <button
              onClick={() => onNavigateTab('reporting')}
              className="w-full py-2 px-3 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <span>Explore Reporting SOP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
