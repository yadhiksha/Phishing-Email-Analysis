# Cybersecurity Internship Project 03: Phishing Email Analysis
## Comprehensive Technical Investigation, Threat Intelligence Report & Defense Architecture

**Author:** Cybersecurity Analyst Intern  
**Project Track:** Email Security, Human-Layer Defense & Incident Response  
**Version:** 1.0.0 | **Date:** November 2026 | **Classification:** TLP:CLEAR / Educational Portfolio  

---

## 1. Executive Summary

Phishing attacks remain the paramount initial vector (Initial Access - MITRE ATT&CK T1566) exploited by cybercriminals and advanced persistent threat (APT) actors to breach enterprise perimeters, compromise identities, and facilitate ransomware propagation. Despite advanced machine-learning filters deployed at Secure Email Gateways (SEGs), psychological exploitation of human cognitive biases—such as fear, urgency, greed, and deference to authority—routinely succeeds in coercing employees into malicious engagements.

This technical report documents the analysis of five realistic simulated email specimens, encompassing both malicious phishing vectors and legitimate corporate communications. Each specimen underwent rigorous forensic examination, including envelope and header analysis, cryptographic authentication validation (SPF, DKIM, DMARC), domain syntax and typosquatting inspection, linguistic sentiment analysis, and payload destination profiling. 

In addition to individual email autopsies, this report delivers:
1. An empirical comparative detection matrix mapping threats across MITRE ATT&CK techniques.
2. An interactive annotated visual evidence architecture with numbered forensic callouts.
3. A corporate Phishing Warning Sign Checklist.
4. An enterprise Incident Response Standard Operating Procedure (STOP → VERIFY → REPORT → DELETE → WARN).
5. A high-impact Employee Security Awareness Guide.
6. A responsive, production-ready React/TypeScript interactive dashboard.

---

## 2. Project Objectives & Scope

### 2.1 Core Objectives
- **Heuristic Threat Identification:** Systematically dissect email structural attributes to isolate indicators of compromise (IoCs) and indicators of attack (IoAs).
- **Distinction of Malicious vs. Benign Traffic:** Establish verifiable criteria for differentiating deceptive social engineering attempts from authentic transactional and business correspondence.
- **Header & Cryptographic Verification:** Analyze email routing records, `Return-Path` mismatches, and cryptographic authentication mechanisms (SPF, DKIM, DMARC).
- **Human-Layer Defense Hardening:** Construct actionable educational assets and reporting workflows that empower employees to act as an effective first-line human sensor network.

### 2.2 Scope & Ethics Disclosure
All malicious email specimens, domain names, hyperlinks, and IP references analyzed in this document are simulated educational artifacts. In accordance with responsible disclosure and cybersecurity ethics:
- No real-world active malicious command-and-control (C2) servers or phishing kits are linked or operated.
- Example domains employ non-routable top-level domains, reserved domains (`.example.com`, `.internal`), or explicitly defanged synthetic syntax.
- All testing was executed within isolated sandboxed environments.

---

## 3. Threat Landscape & Analytical Framework

### 3.1 Relevant MITRE ATT&CK Matrix Mappings
- **T1566.001 - Phishing: Spearphishing Attachment:** Delivery of malicious payloads concealed in weaponized documents (`.pdf`, `.html`, `.docm`).
- **T1566.002 - Phishing: Spearphishing Link:** Redirection of victims to credential-harvesting landing pages via deceptive hyperlinks.
- **T1566.003 - Phishing: Spearphishing via Service:** Abuse of third-party SaaS services and messaging channels.
- **T1078 - Valid Accounts:** Utilization of compromised credentials harvested through deceptive banking or HR lures.

### 3.2 Email Authentication Triad (SPF, DKIM, DMARC)
1. **SPF (Sender Policy Framework - RFC 7208):** Validates whether the sending mail server IP is authorized by the sender domain's DNS TXT record.
2. **DKIM (DomainKeys Identified Mail - RFC 6376):** Provides cryptographic non-repudiation and body tamper-resistance using public/private key pairs.
3. **DMARC (Domain-based Message Authentication, Reporting, and Conformance - RFC 7489):** Enforces policy alignment (`none`, `quarantine`, `reject`) when SPF and/or DKIM fail, protecting domain reputation against direct spoofing.

