import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Mail, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Lock, 
  Terminal, 
  Code, 
  FileText,
  User,
  Clock,
  Globe,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { emailSamples } from '../data/emailData';

interface EmailAnalysisViewProps {
  selectedEmailId: string;
  setSelectedEmailId: (id: string) => void;
}

export const EmailAnalysisView: React.FC<EmailAnalysisViewProps> = ({
  selectedEmailId,
  setSelectedEmailId
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'annotated' | 'formatted' | 'headers' | 'forensics'>('annotated');
  const [activeCalloutId, setActiveCalloutId] = useState<number | null>(null);
  const [copiedHeader, setCopiedHeader] = useState(false);

  const currentEmail = emailSamples.find(e => e.id === selectedEmailId) || emailSamples[0];
  const isPhish = currentEmail.type === 'phishing';

  const copyHeadersToClipboard = () => {
    navigator.clipboard.writeText(currentEmail.rawHeaders);
    setCopiedHeader(true);
    setTimeout(() => setCopiedHeader(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Specimen Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#1e2e4f] pb-3">
        {emailSamples.map((specimen, idx) => {
          const isSelected = specimen.id === currentEmail.id;
          const isSpecimenPhish = specimen.type === 'phishing';
          return (
            <button
              key={specimen.id}
              onClick={() => {
                setSelectedEmailId(specimen.id);
                setActiveCalloutId(null);
              }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? isSpecimenPhish
                    ? 'bg-red-950/80 text-red-200 border border-red-500/60 shadow-md shadow-red-950/40'
                    : 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/60 shadow-md shadow-emerald-950/40'
                  : 'bg-[#0c1322] text-slate-400 hover:text-slate-200 border border-[#1e2e4f] hover:bg-[#111c33]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isSpecimenPhish ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
              <span className="font-mono font-bold">SPECIMEN 0{idx + 1}</span>
              <span className="hidden md:inline text-[11px] opacity-80">({isSpecimenPhish ? 'Phish' : 'Safe'})</span>
            </button>
          );
        })}
      </div>

      {/* Header Info & Verdict Card */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isPhish 
          ? 'bg-gradient-to-r from-[#140c17] via-[#1c0f24] to-[#120a1a] border-red-500/40 shadow-xl shadow-red-950/20' 
          : 'bg-gradient-to-r from-[#09151e] via-[#0d2230] to-[#09151e] border-emerald-500/40 shadow-xl shadow-emerald-950/20'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#070b14]/80 text-cyan-300 border border-cyan-500/30">
                {currentEmail.category}
              </span>
              <span className={`text-xs font-mono font-extrabold px-3 py-1 rounded-md tracking-wider flex items-center space-x-1.5 ${
                isPhish ? 'bg-red-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
              }`}>
                {isPhish ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                <span>VERDICT: {currentEmail.verdict}</span>
              </span>
              <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-[#070b14] border border-[#1e2e4f]">
                RISK SCORE: <strong className={isPhish ? 'text-red-400' : 'text-emerald-400'}>{currentEmail.riskScore} / 100</strong>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {currentEmail.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              {currentEmail.detailedVerdictExplanation}
            </p>
          </div>

          {/* Authentication Badge Triad */}
          <div className="bg-[#070b14]/90 border border-[#1e2e4f] rounded-xl p-4 shrink-0 space-y-2 text-xs font-mono">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
              Cryptographic Auth
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-slate-400">SPF:</span>
              <span className={`font-bold px-2 py-0.5 rounded ${
                currentEmail.auth.spf === 'pass' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-red-950 text-red-400 border border-red-500/30'
              }`}>
                {currentEmail.auth.spf.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-slate-400">DKIM:</span>
              <span className={`font-bold px-2 py-0.5 rounded ${
                currentEmail.auth.dkim === 'pass' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-red-950 text-red-400 border border-red-500/30'
              }`}>
                {currentEmail.auth.dkim.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-slate-400">DMARC:</span>
              <span className={`font-bold px-2 py-0.5 rounded ${
                currentEmail.auth.dmarc === 'pass' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-red-950 text-red-400 border border-red-500/30'
              }`}>
                {currentEmail.auth.dmarc.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Educational simulation banner */}
        <div className="mt-4 pt-3 border-t border-slate-700/40 flex items-center space-x-2 text-[11px] font-mono text-cyan-400">
          <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>{currentEmail.simulationDisclaimer}</span>
        </div>
      </div>

      {/* Subtabs: Annotated View vs Formatted View vs Headers vs Forensic Dossier */}
      <div className="flex items-center space-x-2 border-b border-[#1e2e4f] text-xs font-mono">
        <button
          onClick={() => setActiveSubTab('annotated')}
          className={`px-4 py-2.5 border-b-2 font-semibold transition-colors flex items-center space-x-2 ${
            activeSubTab === 'annotated'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Annotated Evidence Markers</span>
        </button>

        <button
          onClick={() => setActiveSubTab('forensics')}
          className={`px-4 py-2.5 border-b-2 font-semibold transition-colors flex items-center space-x-2 ${
            activeSubTab === 'forensics'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Forensic Dossier Breakdown</span>
        </button>

        <button
          onClick={() => setActiveSubTab('formatted')}
          className={`px-4 py-2.5 border-b-2 font-semibold transition-colors flex items-center space-x-2 ${
            activeSubTab === 'formatted'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Simulated Email Client</span>
        </button>

        <button
          onClick={() => setActiveSubTab('headers')}
          className={`px-4 py-2.5 border-b-2 font-semibold transition-colors flex items-center space-x-2 ${
            activeSubTab === 'headers'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Raw RFC Headers</span>
        </button>
      </div>

      {/* SUBTAB 1: ANNOTATED EVIDENCE VIEW */}
      {activeSubTab === 'annotated' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Email Body with Numbered Callout Badges (7 cols) */}
          <div className="lg:col-span-7 bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1e2e4f] pb-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold uppercase text-slate-200">Interactive Email Evidence</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Click any numbered marker below to inspect
              </span>
            </div>

            {/* Email Metadata Header Block */}
            <div className="p-3.5 rounded-lg bg-[#070b14] border border-[#1e2e4f] space-y-2 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-slate-400 font-mono">From: </span>
                  <span className="font-semibold text-white">{currentEmail.senderDisplayName}</span>
                  <span className="text-slate-400 ml-1 font-mono">({currentEmail.actualSenderAddress})</span>
                </div>
                <button
                  onClick={() => setActiveCalloutId(1)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isPhish ? 'bg-red-500 text-black' : 'bg-emerald-500 text-black'
                  }`}
                >
                  CALLOUT [1]
                </button>
              </div>

              <div>
                <span className="text-slate-400 font-mono">To: </span>
                <span className="text-slate-200 font-mono">{currentEmail.recipient}</span>
              </div>

              <div>
                <span className="text-slate-400 font-mono">Subject: </span>
                <span className="font-semibold text-cyan-300">{currentEmail.subject}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 border-t border-[#1e2e4f]">
                <span>Date: {currentEmail.timestamp}</span>
                <span>Relay: {currentEmail.sendingIp.split(' ')[0]}</span>
              </div>
            </div>

            {/* Body Text with highlighted callouts */}
            <div className="p-4 rounded-lg bg-[#070b14] border border-[#1e2e4f] font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
              {currentEmail.bodyText}
            </div>

            {/* Quick Helper */}
            <div className="text-[11px] text-slate-400 flex items-center space-x-2 bg-[#111c33]/50 p-2.5 rounded-lg border border-[#1e2e4f]">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Tip: Look for discrepancies between what the email claims and what technical headers verify.
              </span>
            </div>
          </div>

          {/* Numbered Callout Legend (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                Forensic Callout Legend ({currentEmail.annotations.length} Markers)
              </h3>
              <span className="text-[11px] text-slate-400">
                {isPhish ? 'Red Flags' : 'Legitimate Markers'}
              </span>
            </div>

            <div className="space-y-2.5">
              {currentEmail.annotations.map((marker) => {
                const isSelected = activeCalloutId === marker.id;
                const isLegit = marker.isLegitimate;
                return (
                  <div
                    key={marker.id}
                    onClick={() => setActiveCalloutId(marker.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? isLegit
                          ? 'bg-emerald-950/80 border-emerald-400 shadow-md shadow-emerald-950/40'
                          : 'bg-red-950/80 border-red-400 shadow-md shadow-red-950/40'
                        : 'bg-[#0c1322] border-[#1e2e4f] hover:border-slate-500 hover:bg-[#111c33]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                          isLegit ? 'bg-emerald-500 text-black' : 'bg-red-500 text-black'
                        }`}>
                          {marker.id}
                        </span>
                        <span className="text-xs font-bold text-white">{marker.label}</span>
                      </div>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        isLegit ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/30' : 'bg-red-900/60 text-red-300 border border-red-500/30'
                      }`}>
                        {marker.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-2">
                      {marker.description}
                    </p>

                    <div className="p-2 rounded bg-[#070b14] border border-[#1e2e4f] text-[11px] font-mono text-cyan-300 truncate">
                      <span className="text-slate-500 select-none">&gt;&gt; </span>
                      {marker.evidenceSnippet}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: FORENSIC DOSSIER BREAKDOWN */}
      {activeSubTab === 'forensics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Domain Analysis Card */}
          <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400">
              <Globe className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase font-mono text-slate-200">Sender Domain Analysis</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
              {currentEmail.senderDomainAnalysis}
            </p>
          </div>

          {/* Urgency & Psychological Tactics Card */}
          <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase font-mono text-slate-200">Urgency & Fear Tactics</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentEmail.urgencyTactics}
            </p>
          </div>

          {/* Suspicious Keywords & Linguistic Triggers */}
          <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-purple-400">
              <Terminal className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase font-mono text-slate-200">Linguistic Triggers & Keywords</h3>
            </div>
            {currentEmail.suspiciousKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {currentEmail.suspiciousKeywords.map((kw, i) => (
                  <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-red-950/60 border border-red-500/30 text-red-300">
                    "{kw}"
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-emerald-400 flex items-center space-x-1.5 font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>No high-risk coercive or panic-inducing keywords detected.</span>
              </p>
            )}
            <div className="pt-2 border-t border-[#1e2e4f]">
              <div className="text-[11px] font-mono text-slate-400 font-semibold mb-1">Grammar & Syntax Notes:</div>
              <p className="text-xs text-slate-300 leading-relaxed">{currentEmail.grammarObservations}</p>
            </div>
          </div>

          {/* Social Engineering Vectors */}
          <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-red-400">
              <ShieldAlert className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase font-mono text-slate-200">Social Engineering Techniques</h3>
            </div>
            <ul className="space-y-1.5">
              {currentEmail.socialEngineeringTechniques.map((tech, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Link Analysis Card (Full width on md) */}
          <div className="md:col-span-2 bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-cyan-400">
                <ExternalLink className="w-4 h-4" />
                <h3 className="text-sm font-bold uppercase font-mono text-slate-200">Embedded Link Analysis</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">All links defanged for safe analysis</span>
            </div>

            <div className="space-y-3">
              {currentEmail.linkAnalysis.map((link, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[#070b14] border border-[#1e2e4f] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-xs font-mono font-semibold text-cyan-300 truncate">
                      Anchor Text: {link.anchorText}
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded self-start ${
                      link.riskRating === 'CRITICAL' || link.riskRating === 'HIGH'
                        ? 'bg-red-950 text-red-400 border border-red-500/30'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      RATING: {link.riskRating}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    <span className="text-slate-500">Target URL:</span> {link.destinationUrl}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed border-t border-[#1e2e4f] pt-2">
                    {link.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: FORMATTED EMAIL CLIENT VIEW */}
      {activeSubTab === 'formatted' && (
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
          {/* Simulated Email Client Window Chrome */}
          <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="text-xs font-mono text-slate-400 ml-2">Inbox — {currentEmail.senderDisplayName}</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">{currentEmail.timestamp}</span>
          </div>

          {/* Email Header Panel */}
          <div className="p-6 bg-slate-850 border-b border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white">{currentEmail.subject}</h2>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <div>
                <span className="font-semibold text-white">{currentEmail.senderDisplayName}</span>
                <span className="text-slate-400 ml-1">&lt;{currentEmail.actualSenderAddress}&gt;</span>
              </div>
              <div className="text-slate-400 font-mono">To: {currentEmail.recipient}</div>
            </div>
          </div>

          {/* Email Body Content */}
          <div className="p-6 bg-slate-900 text-slate-200 text-sm whitespace-pre-wrap font-sans leading-relaxed">
            {currentEmail.bodyText}
          </div>
        </div>
      )}

      {/* SUBTAB 4: RAW RFC HEADERS */}
      {activeSubTab === 'headers' && (
        <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-cyan-400">
              <Terminal className="w-4 h-4" />
              <h3 className="text-xs font-mono font-bold uppercase text-slate-200">Raw RFC 5322 MIME Headers</h3>
            </div>
            <button
              onClick={copyHeadersToClipboard}
              className="px-3 py-1 rounded bg-[#111c33] hover:bg-[#162544] text-xs font-mono text-cyan-300 border border-cyan-500/30 flex items-center space-x-1.5 transition-colors"
            >
              {copiedHeader ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedHeader ? 'Copied!' : 'Copy Headers'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-lg bg-[#070b14] border border-[#1e2e4f] font-mono text-xs text-emerald-400/90 whitespace-pre-wrap overflow-x-auto leading-relaxed">
            {currentEmail.rawHeaders}
          </pre>
        </div>
      )}
    </div>
  );
};
