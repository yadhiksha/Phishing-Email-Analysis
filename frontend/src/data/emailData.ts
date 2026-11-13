import { EmailSample } from '../types';

export const emailSamples: EmailSample[] = [
  {
    id: 'email-1',
    title: 'Specimen 01: Fake Bank KYC Verification',
    type: 'phishing',
    verdict: 'PHISHING',
    threatLevel: 'CRITICAL',
    riskScore: 96,
    category: 'Credential Harvesting & Financial Fraud',
    
    senderDisplayName: 'Apex Trust Bank Security Team',
    actualSenderAddress: 'security-verify@apextrust-secure-auth.xyz',
    returnPath: 'bounce-service@apextrust-secure-auth.xyz',
    recipient: 'corporate.employee@organization.com',
    subject: 'URGENT: Immediate Account Suspension - Mandatory KYC Verification Required',
    timestamp: 'Wed, 11 Nov 2026 08:14:22 +0000',
    messageId: '<20261111081422.8491.phish@apextrust-secure-auth.xyz>',
    sendingIp: '198.51.100.42 (Unregistered VPS Relay, AS9821)',
    
    auth: {
      spf: 'softfail',
      spfDetails: 'Softfail: IP 198.51.100.42 is not designated in DNS record for apextrust.com',
      dkim: 'neutral',
      dkimDetails: 'Neutral: Signature verification failed (body hash mismatch)',
      dmarc: 'fail',
      dmarcDetails: 'Fail: Sender domain alignment missing between header From and envelope Return-Path'
    },
    
    bodyText: `Dear Valued Customer,

Our automated fraud prevention monitoring systems have flagged irregular transaction attempts and missing regulatory KYC (Know Your Customer) compliance documentation on your primary account #****-8921.

Under Federal Banking Regulatory Directive 14-B, failure to re-verify your identity within 24 hours of receiving this notification will result in immediate account freeze, temporary asset forfeiture, and legal escalation.

To prevent permanent suspension of all banking privileges and avoid a $150.00 administrative restoration penalty, you must immediately confirm your personal credentials and upload government-issued photo identification:

>> VERIFY YOUR ACCOUNT CREDENTIALS NOW:
   https://apextrust.com.account-validation-portal.xyz/secure/login?session=89f41b9c2

IMPORTANT SECURITY NOTICE:
Do not contact your local branch, as this is a centralized fraud mitigation lockdown. Any delay past the 24-hour deadline will lock your debit card and wire access permanently.

Sincerely,
Apex Trust Central Fraud & Compliance Operations
100 Financial Plaza, Suite 400
© 2026 Apex Trust National Corporation. All rights reserved.`,

    rawHeaders: `Delivered-To: corporate.employee@organization.com
Received: from mail-relay-04.apextrust-secure-auth.xyz (mail-relay-04.apextrust-secure-auth.xyz [198.51.100.42])
    by mx.organization.com with ESMTP id m492019482
    for <corporate.employee@organization.com>; Wed, 11 Nov 2026 08:14:23 +0000
Return-Path: <bounce-service@apextrust-secure-auth.xyz>
Authentication-Results: mx.organization.com;
    spf=softfail (ip=198.51.100.42; domain=apextrust-secure-auth.xyz);
    dkim=neutral (bad signature) header.i=@apextrust-secure-auth.xyz;
    dmarc=fail (p=none dis=none) header.from=apextrust-secure-auth.xyz
From: "Apex Trust Bank Security Team" <security-verify@apextrust-secure-auth.xyz>
To: corporate.employee@organization.com
Subject: URGENT: Immediate Account Suspension - Mandatory KYC Verification Required
Date: Wed, 11 Nov 2026 08:14:22 +0000
Message-ID: <20261111081422.8491.phish@apextrust-secure-auth.xyz>
MIME-Version: 1.0
Content-Type: text/plain; charset="UTF-8"
X-Priority: 1 (Highest)`,

    senderDomainAnalysis: `The displayed brand is "Apex Trust Bank" (legitimate commercial domain: apextrust.com), but the actual transmitting domain is "apextrust-secure-auth.xyz". 
1. The domain utilizes an untrusted cheap generic TLD (.xyz) commonly associated with disposable threat infrastructure.
2. WHOIS data reveals the domain was registered merely 48 hours prior to email transmission with privacy redactions.
3. The domain mimics the legitimate entity through typosquatting/cybersquatting (appending "-secure-auth").
4. Cryptographic authentication failed completely: the sender IP (198.51.100.42) lacks SPF authorization for Apex Trust.`,

    suspiciousKeywords: [
      'URGENT',
      'Immediate Account Suspension',
      'Mandatory KYC Verification',
      'Federal Banking Regulatory Directive 14-B',
      'within 24 hours',
      'temporary asset forfeiture',
      'administrative restoration penalty',
      'Do not contact your local branch',
      'lock your debit card and wire access permanently'
    ],

    urgencyTactics: `The email employs high-pressure psychological coercion through fear and urgency. It establishes a fictitious 24-hour deadline before "permanent suspension" and "asset forfeiture" take effect. It creates an artificial barrier to out-of-band verification by explicitly instructing the victim: "Do not contact your local branch", isolating the victim into clicking the fraudulent link.`,

    linkAnalysis: [
      {
        anchorText: 'https://apextrust.com.account-validation-portal.xyz/secure/login?session=89f41b9c2',
        destinationUrl: 'hxxps://account-validation-portal[.]xyz/secure/login?session=89f41b9c2 (defanged)',
        riskRating: 'CRITICAL',
        explanation: 'Deceptive subdomain trickery. The attacker placed "apextrust.com." as a subdomain prefix to fool users glancing at the beginning of the URL. The true authoritative domain is "account-validation-portal.xyz", an attacker-controlled credential harvesting kit that logs usernames, passwords, and OTPs.'
      }
    ],

    grammarObservations: `While superficially formal, the message contains subtle syntactic irregularities and legalistic hyperbole. Real financial regulatory bodies do not issue arbitrary "Federal Banking Regulatory Directive 14-B" warnings via unsolicited email demanding credential inputs. The phrasing "Do not contact your local branch" is an unnatural contradiction for any legitimate customer-facing bank.`,

    socialEngineeringTechniques: [
      'Deference to Fictitious Regulatory Authority (Federal Directive 14-B)',
      'Manufactured Panic & Time Deprivation (24-Hour Account Freeze)',
      'Financial Loss Aversion ($150 administrative restoration fee)',
      'Subdomain Masquerading (apextrust.com prepended to rogue domain)',
      'Channel Isolation (Forbidding customer branch contact)'
    ],

    detailedVerdictExplanation: `CONFIRMED PHISHING. This specimen is a textbook high-severity credential-harvesting phishing attack targeting financial accounts. Every primary heuristic is triggered: sender domain mismatch, SPF/DKIM/DMARC failure, severe urgency, generic greeting, threatening tone, and a malicious subdomain link designed to steal online banking credentials and PII. Under no circumstances should an employee interact with this communication.`,

    annotations: [
      {
        id: 1,
        label: 'Suspicious Sender & Mismatched Domain',
        category: 'sender',
        description: 'The display name claims to be "Apex Trust Bank", but the actual domain is apextrust-secure-auth.xyz instead of the official apextrust.com domain.',
        evidenceSnippet: 'From: "Apex Trust Bank Security Team" <security-verify@apextrust-secure-auth.xyz>'
      },
      {
        id: 2,
        label: 'Generic Salutation',
        category: 'greeting',
        description: 'Opens with "Dear Valued Customer" rather than the recipient\'s legal name. Genuine banks always personalize communications for account-level actions.',
        evidenceSnippet: 'Dear Valued Customer,'
      },
      {
        id: 3,
        label: 'Urgent Threat & Manufactured Fear',
        category: 'urgency',
        description: 'Imposes a strict 24-hour deadline and threatens asset forfeiture, account suspension, and financial penalties to induce panic.',
        evidenceSnippet: 'failure to re-verify your identity within 24 hours will result in immediate account freeze, temporary asset forfeiture...'
      },
      {
        id: 4,
        label: 'Deceptive Subdomain Link',
        category: 'link',
        description: 'Prepends apextrust.com to disguise the true destination domain account-validation-portal.xyz.',
        evidenceSnippet: 'https://apextrust.com.account-validation-portal.xyz/secure/login'
      },
      {
        id: 5,
        label: 'Request for Sensitive Credentials',
        category: 'credential',
        description: 'Demands personal credentials, passwords, and government photo identification over an insecure web link.',
        evidenceSnippet: 'confirm your personal credentials and upload government-issued photo identification'
      }
    ],

    simulationDisclaimer: 'SIMULATED EDUCATIONAL SPECIMEN. Domain names, IPs, and URLs are synthetic indicators designed for safe educational analysis and SOC training.'
  },

  {
    id: 'email-2',
    title: 'Specimen 02: Fake Job Offer & Recruitment Scam',
    type: 'phishing',
    verdict: 'PHISHING',
    threatLevel: 'HIGH',
    riskScore: 92,
    category: 'Advance Fee Fraud & Identity Theft',
    
    senderDisplayName: 'Global Talent Acquisition - ApexCorp',
    actualSenderAddress: 'hr-careers@apexcorp-careers-global.work',
    returnPath: 'mailer-daemon@freehosted-smtp.net',
    recipient: 'prospective.hire@enterprise.com',
    subject: 'Executive Remote Operations Specialist - Offer Letter & Onboarding Package',
    timestamp: 'Tue, 10 Nov 2026 15:33:04 +0000',
    messageId: '<8931b-29a-20261110@freehosted-smtp.net>',
    sendingIp: '203.0.113.88 (Unverified Open Mail Relay)',
    
    auth: {
      spf: 'fail',
      spfDetails: 'Fail: IP 203.0.113.88 not permitted to transmit on behalf of apexcorp-careers-global.work',
      dkim: 'none',
      dkimDetails: 'None: No cryptographic DKIM signature present',
      dmarc: 'fail',
      dmarcDetails: 'Fail: DMARC verification failed due to missing alignment and SPF failure'
    },
    
    bodyText: `Dear Candidate,

Following an executive review of your professional profile by our Global Talent Acquisition Committee, we are thrilled to extend an immediate, unconditional employment offer for the position of Senior Remote Operations Specialist at ApexCorp Global.

POSITION OVERVIEW & COMPENSATION:
- Role: Senior Remote Operations Specialist (100% Work from Home)
- Base Pay: $120.00 USD per hour ($18,500.00 / month guaranteed)
- Equipment Allowance: $4,500.00 USD company check for home office setup
- Health, Vision, Dental & Unlimited PTO starting immediately

Due to urgent operational expansion, no preliminary technical or video interview is required. Your background and resume provided sufficient demonstration of capability.

NEXT STEPS TO FINALIZE ONBOARDING:
1. Review and sign the attached digital onboarding package:
   Attachment: [Employment_Agreement_MacBook_Requisition.pdf.html]
2. Connect immediately via Telegram with our Director of Onboarding, Marcus Vance (@ApexCorp_Recruiter), to receive your check for home office hardware procurement.

Please note this offer expires within 48 hours.

Warm Regards,
Elena Rostova
Vice President of Talent Acquisition
ApexCorp Global Enterprise Ltd.
www.apexcorp-careers-global.work`,

    rawHeaders: `Delivered-To: prospective.hire@enterprise.com
Received: from unknown-vps.freehosted-smtp.net (unknown-vps.freehosted-smtp.net [203.0.113.88])
    by mx.enterprise.com with ESMTP id p098241
    for <prospective.hire@enterprise.com>; Tue, 10 Nov 2026 15:33:05 +0000
Return-Path: <mailer-daemon@freehosted-smtp.net>
Authentication-Results: mx.enterprise.com;
    spf=fail (ip=203.0.113.88; domain=apexcorp-careers-global.work);
    dkim=none;
    dmarc=fail (p=none) header.from=apexcorp-careers-global.work
From: "Global Talent Acquisition - ApexCorp" <hr-careers@apexcorp-careers-global.work>
To: prospective.hire@enterprise.com
Subject: Executive Remote Operations Specialist - Offer Letter & Onboarding Package
Date: Tue, 10 Nov 2026 15:33:04 +0000
Message-ID: <8931b-29a-20261110@freehosted-smtp.net>
Content-Type: multipart/mixed; boundary="====BOUNDARY_8921===="`,

    senderDomainAnalysis: `The sender domain "apexcorp-careers-global.work" uses the low-cost ".work" TLD, registered within the last 5 days. 
1. The Return-Path originates from a generic, untrusted SMTP service ("freehosted-smtp.net"), completely detached from the sender domain.
2. The domain possesses no MX records for receiving inbound mail, indicating a purely broadcast/attack infrastructure.
3. Completely fails SPF and contains no cryptographic DKIM signatures.`,

    suspiciousKeywords: [
      'unconditional employment offer',
      '$120.00 USD per hour',
      '$18,500.00 / month guaranteed',
      'no preliminary technical or video interview is required',
      'company check for home office setup',
      'Telegram with our Director of Onboarding',
      '@ApexCorp_Recruiter',
      'expires within 48 hours'
    ],

    urgencyTactics: `Exploits positive urgency (FOMO - Fear Of Missing Out) and greed. By imposing a 48-hour expiration on an astonishingly lucrative $120/hr salary with zero interview friction, the attacker induces the victim to download the weaponized attachment and disclose personal banking information before rational scrutiny can intervene.`,

    linkAnalysis: [
      {
        anchorText: 'www.apexcorp-careers-global.work',
        destinationUrl: 'hxxp://www.apexcorp-careers-global[.]work (defanged)',
        riskRating: 'HIGH',
        explanation: 'Newly registered shell website designed to mimic a legitimate consulting firm, hosting deceptive employee portals.'
      }
    ],

    grammarObservations: `The text is polished but betrays common recruitment scam templates. Legitimate enterprises with executive salary levels ($120/hour) never extend offers without multiple synchronous interviews, identity verification, and formal background checks. Directing candidates to Telegram for corporate onboarding is an immediate indicator of malicious intent.`,

    socialEngineeringTechniques: [
      'Financial Enticement & Greed ($120/hr, $4,500 equipment check)',
      'Ego-Stroking & Flattery ("profile review demonstrated sufficient capability")',
      'Removal of Legitimate Gateways ("no interview required")',
      'Channel Migration to Unmonitored Chat (Telegram @ApexCorp_Recruiter)',
      'Double Extension Attachment Weaponization (.pdf.html)'
    ],

    detailedVerdictExplanation: `CONFIRMED PHISHING / RECRUITMENT FRAUD. This email is a classic Advance Fee Scam and Identity Theft lure. It exhibits high-risk indicators: unapplied job offer, astronomical salary, total absence of an interview process, fraudulent attachment (.pdf.html using HTML smuggling), and redirection to Telegram. The ultimate goal is to send a fraudulent check for "equipment" and induce the victim to wire real funds back to the scammer.`,

    annotations: [
      {
        id: 1,
        label: 'Suspicious Sender & Rogue Return-Path',
        category: 'sender',
        description: 'From address uses .work TLD, and Return-Path routes through an open relay at freehosted-smtp.net.',
        evidenceSnippet: 'From: "Global Talent Acquisition" <hr-careers@apexcorp-careers-global.work>'
      },
      {
        id: 2,
        label: 'Generic Salutation',
        category: 'greeting',
        description: 'Addressed vaguely to "Dear Candidate" despite claiming to have reviewed a detailed professional profile.',
        evidenceSnippet: 'Dear Candidate,'
      },
      {
        id: 3,
        label: 'Unrealistic Financial Enticement',
        category: 'urgency',
        description: 'Offers an exorbitant $120/hour ($18,500/month) salary with zero interview requirements—an absolute hallmark of recruitment fraud.',
        evidenceSnippet: 'Base Pay: $120.00 USD per hour... no preliminary technical or video interview is required'
      },
      {
        id: 4,
        label: 'Suspicious Weaponized Attachment',
        category: 'attachment',
        description: 'Uses a deceptive double-extension (.pdf.html) indicating an HTML Smuggling payload designed to bypass email gateway filters.',
        evidenceSnippet: 'Attachment: [Employment_Agreement_MacBook_Requisition.pdf.html]'
      },
      {
        id: 5,
        label: 'Out-of-Band Telegram Redirection',
        category: 'credential',
        description: 'Directs the victim to communicate with an anonymous recruiter via Telegram (@ApexCorp_Recruiter) to evade corporate monitoring.',
        evidenceSnippet: 'Connect immediately via Telegram with our Director of Onboarding (@ApexCorp_Recruiter)'
      }
    ],

    simulationDisclaimer: 'SIMULATED EDUCATIONAL SPECIMEN. Fictional entity and non-operational infrastructure designed to educate students on recruitment and advance-fee scam detection.'
  },

  {
    id: 'email-3',
    title: 'Specimen 03: Fake Parcel Delivery Notification',
    type: 'phishing',
    verdict: 'PHISHING',
    threatLevel: 'HIGH',
    riskScore: 89,
    category: 'Credit Card Skimming & Smishing/Phishing Hybrid',
    
    senderDisplayName: 'FastTrack Express Logistics Delivery Service',
    actualSenderAddress: 'notifications@fasttrack-delivery-update.info',
    returnPath: 'bounce@bulkmail-sender-7.biz',
    recipient: 'consumer.resident@organization.com',
    subject: 'ALERT: Package #FT-98214309 Delivery Exception - Action Required in 12 Hours',
    timestamp: 'Wed, 11 Nov 2026 19:45:11 +0000',
    messageId: '<ft-notif-20261111-98124@fasttrack-delivery-update.info>',
    sendingIp: '198.18.0.15 (Compromised Residential IP)',
    
    auth: {
      spf: 'neutral',
      spfDetails: 'Neutral: Domain fasttrack-delivery-update.info does not publish affirmative SPF records',
      dkim: 'fail',
      dkimDetails: 'Fail: Cryptographic signature could not be verified by public key',
      dmarc: 'fail',
      dmarcDetails: 'Fail: SPF and DKIM both failed alignment check'
    },
    
    bodyText: `Dear Resident / Customer,

Your arriving consignment package with tracking reference #FT-98214309 could not be dispatched for final doorstep delivery on November 11, 2026, due to an incomplete street address and an unpaid international customs handling fee of $2.49 USD.

DELIVERY NOTICE SUMMARY:
- Tracking Code: #FT-98214309
- Origin: International Logistics Hub
- Status: Suspended at Regional Sorting Facility
- Outstanding Fee: $2.49 USD (VAT / Address Correction Fee)

Our depot warehouse facility cannot retain uncollected packages indefinitely. Under standard parcel transport regulations, if the address correction fee is not settled within 12 hours of this notice, your parcel will be marked abandoned and returned to the international merchant or destroyed at the sorting depot.

>> UPDATE YOUR ADDRESS & PAY $2.49 REDELIVERY FEE:
   https://fasttrack-delivery-portal.info/tracking/update?parcel=FT-98214309

Please ensure you have your active debit/credit card ready for identity verification and fee processing.

Thank you for your prompt attention,
FastTrack Express Dispatch & Sorting Division
Customer Notification Center`,

    rawHeaders: `Delivered-To: consumer.resident@organization.com
Received: from host-198-18-0-15.dialup.net (host-198-18-0-15.dialup.net [198.18.0.15])
    by mx.organization.com with ESMTP id k8812903
    for <consumer.resident@organization.com>; Wed, 11 Nov 2026 19:45:12 +0000
Return-Path: <bounce@bulkmail-sender-7.biz>
Authentication-Results: mx.organization.com;
    spf=neutral (ip=198.18.0.15; domain=fasttrack-delivery-update.info);
    dkim=fail (bad signature) header.i=@fasttrack-delivery-update.info;
    dmarc=fail (p=none) header.from=fasttrack-delivery-update.info
From: "FastTrack Express Logistics Delivery Service" <notifications@fasttrack-delivery-update.info>
To: consumer.resident@organization.com
Subject: ALERT: Package #FT-98214309 Delivery Exception - Action Required in 12 Hours
Date: Wed, 11 Nov 2026 19:45:11 +0000
Message-ID: <ft-notif-20261111-98124@fasttrack-delivery-update.info>
Content-Type: text/plain; charset="UTF-8"`,

    senderDomainAnalysis: `The purported logistics brand is FastTrack Express, but the transmitting domain is "fasttrack-delivery-update.info".
1. Exploits the ".info" TLD, frequently registered for short-lived spam operations.
2. The Return-Path domain points to a completely distinct rogue entity ("bulkmail-sender-7.biz").
3. Originates from a dynamic residential dial-up IP address (198.18.0.15), indicating transmission via an infected botnet zombie machine rather than legitimate enterprise courier mail infrastructure.`,

    suspiciousKeywords: [
      'Delivery Exception',
      'Action Required in 12 Hours',
      'incomplete street address',
      'unpaid international customs handling fee of $2.49',
      'Suspended at Regional Sorting Facility',
      'destroyed at the sorting depot',
      'marked abandoned',
      'active debit/credit card ready'
    ],

    urgencyTactics: `Threatens destruction or return of a physical package within an extremely tight 12-hour window. Targets consumer anxiety over missing packages, a psychological vulnerability magnified by widespread online shopping habits.`,

    linkAnalysis: [
      {
        anchorText: 'https://fasttrack-delivery-portal.info/tracking/update?parcel=FT-98214309',
        destinationUrl: 'hxxps://fasttrack-delivery-portal[.]info/tracking/update?parcel=FT-98214309 (defanged)',
        riskRating: 'CRITICAL',
        explanation: 'Payment card skimmer portal. When the user visits this URL, it displays an imitation courier tracking interface and prompts for full credit card details (card number, CVV, expiry date, billing address, and phone number) to harvest financial data under the pretext of paying a $2.49 fee.'
      }
    ],

    grammarObservations: `Uses generic terms ("Dear Resident / Customer") because the attacker does not know the recipient's true identity. The concept of destroying an international commercial parcel after a mere 12 hours for an unpaid $2.49 fee is legally and procedurally absurd for legitimate couriers (who typically hold packages for 5 to 14 business days).`,

    socialEngineeringTechniques: [
      'Micro-Payment Exploitation ($2.49 threshold minimizes psychological skepticism)',
      'Artificial Loss Threat ("package will be marked abandoned or destroyed")',
      'Extreme Time Pressure (12-hour window)',
      'Curiosity & Ubiquity (relies on target likely expecting a parcel)',
      'Identity Skimming (requesting credit card under guise of address verification)'
    ],

    detailedVerdictExplanation: `CONFIRMED PHISHING. This specimen is an ubiquitous delivery phishing lure designed for credit card skimming and PII harvesting. The trivial fee ($2.49) lowers victim suspicion, while the 12-hour destruction threat induces impulsive action. Originating from an unauthorized residential IP with broken DKIM and SPF, this email is dangerous and malicious.`,

    annotations: [
      {
        id: 1,
        label: 'Suspicious Sender & Botnet Relay',
        category: 'sender',
        description: 'Originates from a residential IP and disposable .info domain, completely failing SPF/DKIM validation.',
        evidenceSnippet: 'From: "FastTrack Express Logistics" <notifications@fasttrack-delivery-update.info>'
      },
      {
        id: 2,
        label: 'Generic Salutation',
        category: 'greeting',
        description: 'Impersonal greeting "Dear Resident / Customer", showing the sender lacks recipient identity records.',
        evidenceSnippet: 'Dear Resident / Customer,'
      },
      {
        id: 3,
        label: 'Severe Urgency & Threat of Destruction',
        category: 'urgency',
        description: 'Manufactures extreme panic by threatening parcel destruction within 12 hours.',
        evidenceSnippet: 'parcel will be marked abandoned and returned to the international merchant or destroyed at the sorting depot'
      },
      {
        id: 4,
        label: 'Deceptive Payment Skimmer Link',
        category: 'link',
        description: 'Directs to an unverified .info domain designed to skim credit card details and CVV.',
        evidenceSnippet: 'https://fasttrack-delivery-portal.info/tracking/update?parcel=FT-98214309'
      },
      {
        id: 5,
        label: 'Solicitation of Payment Card Details',
        category: 'credential',
        description: 'Explicitly instructs victim to have debit/credit card ready for fee extraction.',
        evidenceSnippet: 'Please ensure you have your active debit/credit card ready for identity verification'
      }
    ],

    simulationDisclaimer: 'SIMULATED EDUCATIONAL SPECIMEN. Representative of courier smishing/phishing campaigns. All URLs and parcel IDs are non-functional educational mocks.'
  },

  {
    id: 'email-4',
    title: 'Specimen 04: Normal Professional Communication',
    type: 'genuine',
    verdict: 'SAFE',
    threatLevel: 'NONE',
    riskScore: 4,
    category: 'Internal Enterprise Operations',
    
    senderDisplayName: 'Sarah Jenkins, Engineering Lead',
    actualSenderAddress: 's.jenkins@innovatetech.internal',
    returnPath: 's.jenkins@innovatetech.internal',
    recipient: 'alex.m@innovatetech.internal',
    subject: 'Sprint Retrospective & Architecture Review - Q4 Cloud Migration Sync',
    timestamp: 'Thu, 12 Nov 2026 14:22:10 +0000',
    messageId: '<a8f21bc9-93e4-4d81-8172-23910c284e91@innovatetech.internal>',
    sendingIp: '10.240.12.5 (Authorized Corporate Internal Exchange Relay)',
    
    auth: {
      spf: 'pass',
      spfDetails: 'Pass: Internal relay 10.240.12.5 is fully authorized in internal DNS SPF policy',
      dkim: 'pass',
      dkimDetails: 'Pass: Cryptographic signature verified against corporate RSA-2048 key (selector: corp-mail)',
      dmarc: 'pass',
      dmarcDetails: 'Pass: Domain alignment 100% compliant with strict enterprise DMARC reject policy'
    },
    
    bodyText: `Hi Alex,

Thanks for wrapping up the container orchestration tickets yesterday ahead of our milestone deadline. I reviewed pull request #342 on our internal GitHub repository and left two minor architectural suggestions regarding the Redis cluster caching timeout.

Let's sync during our scheduled Sprint Retrospective this Friday at 2:00 PM EST in Conference Room 4B / Google Meet. Please take a look at the sprint summary doc on Confluence prior to the meeting:

>> Review Confluence Architecture Notes:
   https://wiki.innovatetech.internal/display/ENG/Q4+Sprint+24+Retro

No action is required regarding the production deployment until our Change Advisory Board (CAB) meeting next Tuesday. Have a great afternoon!

Best regards,
Sarah Jenkins
Lead Systems Architect | Cloud Platform Services
InnovateTech Solutions Inc.
Extension: 4892 | Slack: @sjenkins`,

    rawHeaders: `Delivered-To: alex.m@innovatetech.internal
Received: from mail-internal.innovatetech.internal (mail-internal.innovatetech.internal [10.240.12.5])
    by exchange.innovatetech.internal with ESMTPS id o812904
    for <alex.m@innovatetech.internal>; Thu, 12 Nov 2026 14:22:10 +0000
Return-Path: <s.jenkins@innovatetech.internal>
Authentication-Results: exchange.innovatetech.internal;
    spf=pass (ip=10.240.12.5; domain=innovatetech.internal);
    dkim=pass (valid signature) header.d=innovatetech.internal header.s=corp-mail;
    dmarc=pass (p=reject) header.from=innovatetech.internal
From: "Sarah Jenkins, Engineering Lead" <s.jenkins@innovatetech.internal>
To: alex.m@innovatetech.internal
Subject: Sprint Retrospective & Architecture Review - Q4 Cloud Migration Sync
Date: Thu, 12 Nov 2026 14:22:10 +0000
Message-ID: <a8f21bc9-93e4-4d81-8172-23910c284e91@innovatetech.internal>
Content-Type: text/plain; charset="UTF-8"`,

    senderDomainAnalysis: `The sender domain is "innovatetech.internal", which matches the recipient's internal corporate environment.
1. The message originates from an authorized internal exchange IP (10.240.12.5).
2. SPF, DKIM, and DMARC validations all produce clean PASS results.
3. The Return-Path precisely mirrors the From header, establishing strict identity alignment without spoofing.`,

    suspiciousKeywords: [],

    urgencyTactics: `Zero artificial urgency or coercive psychological triggers. The communication maintains a collegial, relaxed business tone ("Thanks for wrapping up", "Have a great afternoon", "No action is required until next Tuesday").`,

    linkAnalysis: [
      {
        anchorText: 'https://wiki.innovatetech.internal/display/ENG/Q4+Sprint+24+Retro',
        destinationUrl: 'https://wiki.innovatetech.internal/display/ENG/Q4+Sprint+24+Retro',
        riskRating: 'SAFE',
        explanation: 'Legitimate corporate intranet link pointing to an authenticated internal Confluence wiki on the verified corporate domain. Does not point to external or unvetted web services.'
      }
    ],

    grammarObservations: `Grammar, syntax, and tone are entirely professional, natural, and consistent with everyday software engineering collaboration. There are no spelling errors, awkward automated phrasing, or artificial pressure.`,

    socialEngineeringTechniques: [
      'None. Authentic professional internal communication.'
    ],

    detailedVerdictExplanation: `SAFE / GENUINE. This specimen exhibits all characteristics of legitimate internal business correspondence. Cryptographic authentication passes with flying colors, sender domain matches internal infrastructure, the recipient is specifically addressed by first name, specific project context (Redis cache, PR #342) is discussed, and the link points exclusively to an authenticated internal corporate wiki.`,

    annotations: [
      {
        id: 1,
        label: 'Verified Sender & Internal Domain Alignment',
        category: 'legitimate',
        description: 'Authentic corporate internal domain (innovatetech.internal) with 100% SPF, DKIM, and DMARC alignment.',
        evidenceSnippet: 'From: "Sarah Jenkins, Engineering Lead" <s.jenkins@innovatetech.internal>',
        isLegitimate: true
      },
      {
        id: 2,
        label: 'Personalized Context & Direct Salutation',
        category: 'legitimate',
        description: 'Addresses the recipient personally by name ("Hi Alex") and references authentic ongoing work items (PR #342, container orchestration).',
        evidenceSnippet: 'Hi Alex, Thanks for wrapping up the container orchestration tickets yesterday...',
        isLegitimate: true
      },
      {
        id: 3,
        label: 'Calm, Professional & Non-Coercive Tone',
        category: 'legitimate',
        description: 'Completely devoid of fear, threats, or artificial countdown clocks. Explicitly notes "No action is required until next Tuesday".',
        evidenceSnippet: 'No action is required regarding the production deployment until our Change Advisory Board meeting',
        isLegitimate: true
      },
      {
        id: 4,
        label: 'Legitimate Internal Intranet URL',
        category: 'legitimate',
        description: 'Points strictly to the authorized internal Confluence documentation wiki on the internal domain.',
        evidenceSnippet: 'https://wiki.innovatetech.internal/display/ENG/Q4+Sprint+24+Retro',
        isLegitimate: true
      },
      {
        id: 5,
        label: 'Verifiable Corporate Signature & Extension',
        category: 'legitimate',
        description: 'Provides verifiable internal extension (Ext. 4892) and internal Slack handle for out-of-band verification.',
        evidenceSnippet: 'Lead Systems Architect | Extension: 4892 | Slack: @sjenkins',
        isLegitimate: true
      }
    ],

    simulationDisclaimer: 'SIMULATED EDUCATIONAL SPECIMEN. Demonstrates legitimate corporate communication benchmarks for SOC heuristic comparison.'
  },

  {
    id: 'email-5',
    title: 'Specimen 05: Legitimate Order Confirmation',
    type: 'genuine',
    verdict: 'SAFE',
    threatLevel: 'NONE',
    riskScore: 2,
    category: 'E-Commerce Transactional Receipt',
    
    senderDisplayName: 'CloudGear Essentials Store',
    actualSenderAddress: 'orders@cloudgear.com',
    returnPath: 'orders-bounce@cloudgear.com',
    recipient: 'priya.patel@workstation.com',
    subject: 'Your CloudGear Order #CG-2026-88190 Confirmation',
    timestamp: 'Thu, 12 Nov 2026 18:02:44 +0000',
    messageId: '<ord-20261112-88190@smtp-out-12.cloudgear.com>',
    sendingIp: '192.0.2.75 (Certified Cloud Infrastructure)',
    
    auth: {
      spf: 'pass',
      spfDetails: 'Pass: Sending IP 192.0.2.75 designated in cloudgear.com SPF TXT record',
      dkim: 'pass',
      dkimDetails: 'Pass: RSA-2048 cryptographic signature verified for domain cloudgear.com (selector: 2026-oct)',
      dmarc: 'pass',
      dmarcDetails: 'Pass: Strict DMARC alignment verified with quarantine/reject enforcement'
    },
    
    bodyText: `Dear Priya Patel,

Thank you for your recent purchase from CloudGear Essentials. We are pleased to confirm that your order #CG-2026-88190 has been received and is currently being processed at our warehouse facility.

ORDER DETAILS & ITEMIZED RECEIPT:
- Order Number: #CG-2026-88190
- Order Date: November 12, 2026, 6:01 PM EST
- Payment Method: Visa ending in 4012 (Processed securely via Stripe Payments)

ITEMS PURCHASED:
1. Ergonomic Mechanical Keyboard (Stealth Black, Silent Red Switches)
   Qty: 1 | Price: $89.00 USD
2. USB-C Multiport Docking Station 10-in-1 Dual Display 4K
   Qty: 1 | Price: $54.00 USD

FINANCIAL SUMMARY:
- Subtotal: $143.00 USD
- Standard Shipping: $0.00 USD (Promotional Free Shipping)
- Sales Tax: $9.30 USD
- Total Paid: $152.30 USD

You can view your order status and manage your delivery preferences at any time by visiting your verified customer account portal:
>> Check Order Status:
   https://www.cloudgear.com/account/orders/CG-2026-88190

SECURITY & PRIVACY NOTICE:
CloudGear Essentials will NEVER send you an email asking for your account password, full credit card numbers, or PIN codes. If you receive any suspicious communication referencing this order, please notify our Trust & Safety Team at support@cloudgear.com.

Thank you for being a valued customer!

Customer Service Team
CloudGear Essentials Inc.
500 Tech Parkway, Suite 300, Austin, TX 78701
https://www.cloudgear.com | Privacy Policy | Terms of Service`,

    rawHeaders: `Delivered-To: priya.patel@workstation.com
Received: from smtp-out-12.cloudgear.com (smtp-out-12.cloudgear.com [192.0.2.75])
    by mx.workstation.com with ESMTPS id z7712903
    for <priya.patel@workstation.com>; Thu, 12 Nov 2026 18:02:45 +0000
Return-Path: <orders-bounce@cloudgear.com>
Authentication-Results: mx.workstation.com;
    spf=pass (ip=192.0.2.75; domain=cloudgear.com);
    dkim=pass (valid signature) header.d=cloudgear.com header.s=2026-oct;
    dmarc=pass (p=reject) header.from=cloudgear.com
From: "CloudGear Essentials Store" <orders@cloudgear.com>
To: priya.patel@workstation.com
Subject: Your CloudGear Order #CG-2026-88190 Confirmation
Date: Thu, 12 Nov 2026 18:02:44 +0000
Message-ID: <ord-20261112-88190@smtp-out-12.cloudgear.com>
Content-Type: text/plain; charset="UTF-8"`,

    senderDomainAnalysis: `The sender domain is "cloudgear.com".
1. Matches the official commercial brand domain without extra hyphens or suspicious TLDs.
2. Fully authenticates through SPF, DKIM, and DMARC under strict reject policy.
3. Return-Path (orders-bounce@cloudgear.com) matches the primary organizational domain.`,

    suspiciousKeywords: [],

    urgencyTactics: `None. The communication is entirely confirmatory and informative, providing transactional peace of mind rather than creating time-bound pressure.`,

    linkAnalysis: [
      {
        anchorText: 'https://www.cloudgear.com/account/orders/CG-2026-88190',
        destinationUrl: 'https://www.cloudgear.com/account/orders/CG-2026-88190',
        riskRating: 'SAFE',
        explanation: 'Points directly to the authentic primary portal (cloudgear.com) via TLS encryption, with URL path corresponding to the unique customer order ID.'
      }
    ],

    grammarObservations: `Clean, professional corporate copy complying with international transactional email standards. Correct punctuation, clear typography, and complete absence of manipulative rhetoric.`,

    socialEngineeringTechniques: [
      'None. Standard commercial order confirmation.'
    ],

    detailedVerdictExplanation: `SAFE / GENUINE. This specimen satisfies all technical, legal, and operational criteria of authentic e-commerce transactional communication. It provides full cryptographic authentication (SPF/DKIM/DMARC pass), masks payment data to the last 4 digits (PCI-DSS compliance), features the customer\'s real name, contains valid physical contact addresses (CAN-SPAM compliance), and includes a proactive security warning advising customers that the company never solicits passwords via email.`,

    annotations: [
      {
        id: 1,
        label: 'Valid Domain & Cryptographic Pass',
        category: 'legitimate',
        description: 'Authentic commercial domain (cloudgear.com) with valid DKIM RSA-2048 signature and strict DMARC alignment.',
        evidenceSnippet: 'From: "CloudGear Essentials Store" <orders@cloudgear.com>',
        isLegitimate: true
      },
      {
        id: 2,
        label: 'Customer Personalization & PCI Compliance',
        category: 'legitimate',
        description: 'Personally addresses "Dear Priya Patel" and securely masks card details ("Visa ending in 4012") compliant with PCI-DSS.',
        evidenceSnippet: 'Dear Priya Patel... Payment Method: Visa ending in 4012',
        isLegitimate: true
      },
      {
        id: 3,
        label: 'Transparent Non-Coercive Order Details',
        category: 'legitimate',
        description: 'Provides exact itemized breakdown and order ID without any demands for action, urgent clicks, or fees.',
        evidenceSnippet: 'Order Number: #CG-2026-88190 | Total Paid: $152.30 USD',
        isLegitimate: true
      },
      {
        id: 4,
        label: 'Direct Verified Portal Link',
        category: 'legitimate',
        description: 'Hyperlink navigates directly to the official HTTPS domain and valid order resource.',
        evidenceSnippet: 'https://www.cloudgear.com/account/orders/CG-2026-88190',
        isLegitimate: true
      },
      {
        id: 5,
        label: 'Proactive Security Advice & CAN-SPAM Footer',
        category: 'legitimate',
        description: 'Explicitly reminds customer that the company will never ask for credentials or PINs via email, with valid physical address.',
        evidenceSnippet: 'CloudGear Essentials will NEVER send you an email asking for your account password... 500 Tech Parkway, Austin, TX',
        isLegitimate: true
      }
    ],

    simulationDisclaimer: 'SIMULATED EDUCATIONAL SPECIMEN. Created to model industry best-practice transactional email architecture.'
  }
];