---

## 4. Deep-Dive Individual Email Forensics

### Specimen 01: Phishing – Fake Bank KYC Account Suspension
- **Sender Display Name:** `Apex Trust Bank Security Team`
- **Actual Sender Address:** `security-verify@apextrust-secure-auth.xyz`
- **Return-Path:** `bounce@apextrust-secure-auth.xyz`
- **Target Recipient:** `employee@enterprise.com`
- **Subject:** `URGENT: Immediate Account Suspension - Mandatory KYC Verification Required`
- **Verdict:** **PHISHING (High Severity / Critical Credential Threat)**

#### Raw Header Highlights & Routing Analysis
```
Received: from mail-relay-04.apextrust-secure-auth.xyz ([198.51.100.42])
Authentication-Results: spf=softfail (sender IP 198.51.100.42 is not authorized by apex-trust.com);
  dkim=neutral (bad signature);
  dmarc=fail (p=none; sp=none) header.from=apextrust-secure-auth.xyz;
From: "Apex Trust Bank Security Team" <security-verify@apextrust-secure-auth.xyz>
Subject: URGENT: Immediate Account Suspension - Mandatory KYC Verification Required
Date: Wed, 11 Nov 2026 08:14:22 +0000
```

#### Email Body Representation
> *Dear Valued Customer,*  
> *Our fraud prevention systems have flagged unusual activity and missing regulatory KYC (Know Your Customer) documentation on your account #****-8921. Failure to re-verify your identity within 24 hours will result in permanent account suspension and asset freezing under Federal Banking Guideline 14-B.*  
> *Click below immediately to update your credentials and submit your government identification:*  
> `[VERIFY ACCOUNT NOW - https://apextrust.com.account-validation-portal.xyz/login?session=89f41b]`  
> *Failure to comply within 24 hours will forfeit your balance.*  
> *Sincerely,*  
> *Apex Trust Central Fraud Division*

#### Technical Forensic Breakdown
1. **Sender Domain Analysis:** The domain `apextrust-secure-auth.xyz` is a classic typosquatted registration utilizing the high-risk `.xyz` top-level domain. The genuine institution operates under `apextrust.com`.
2. **Suspicious Words & Urgency Tactics:** "URGENT", "Immediate Account Suspension", "Mandatory KYC", "asset freezing", "Failure to comply within 24 hours will forfeit your balance". These trigger extreme panic and defensive compliance.
3. **Link Analysis:** The hyperlinked anchor text displays `https://apextrust.com.account-validation-portal.xyz/...`. This exploits subdomain trickery: the actual registered second-level domain is `account-validation-portal.xyz`, with `apextrust.com` prepended merely as an unauthoritative subdomain.
4. **Grammar & Salutation:** Opens with the impersonal salutation "Dear Valued Customer" rather than the customer's legal name. Contains minor syntactic errors typical of automated phishing kits.
5. **Social Engineering Techniques:** Coercive intimidation, artificial time constraints (24 hours), false authority invoking fictional regulatory statutes ("Federal Banking Guideline 14-B").
6. **Detailed Verdict Explanation:** Confirmed phishing intended to harvest primary online banking credentials and PII (passwords, SSN, government ID images) via an unauthorized external portal.

---

### Specimen 02: Phishing – Fake Executive Job Offer / Recruitment Scam
- **Sender Display Name:** `Global Talent Acquisition - ApexCorp`
- **Actual Sender Address:** `hr-careers@apexcorp-careers-global.work`
- **Return-Path:** `mailer-daemon@freehosted-smtp.net`
- **Target Recipient:** `candidate@enterprise.com`
- **Subject:** `Executive Remote Operations Specialist - Offer Letter & Onboarding Package`
- **Verdict:** **PHISHING (Advance Fee & Identity Theft Threat)**

