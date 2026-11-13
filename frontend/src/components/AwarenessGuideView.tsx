import React from 'react';
import { 
  Printer, 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  PhoneCall, 
  Mail, 
  Lock, 
  ExternalLink,
  Download,
  Share2
} from 'lucide-react';
import { emergencyContacts } from '../data/reportingData';

export const AwarenessGuideView: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Header Banner (Hidden during print) */}
      <div className="no-print bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-1">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>EMPLOYEE DEFENSE REFERENCE CARD</span>
          </div>
          <h1 className="text-xl font-bold text-white">One-Page Security Awareness Guide</h1>
          <p className="text-xs text-slate-300">
            Official employee quick-reference card designed for corporate bulletin boards, intranet portals, and onboarding packets.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Guide</span>
          </button>
        </div>
      </div>

      {/* ONE-PAGE AWARENESS GUIDE POSTER / CARD */}
      <div className="bg-[#0b1220] border-2 border-cyan-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden print:border-black print:bg-white print:text-black print:p-4">
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 print:hidden"></div>

        {/* Poster Header */}
        <div className="text-center space-y-2 border-b border-[#1e2e4f] print:border-black pb-5">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/80 print:bg-gray-200 border border-cyan-500/40 print:border-gray-400 text-cyan-300 print:text-gray-900 text-xs font-mono font-bold tracking-widest uppercase">
            Corporate Cybersecurity Awareness Series #03
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white print:text-black tracking-tight uppercase">
            THINK BEFORE YOU CLICK – STOP PHISHING!
          </h2>
          <p className="text-xs sm:text-sm text-cyan-300 print:text-gray-700 font-mono">
            Protect Your Identity • Protect Your Credentials • Protect Our Organization
          </p>
        </div>

        {/* Section 1: The 5 Most Critical Warning Signs */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400 print:text-black font-mono font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>5 Most Important Phishing Warning Signs to Watch For</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* Warning Sign 1 */}
            <div className="p-3.5 rounded-xl bg-[#070b14] print:bg-gray-50 border border-[#1e2e4f] print:border-gray-300 space-y-1.5">
              <div className="w-6 h-6 rounded-md bg-red-950/80 print:bg-red-100 text-red-400 print:text-red-700 flex items-center justify-center font-mono font-extrabold text-xs">
                1
              </div>
              <div className="text-xs font-bold text-white print:text-black">Look-Alike Senders</div>
              <p className="text-[11px] text-slate-300 print:text-gray-700 leading-snug">
                Mismatched domain names, fake display names, or disposable .xyz/.info addresses.
              </p>
            </div>

            {/* Warning Sign 2 */}
            <div className="p-3.5 rounded-xl bg-[#070b14] print:bg-gray-50 border border-[#1e2e4f] print:border-gray-300 space-y-1.5">
              <div className="w-6 h-6 rounded-md bg-amber-950/80 print:bg-amber-100 text-amber-400 print:text-amber-700 flex items-center justify-center font-mono font-extrabold text-xs">
                2
              </div>
              <div className="text-xs font-bold text-white print:text-black">Manufactured Urgency</div>
              <p className="text-[11px] text-slate-300 print:text-gray-700 leading-snug">
                Strict deadlines ("within 24 hours"), account freeze threats, or penalty warnings.
              </p>
            </div>

            {/* Warning Sign 3 */}
            <div className="p-3.5 rounded-xl bg-[#070b14] print:bg-gray-50 border border-[#1e2e4f] print:border-gray-300 space-y-1.5">
              <div className="w-6 h-6 rounded-md bg-blue-950/80 print:bg-blue-100 text-cyan-400 print:text-blue-700 flex items-center justify-center font-mono font-extrabold text-xs">
                3
              </div>
              <div className="text-xs font-bold text-white print:text-black">Suspicious Links</div>
              <p className="text-[11px] text-slate-300 print:text-gray-700 leading-snug">
                Anchor text that hides rogue destinations, subdomain trickery, or shortened URLs.
              </p>
            </div>

            {/* Warning Sign 4 */}
            <div className="p-3.5 rounded-xl bg-[#070b14] print:bg-gray-50 border border-[#1e2e4f] print:border-gray-300 space-y-1.5">
              <div className="w-6 h-6 rounded-md bg-purple-950/80 print:bg-purple-100 text-purple-400 print:text-purple-700 flex items-center justify-center font-mono font-extrabold text-xs">
                4
              </div>
              <div className="text-xs font-bold text-white print:text-black">Demands for Passwords/PINs</div>
              <p className="text-[11px] text-slate-300 print:text-gray-700 leading-snug">
                Direct solicitation of credentials, OTPs, MFA approvals, or credit card CVVs.
              </p>
            </div>

            {/* Warning Sign 5 */}
            <div className="p-3.5 rounded-xl bg-[#070b14] print:bg-gray-50 border border-[#1e2e4f] print:border-gray-300 space-y-1.5">
              <div className="w-6 h-6 rounded-md bg-slate-800 print:bg-gray-200 text-slate-300 print:text-gray-800 flex items-center justify-center font-mono font-extrabold text-xs">
                5
              </div>
              <div className="text-xs font-bold text-white print:text-black">Generic Salutations & Files</div>
              <p className="text-[11px] text-slate-300 print:text-gray-700 leading-snug">
                "Dear Valued Customer" accompanied by unsolicited .zip, .html, or .docm files.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Employee Prevention Best Practices (DO's and DON'Ts) */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400 print:text-black font-mono font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Essential Prevention Rules (Do's and Don'ts)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DO's */}
            <div className="p-4 rounded-xl bg-[#070b14] print:bg-gray-50 border border-emerald-500/30 print:border-gray-300 space-y-2">
              <div className="text-xs font-bold text-emerald-400 print:text-emerald-700 uppercase font-mono flex items-center space-x-1.5">
                <span>✅ MANDATORY PREVENTION HABITS</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-200 print:text-gray-800">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Hover Before Clicking:</strong> Always inspect the real destination domain before clicking.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Verify Out-of-Band:</strong> Call colleagues or vendors on known internal phone numbers.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Use Saved Bookmarks:</strong> Navigate to banking and payroll directly via browser bookmarks.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Report Suspicious Lures:</strong> Use the "Report Phishing" button in your mail client.</span>
                </li>
              </ul>
            </div>

            {/* DON'Ts */}
            <div className="p-4 rounded-xl bg-[#070b14] print:bg-gray-50 border border-red-500/30 print:border-gray-300 space-y-2">
              <div className="text-xs font-bold text-red-400 print:text-red-700 uppercase font-mono flex items-center space-x-1.5">
                <span>❌ STRICTLY PROHIBITED BEHAVIORS</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-200 print:text-gray-800">
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>NEVER click unverified links</strong> in emails warning of account lockout or missed parcel fees.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>NEVER share passwords, PINs, or MFA codes</strong> over email or unmonitored chat apps.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>NEVER open unexpected attachments</strong> (.zip, .iso, .html, or macro-enabled spreadsheets).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>NEVER reply to spam emails</strong> or click "Unsubscribe" in suspected phishing emails.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: Safe Reporting Protocol (STOP -> VERIFY -> REPORT -> DELETE -> WARN) */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#070b14] via-[#0e1628] to-[#070b14] print:bg-gray-100 border border-[#1e2e4f] print:border-gray-300 space-y-2.5">
          <div className="text-center font-mono font-bold text-xs uppercase tracking-wider text-cyan-300 print:text-black">
            What To Do When You Receive a Suspicious Email:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono font-bold">
            <span className="px-2.5 py-1 rounded bg-red-950/80 text-red-300 border border-red-500/40 print:bg-red-100 print:text-red-800">
              1. STOP
            </span>
            <span className="text-slate-500 print:text-gray-400">→</span>
            <span className="px-2.5 py-1 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40 print:bg-amber-100 print:text-amber-800">
              2. VERIFY
            </span>
            <span className="text-slate-500 print:text-gray-400">→</span>
            <span className="px-2.5 py-1 rounded bg-blue-950/80 text-cyan-300 border border-cyan-500/40 print:bg-blue-100 print:text-blue-800">
              3. REPORT
            </span>
            <span className="text-slate-500 print:text-gray-400">→</span>
            <span className="px-2.5 py-1 rounded bg-purple-950/80 text-purple-300 border border-purple-500/40 print:bg-purple-100 print:text-purple-800">
              4. DELETE
            </span>
            <span className="text-slate-500 print:text-gray-400">→</span>
            <span className="px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 print:bg-emerald-100 print:text-emerald-800">
              5. WARN
            </span>
          </div>
        </div>

        {/* Poster Footer: Emergency Hotlines */}
        <div className="pt-4 border-t border-[#1e2e4f] print:border-black flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 print:text-gray-800 gap-3">
          <div className="flex items-center space-x-2">
            <PhoneCall className="w-4 h-4 text-cyan-400 print:text-black" />
            <span>SOC Emergency Hotline: <strong>{emergencyContacts.socHotline}</strong></span>
          </div>
          <div>
            <span>Email Triage: <strong>{emergencyContacts.socEmail}</strong></span>
          </div>
          <div>
            <span>Target Response: <strong>{emergencyContacts.slaTarget}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
