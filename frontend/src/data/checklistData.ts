import { ChecklistItem } from '../types';

export const phishingChecklist: ChecklistItem[] = [
  {
    id: 'chk-1',
    category: 'Senders & Domains',
    title: 'Unknown or Spoofed Sender Address',
    severity: 'HIGH',
    points: 25,
    description: 'The display name claims to be a known entity or executive, but the actual email address in the "From" field uses an external or unrelated domain.',
    detectionTip: 'Always expand the sender details in your mail client to verify the characters following the "@" symbol.'
  },
  {
    id: 'chk-2',
    category: 'Senders & Domains',
    title: 'Look-Alike / Typosquatted Domain Names',
    severity: 'HIGH',
    points: 30,
    description: 'The sender domain closely mimics an authentic brand using character substitution, added hyphens, or unusual TLDs (e.g., apextrust-auth.xyz instead of apextrust.com).',
    detectionTip: 'Check the domain letter-by-letter. Pay special attention to subtle modifications (e.g., rn vs m, 0 vs O, or .xyz/.top/.info extensions).'
  },
  {
    id: 'chk-3',
    category: 'Senders & Domains',
    title: 'SPF, DKIM, or DMARC Authentication Failure',
    severity: 'CRITICAL',
    points: 35,
    description: 'The email fails cryptographic domain verification checks, indicating that the transmitting server is not authorized to send mail for that domain.',
    detectionTip: 'Inspect the email Authentication-Results header. Look for "spf=fail", "dkim=fail", or "dmarc=fail".'
  },
  {
    id: 'chk-4',
    category: 'Emotional Triggers',
    title: 'Manufactured Panic & Extreme Urgency',
    severity: 'HIGH',
    points: 25,
    description: 'The message creates artificial panic by imposing tight deadlines (e.g., "Account suspended in 24 hours", "Respond within 12 hours to prevent asset freeze").',
    detectionTip: 'Legitimate corporate organizations and banks do not issue draconian 24-hour ultimatums over unsolicited email.'
  },
  {
    id: 'chk-5',
    category: 'Emotional Triggers',
    title: 'Unrealistic Rewards & Financial Enticements',
    severity: 'HIGH',
    points: 25,
    description: 'Offers extravagant compensation for unapplied jobs ($120/hr), lottery jackpots, unexpected tax refunds, or free electronics.',
    detectionTip: 'If an unsolicited offer sounds too good to be true, it is almost certainly fraudulent. Apply the "Would an enterprise offer this?" test.'
  },
  {
    id: 'chk-6',
    category: 'Emotional Triggers',
    title: 'Fear-Based Threat of Legal or Disciplinary Action',
    severity: 'HIGH',
    points: 25,
    description: 'Threatens police involvement, regulatory fines, termination of employment, or lawsuit filing to coerce quick compliance.',
    detectionTip: 'Pause and take a breath. Threat actors rely on panic to shut down your analytical thinking.'
  },
  {
    id: 'chk-7',
    category: 'Requests & Actions',
    title: 'Direct Solicitation of Passwords, PINs, or OTPs',
    severity: 'CRITICAL',
    points: 50,
    description: 'Explicitly requests that you disclose your password, PIN, SMS verification code, or approve an MFA push notification.',
    detectionTip: 'Zero Trust Rule: No legitimate IT administrator or security team will EVER ask for your password or OTP.'
  },
  {
    id: 'chk-8',
    category: 'Requests & Actions',
    title: 'Unexpected Payment or Micro-Fee Requests',
    severity: 'HIGH',
    points: 30,
    description: 'Demands an unexpected fee (such as a $2.49 parcel redelivery fee or a customs clearance fee) to release goods or services.',
    detectionTip: 'Cross-reference against known purchases. Visit the official merchant portal independently without clicking email links.'
  },
  {
    id: 'chk-9',
    category: 'Requests & Actions',
    title: 'Request to Migrate to Unmonitored Channels (Telegram/WhatsApp)',
    severity: 'HIGH',
    points: 30,
    description: 'Directs communication away from corporate email into end-to-end encrypted messaging apps like Telegram, WhatsApp, or Signal.',
    detectionTip: 'Standard business communications are recorded within corporate systems. Redirection to Telegram is a hallmark of recruitment and fraud operations.'
  },
  {
    id: 'chk-10',
    category: 'Links & Payloads',
    title: 'Mismatched Hyperlinks & Subdomain Masquerading',
    severity: 'CRITICAL',
    points: 40,
    description: 'The visible link text does not match the actual destination URL when hovered over, or places a trusted brand name inside a subdomain on an untrusted root domain.',
    detectionTip: 'Hover (do NOT click) over links to view the real destination. Examine the domain immediately before the first single slash ("/").'
  },
  {
    id: 'chk-11',
    category: 'Links & Payloads',
    title: 'URL Shorteners or Direct IP Addresses in Links',
    severity: 'HIGH',
    points: 30,
    description: 'Links utilize shortening services (e.g., bit.ly, tinyurl) or raw numeric IP addresses (e.g., http://198.51.100.22) to obscure the true landing site.',
    detectionTip: 'Legitimate corporate emails link directly to branded corporate domains, not obfuscated short links or bare IP addresses.'
  },
  {
    id: 'chk-12',
    category: 'Links & Payloads',
    title: 'High-Risk or Double-Extension Attachments',
    severity: 'CRITICAL',
    points: 45,
    description: 'Unsolicited attachments featuring dangerous extensions such as .iso, .zip, .html, .docm, or double extensions (e.g., document.pdf.html or invoice.docx.exe).',
    detectionTip: 'Never open standalone HTML or macro-enabled documents from email. These often trigger HTML smuggling or malware drops.'
  },
  {
    id: 'chk-13',
    category: 'Grammar & Formatting',
    title: 'Generic or Impersonal Greetings',
    severity: 'MEDIUM',
    points: 15,
    description: 'Opens with vague greetings such as "Dear Customer", "Dear Member", or "Dear Resident" when the entity claims to already have an account relationship with you.',
    detectionTip: 'Authentic institutions with which you have an established account address you by your verified first and last name.'
  },
  {
    id: 'chk-14',
    category: 'Grammar & Formatting',
    title: 'Grammar, Spelling, or Localization Irregularities',
    severity: 'MEDIUM',
    points: 15,
    description: 'Contains awkward grammatical phrasing, mismatched fonts, or unnatural word choices resulting from automated translation.',
    detectionTip: 'Professional corporate communications undergo rigorous marketing and compliance review. Clumsy phrasing indicates high risk.'
  },
  {
    id: 'chk-15',
    category: 'Grammar & Formatting',
    title: 'Missing Official Contact Footers or Regulatory Disclaimers',
    severity: 'LOW',
    points: 10,
    description: 'Lacks standard regulatory footers, verified physical corporate addresses, privacy policy links, or authentic unsubscribe options.',
    detectionTip: 'Commercial and transactional emails are legally mandated (CAN-SPAM, GDPR) to supply verifiable headquarters addresses and privacy terms.'
  }
];
