import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # Skip cover page

        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))

        # Header
        self.drawString(54, 750, "CYBERSECURITY INTERNSHIP PROJECT 03: PHISHING EMAIL ANALYSIS")
        self.drawRightString(612 - 54, 750, "TLP:CLEAR | SOC TIER-1 REPORT")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 744, 612 - 54, 744)

        # Footer
        self.line(54, 48, 612 - 54, 48)
        self.drawString(54, 36, "CONFIDENTIAL & PROPRIETARY — FOR EDUCATIONAL & TRAINING PURPOSES ONLY")
        self.drawRightString(612 - 54, 36, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def build_pdf(filename="documentation/Project-Report.pdf"):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor("#0f172a"),
        alignment=0,
        spaceAfter=12
    )
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#0284c7"),
        spaceAfter=24
    )
    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=colors.HexColor("#0f172a"),
        spaceBefore=16,
        spaceAfter=8,
        keepWithNext=True
    )
    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=colors.HexColor("#0369a1"),
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )
    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor("#334155"),
        spaceAfter=8
    )
    callout_style = ParagraphStyle(
        'Callout_Text',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#0f172a")
    )
    mono_style = ParagraphStyle(
        'Mono_Custom',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#0f172a")
    )

    story = []

    # ================= COVER PAGE =================
    story.append(Spacer(1, 40))
    story.append(Paragraph("CYBERSECURITY INTERNSHIP PROJECT 03", ParagraphStyle('SubTag', fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor('#0284c7'), spaceAfter=8)))
    story.append(Paragraph("PHISHING EMAIL FORENSIC ANALYSIS & INCIDENT RESPONSE REPORT", title_style))
    story.append(Paragraph("Technical Investigation, Heuristic Dissection, and Employee Defense Framework", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor("#0284c7"), spaceAfter=25))

    meta_data = [
        [Paragraph("<b>Author / Role:</b>", body_style), Paragraph("Cybersecurity Analyst Intern (SOC Tier-1 Track)", body_style)],
        [Paragraph("<b>Project Focus:</b>", body_style), Paragraph("Email Threat Analysis, Social Engineering & Defense", body_style)],
        [Paragraph("<b>Classification:</b>", body_style), Paragraph("TLP:CLEAR / Public Educational Deliverable", body_style)],
        [Paragraph("<b>Frameworks:</b>", body_style), Paragraph("MITRE ATT&CK T1566, RFC 7208 (SPF), RFC 6376 (DKIM), RFC 7489 (DMARC)", body_style)],
        [Paragraph("<b>Status:</b>", body_style), Paragraph("Completed & Verified Against Official Requirements", body_style)],
        [Paragraph("<b>Date of Report:</b>", body_style), Paragraph("November 2026", body_style)],
    ]
    meta_table = Table(meta_data, colWidths=[130, 374])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(meta_table)

    story.append(Spacer(1, 35))
    story.append(Paragraph("<b>EXECUTIVE SUMMARY ABSTRACT</b>", h2_style))
    story.append(Paragraph(
        "Email phishing constitutes over 85% of initial access vectors targeting modern organizations. "
        "This project investigates five simulated email specimens across banking KYC, executive recruitment, "
        "parcel delivery, internal collaboration, and e-commerce receipts. Through rigorous forensic examination "
        "of envelope routing headers, cryptographic authentication (SPF/DKIM/DMARC), typosquatted domains, "
        "psychological urgency tactics, and payload hyperlinks, this report establishes actionable detection rules, "
        "evidence callouts, an employee audit checklist, and the STOP → VERIFY → REPORT incident response procedure.",
        body_style
    ))
    story.append(PageBreak())

    # ================= SECTION 1: OBJECTIVES & METHODOLOGY =================
    story.append(Paragraph("1. Project Objectives & Threat Landscape", h1_style))
    story.append(Paragraph(
        "The objective of this cybersecurity project is to demonstrate end-to-end analytical capability in "
        "identifying phishing attacks, distinguishing genuine communications, dissecting social engineering vectors, "
        "and designing enterprise awareness training. All malicious artifacts analyzed herein are simulated "
        "educational constructs with non-routable domains (.xyz, .work, .info) to ensure zero operational risk.",
        body_style
    ))

    story.append(Paragraph("Email Authentication Triad Reference", h2_style))
    auth_data = [
        [Paragraph("<b>Protocol</b>", body_style), Paragraph("<b>RFC Standard</b>", body_style), Paragraph("<b>Security Role</b>", body_style), Paragraph("<b>Failure Consequence</b>", body_style)],
        [Paragraph("<b>SPF</b>", body_style), Paragraph("RFC 7208", body_style), Paragraph("Verifies sender server IP against DNS TXT record", body_style), Paragraph("Indicates unauthorized mail server relaying", body_style)],
        [Paragraph("<b>DKIM</b>", body_style), Paragraph("RFC 6376", body_style), Paragraph("Cryptographic signature ensures non-repudiation", body_style), Paragraph("Indicates header tampering or forged identity", body_style)],
        [Paragraph("<b>DMARC</b>", body_style), Paragraph("RFC 7489", body_style), Paragraph("Enforces alignment policies (none/quarantine/reject)", body_style), Paragraph("Flags or drops spoofed sender domains", body_style)],
    ]
    auth_table = Table(auth_data, colWidths=[65, 75, 200, 164])
    auth_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0f172a")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(auth_table)
    story.append(Spacer(1, 14))

    # ================= SECTION 2: 5 SPECIMEN FORENSICS =================
    story.append(Paragraph("2. Forensic Analysis of Email Specimens", h1_style))

    specimens = [
        {
            "id": "Specimen 01",
            "type": "Phishing – Fake Bank KYC Verification",
            "from": "security-verify@apextrust-secure-auth.xyz",
            "display": "Apex Trust Bank Security Team",
            "subject": "URGENT: Immediate Account Suspension - Mandatory KYC Verification Required",
            "verdict": "PHISHING (Critical Threat - Credential Harvesting)",
            "urgency": "Imposes strict 24-hour deadline before permanent freeze and asset forfeiture. Forbids customer branch contact.",
            "domain": "Domain 'apextrust-secure-auth.xyz' uses cheap .xyz TLD; mimics official apextrust.com via cybersquatting.",
            "link": "Anchor text displays apextrust.com.account-validation-portal.xyz; targets rogue portal for password/SSN harvest.",
            "markers": "1. Suspicious Sender | 2. Generic Salutation | 3. Urgent Threat | 4. Deceptive Subdomain | 5. Credential Demand"
        },
        {
            "id": "Specimen 02",
            "type": "Phishing – Fake Job Offer / Recruitment Scam",
            "from": "hr-careers@apexcorp-careers-global.work",
            "display": "Global Talent Acquisition - ApexCorp",
            "subject": "Executive Remote Operations Specialist - Offer Letter & Onboarding Package",
            "verdict": "PHISHING (High Threat - Advance Fee Fraud & Identity Theft)",
            "urgency": "Exploits FOMO with 48-hour expiration on $120/hr salary with zero interview requirement.",
            "domain": "Domain 'apexcorp-careers-global.work' uses .work TLD; Return-Path routes through unverified open SMTP relay.",
            "link": "Weaponized double-extension attachment 'Employment_Agreement.pdf.html' uses HTML smuggling to steal banking data.",
            "markers": "1. Spoofed Sender | 2. Generic Greeting | 3. Unrealistic Salary | 4. HTML Smuggling | 5. Telegram Redirection"
        },
        {
            "id": "Specimen 03",
            "type": "Phishing – Fake Parcel Delivery Notification",
            "from": "notifications@fasttrack-delivery-update.info",
            "display": "FastTrack Express Logistics Delivery Service",
            "subject": "ALERT: Package #FT-98214309 Delivery Exception - Action Required in 12 Hours",
            "verdict": "PHISHING (High Threat - Credit Card Skimming)",
            "urgency": "Threatens package destruction within 12 hours for missing $2.49 handling fee.",
            "domain": "Domain 'fasttrack-delivery-update.info' originates from dial-up botnet IP; fails SPF and DKIM.",
            "link": "Links to fasttrack-delivery-portal.info; prompts victim for debit/credit card, CVV, and phone verification.",
            "markers": "1. Botnet Relay | 2. Generic Resident Greeting | 3. 12-Hour Destruction Threat | 4. Skimmer URL | 5. Card Data Demand"
        },
        {
            "id": "Specimen 04",
            "type": "Genuine – Normal Professional Communication",
            "from": "s.jenkins@innovatetech.internal",
            "display": "Sarah Jenkins, Engineering Lead",
            "subject": "Sprint Retrospective & Architecture Review - Q4 Cloud Migration Sync",
            "verdict": "SAFE (Authentic Internal Communication)",
            "urgency": "Calm, non-coercive business tone; explicitly states 'No action required until Tuesday'.",
            "domain": "Internal domain innovatetech.internal with 100% SPF/DKIM/DMARC pass and verified internal IP relay.",
            "link": "Links to authenticated internal Confluence intranet wiki (wiki.innovatetech.internal).",
            "markers": "1. Verified Sender | 2. Personalized Context | 3. Non-Coercive Tone | 4. Internal URL | 5. Verifiable Extension"
        },
        {
            "id": "Specimen 05",
            "type": "Genuine – Legitimate Order Confirmation",
            "from": "orders@cloudgear.com",
            "display": "CloudGear Essentials Store",
            "subject": "Your CloudGear Order #CG-2026-88190 Confirmation",
            "verdict": "SAFE (Authentic Transactional Communication)",
            "urgency": "Completely confirmatory and reassuring; itemizes purchase and masked payment data.",
            "domain": "Domain cloudgear.com matches corporate identity; strict DMARC reject enforcement and valid RSA-2048 DKIM.",
            "link": "Points to secure account order status; includes explicit disclaimer that company never requests passwords via email.",
            "markers": "1. Cryptographic Pass | 2. Customer Personalization | 3. Transparent Details | 4. Secure Portal Link | 5. CAN-SPAM Footer"
        }
    ]

    for s in specimens:
        spec_table_data = [
            [Paragraph(f"<b>{s['id']}: {s['type']}</b>", body_style), Paragraph(f"<b>VERDICT: {s['verdict']}</b>", body_style)],
            [Paragraph("<b>Sender:</b>", body_style), Paragraph(f"\"{s['display']}\" &lt;{s['from']}&gt;", mono_style)],
            [Paragraph("<b>Subject:</b>", body_style), Paragraph(s['subject'], body_style)],
            [Paragraph("<b>Domain Forensics:</b>", body_style), Paragraph(s['domain'], body_style)],
            [Paragraph("<b>Psychological Vectors:</b>", body_style), Paragraph(s['urgency'], body_style)],
            [Paragraph("<b>Payload / Link:</b>", body_style), Paragraph(s['link'], body_style)],
            [Paragraph("<b>Evidence Markers:</b>", body_style), Paragraph(s['markers'], body_style)],
        ]
        spec_table = Table(spec_table_data, colWidths=[120, 384])
        spec_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(spec_table)
        story.append(Spacer(1, 10))

    story.append(PageBreak())

    # ================= SECTION 3: CHECKLIST & SAFE REPORTING =================
    story.append(Paragraph("3. Enterprise Phishing Warning Sign Checklist", h1_style))
    story.append(Paragraph(
        "Employees must evaluate suspicious inbound traffic against these ten core threat dimensions:",
        body_style
    ))

    checklist_items = [
        ("Unknown / Spoofed Senders", "Display name differs from actual transmitting address; check characters after '@'."),
        ("Look-Alike Domains", "Typosquatting, character omissions, or rogue TLDs (.xyz, .info, .work)."),
        ("Urgent Messages", "Aggressive countdowns (12h, 24h) and threats of immediate account lockouts."),
        ("Threats and Rewards", "Unsolicited $120/hr jobs, lottery wins, or threats of legal/police action."),
        ("Generic Greetings", "Addressed to 'Dear Valued Customer' instead of the employee's registered name."),
        ("Suspicious Links", "Subdomain tricks (bank.com.hacker.xyz), link shorteners, or raw IP addresses."),
        ("Unexpected Attachments", "Dangerous container files (.zip, .iso) or double extensions (.pdf.html)."),
        ("Grammar & Spelling", "Awkward translation phrasing, inconsistent fonts, or unusual corporate syntax."),
        ("Requests for Passwords/OTPs", "Zero Trust rule: Real IT and banks NEVER ask for passwords or PINs via email."),
        ("Unexpected Payment Requests", "Demands for unexpected wire transfers or small delivery clearance fees ($2.49).")
    ]
    chk_table_data = [[Paragraph("<b>Warning Indicator</b>", body_style), Paragraph("<b>Detection Guidance & Rule of Thumb</b>", body_style)]]
    for name, desc in checklist_items:
        chk_table_data.append([Paragraph(f"• <b>{name}</b>", body_style), Paragraph(desc, body_style)])

    chk_table = Table(chk_table_data, colWidths=[150, 354])
    chk_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0f172a")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(chk_table)

    story.append(Spacer(1, 14))
    story.append(Paragraph("4. Safe Reporting Process: STOP → VERIFY → REPORT → DELETE → WARN", h1_style))
    
    reporting_data = [
        [Paragraph("<b>Stage</b>", body_style), Paragraph("<b>Employee Action Protocol</b>", body_style), Paragraph("<b>SOC Operations Impact</b>", body_style)],
        [Paragraph("<b>1. STOP</b>", body_style), Paragraph("Pause. Do NOT click links, download files, or disclose passwords/OTPs.", body_style), Paragraph("Neutralizes immediate payload detonation.", body_style)],
        [Paragraph("<b>2. VERIFY</b>", body_style), Paragraph("Validate out-of-band via trusted internal phone, chat, or official portal.", body_style), Paragraph("Exposes spoofed and unauthenticated lures.", body_style)],
        [Paragraph("<b>3. REPORT</b>", body_style), Paragraph("Click 'Report Phishing' or forward AS ATTACHMENT (.eml) to SOC.", body_style), Paragraph("Automates IoC ingestion, firewall blocks & email clawback.", body_style)],
        [Paragraph("<b>4. DELETE</b>", body_style), Paragraph("Purge email permanently from Inbox and Deleted Items.", body_style), Paragraph("Eliminates accidental delayed interaction.", body_style)],
        [Paragraph("<b>5. WARN</b>", body_style), Paragraph("Alert coworkers in official security chat channels.", body_style), Paragraph("Creates proactive human sensor defense network.", body_style)],
    ]
    rep_table = Table(reporting_data, colWidths=[80, 244, 180])
    rep_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0284c7")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(rep_table)

    story.append(Spacer(1, 14))
    story.append(Paragraph("5. Employee Security Awareness Guide: THINK BEFORE YOU CLICK", h1_style))
    story.append(Paragraph(
        "The companion one-page employee awareness guide highlights five core defense tenets: "
        "(1) Scrutinize look-alike senders; (2) Reject manufactured urgency; (3) Hover over all hyperlinks; "
        "(4) Guard passwords, PINs, and OTPs with Zero Trust; and (5) Exercise extreme caution with generic "
        "greetings and unexpected attachments. By embedding these habits, organizations turn their workforce into "
        "a formidable security firewall.",
        body_style
    ))

    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>CONCLUSION & INTERNSHIP REFLECTION</b>", h2_style))
    story.append(Paragraph(
        "Technical perimeter controls like SEGs and DMARC enforcement are essential, but attackers consistently pivot "
        "to human psychological vulnerabilities. Through this internship project, a complete defense suite was engineered—encompassing "
        "forensic mail header autopsies, interactive React/TypeScript analysis dashboards, dynamic threat scoring checklists, "
        "and incident response SOPs. This multidisciplinary project provides actionable value for enterprise security operations.",
        body_style
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated {filename}")

if __name__ == "__main__":
    build_pdf()
