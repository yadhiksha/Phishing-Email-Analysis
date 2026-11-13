# Cybersecurity Internship Project 03: Phishing Email Analysis
### Comprehensive Email Threat Analysis, Detection Platform & Employee Defense Guide

![Project Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge&logo=shield)
![Security Track](https://img.shields.io/badge/Track-SOC%20Tier--1%20Analyst-blue?style=for-the-badge&logo=googlecloud)
![MITRE ATT&CK](https://img.shields.io/badge/MITRE-T1566%20Phishing-red?style=for-the-badge&logo=target)
![Frontend](https://img.shields.io/badge/React%2019-TypeScript%20%7C%20Tailwind-cyan?style=for-the-badge&logo=react)
![Classification](https://img.shields.io/badge/Classification-TLP%3ACLEAR-green?style=for-the-badge)

---

## 1. Project Overview & Executive Summary

Phishing attacks remain the leading initial compromise vector across enterprise environments, accounting for more than 85% of breaches globally (MITRE ATT&CK **T1566 - Phishing**). Cybercriminals exploit human cognitive biases—such as fear, urgency, greed, and deference to authority—to deceive employees into disclosing credentials, approving unauthorized fund transfers, or executing malware.

This project delivers a comprehensive, beginner-friendly cybersecurity phishing email analysis platform designed for a first-year cybersecurity student or SOC Tier-1 analyst portfolio. It combines:
1. **In-Depth Forensic Dissections** of five realistic email specimens (3 phishing, 2 genuine).
2. **Visual Evidence Cards** with numbered callouts [1] to [5] and forensic legends.
3. **An Interactive Audit Checklist** with real-time threat score calculation.
4. **The Safe Reporting Procedure** (**STOP → VERIFY → REPORT → DELETE → WARN**).
5. **A One-Page Security Awareness Guide** titled *"THINK BEFORE YOU CLICK – STOP PHISHING!"*.
6. **A Modern Cybersecurity Dashboard** built with React 19, TypeScript, and Tailwind CSS.
7. **Complete Technical Documentation & Professional PDF Report**.

> **Simulated Environment Disclaimer:**  
> All malicious email addresses, sender domains, URLs, and server IPs analyzed in this project are simulated educational samples (using non-routable top-level domains like `.xyz`, `.work`, `.info`, or defanged syntax). No actual malicious infrastructure or command-and-control servers are operated or linked.

---

## 2. Project Architecture & File Organization

```
Phishing-Email-Analysis/
│
├── frontend/                               # Production React 19 + TypeScript + Vite Dashboard
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx                  # Top status bar with live UTC clock and threat pills
│   │   │   ├── Sidebar.tsx                 # Navigation workspace sidebar
│   │   │   ├── DashboardOverview.tsx       # Metrics, KPI cards, and triage summaries
│   │   │   ├── EmailAnalysisView.tsx       # Deep forensic reader & raw header inspector
│   │   │   ├── AnnotatedEvidenceGallery.tsx# Evidence cards with numbered pin callouts [1]-[5]
│   │   │   ├── ChecklistView.tsx           # Interactive 15-point audit tool with score meter
│   │   │   ├── ReportingProcessView.tsx    # 5-step incident response lifecycle & SOC playbook
│   │   │   ├── AwarenessGuideView.tsx      # Printable "THINK BEFORE YOU CLICK" guide
│   │   │   ├── InteractiveQuizView.tsx     # 5-question scenario knowledge assessment
│   │   │   └── Footer.tsx                  # Standardized cybersecurity footer
│   │   ├── data/
│   │   │   ├── emailData.ts                # 5 detailed email specimens with RFC headers
│   │   │   ├── checklistData.ts            # 15 threat indicators with weighted scoring
│   │   │   ├── reportingData.ts            # STOP-VERIFY-REPORT SOP data & emergency hotlines
│   │   │   └── quizData.ts                 # Knowledge assessment question pool
│   │   ├── types/
│   │   │   └── index.ts                    # Strong TypeScript type definitions
│   │   ├── App.tsx                         # Core application router and state
│   │   ├── main.tsx                        # React application bootstrap
│   │   └── index.css                       # Cybersecurity dark navy styling & print media
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── documentation/                          # Complete technical documentation suite
│   ├── Project-Report.md                   # Comprehensive technical report (Markdown)
│   ├── Project-Report.pdf                  # 6-page professional PDF executive report
│   ├── Phishing-Checklist.md               # 15-point employee warning sign checklist
│   ├── Reporting-Process.md                # Standard Operating Procedure (SOP)
│   └── Awareness-Guide.md                  # Printable employee security awareness guide
│
├── screenshots/                            # High-resolution visual evidence & UI cards
│   ├── dashboard-overview.png              # Full dark-theme dashboard overview
│   ├── evidence-card-email-1-bank-kyc.png  # Specimen 01 evidence card with markers 1–5
│   ├── evidence-card-email-2-job-offer.png # Specimen 02 evidence card with markers 1–5
│   ├── evidence-card-email-3-parcel-delivery.png # Specimen 03 evidence card with markers 1–5
│   ├── evidence-card-email-4-internal-comm.png   # Specimen 04 evidence card with markers 1–5
│   ├── evidence-card-email-5-order-confirmation.png # Specimen 05 evidence card with markers 1–5
│   └── awareness-guide-poster.png          # High-resolution "THINK BEFORE YOU CLICK" poster
│
├── scripts/                                # Automation utilities
│   ├── generate_pdf_report.py              # ReportLab script compiling Project-Report.pdf
│   ├── generate_screenshots.py             # Pillow script generating evidence cards
│   └── generate_dashboard_screenshot.py    # Pillow script generating dashboard preview
│
├── package.json                            # Root workspace script manager
└── README.md                               # Project documentation & GitHub guide
```

---

## 3. Tools and Technologies Used

| Tool / Technology | Version | Purpose in Project |
| :--- | :--- | :--- |
| **React** | 19.0.0 | Component-based interactive UI architecture |
| **TypeScript** | 5.7.2 | Type safety, maintainability, and clean code contracts |
| **Tailwind CSS** | 3.4.17 | Modern dark navy cybersecurity styling (`#070b14`, `#0c1322`, `#00f0ff`) |
| **Vite** | 6.2.0 | Ultra-fast build tool and frontend development server |
| **Lucide React** | 1.16.0 | Modern SVG iconography for cybersecurity telemetry |
| **Python** | 3.14.3 | Automated report generation and visual card rendering |
| **ReportLab** | 5.0.1 | Programmatic compilation of executive multi-page PDF reports |
| **Pillow (PIL)** | 12.1.1 | High-resolution image generation of evidence cards and posters |
| **PyMuPDF** | 1.28.2 | PDF inspection, verification, and forensic validation |

---

## 4. Methodology & Analytical Framework

Each investigated email specimen underwent a 6-stage forensic methodology:

```
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ 1. Envelope &    │───>│ 2. Domain & DNS  │───>│ 3. Cryptographic │
│    MIME Headers  │    │    Typosquatting │    │    SPF/DKIM/DMARC│
└──────────────────┘    └──────────────────┘    └──────────────────┘
         │
         v
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ 4. Linguistic &  │───>│ 5. Hyperlink &   │───>│ 6. Heuristic     │
│    Psychology    │    │    Payload Audit │    │    Triage Verdict│
└──────────────────┘    └──────────────────┘    └──────────────────┘
```

1. **Envelope Header Forensics:** Inspecting `Received`, `Return-Path`, and `Message-ID` to expose rogue open relays and IP mismatches.
2. **Domain Syntax Verification:** Detecting typosquatting, character manipulation, and untrusted top-level domains (`.xyz`, `.work`, `.info`).
3. **Cryptographic Validation:** Checking SPF (RFC 7208), DKIM (RFC 6376), and DMARC (RFC 7489) authentication results.
4. **Psychological Vector Profiling:** Isolating fear, artificial urgency, greed, or false authority triggers.
5. **Payload & Link Triage:** Analyzing anchor text vs. true target destinations, detecting subdomain trickery, and identifying weaponized attachments (`.pdf.html`).
6. **Heuristic Risk Scoring:** Applying the Phishing Threat Score (PTS) rubric to assign a definitive verdict: **PHISHING**, **SUSPICIOUS**, or **SAFE**.

---

## 5. Summary of the Five Analyzed Email Specimens

| Specimen | Display Name & Address | Subject Line | Urgency Tactics | Authentication Status | Final Verdict |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Specimen 01** *(Phishing)* | `Apex Trust Bank Security Team`<br>`<security-verify@apextrust-secure-auth.xyz>` | `URGENT: Immediate Account Suspension - Mandatory KYC Required` | Strict 24-hr deadline; threats of asset freeze & $150 penalty; forbids branch contact. | SPF: `softfail`<br>DKIM: `neutral`<br>DMARC: `fail` | **PHISHING**<br>(Risk: 96/100) |
| **Specimen 02** *(Phishing)* | `Global Talent Acquisition - ApexCorp`<br>`<hr-careers@apexcorp-careers-global.work>` | `Executive Remote Operations Specialist - Offer Letter` | FOMO 48-hr offer expiration; $120/hr salary with zero interview required. | SPF: `fail`<br>DKIM: `none`<br>DMARC: `fail` | **PHISHING**<br>(Risk: 92/100) |
| **Specimen 03** *(Phishing)* | `FastTrack Express Logistics`<br>`<notifications@fasttrack-delivery-update.info>` | `ALERT: Package #FT-98214309 Delivery Exception - Action in 12h` | Threats of parcel destruction at depot within 12 hours for missing $2.49 handling fee. | SPF: `neutral`<br>DKIM: `fail`<br>DMARC: `fail` | **PHISHING**<br>(Risk: 89/100) |
| **Specimen 04** *(Genuine)* | `Sarah Jenkins, Engineering Lead`<br>`<s.jenkins@innovatetech.internal>` | `Sprint Retrospective & Architecture Review - Q4 Cloud Migration` | Non-coercive collaborative tone; "No action required until Tuesday's CAB meeting". | SPF: `pass`<br>DKIM: `pass`<br>DMARC: `pass` | **SAFE**<br>(Risk: 4/100) |
| **Specimen 05** *(Genuine)* | `CloudGear Essentials Store`<br>`<orders@cloudgear.com>` | `Your CloudGear Order #CG-2026-88190 Confirmation` | Completely confirmatory; masks payment to last 4 digits; warns company never asks for PINs. | SPF: `pass`<br>DKIM: `pass`<br>DMARC: `pass` | **SAFE**<br>(Risk: 2/100) |

---

## 6. Annotated Evidence Cards

Each specimen is mapped to a standardized numbered callout legend:

### For Malicious Specimens (Red Flags):
- **Pin [1] Suspicious Sender:** Mismatched display name and actual address; rogue TLDs (`.xyz`, `.work`, `.info`).
- **Pin [2] Generic Salutation:** Impersonal greetings ("Dear Valued Customer", "Dear Candidate", "Dear Resident").
- **Pin [3] Urgent Language & Coercion:** Fabricated deadlines (<24 hours) and threats of account termination or asset seizure.
- **Pin [4] Deceptive Link / Payload:** Subdomain trickery masking actual root host, or weaponized attachments (`.pdf.html`).
- **Pin [5] Solicitation of Credentials / PINs:** Demanding passwords, SSNs, credit card details, or out-of-band Telegram chat.

### For Genuine Specimens (Legitimate Proofs):
- **Pin [1] Verified Sender:** Domain matches corporate identity with 100% SPF, DKIM, and strict DMARC alignment.
- **Pin [2] Personal Context:** Recipient addressed by legal given name with specific ongoing task references.
- **Pin [3] Calm, Non-Coercive Tone:** Professional collaboration completely devoid of panic countdowns.
- **Pin [4] Legitimate Internal / HTTPS Link:** Navigates directly to authenticated company wiki or official merchant portal.
- **Pin [5] Verified Contact & Regulatory Compliance:** Physical corporate address, telephone extension, and anti-phishing warnings.

---

## 7. Phishing Warning Sign Checklist

The interactive checklist categorizes indicators across five dimensions:
1. **Senders & Domains:** Spoofed display names, look-alike domains, SPF/DKIM/DMARC failures.
2. **Emotional Triggers:** Manufactured panic, unearned financial rewards ($120/hr), threats of legal action.
3. **Requests & Actions:** Solicitation of passwords/OTPs, unexpected $2.49 fees, redirection to Telegram.
4. **Links & Payloads:** Mismatched hover URLs, subdomain masquerading, double extensions (`.pdf.html`).
5. **Grammar & Formatting:** Generic salutations, awkward automated translations, missing corporate CAN-SPAM footers.

**Threat Score Rubric:**
- `0 – 14 Points`: Low Risk / Likely Safe
- `15 – 39 Points`: Suspicious / Elevated Risk (Require out-of-band verification)
- `40+ Points`: Critical / Confirmed Phishing (Escalate to SOC immediately)

---

## 8. Safe Reporting Procedure: STOP → VERIFY → REPORT → DELETE → WARN

When an employee encounters a suspicious email:

```
[1] STOP    ───> Halt all interaction. Never click links or download attachments.
[2] VERIFY  ───> Validate through an independent out-of-band channel (phone, official portal).
[3] REPORT  ───> Submit using the "Report Phishing" button or forward AS ATTACHMENT (.eml) to SOC.
[4] DELETE  ───> Purge the message permanently from Inbox and Deleted Items.
[5] WARN    ───> Alert colleagues in official security chat channels (#security-announcements).
```

---

## 9. How to Run the Project Locally

### Prerequisites
- **Node.js** (v18.0.0 or later; verified on v24.19.0)
- **npm** (v9.0.0 or later; verified on v11.17.0)
- **Python** (3.10+; optional for regenerating PDF and screenshots)

### Step 1: Clone or Navigate to the Project Folder
```powershell
cd "c:\Users\Yadhiksha M\Downloads\phishing mail detection"
```

### Step 2: Install Frontend Dependencies
```powershell
cd frontend
npm install
```

### Step 3: Run the Development Server
```powershell
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### Step 4: Build for Production
```powershell
npm run build
```
The optimized production bundle will be output to `frontend/dist/`.

### Step 5: (Optional) Re-Generate PDF Report and Screenshots
```powershell
# From the project root
python scripts/generate_pdf_report.py
python scripts/generate_screenshots.py
python scripts/generate_dashboard_screenshot.py
```

---

## 10. Location of Deliverables

| Deliverable Artifact | File Location | Description |
| :--- | :--- | :--- |
| **Interactive Dashboard** | `frontend/` (or `frontend/dist/`) | Full React/TypeScript cybersecurity platform |
| **Official PDF Report** | `documentation/Project-Report.pdf` | 6-page comprehensive executive project report |
| **Markdown Report** | `documentation/Project-Report.md` | Full technical report with deep forensic details |
| **Phishing Checklist** | `documentation/Phishing-Checklist.md` | Detailed 15-point employee warning sign checklist |
| **Reporting SOP** | `documentation/Reporting-Process.md` | 5-step incident response procedure |
| **Awareness Guide** | `documentation/Awareness-Guide.md` | "THINK BEFORE YOU CLICK" text reference |
| **Evidence Cards (5)** | `screenshots/evidence-card-email-*.png` | Numbered callout cards for all 5 specimens |
| **Dashboard Screenshot** | `screenshots/dashboard-overview.png` | Dark navy cybersecurity dashboard overview |
| **Awareness Poster** | `screenshots/awareness-guide-poster.png` | High-res printable awareness guide |

---

## 11. GitHub Upload Instructions

To publish this project to GitHub as a standout portfolio repository:

### Step 1: Initialize Git Repository
```powershell
cd "c:\Users\Yadhiksha M\Downloads\phishing mail detection"
git init
```

### Step 2: Configure Git Ignore
Ensure `frontend/node_modules` and `frontend/dist` are ignored:
```powershell
# A clean .gitignore is already in place
git status
```

### Step 3: Stage and Commit All Deliverables
```powershell
git add .
git commit -m "feat: complete cybersecurity internship project 03 - phishing email analysis"
```

### Step 4: Link to Your GitHub Repository
Create a new public repository on GitHub named `Phishing-Email-Analysis`, then push:
```powershell
git branch -M main
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/Phishing-Email-Analysis.git
git push -u origin main
```

---

## 12. Final Compliance Checklist

- [x] **Requirement 1 (Email Analysis):** 5 realistic sample emails analyzed (Fake bank KYC, fake job offer, fake parcel delivery, normal professional communication, legitimate order confirmation) with all 12 required fields.
- [x] **Requirement 2 (Annotated Evidence):** 5 professional evidence cards created with numbered callout pins [1] to [5] and matching legends.
- [x] **Requirement 3 (Phishing Checklist):** 10 core warning categories covered with audit scoring.
- [x] **Requirement 4 (Safe Reporting):** STOP → VERIFY → REPORT → DELETE → WARN lifecycle with out-of-band verification and evidence preservation.
- [x] **Requirement 5 (Awareness Guide):** "THINK BEFORE YOU CLICK – STOP PHISHING!" one-page guide with top 5 signs, prevention tips, and reporting instructions.
- [x] **Requirement 6 (Website/Dashboard):** React 19 + TypeScript + Tailwind modern cybersecurity dashboard with sidebar, working buttons, smooth tab navigation, and zero console errors.
- [x] **Requirement 7 (Documentation):** Complete README.md, Project-Report.md, Phishing-Checklist.md, Reporting-Process.md, Awareness-Guide.md.
- [x] **Requirement 8 (Final Deliverables):** Directory structure strictly matches official specification with 6-page PDF report and screenshots.
- [x] **Requirement 9 (Quality & Ethics):** No placeholder text, simulated infrastructure clearly disclosed, high academic and technical rigor.
