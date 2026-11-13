import { ReportingStep } from '../types';

export const reportingSteps: ReportingStep[] = [
  {
    stepNumber: 1,
    codeName: 'STOP',
    title: 'Stop & Disengage',
    shortDesc: 'Pause immediately and do not interact with any part of the message.',
    iconName: 'ShieldAlert',
    dos: [
      'Take a deliberate pause when encountering urgent, threatening, or high-reward emails.',
      'Leave the message unopened or read-only without interacting with links or forms.',
      'Maintain awareness of cognitive manipulation triggers (fear, haste, curiosity, authority).'
    ],
    donts: [
      'NEVER click hyperlinks, embedded buttons, or preview images.',
      'NEVER open, download, or preview attached files (.zip, .html, .docm, .pdf).',
      'NEVER enter login credentials, passwords, PINs, or MFA codes.',
      'NEVER click "Unsubscribe" or reply to test if the sender is real.'
    ],
    socAction: 'Disengagement prevents payload execution and stops the attacker from confirming recipient email activity.'
  },
  {
    stepNumber: 2,
    codeName: 'VERIFY',
    title: 'Verify Out-of-Band',
    shortDesc: 'Validate the legitimacy of the request through an independent, trusted channel.',
    iconName: 'Search',
    dos: [
      'Contact the alleged sender via a known, pre-existing internal channel (Slack, Teams, internal directory).',
      'For banks or couriers, manually navigate to their official website using your own browser bookmark.',
      'Call the verified phone number printed on the back of your payment card or official employee badge.'
    ],
    donts: [
      'NEVER use phone numbers, email addresses, or contact links printed inside the suspicious email.',
      'NEVER engage with Telegram, WhatsApp, or third-party messenger handles specified in the message.',
      'NEVER assume an email is legitimate simply because it displays official corporate branding and logos.'
    ],
    socAction: 'Out-of-band verification exposes 99% of impersonation attempts by bypassing attacker-controlled infrastructure.'
  },
  {
    stepNumber: 3,
    codeName: 'REPORT',
    title: 'Report to Security / SOC',
    shortDesc: 'Submit the email with full metadata to enable enterprise containment.',
    iconName: 'Flag',
    dos: [
      'Use your email client\'s dedicated "Report Phishing" ribbon button (M365 / Google Workspace).',
      'If reporting manually, forward the email AS AN ATTACHMENT (.eml or .msg) to security-incident@organization.com.',
      'Preserve exact timestamps and note any actions taken (e.g., "Clicked link, but closed browser immediately").'
    ],
    donts: [
      'NEVER forward the email as a standard inline message, as this strips the original diagnostic headers.',
      'NEVER copy and paste un-defanged malicious links into shared team chat channels.',
      'NEVER attempt to hack back or counter-attack the malicious domain yourself.'
    ],
    socAction: 'Inbound reports trigger automated IoC extraction, perimeter firewall IP blocks, and tenant-wide email clawbacks.'
  },
  {
    stepNumber: 4,
    codeName: 'DELETE',
    title: 'Delete & Purge',
    shortDesc: 'Permanently remove the malicious specimen from all mail folders.',
    iconName: 'Trash2',
    dos: [
      'Permanently delete the email from your primary Inbox once reported.',
      'Empty your "Deleted Items / Trash" folder to prevent accidental clicks on mobile devices.',
      'Ensure local offline cache synchronization updates across all synchronized devices.'
    ],
    donts: [
      'NEVER archive or retain the email in standard folders as a "reminder" or reference.',
      'NEVER forward the message to your personal external webmail account for home inspection.',
      'NEVER leave the email sitting in Trash where it could be opened by accident.'
    ],
    socAction: 'Immediate purge eliminates residual risk of lateral infection or delayed employee interaction.'
  },
  {
    stepNumber: 5,
    codeName: 'WARN',
    title: 'Warn Team & Peers',
    shortDesc: 'Alert colleagues to cultivate collective situational awareness.',
    iconName: 'Megaphone',
    dos: [
      'Post a sanitized, informational warning in official team communication channels (#security-alerts).',
      'Provide a simple high-level summary: "Beware: Fake parcel delivery email with subject line [XYZ]".',
      'Remind coworkers to use the official "Report Phishing" button if they received the same message.'
    ],
    donts: [
      'NEVER post live, clickable URLs or attach weaponized files in public chat rooms.',
      'NEVER induce panic or spread unverified rumors across internal company mailing lists.',
      'NEVER shame or mock a coworker who may have fallen victim to the same campaign.'
    ],
    socAction: 'Rapid peer alerts create a proactive human sensor network, drastically shortening enterprise Mean Time to Detect (MTTD).'
  }
];

export const emergencyContacts = {
  socHotline: '1-800-SEC-TEAM (Ext. 9911)',
  socEmail: 'security-incident@organization.internal',
  helpDesk: 'Ext. 4357 (HELP)',
  portalUrl: 'https://security.organization.internal/report',
  slaTarget: '15 Minutes Initial SOC Triage Response'
};
