# Comprehensive Phishing Warning Sign Checklist
**Cybersecurity Operations & Employee Defense Reference**
*Document Version:* 1.2 | *Classification:* TLP:CLEAR / Public Training Resource

---

## 1. Executive Summary
Email-based social engineering remains the initial access vector in over 85% of corporate cyber incidents (Verizon DBIR). Attackers manipulate human psychology—specifically urgency, fear, greed, curiosity, and deference to authority—to induce targets into clicking malicious links, disclosing credentials, or executing malware.

This checklist provides a structured, forensic-grade methodology for employees, incident responders, and security analysts to rapidly inspect, evaluate, and categorize incoming email messages before taking any action.

---

## 2. Multi-Vector Phishing Indicator Matrix

| Risk Level | Threat Category | Primary Detection Indicators | Remediation / Triage Action |
| :--- | :--- | :--- | :--- |
| **CRITICAL** | **Credential & OTP Harvesting** | Direct requests for passwords, MFA tokens, PINs, or security questions. | Immediate quarantine; block sender domain; reset compromised accounts. |
| **CRITICAL** | **Malicious Link Redirection** | Anchor text does not match actual URL; typosquatted domains; IP addresses in URLs. | Isolate endpoint; submit URL to SOC perimeter firewall blocklist. |
| **HIGH** | **Sender Spoofing & Header Mismatch** | Display name matches known brand, but `From` or `Return-Path` header reveals rogue domain. | Verify SPF/DKIM/DMARC alignment in mail gateway logs. |
| **HIGH** | **Coercive Urgency & Threat Tactics** | Strict deadlines (e.g. "within 24 hours"), legal action threats, account suspension claims. | Pause; independently verify with official vendor via phone or known portal. |
| **HIGH** | **Financial & Payment Redirection** | Urgent requests to settle overdue invoices, change banking wire details, or pay parcel fees. | Mandatory dual-custody voice authorization using verified internal registry. |
| **MEDIUM** | **Generic or Impersonal Greetings** | "Dear Valued Customer", "Dear Member", or greeting by email username rather than legal name. | High-index suspicion; cross-reference customer relationship database. |
| **MEDIUM** | **Unsolicited High-Reward Offers** | Unrealistic compensation for unsolicited job offers, unexpected lottery winnings, grants. | Mark as spam/scam; do not respond or engage via messaging platforms. |
| **MEDIUM** | **Grammatical & Stylistic Irregularities** | Awkward syntax, inconsistent font formatting, localized spelling variants from non-native speakers. | Flag for heuristic analysis; review email for obfuscated evasion strings. |
| **LOW / INFO** | **Unexpected Routine Attachments** | Unsolicited PDF, DOCX, XLSX, or ZIP archives from unfamiliar or previously silent senders. | Sandbox detonation; execute static antivirus and dynamic heuristic scan. |

---

## 3. Detailed Inspection Categories

### Category A: Senders and Addressing
- [ ] **Display Name Spoofing**: Does the sender name claim to be an executive, financial institution, or cloud provider, while the actual address uses a consumer webmail service (e.g., `@gmail.com`, `@outlook.com`) or unrelated domain?
- [ ] **Look-Alike / Typosquatted Domains**: Check the domain character by character. Look for:
  - Substitution of letters (e.g., `micros0ft.com`, `paypal-security.support`).
  - Added prefixes or suffixes (e.g., `bank-verify-portal.net` instead of `bank.com`).
  - IDN Homograph attacks (e.g., Cyrillic 'а' replacing Latin 'a').
- [ ] **Return-Path / Envelope Mismatch**: Does the `Return-Path` header match the `From` header address?
- [ ] **First-Time External Banner**: Does your email client display a warning indicating that the sender is outside your corporate organization?

### Category B: Emotional Triggers and Psychological Manipulation
- [ ] **Fabricated Urgency**: Is there an aggressive deadline (e.g., "Account suspended within 12 hours unless verified")?
- [ ] **Fear and Intimidation**: Does the email threaten account termination, police referral, or severe legal penalties?
- [ ] **Greed and Enticement**: Does it offer lucrative remote employment without an interview, unearned tax refunds, or lottery jackpots?
- [ ] **Fake Authority**: Does the message invoke the authority of senior leadership (CEO fraud), HR departments, or national regulatory bodies?

