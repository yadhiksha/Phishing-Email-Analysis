import os
from PIL import Image, ImageDraw, ImageFont

def create_evidence_card(
    filename,
    specimen_title,
    verdict,
    is_phish,
    from_header,
    subject_header,
    body_lines,
    markers
):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    # 1200 x 800 image
    width, height = 1200, 800
    img = Image.new("RGB", (width, height), color="#070b14")
    draw = ImageDraw.Draw(img)

    # Load default fonts or try standard true type fonts
    try:
        font_title = ImageFont.truetype("arialbd.ttf", 24)
        font_subtitle = ImageFont.truetype("arial.ttf", 14)
        font_header = ImageFont.truetype("courbd.ttf", 13)
        font_body = ImageFont.truetype("cour.ttf", 12)
        font_pin = ImageFont.truetype("arialbd.ttf", 11)
        font_legend = ImageFont.truetype("arial.ttf", 11)
        font_badge = ImageFont.truetype("arialbd.ttf", 12)
    except:
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
        font_header = ImageFont.load_default()
        font_body = ImageFont.load_default()
        font_pin = ImageFont.load_default()
        font_legend = ImageFont.load_default()
        font_badge = ImageFont.load_default()

    # Outer border & header banner
    accent_color = "#ef4444" if is_phish else "#10b981"
    draw.rectangle([20, 20, width - 20, height - 20], outline="#1e2e4f", width=2)
    draw.rectangle([20, 20, width - 20, 85], fill="#0c1322", outline="#1e2e4f", width=1)

    # Title & Badge
    draw.text((40, 32), specimen_title, font=font_title, fill="#ffffff")
    draw.text((40, 62), "CYBERSECURITY FORENSIC EVIDENCE CARD • SIMULATED EDUCATIONAL SPECIMEN", font=font_subtitle, fill="#38bdf8")
    
    # Verdict Badge
    badge_bg = "#7f1d1d" if is_phish else "#064e3b"
    badge_fg = "#fca5a5" if is_phish else "#6ee7b7"
    draw.rounded_rectangle([width - 240, 35, width - 40, 70], radius=6, fill=badge_bg, outline=accent_color, width=1)
    draw.text((width - 225, 43), f"VERDICT: {verdict}", font=font_badge, fill=badge_fg)

    # Main Left Email Box (x: 40 to 680)
    draw.rounded_rectangle([40, 105, 680, 760], radius=8, fill="#0b1220", outline="#1e2e4f", width=1)
    draw.rectangle([40, 105, 680, 140], fill="#111c33", outline="#1e2e4f", width=1)
    draw.text((55, 115), "INCOMING EMAIL SPECIMEN (MAILBOX CLIENT VIEW)", font=font_header, fill="#94a3b8")

    # Header Box inside left
    draw.rounded_rectangle([55, 150, 665, 230], radius=6, fill="#070b14", outline="#1e2e4f", width=1)
    
    # Pin 1 on Header
    draw.ellipse([65, 160, 85, 180], fill=accent_color)
    draw.text((72, 163), "1", font=font_pin, fill="#000000")
    draw.text((95, 164), f"From: {from_header}", font=font_header, fill="#ffffff")
    draw.text((95, 185), f"Subject: {subject_header}", font=font_header, fill="#38bdf8")
    draw.text((95, 205), "Security: SPF / DKIM / DMARC Authentication Check Active", font=font_body, fill="#64748b")

    # Body lines in Email box
    y_body = 250
    for line in body_lines:
        # Check if line contains marker
        draw.text((55, y_body), line, font=font_body, fill="#cbd5e1")
        y_body += 20

    # Right Legend Panel (x: 705 to 1160)
    draw.rounded_rectangle([705, 105, 1160, 760], radius=8, fill="#0c1322", outline="#1e2e4f", width=1)
    draw.rectangle([705, 105, 1160, 140], fill="#111c33", outline="#1e2e4f", width=1)
    legend_header = "SUSPICIOUS THREAT INDICATORS (RED FLAGS)" if is_phish else "GENUINE AUTHENTICATION PROOFS"
    draw.text((720, 115), legend_header, font=font_header, fill=badge_fg)

    # Draw Legend Items
    y_leg = 155
    for pin_num, label, desc, evidence in markers:
        # Pin icon
        draw.ellipse([720, y_leg, 742, y_leg + 22], fill=accent_color)
        draw.text((727, y_leg + 3), str(pin_num), font=font_pin, fill="#000000")
        
        # Label
        draw.text((752, y_leg + 2), label, font=font_header, fill="#ffffff")
        
        # Description
        y_leg += 26
        draw.text((752, y_leg), desc, font=font_legend, fill="#94a3b8")
        
        # Snippet
        y_leg += 20
        draw.rounded_rectangle([752, y_leg, 1145, y_leg + 32], radius=4, fill="#070b14", outline="#1e2e4f", width=1)
        draw.text((760, y_leg + 8), f">> {evidence}", font=font_body, fill="#38bdf8")

        y_leg += 45

    # Footer note on right
    draw.text((720, 735), "TLP:CLEAR • MITRE ATT&CK T1566 • Educational Forensics", font=font_legend, fill="#475569")

    img.save(filename, "PNG")
    print(f"Created evidence card: {filename}")

