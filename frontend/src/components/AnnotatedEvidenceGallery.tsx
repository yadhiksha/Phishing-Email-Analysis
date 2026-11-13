import React, { useState } from 'react';
import { 
  Layers, 
  ShieldAlert, 
  ShieldCheck, 
  Info, 
  ExternalLink, 
  ChevronRight,
  Eye,
  Filter
} from 'lucide-react';
import { emailSamples } from '../data/emailData';

export const AnnotatedEvidenceGallery: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'phishing' | 'genuine'>('all');
  const [activeCardId, setActiveCardId] = useState<string>(emailSamples[0].id);

  const filteredSamples = emailSamples.filter(sample => {
    if (filterType === 'all') return true;
    return sample.type === filterType;
  });

  const currentSample = emailSamples.find(s => s.id === activeCardId) || emailSamples[0];
  const isPhish = currentSample.type === 'phishing';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>FORENSIC EVIDENCE REPOSITORY</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Annotated Email Evidence Cards
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              High-resolution evidence cards dissecting all five email specimens with numbered callouts [1] through [5] and forensic legends mapping suspicious red flags vs. genuine security proofs.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 bg-[#070b14] p-1.5 rounded-lg border border-[#1e2e4f] self-start md:self-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                filterType === 'all' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All (5)
            </button>
            <button
              onClick={() => setFilterType('phishing')}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                filterType === 'phishing' ? 'bg-red-500 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Phishing (3)
            </button>
            <button
              onClick={() => setFilterType('genuine')}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                filterType === 'genuine' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Genuine (2)
            </button>
          </div>
        </div>
      </div>

      {/* Main Evidence Viewer: Card Grid & Selected Deep Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Thumbnail selector of all 5 specimens (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 px-1">
            Select Specimen Evidence Card
          </div>

          <div className="space-y-2.5">
            {filteredSamples.map((sample, idx) => {
              const isSelected = sample.id === currentSample.id;
              const sampleIsPhish = sample.type === 'phishing';
              return (
                <div
                  key={sample.id}
                  onClick={() => setActiveCardId(sample.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? sampleIsPhish
                        ? 'bg-red-950/70 border-red-400 shadow-md shadow-red-950/40'
                        : 'bg-emerald-950/70 border-emerald-400 shadow-md shadow-emerald-950/40'
                      : 'bg-[#0c1322] border-[#1e2e4f] hover:border-slate-500 hover:bg-[#111c33]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-cyan-300">
                      SPECIMEN 0{emailSamples.findIndex(s => s.id === sample.id) + 1}
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                      sampleIsPhish ? 'bg-red-900/60 text-red-300 border border-red-500/40' : 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {sample.verdict}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-white truncate">
                    {sample.title.split(': ')[1]}
                  </div>

                  <div className="text-xs text-slate-400 line-clamp-1 mt-1 font-mono">
                    {sample.actualSenderAddress}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-[#1e2e4f]/80">
                    <span>{sample.annotations.length} Evidence Callouts</span>
                    <span className="text-cyan-400 flex items-center space-x-1">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Evidence Card with Numbered Markers & Legend (8 cols) */}
        <div className="lg:col-span-8 bg-[#0c1322] border border-[#1e2e4f] rounded-2xl p-6 space-y-6">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e2e4f] pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${isPhish ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                <h2 className="text-lg font-bold text-white">{currentSample.title}</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Visual Evidence Card with forensic callout markers and explanatory legend.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-md ${
                isPhish ? 'bg-red-950 text-red-300 border border-red-500/40' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
              }`}>
                {isPhish ? 'MALICIOUS EVIDENCE' : 'BENIGN BENCHMARK'}
              </span>
            </div>
          </div>

          {/* Visual Email Card with Numbered Overlays */}
          <div className="p-5 rounded-xl bg-[#070b14] border border-[#1e2e4f] space-y-4">
            {/* Sender / Header Bar with Callout [1] */}
            <div className="p-3.5 rounded-lg bg-[#0e172a] border border-[#1e2e4f] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-extrabold ${
                    isPhish ? 'bg-red-500 text-black' : 'bg-emerald-500 text-black'
                  }`}>
                    1
                  </span>
                  <span className="text-xs font-bold text-white">Sender Identity & Routing:</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase">Marker [1]</span>
              </div>
              <div className="text-xs font-mono text-slate-300 pl-7 space-y-0.5">
                <div><span className="text-slate-500">From:</span> "{currentSample.senderDisplayName}" &lt;{currentSample.actualSenderAddress}&gt;</div>
                <div><span className="text-slate-500">Subject:</span> {currentSample.subject}</div>
                <div><span className="text-slate-500">Return-Path:</span> {currentSample.returnPath}</div>
              </div>
            </div>

            {/* Email Body with Callout Pins [2], [3], [4], [5] */}
            <div className="p-4 rounded-lg bg-[#0a0f1d] border border-[#1e2e4f] text-xs font-mono text-slate-200 space-y-4 leading-relaxed">
              {/* Callout [2]: Salutation */}
              <div className="relative border-l-2 pl-3 border-amber-500/60 bg-amber-950/10 py-1">
                <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold mr-2 ${
                  isPhish ? 'bg-red-500 text-black' : 'bg-emerald-500 text-black'
                }`}>
                  2
                </span>
                <span className="font-semibold text-slate-100">{currentSample.annotations[1]?.evidenceSnippet || 'Salutation'}</span>
              </div>

              {/* Callout [3]: Urgency or Main Context */}
              <div className="relative border-l-2 pl-3 border-red-500/60 bg-red-950/10 py-1">
                <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold mr-2 ${
                  isPhish ? 'bg-red-500 text-black' : 'bg-emerald-500 text-black'
                }`}>
                  3
                </span>
                <span className="text-slate-300">{currentSample.annotations[2]?.evidenceSnippet || 'Urgency / Body Context'}</span>
              </div>

              {/* Callout [4]: Link / Payload */}
              <div className="relative border-l-2 pl-3 border-cyan-500/60 bg-cyan-950/10 py-1">
                <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold mr-2 ${
                  isPhish ? 'bg-red-500 text-black' : 'bg-emerald-500 text-black'
                }`}>
                  4
                </span>
                <span className="text-cyan-300 underline font-semibold">
                  {currentSample.annotations[3]?.evidenceSnippet || 'Action Link or Attachment'}
                </span>
              </div>

              {/* Callout [5]: Credential Request or Footer */}
              <div className="relative border-l-2 pl-3 border-purple-500/60 bg-purple-950/10 py-1">
                <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold mr-2 ${
                  isPhish ? 'bg-red-500 text-black' : 'bg-emerald-500 text-black'
                }`}>
                  5
                </span>
                <span className="text-slate-300">{currentSample.annotations[4]?.evidenceSnippet || 'Credential Request / Footer'}</span>
              </div>
            </div>
          </div>

          {/* Corresponding Numbered Legend Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Forensic Evidence Legend (Markers 1 – 5)
            </h3>

            <div className="overflow-x-auto rounded-xl border border-[#1e2e4f]">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#070b14] text-slate-400 font-mono text-[11px] uppercase border-b border-[#1e2e4f]">
                  <tr>
                    <th className="py-2.5 px-3 w-12 text-center">Pin</th>
                    <th className="py-2.5 px-3 w-48">Indicator Label</th>
                    <th className="py-2.5 px-3">Forensic Explanation</th>
                    <th className="py-2.5 px-3 w-28 text-center">Classification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2e4f] bg-[#0c1322]">
                  {currentSample.annotations.map((marker) => {
                    const isLegit = marker.isLegitimate;
                    return (
                      <tr key={marker.id} className="hover:bg-[#111c33]/60 transition-colors">
                        <td className="py-3 px-3 text-center">
                          <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center font-mono font-bold text-xs ${
                            isLegit ? 'bg-emerald-500 text-black' : 'bg-red-500 text-black'
                          }`}>
                            {marker.id}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-white">
                          {marker.label}
                        </td>
                        <td className="py-3 px-3 text-slate-300 leading-relaxed">
                          {marker.description}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                            isLegit ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-red-950 text-red-300 border border-red-500/40'
                          }`}>
                            {isLegit ? 'GENUINE' : 'MALICIOUS'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