### Category C: Salutation and Context
- [ ] **Generic Salutation**: Does the email say "Dear Account Holder", "Attention Employee", or "Dear Customer" instead of your specific name?
- [ ] **Unsolicited Context**: Did you initiate this interaction? If you did not apply for a job, request a password reset, or order a parcel, treat the notification as suspicious.
- [ ] **Discrepancy in Known Workflows**: Does your bank or employer ever send emails asking for account validation via direct links? (Industry answer: *No legitimate institution does this*).

### Category D: Hyperlinks and Destination Analysis
- [ ] **Hover Inspection**: When hovering the mouse cursor over the hyperlink (or inspecting the href attribute), does the destination URL match the displayed text?
- [ ] **URL Shorteners**: Are link shorteners (`bit.ly`, `tinyurl.com`, `t.co`) used to mask the ultimate destination?
- [ ] **Suspicious Top-Level Domains (TLDs)**: Does the URL end in unconventional, high-abuse TLDs such as `.xyz`, `.top`, `.work`, `.info`, `.buzz`, or `.click`?
- [ ] **Direct IP Addresses**: Does the link point directly to a raw numerical IP address (e.g., `http://192.168.1.100/...` or hex-encoded IP)?
- [ ] **Subdomain Masquerading**: Is a legitimate brand used as a subdomain on an attacker's server (e.g., `https://chase.com.security-login-auth.com/`)?

### Category E: Attachments and Payloads
- [ ] **Double Extensions**: Look for concealed executable files (e.g., `Invoice_March2026.pdf.exe`).
- [ ] **High-Risk Container Formats**: Unsolicited `.zip`, `.rar`, `.7z`, `.iso`, or `.vhd` archives used to bypass secure email gateway filters.
- [ ] **Macro-Enabled Documents**: Files with `.docm`, `.xlsm`, or prompts urging the user to "Enable Content / Enable Macros" to view invoice details.
- [ ] **HTML Smuggling Payloads**: Standalone `.html` or `.htm` attachments that open locally in the browser to harvest login credentials offline or drop payloads.

### Category F: Spelling, Syntax, and Visual Branding
- [ ] **Translation Artifacts**: Unusual phrasing that suggests translation software (e.g., "Kindly do the needful immediately to rectify your credential").
- [ ] **Blurry or Distorted Logos**: Low-resolution graphical assets scraped from official portals.
- [ ] **Missing or Incomplete Contact Details**: Absence of standard corporate footers, physical corporate addresses, or legitimate regulatory disclaimers.

---

## 4. Employee Self-Audit Rubric

When evaluating an ambiguous email, calculate the **Phishing Threat Score (PTS)**:

```
[Threat Indicator]                               [Score Points]
Direct request for password, OTP, or PIN         +50 pts
Domain typo or mismatched Return-Path            +40 pts
Hyperlink destination differs from display text   +30 pts
High-pressure artificial urgency (<24 hours)     +25 pts
Unsolicited attachment (.zip, .html, .docm)      +25 pts
Generic greeting ("Dear Customer")               +15 pts
Unsolicited job / financial reward               +20 pts
Grammar or orthographic errors                   +10 pts
```

### Risk Verdict Assessment
- **0 – 14 Points (Low Risk / Likely Safe)**: Standard communication. Follow normal security protocols.
- **15 – 39 Points (Suspicious)**: Do NOT click links or open attachments. Conduct out-of-band verification.
- **40+ Points (Confirmed Phishing)**: Trigger enterprise incident response. Follow the STOP → VERIFY → REPORT procedure immediately.

---

## 5. Summary Reference Card

> **GOLDEN RULE OF EMAIL SECURITY**  
> Never authenticate, enter credentials, or make payment adjustments based on links received in unsolicited emails. Always navigate to verified websites by manually typing the official domain into your web browser or launching bookmarked portals.