def main():
    os.makedirs("screenshots", exist_ok=True)

    # 1. Bank KYC
    create_evidence_card(
        filename="screenshots/evidence-card-email-1-bank-kyc.png",
        specimen_title="Specimen 01: Fake Bank KYC Verification",
        verdict="PHISHING",
        is_phish=True,
        from_header='"Apex Trust Bank" <security-verify@apextrust-secure-auth.xyz>',
        subject_header="URGENT: Immediate Account Suspension - Mandatory KYC Required",
        body_lines=[
            "[2] Dear Valued Customer,",
            "",
            "Our automated fraud prevention monitoring systems have",
            "flagged irregular transaction attempts on your account #****-8921.",
            "",
            "[3] Under Federal Banking Directive 14-B, failure to re-verify",
            "identity within 24 hours will result in permanent account",
            "freeze, asset forfeiture, and a $150 penalty fee.",
            "",
            "[4] >> VERIFY ACCOUNT CREDENTIALS NOW:",
            "    https://apextrust.com.account-validation-portal.xyz/login",
            "",
            "[5] Upload government-issued photo ID and confirm passwords.",
            "Do not contact your local branch during centralized lockdown.",
            "",
            "Sincerely,",
            "Apex Trust Central Fraud & Compliance Operations"
        ],
        markers=[
            (1, "Suspicious Sender & Typosquatted Domain", "Address uses rogue .xyz domain and failed SPF/DKIM validation.", "From: security-verify@apextrust-secure-auth.xyz"),
            (2, "Generic Salutation", "Uses impersonal 'Dear Valued Customer' instead of client legal name.", "Salutation: 'Dear Valued Customer'"),
            (3, "Manufactured Urgency & Panic", "Imposes strict 24-hr deadline with threats of freeze and asset forfeiture.", "Threat: 'freeze within 24 hours, asset forfeiture'"),
            (4, "Deceptive Subdomain Link", "Prepends apextrust.com to disguise account-validation-portal.xyz host.", "URL: apextrust.com.account-validation-portal.xyz"),
            (5, "Credential & PII Solicitation", "Demands sensitive government ID and online passwords over web link.", "Request: 'Upload government photo ID & credentials'")
        ]
    )

    # 2. Job Offer
    create_evidence_card(
        filename="screenshots/evidence-card-email-2-job-offer.png",
        specimen_title="Specimen 02: Fake Job Offer & Recruitment Scam",
        verdict="PHISHING",
        is_phish=True,
        from_header='"Global Talent Acquisition" <hr-careers@apexcorp-careers-global.work>',
        subject_header="Executive Remote Operations Specialist - Offer Letter",
        body_lines=[
            "[2] Dear Candidate,",
            "",
            "Following an executive review of your profile, we are thrilled",
            "to extend an immediate, unconditional employment offer for",
            "Senior Remote Operations Specialist at ApexCorp Global.",
            "",
            "[3] Base Pay: $120.00 USD/hr ($18,500/month) + $4,500 equipment check.",
            "No preliminary technical or video interview is required.",
            "",
            "[4] Review and sign the attached digital onboarding package:",
            "    Attachment: [Employment_Agreement_MacBook.pdf.html]",
            "",
            "[5] Connect immediately via Telegram with our Director of",
            "    Onboarding, Marcus Vance (@ApexCorp_Recruiter).",
            "",
            "Offer expires in 48 hours. Warm Regards,",
            "Elena Rostova, VP Talent Acquisition | ApexCorp Global"
        ],
        markers=[
            (1, "Suspicious Sender & Rogue Relay", "Uses disposable .work TLD; transmitted via open SMTP mail relay.", "From: hr-careers@apexcorp-careers-global.work"),
            (2, "Generic Salutation", "Vague greeting 'Dear Candidate' despite claiming resume review.", "Greeting: 'Dear Candidate'"),
            (3, "Unrealistic Financial Enticement", "Exorbitant $120/hr salary with zero interview requirements.", "Lure: '$120/hr, $18,500/mo, no interview required'"),
            (4, "Weaponized Double Extension", "Attachment .pdf.html utilizes HTML smuggling to bypass gateway.", "Attachment: Employment_Agreement.pdf.html"),
            (5, "Telegram Redirection", "Directs victim to unmonitored encrypted messenger (@ApexCorp_Recruiter).", "Redirection: 'Connect on Telegram @ApexCorp_Recruiter'")
        ]
    )

    # 3. Parcel Delivery
    create_evidence_card(
        filename="screenshots/evidence-card-email-3-parcel-delivery.png",
        specimen_title="Specimen 03: Fake Parcel Delivery Notification",
        verdict="PHISHING",
        is_phish=True,
        from_header='"FastTrack Express Logistics" <notifications@fasttrack-delivery-update.info>',
        subject_header="ALERT: Package #FT-98214309 Delivery Exception - Action in 12 Hours",
        body_lines=[
            "[2] Dear Resident / Customer,",
            "",
            "Your consignment parcel #FT-98214309 could not be dispatched",
            "due to an incomplete address and an unpaid customs fee of $2.49.",
            "",
            "[3] Under parcel transport regulations, if the fee is not settled",
            "within 12 hours, your parcel will be destroyed at the depot",
            "or marked permanently abandoned.",
            "",
            "[4] >> UPDATE YOUR ADDRESS & PAY $2.49 REDELIVERY FEE:",
            "    https://fasttrack-delivery-portal.info/tracking/update",
            "",
            "[5] Please ensure you have your active debit/credit card ready",
            "for identity verification and redelivery processing.",
            "",
            "FastTrack Express Dispatch & Sorting Division"
        ],
        markers=[
            (1, "Botnet Relay & Mismatched Domain", "Originates from dial-up IP on disposable .info domain with broken DKIM.", "From: notifications@fasttrack-delivery-update.info"),
            (2, "Generic Impersonal Salutation", "Addressed to 'Dear Resident / Customer' lacking recipient identity.", "Greeting: 'Dear Resident / Customer'"),
            (3, "Draconian Urgency & Destruction Threat", "Threatens physical parcel destruction within an absurd 12-hour window.", "Threat: 'destroyed at depot in 12 hours'"),
            (4, "Credit Card Skimmer Link", "Redirects to rogue tracking website designed to capture card numbers.", "URL: fasttrack-delivery-portal.info/pay"),
            (5, "Payment Card Data Demanded", "Micro-fee ($2.49) lowers suspicion to skim CVV and billing address.", "Demand: 'have active debit/credit card ready'")
        ]
    )

    # 4. Internal Professional Comm
    create_evidence_card(
        filename="screenshots/evidence-card-email-4-internal-comm.png",
        specimen_title="Specimen 04: Normal Professional Communication",
        verdict="SAFE",
        is_phish=False,
        from_header='"Sarah Jenkins, Lead" <s.jenkins@innovatetech.internal>',
        subject_header="Sprint Retrospective & Architecture Review - Q4 Migration Sync",
        body_lines=[
            "[2] Hi Alex,",
            "",
            "Thanks for wrapping up the container orchestration tickets",
            "yesterday. I reviewed PR #342 and left two minor comments",
            "regarding Redis cluster caching timeouts.",
            "",
            "[3] Let's sync during Sprint Retrospective this Friday at 2:00 PM",
            "in Conference Room 4B / Google Meet. No action is required",
            "regarding production deployment until next Tuesday's CAB.",
            "",
            "[4] Review Confluence Architecture Notes:",
            "    https://wiki.innovatetech.internal/display/ENG/Q4+Retro",
            "",
            "[5] Sarah Jenkins | Lead Systems Architect",
            "InnovateTech Solutions Inc. | Extension: 4892 | Slack: @sjenkins"
        ],
        markers=[
            (1, "Verified Internal Domain & Auth", "Transmitted from internal exchange IP; 100% SPF, DKIM, and DMARC pass.", "From: s.jenkins@innovatetech.internal"),
            (2, "Direct Personalization & Context", "Addressed to specific colleague referencing exact pull request #342.", "Greeting: 'Hi Alex, Thanks for wrapping up tickets'"),
            (3, "Calm, Professional & Non-Coercive", "Zero panic or artificial countdowns; states 'No action required until Tuesday'.", "Tone: 'sync during Friday retro, no action until CAB'"),
            (4, "Legitimate Internal Intranet URL", "Hyperlink navigates strictly to internal authorized corporate wiki.", "URL: wiki.innovatetech.internal"),
            (5, "Verifiable Employee Contact", "Furnishes legitimate internal telephone extension and enterprise chat handle.", "Signature: 'Extension: 4892 | Slack: @sjenkins'")
        ]
    )

    # 5. Order Confirmation
    create_evidence_card(
        filename="screenshots/evidence-card-email-5-order-confirmation.png",
        specimen_title="Specimen 05: Legitimate Order Confirmation",
        verdict="SAFE",
        is_phish=False,
        from_header='"CloudGear Essentials Store" <orders@cloudgear.com>',
        subject_header="Your CloudGear Order #CG-2026-88190 Confirmation",
        body_lines=[
            "[2] Dear Priya Patel,",
            "",
            "Thank you for your purchase from CloudGear Essentials. Your order",
            "#CG-2026-88190 is confirmed and processing at our Austin warehouse.",
            "",
            "[3] Itemized Receipt:",
            "• 1x Ergonomic Mechanical Keyboard (Black) - $89.00 USD",
            "• 1x USB-C Multiport Docking Station 10-in-1 - $54.00 USD",
            "Total Paid: $152.30 USD (Visa ending in 4012 via Stripe)",
            "",
            "[4] Track Order Status:",
            "    https://www.cloudgear.com/account/orders/CG-2026-88190",
            "",
            "[5] Notice: CloudGear will NEVER ask for passwords or PINs via email.",
            "CloudGear Essentials Inc. | 500 Tech Parkway, Suite 300, Austin, TX"
        ],
        markers=[
            (1, "Cryptographic Signatures & Strict Alignment", "Valid RSA-2048 DKIM signature; strict DMARC reject enforcement.", "From: orders@cloudgear.com"),
            (2, "Customer Personalization & Masked Data", "Addressed by full legal name; payment masked to last 4 digits (PCI-DSS).", "Salutation: 'Dear Priya Patel' | 'Visa ending 4012'"),
            (3, "Transparent Order Breakdown", "Complete itemized receipt with tax and shipping breakdown.", "Receipt: Order #CG-2026-88190 | Total $152.30"),
            (4, "Direct HTTPS Merchant Link", "Points directly to primary TLS-secured commercial domain.", "URL: https://www.cloudgear.com/account/orders"),
            (5, "Proactive Security Warning & CAN-SPAM", "Warns client never to share passwords; full physical corporate address.", "Notice: 'CloudGear will NEVER ask for passwords'")
        ]
    )

    # 6. Awareness Guide Poster Image
    create_awareness_poster("screenshots/awareness-guide-poster.png")