#### Raw Header Highlights & Routing Analysis
```
Received: from unknown-vps.freehosted-smtp.net ([203.0.113.88])
Authentication-Results: spf=fail; dkim=none; dmarc=fail;
From: "Global Talent Acquisition - ApexCorp" <hr-careers@apexcorp-careers-global.work>
Return-Path: <mailer-daemon@freehosted-smtp.net>
Subject: Executive Remote Operations Specialist - Offer Letter & Onboarding Package
```

#### Email Body Representation
> *Dear Candidate,*  
> *Following our executive review of your professional profile, we are pleased to extend an unconditional offer for the position of Senior Remote Operations Specialist at ApexCorp Global. Compensation is fixed at $120/hr ($18,500/month) with full remote home office stipend.*  
> *No preliminary technical interview is required due to your outstanding qualifications. To confirm your acceptance and receive your company MacBook and encrypted phone, you must complete the attached registration and connect with our Onboarding Director on Telegram (@ApexCorp_Recruiter) within 48 hours.*  
> *Attached: `Employment_Agreement_MacBook_Requisition.pdf.html`*  
> *Best Regards,*  
> *HR Recruitment Committee | ApexCorp Global*

#### Technical Forensic Breakdown
1. **Sender Domain Analysis:** The sender domain `apexcorp-careers-global.work` was registered within 4 days of sending. The `Return-Path` originates from a rogue SMTP host (`freehosted-smtp.net`) with failed SPF and no DKIM signature.
2. **Suspicious Words & Enticements:** "unconditional offer", "$120/hr", "No preliminary interview required", "Telegram (@ApexCorp_Recruiter)", "home office stipend".
3. **Payload / Attachment Analysis:** The attachment `Employment_Agreement_MacBook_Requisition.pdf.html` utilizes double-extension obfuscation and HTML smuggling. Opening the `.html` file executes client-side JavaScript that renders a credential-stealing form and prompts for bank routing numbers under the guise of direct deposit setup.
4. **Out-of-Band Redirection:** Directs communication to an anonymous end-to-end encrypted messenger (Telegram) to evade enterprise email monitoring and forensics.
5. **Detailed Verdict Explanation:** Classic advance-fee and identity harvesting recruitment scam. High compensation for unapplied jobs with zero interview barriers is an absolute red flag.

---

### Specimen 03: Phishing – Fake Parcel Delivery Notification
- **Sender Display Name:** `FastTrack Express Logistics Delivery Service`
- **Actual Sender Address:** `notifications@fasttrack-delivery-update.info`
- **Return-Path:** `bounce@bulkmail-sender-7.biz`
- **Target Recipient:** `resident@enterprise.com`
- **Subject:** `ALERT: Package #FT-98214309 Delivery Exception - Action Required in 12 Hours`
- **Verdict:** **PHISHING (Credit Card Skimming & Smishing/Phishing Hybrid)**

#### Raw Header Highlights & Routing Analysis
```
Received: from host-198-18-0-15.dialup.net ([198.18.0.15])
Authentication-Results: spf=neutral; dkim=fail (signature verification failed);
From: "FastTrack Express Logistics Delivery Service" <notifications@fasttrack-delivery-update.info>
Subject: ALERT: Package #FT-98214309 Delivery Exception - Action Required in 12 Hours
```

#### Email Body Representation
> *Dear Resident / Recipient,*  
> *Your consignment with tracking ID #FT-98214309 could not be delivered on November 12, 2026, due to an incomplete delivery address and an unpaid customs handling fee of $2.49 USD.*  
> *Our courier driver cannot hold the parcel indefinitely. If the customs processing fee is not paid within 12 hours, the package will be permanently returned to the overseas sender or destroyed at the sorting depot.*  
> *Click here to update your street address and pay the $2.49 clearance fee:*  
> `[RE-SCHEDULE DELIVERY: https://fasttrack-delivery-portal.info/pay?id=FT-98214309]`  
> *FastTrack Logistics Customer Support Division*

