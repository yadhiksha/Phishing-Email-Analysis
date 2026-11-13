# Standard Operating Procedure: Safe Phishing Reporting Process
**Corporate Information Security & Incident Response Protocol**
*Document Code:* SOP-SEC-2026-03 | *Classification:* All Personnel & SOC Tier-1

---

## 1. Purpose & Scope
This Standard Operating Procedure (SOP) defines the mandatory protocol for all enterprise employees, contractors, and interns upon encountering a suspicious, anomalous, or potentially malicious email message. Adherence to this protocol minimizes organizational attack surface, accelerates security triage, and enables proactive defense across email gateways.

---

## 2. The 5-Step Incident Response Lifecycle

```
┌─────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌─────────┐
│ 1. STOP │ ───> │ 2.VERIFY │ ───> │ 3.REPORT │ ───> │ 4.DELETE │ ───> │ 5. WARN │
└─────────┘      └──────────┘      └──────────┘      └──────────┘      └─────────┘
  Pause &          Validate          Submit to          Purge &          Alert
 Disengage       Out-of-Band        Security/SOC       Quarantine        Peers
```

---

### Step 1: STOP (Immediate Disengagement)
- **Halt all interaction**: Do not click hyperlinks, buttons, images, or interactive forms contained within the email.
- **Do not open or download attachments**: Never download `.zip`, `.pdf`, `.html`, or Office documents from unverified sources.
- **Do not disclose credentials or sensitive data**: Never provide usernames, passwords, multi-factor authentication (MFA) push approvals, SMS OTPs, or financial records.
- **Do not reply or unsubscribe**: Replying or clicking an "Unsubscribe" link in a phishing email validates your email address to the threat actor as active, increasing target priority.

### Step 2: VERIFY (Independent Out-of-Band Authentication)
- **Do not trust in-band contact details**: Never call telephone numbers, message WhatsApp/Telegram accounts, or click support links provided in the email itself.
- **Use authenticated out-of-band communication channels**:
  - For banking/financial inquiries: Navigate directly to the bank's official portal via a saved browser bookmark or call the verified customer service number printed on the back of your physical payment card.
  - For internal organizational requests: Contact the purported sender via enterprise Slack/Teams or call their extension from the official internal employee directory.
  - For logistics/delivery claims: Visit the courier's official tracking portal (e.g., `fedex.com`, `dhl.com`, `usps.com`) and manually input the consignment number.

### Step 3: REPORT (Enterprise Security Escalation & Evidence Preservation)
Timely reporting enables the Security Operations Center (SOC) to ingest Indicators of Compromise (IoCs) and execute automated perimeter containment (domain sinkholing, mailbox clawback, firewall rule updates).

#### Reporting Workflow:
1. **Primary Method: Integrated M365 / Google Workspace Phishing Plugin**:
   - Click the corporate **"Report Phishing" / "PhishAlarm"** button in your email client ribbon.
   - This automatically packages full MIME headers, body content, and original message structure for automated SOC triage.
2. **Secondary Method: Manual Ticket Submission with Full Headers**:
   - If the reporting add-in is unavailable, forward the email **as an attachment** (`.eml` or `.msg` file) to `security-incident@organization.com` (or your internal SOC email).
   - *Crucial note*: Do NOT perform standard inline forwarding, as this strips the original envelope routing headers (`Received`, `Authentication-Results`, `DKIM-Signature`, and `Return-Path`), preventing technical attribution.

#### Evidence Preservation Guidelines:
- Note the date and exact timestamp of receipt.
- Record any actions already taken (e.g., "Clicked link, but did not enter password", or "Entered credentials on landing page").
- If credentials were submitted, immediately notify SOC on-call hotline (+1-800-SEC-TEAM) for instant credential revocation and active session termination.

### Step 4: DELETE (Safe Mailbox Sanitization)
- Once reporting confirmation is received from the security tool or analyst, permanently remove the email from your primary Inbox.
- Navigate to your **Deleted Items / Trash** folder and execute a permanent purge.
- Ensure automated trash retention does not leave an active trap for accidental future clicks on secondary synced mobile devices.

### Step 5: WARN (Peer Notification & Situational Awareness)
- Alert colleagues or immediate team members who may have received the identical spear-phishing lure or campaign.
- Post a sanitized warning in authorized departmental communication channels (e.g., `#security-announcements` or `#team-general`):
  > *"Advisory: Several team members received a simulated or malicious parcel delivery / bank KYC email with subject '[Subject Line]'. Do not click any links; report via the Security button immediately."*
- Cooperate with cybersecurity personnel conducting post-incident debriefs or threat intelligence sharing.

---

## 3. Incident Severity Triage & Action Checklist

```
+-----------------------------------------------------------------------------------------+
|                               WHAT ACTION HAVE YOU TAKEN?                               |
+-----------------------------------------------------------------------------------------+
                                             |
          +----------------------------------+----------------------------------+
          |                                                                     |
     [NO ACTION TAKEN]                                                [POTENTIALLY COMPROMISED]
(Viewed message only, no clicks)                             (Clicked link, downloaded file, or entered info)
          |                                                                     |
          v                                                                     v
  Follow Standard Report:                                             EMERGENCY SOC ACTIONS:
  1. Click 'Report Phishing'                                          1. Disconnect network cable / Wi-Fi
  2. Await confirmation                                              2. Contact SOC Hotline immediately
  3. Purge from Deleted Items                                         3. Initiate credential reset on another clean device
  4. Continue normal duties                                           4. SOC isolates host & revokes active OAuth tokens
```

---

## 4. Key Rules for Enterprise Compliance
1. **No Shame Culture**: Security is a shared responsibility. Immediate reporting of accidental clicks prevents lateral threat movement and protects corporate data integrity.
2. **Never Forward Malicious Links via Chat**: Never paste active phishing URLs into chat channels (Slack, Teams). If sharing for analysis, defang the URL (e.g., `hxxps://malicious-domain[.]com/login`).
3. **Preserve Chain of Custody**: Ensure forensic artifacts remain intact for potential regulatory notifications under GDPR, HIPAA, or ISO 27001 compliance standards.