def create_awareness_poster(filename):
    width, height = 1200, 1500
    img = Image.new("RGB", (width, height), color="#070b14")
    draw = ImageDraw.Draw(img)

    try:
        font_h1 = ImageFont.truetype("arialbd.ttf", 36)
        font_h2 = ImageFont.truetype("arialbd.ttf", 20)
        font_body = ImageFont.truetype("arial.ttf", 14)
        font_bold = ImageFont.truetype("arialbd.ttf", 14)
        font_mono = ImageFont.truetype("courbd.ttf", 13)
    except:
        font_h1 = ImageFont.load_default()
        font_h2 = ImageFont.load_default()
        font_body = ImageFont.load_default()
        font_bold = ImageFont.load_default()
        font_mono = ImageFont.load_default()

    # Outer border
    draw.rectangle([25, 25, width - 25, height - 25], outline="#0284c7", width=3)

    # Top Header Banner
    draw.rounded_rectangle([45, 45, width - 45, 170], radius=12, fill="#0c1322", outline="#1e2e4f", width=2)
    draw.text((width // 2 - 250, 60), "CORPORATE CYBERSECURITY AWARENESS #03", font=font_mono, fill="#38bdf8")
    draw.text((width // 2 - 380, 85), "THINK BEFORE YOU CLICK – STOP PHISHING!", font=font_h1, fill="#ffffff")
    draw.text((width // 2 - 300, 135), "Protect Your Identity • Protect Your Credentials • Protect Our Organization", font=font_body, fill="#94a3b8")

    # Section 1: 5 Critical Warning Signs
    draw.text((60, 200), "5 CRITICAL PHISHING WARNING SIGNS TO WATCH FOR", font=font_h2, fill="#38bdf8")
    
    signs = [
        ("1. Look-Alike & Spoofed Senders", "Inspect characters after '@'. Attackers register subtle variations (e.g. apextrust-auth.xyz instead of apextrust.com)."),
        ("2. Manufactured Panic & Urgency", "Draconian deadlines ('within 24 hours') and threats of account freeze are designed to bypass your rational thought."),
        ("3. Suspicious Links & Subdomain Tricks", "Hover before clicking! Attackers place trusted names in subdomains (chase.com.fake-login.xyz) to deceive you."),
        ("4. Demands for Passwords, PINs or OTPs", "ZERO TRUST: Real banks, logistics couriers, and IT teams will NEVER ask for passwords or MFA codes via email."),
        ("5. Generic Salutations & Unexpected Files", "Watch out for 'Dear Customer' accompanied by unsolicited .zip, .html, or macro-enabled documents.")
    ]

    y_s = 240
    for title, desc in signs:
        draw.rounded_rectangle([60, y_s, width - 60, y_s + 70], radius=8, fill="#0c162d", outline="#1e2e4f", width=1)
        draw.text((80, y_s + 12), title, font=font_bold, fill="#f87171")
        draw.text((80, y_s + 38), desc, font=font_body, fill="#e2e8f0")
        y_s += 85

    # Section 2: Dos and Don'ts
    draw.text((60, y_s + 20), "ESSENTIAL EMAIL DEFENSE HABITS (DO'S AND DON'TS)", font=font_h2, fill="#38bdf8")
    y_s += 60

    # DO Box
    draw.rounded_rectangle([60, y_s, 580, y_s + 260], radius=8, fill="#064e3b", outline="#10b981", width=1)
    draw.text((80, y_s + 15), "✅ MANDATORY ACTIONS (DO)", font=font_bold, fill="#6ee7b7")
    dos = [
        "• Hover over every link to verify the true root domain.",
        "• Verify requests out-of-band using known internal phone numbers.",
        "• Navigate to banking and payroll using saved bookmarks.",
        "• Click 'Report Phishing' immediately when an email looks suspicious.",
        "• Forward suspected emails as attachments (.eml format) to the SOC."
    ]
    y_do = y_s + 45
    for item in dos:
        draw.text((80, y_do), item, font=font_body, fill="#ffffff")
        y_do += 40

    # DONT Box
    draw.rounded_rectangle([620, y_s, width - 60, y_s + 260], radius=8, fill="#7f1d1d", outline="#ef4444", width=1)
    draw.text((640, y_s + 15), "❌ STRICTLY PROHIBITED (NEVER)", font=font_bold, fill="#fca5a5")
    donts = [
        "• NEVER click links warning of immediate account suspension.",
        "• NEVER enter passwords or PINs on external unverified portals.",
        "• NEVER open unexpected .zip, .html, or .docm attachments.",
        "• NEVER move conversations to Telegram or WhatsApp for jobs.",
        "• NEVER reply or click 'Unsubscribe' in suspected phishing emails."
    ]
    y_dont = y_s + 45
    for item in donts:
        draw.text((640, y_dont), item, font=font_body, fill="#ffffff")
        y_dont += 40

    # Section 3: 5-Step Reporting Procedure
    y_s += 280
    draw.text((60, y_s + 10), "SAFE INCIDENT RESPONSE: STOP → VERIFY → REPORT → DELETE → WARN", font=font_h2, fill="#38bdf8")
    y_s += 50

    steps = [
        ("1. STOP", "Pause & Disengage", "#ef4444"),
        ("2. VERIFY", "Out-of-Band Channel", "#f59e0b"),
        ("3. REPORT", "Submit to SOC / Ribbon", "#38bdf8"),
        ("4. DELETE", "Purge from Inbox/Trash", "#a855f7"),
        ("5. WARN", "Alert Team & Peers", "#10b981")
    ]
    step_width = (width - 120 - 40) // 5
    for i, (code, desc, col) in enumerate(steps):
        x_st = 60 + i * (step_width + 10)
        draw.rounded_rectangle([x_st, y_s, x_st + step_width, y_s + 80], radius=8, fill="#0c1322", outline=col, width=1)
        draw.text((x_st + 15, y_s + 15), code, font=font_bold, fill=col)
        draw.text((x_st + 15, y_s + 45), desc, font=font_body, fill="#cbd5e1")

    # Footer Emergency Contacts
    y_s += 110
    draw.rounded_rectangle([60, y_s, width - 60, y_s + 80], radius=8, fill="#0c162d", outline="#0284c7", width=1)
    draw.text((80, y_s + 20), "EMERGENCY SECURITY CONTACTS:", font=font_bold, fill="#38bdf8")
    draw.text((80, y_s + 45), "SOC Hotline: 1-800-SEC-TEAM (Ext. 9911) | Email: security-incident@organization.internal | Helpdesk: Ext. 4357", font=font_mono, fill="#ffffff")

    img.save(filename, "PNG")
    print(f"Created awareness poster: {filename}")

if __name__ == "__main__":
    main()