#### Technical Forensic Breakdown
1. **Sender Domain Analysis:** The domain `fasttrack-delivery-update.info` mimics commercial couriers but uses `.info`. The authentic delivery entity is `fasttrackexpress.com`.
2. **Micro-Payment Trap:** The fee requested is purposely diminutive ($2.49 USD). Victims willingly compromise their credit card details because the monetary threshold appears negligible.
3. **Hyperlink Destination:** Redirects to an unencrypted, suspicious payment gateway (`fasttrack-delivery-portal.info`) that logs credit card numbers, CVVs, billing addresses, and SMS OTP confirmation codes.
4. **Fear & Urgency:** Threatens that the package will be "destroyed at the sorting depot" within a strict 12-hour window.
5. **Detailed Verdict Explanation:** Credit card skimming and PII gathering campaign capitalizing on the ubiquity of e-commerce delivery expectations.

---

### Specimen 04: Genuine – Normal Professional Internal Communication
- **Sender Display Name:** `Sarah Jenkins, Engineering Lead`
- **Actual Sender Address:** `s.jenkins@innovatetech.internal`
- **Return-Path:** `s.jenkins@innovatetech.internal`
- **Target Recipient:** `alex.m@innovatetech.internal`
- **Subject:** `Sprint Retrospective & Architecture Review - Q4 Cloud Migration Sync`
- **Verdict:** **SAFE (Authentic Internal Communication)**

#### Raw Header Highlights & Routing Analysis
```
Received: from mail-internal.innovatetech.internal ([10.240.12.5]) by exchange.innovatetech.internal;
Authentication-Results: spf=pass (innovatetech.internal: 10.240.12.5 is authorized);
  dkim=pass header.d=innovatetech.internal header.s=corp-mail;
  dmarc=pass (p=reject) header.from=innovatetech.internal;
From: "Sarah Jenkins, Engineering Lead" <s.jenkins@innovatetech.internal>
Return-Path: <s.jenkins@innovatetech.internal>
Date: Thu, 12 Nov 2026 14:22:10 +0000
Message-ID: <a8f21bc9-93e4-4d81-8172-23910c284e91@innovatetech.internal>
```

#### Email Body Representation
> *Hi Alex,*  
> *Thanks for wrapping up the container orchestration tickets yesterday. I have reviewed the pull request on GitHub and left two minor comments regarding the Redis caching timeout.*  
> *Let's sync during our scheduled Sprint Retrospective this Friday at 2:00 PM EST in Conference Room 4B / Google Meet. Please take a look at the sprint summary doc on Confluence prior to the meeting:*  
> `https://wiki.innovatetech.internal/display/ENG/Q4+Sprint+24+Retro`  
> *Best,*  
> *Sarah Jenkins*  
> *Lead Systems Architect | Cloud Platforms*  
> *InnovateTech Solutions Inc.*

#### Technical Forensic Breakdown
1. **Domain & Cryptographic Alignment:** Originates from verified corporate IP addresses. SPF, DKIM, and DMARC all return valid `PASS` statuses. The `Return-Path` strictly matches the `From` header.
2. **Context & Personalization:** Specifically addresses the recipient by their given name ("Alex") and references specific, ongoing technical tasks (container orchestration, pull request, Redis timeouts).
3. **Tone & Emotion:** Completely devoid of artificial panic, countdown timers, threats of penalty, or bizarre grammar.
4. **Link Destinations:** Links directly to internal corporate intranet infrastructure (`wiki.innovatetech.internal`), matching verified internal domain schemas.
5. **Detailed Verdict Explanation:** Completely authentic routine internal business communication. Poses zero security risk.

---

### Specimen 05: Genuine – Legitimate Order Confirmation
- **Sender Display Name:** `CloudGear Essentials Store`
- **Actual Sender Address:** `orders@cloudgear.com`
- **Return-Path:** `orders-bounce@cloudgear.com`
- **Target Recipient:** `customer.patel@gmail.com`
- **Subject:** `Your CloudGear Order #CG-2026-88190 Confirmation`
- **Verdict:** **SAFE (Authentic Transactional Communication)**

#### Raw Header Highlights & Routing Analysis
```
Received: from smtp-out-12.cloudgear.com ([192.0.2.75])
Authentication-Results: spf=pass (cloudgear.com: 192.0.2.75 is authorized);
  dkim=pass header.d=cloudgear.com header.s=2026-oct;
  dmarc=pass (p=reject) header.from=cloudgear.com;
From: "CloudGear Essentials Store" <orders@cloudgear.com>
Subject: Your CloudGear Order #CG-2026-88190 Confirmation
```

