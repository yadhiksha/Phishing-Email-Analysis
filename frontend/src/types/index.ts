export type EmailType = 'phishing' | 'genuine';
export type EmailVerdict = 'PHISHING' | 'SAFE' | 'SUSPICIOUS';

export interface AuthenticationResult {
  spf: 'pass' | 'fail' | 'softfail' | 'neutral' | 'none';
  spfDetails: string;
  dkim: 'pass' | 'fail' | 'neutral' | 'none';
  dkimDetails: string;
  dmarc: 'pass' | 'fail' | 'none';
  dmarcDetails: string;
}

export interface LinkAnalysisItem {
  anchorText: string;
  destinationUrl: string;
  riskRating: 'CRITICAL' | 'HIGH' | 'SAFE' | 'LOW';
  explanation: string;
}

export interface AnnotationMarker {
  id: number;
  label: string;
  category: 'sender' | 'urgency' | 'link' | 'credential' | 'greeting' | 'legitimate' | 'attachment';
  description: string;
  evidenceSnippet: string;
  isLegitimate?: boolean;
}

export interface EmailSample {
  id: string;
  title: string;
  type: EmailType;
  verdict: EmailVerdict;
  threatLevel: 'CRITICAL' | 'HIGH' | 'LOW' | 'NONE';
  riskScore: number; // 0 to 100
  category: string;
  
  // Headers
  senderDisplayName: string;
  actualSenderAddress: string;
  returnPath: string;
  recipient: string;
  subject: string;
  timestamp: string;
  messageId: string;
  sendingIp: string;
  
  // Authentication
  auth: AuthenticationResult;
  
  // Content
  bodyText: string;
  rawHeaders: string;
  
  // Forensic Analysis
  senderDomainAnalysis: string;
  suspiciousKeywords: string[];
  urgencyTactics: string;
  linkAnalysis: LinkAnalysisItem[];
  grammarObservations: string;
  socialEngineeringTechniques: string[];
  detailedVerdictExplanation: string;
  
  // Evidence Markers
  annotations: AnnotationMarker[];
  
  // Simulation Disclaimer
  simulationDisclaimer: string;
}

export interface ChecklistItem {
  id: string;
  category: 'Senders & Domains' | 'Emotional Triggers' | 'Links & Payloads' | 'Requests & Actions' | 'Grammar & Formatting';
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  points: number;
  description: string;
  detectionTip: string;
  checked?: boolean;
}

export interface ReportingStep {
  stepNumber: number;
  codeName: 'STOP' | 'VERIFY' | 'REPORT' | 'DELETE' | 'WARN';
  title: string;
  shortDesc: string;
  dos: string[];
  donts: string[];
  socAction: string;
  iconName: string;
}