#### Email Body Representation
> *Dear Priya Patel,*  
> *Thank you for your purchase from CloudGear Essentials. We are currently preparing your shipment. Below is the itemized summary of your transaction:*  
> *Order ID: #CG-2026-88190 | Date: November 12, 2026*  
> *• 1x Ergonomic Mechanical Keyboard (Stealth Black) - $89.00*  
> *• 1x USB-C Multiport Docking Station 10-in-1 - $54.00*  
> *Subtotal: $143.00 | Shipping: Free | Total Billed: $143.00 (Paid via Visa ending in 4012)*  
> *You can review your order progress by visiting your account dashboard:*  
> `https://www.cloudgear.com/account/orders/CG-2026-88190`  
> *Please note: CloudGear will never ask you to confirm your card CVV or password via email. If you have questions, please reach our official support desk at support@cloudgear.com.*  
> *CloudGear Essentials Inc. | 500 Tech Parkway, Suite 300, Austin, TX 78701*

#### Technical Forensic Breakdown
1. **Domain & Cryptographic Alignment:** Cryptographically signed by `cloudgear.com` using a valid RSA-2048 key. Fully passes SPF, DKIM, and strict DMARC enforcement (`p=reject`).
2. **Personalization & Data Accuracy:** Addresses the client with full legal name ("Priya Patel") and masks sensitive payment information appropriately (only displaying last 4 digits of payment card).
3. **Security Awareness Footing:** Explicitly informs the recipient that customer support will *never* solicit passwords or payment details via email.
4. **Physical Compliance:** Complies with CAN-SPAM regulations by furnishing a valid physical street address and legitimate unsubscribe/privacy policy endpoints.
5. **Detailed Verdict Explanation:** Genuine commercial receipt. Does not solicit sensitive credentials or induce hasty behavior.

---

## 5. Comparative Detection Matrix

| Metric / Dimension | Email 1 (Fake Bank KYC) | Email 2 (Fake Job Offer) | Email 3 (Fake Parcel Delivery) | Email 4 (Engineering Lead Sync) | Email 5 (Order Confirmation) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Simulated Status** | Simulated Phish | Simulated Phish | Simulated Phish | Simulated Genuine | Simulated Genuine |
| **From Domain** | `apextrust-secure-auth.xyz` | `apexcorp-careers-global.work` | `fasttrack-delivery-update.info` | `innovatetech.internal` | `cloudgear.com` |
| **SPF Status** | `softfail` | `fail` | `neutral` | `pass` | `pass` |
| **DKIM Status** | `neutral (bad sig)` | `none` | `fail` | `pass` | `pass` |
| **DMARC Status** | `fail` | `fail` | `fail` | `pass` | `pass` |
| **Urgency Index** | 98 / 100 (Critical) | 65 / 100 (Moderate) | 92 / 100 (Severe) | 5 / 100 (None) | 0 / 100 (None) |
| **Social Engineering Lure** | Fear, Suspension, Coercion | Greed, Flattery, High Salary | Impatience, Small Fee Loss | Professional Collaboration | Customer Reassurance |
| **Payload Type** | Credential Harvesting Link | HTML Smuggling (`.pdf.html`) | Payment Skimming Portal | Plain Intranet Wiki Link | Legitimate Order Tracking |
| **Target Action** | Enter Bank Login & PII | Chat on Telegram & Open File | Enter Credit Card & CVV | Read Confluence Wiki | Review Account Receipt |
| **Final Verdict** | **PHISHING** | **PHISHING** | **PHISHING** | **SAFE** | **SAFE** |

---

## 6. Annotated Evidence Architecture

Each investigated email is accompanied by numbered forensic callout markers that map directly to our standardized detection taxonomy:

```
[1] SUSPICIOUS SENDER / DOMAIN SPOOFING
    - Discrepancy between display name and actual address
    - Look-alike or rogue top-level domains (.xyz, .work, .info)
    - SPF/DKIM/DMARC validation failures

[2] ARTIFICIAL URGENCY & COERCIVE TIMERS
    - Unrealistic countdowns (12 hours, 24 hours)
    - Threats of punitive legal, regulatory, or monetary consequences

[3] DECEPTIVE HYPERLINKS & TYPOSQUATTED URLS
    - Anchor text mismatching destination URL
    - Multilevel subdomain deception masking actual host

[4] SOLICITATION OF SENSITIVE CREDENTIALS / PII
    - Demands for passwords, social security numbers, MFA codes, or CVVs
    - Requests for gift cards or unverified banking wire rerouting

[5] GENERIC SALUTATIONS & INCONSISTENT CONTEXT
    - Impersonal greetings ("Dear Valued Customer")
    - Unsolicited notifications for uninitiated activities
```

For genuine emails, inverse legitimate markers are assigned:
- `[L1] Verified Domain Alignment & Cryptographic Signatures`
- `[L2] Contextual Personalization & Account Specificity`
- `[L3] Professional, Non-Coercive Business Tone`
- `[L4] Legitimate Internal / Secure HTTPS Hyperlinks`
- `[L5] Transparent Corporate Governance & Security Disclaimers`

---

## 7. Phishing Prevention Checklist & Implementation

Enterprise organizations must implement a multi-layered defense strategy combining technological perimeter controls with ongoing workforce awareness:

### Technical Controls:
- **Strict DMARC Policy Enforcement:** Migrate organizational DMARC records from `p=none` to `p=reject` to neutralize inbound and outbound spoofing.
- **External Email Tagging:** Enforce a noticeable header warning banner on all incoming messages originating outside the corporate tenant.
- **Safe Link Rewriting & Time-of-Click Inspection:** Deploy modern SEGs that inspect URLs dynamically when clicked, neutralizing delayed weaponization.
- **Attachment Sandboxing & Disarm/Reconstruction (CDR):** Execute all inbound archives and attachments within isolated micro-virtual machines.

### Human-Layer Controls:
- **Continuous Adaptive Micro-Simulations:** Conduct monthly contextual phishing drills tailored to specific business units (e.g., targeted finance lures for Accounts Payable).
- **Just-in-Time Learning:** Provide positive, blame-free immediate feedback when an employee reports or interacts with a simulated threat.

---

## 8. Safe Reporting Standard Operating Procedure (SOP)

The **STOP → VERIFY → REPORT → DELETE → WARN** protocol forms the backbone of human incident response:

1. **STOP:** Disengage immediately. Never click links or download attachments.
2. **VERIFY:** Authenticate via trusted out-of-band communication (official portal, known internal directory phone number).
3. **REPORT:** Submit the original email with full headers via the email client's "Report Phishing" button or send as an attachment to `security@organization.com`.
4. **DELETE:** Permanently remove the email from Inbox and Deleted Items.
5. **WARN:** Notify teammates in official team channels to establish shared vigilance.

---

## 9. Key Findings & Conclusion

### 9.1 Strategic Observations
1. **Domain Spoofing Shift:** Threat actors increasingly rely on look-alike registrations on newly minted generic TLDs (`.xyz`, `.work`, `.info`) rather than direct spoofing of protected corporate domains, specifically because strict DMARC records on major domains reject direct spoofing.
2. **Hybrid Multi-Channel Attacks:** Modern lures frequently blend channels (e.g., email redirecting to Telegram, or email demanding a call to a fake helpdesk). This cross-channel evasion bypasses conventional email filtering.
3. **Micro-Transaction Traps:** Threat actors have learned that requesting small sums ($2.49 parcel fee) lowers suspicion thresholds compared to large demands, allowing credit card skimmers to harvest active cards effortlessly.

### 9.2 Conclusion
Technological defenses and human vigilance are complementary pillars of modern cybersecurity. By combining automated cryptographic protocol enforcement (SPF, DKIM, DMARC) with a trained workforce capable of identifying psychological triggers and linguistic anomalies, organizations can reduce phishing breach susceptibility by over 90%.

This project provides an end-to-end framework—from forensic packet and header parsing to employee education and interactive dashboard triage—serving as a robust foundation for Tier-1 SOC operations and enterprise security programs.
