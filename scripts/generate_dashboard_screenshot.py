import os
from PIL import Image, ImageDraw, ImageFont

def create_dashboard_screenshot(filename="screenshots/dashboard-overview.png"):
    width, height = 1280, 800
    img = Image.new("RGB", (width, height), color="#070b14")
    draw = ImageDraw.Draw(img)

    try:
        font_h1 = ImageFont.truetype("arialbd.ttf", 22)
        font_h2 = ImageFont.truetype("arialbd.ttf", 15)
        font_body = ImageFont.truetype("arial.ttf", 12)
        font_bold = ImageFont.truetype("arialbd.ttf", 12)
        font_mono = ImageFont.truetype("courbd.ttf", 11)
        font_big = ImageFont.truetype("arialbd.ttf", 28)
    except:
        font_h1 = ImageFont.load_default()
        font_h2 = ImageFont.load_default()
        font_body = ImageFont.load_default()
        font_bold = ImageFont.load_default()
        font_mono = ImageFont.load_default()
        font_big = ImageFont.load_default()

    # Top Navbar (height: 60)
    draw.rectangle([0, 0, width, 60], fill="#0c1322", outline="#1e2e4f", width=1)
    draw.rectangle([20, 15, 50, 45], fill="#0284c7")
    draw.text((60, 20), "PHISHSHIELD", font=font_h1, fill="#ffffff")
    draw.text((220, 25), "v1.0 • SOC TIER-1", font=font_mono, fill="#38bdf8")
    draw.text((width - 320, 23), "SYSTEM: ACTIVE DEFENSE | UTC TIME SYNC", font=font_mono, fill="#10b981")
    draw.rounded_rectangle([width - 150, 16, width - 20, 44], radius=6, fill="#7f1d1d", outline="#ef4444", width=1)
    draw.text((width - 138, 23), "RISK: ELEVATED", font=font_mono, fill="#fca5a5")

    # Left Sidebar (width: 220)
    draw.rectangle([0, 60, 220, height], fill="#0c1322", outline="#1e2e4f", width=1)
    draw.text((20, 80), "ANALYST WORKSPACE", font=font_mono, fill="#64748b")
    
    sidebar_items = [
        ("Dashboard Overview", True),
        ("Email Forensics (5)", False),
        ("Annotated Evidence", False),
        ("Warning Checklist", False),
        ("Safe Reporting SOP", False),
        ("Awareness Guide", False),
        ("Knowledge Quiz", False),
    ]
    y_nav = 110
    for label, is_act in sidebar_items:
        if is_act:
            draw.rounded_rectangle([15, y_nav, 205, y_nav + 34], radius=6, fill="#0f2042", outline="#0284c7", width=1)
            draw.text((28, y_nav + 9), label, font=font_bold, fill="#38bdf8")
        else:
            draw.text((28, y_nav + 9), label, font=font_body, fill="#94a3b8")
        y_nav += 42

    # Main Dashboard Body (x: 240 to width - 20)
    # Hero Banner
    draw.rounded_rectangle([240, 80, width - 25, 175], radius=10, fill="#0c162d", outline="#0284c7", width=1)
    draw.text((260, 95), "PROJECT 03 • PHISHING EMAIL ANALYSIS & AWARENESS DEFENSE", font=font_mono, fill="#38bdf8")
    draw.text((260, 118), "Cybersecurity Email Threat Intelligence & Analysis Platform", font=font_h1, fill="#ffffff")
    draw.text((260, 148), "Dissection of 5 realistic specimens • SPF/DKIM/DMARC evaluation • Stop-Verify-Report Incident SOP", font=font_body, fill="#cbd5e1")

    # 4 Metric Cards
    metric_cards = [
        ("TOTAL ANALYZED", "5", "3 Phish (60%) • 2 Safe", "#38bdf8"),
        ("MALICIOUS PHISHING", "3", "Bank KYC, Job, Parcel", "#f87171"),
        ("VERIFIED GENUINE", "2", "100% SPF/DKIM Pass", "#34d399"),
        ("DETECTION ACCURACY", "100%", "Zero False Positives", "#c084fc")
    ]
    x_card = 240
    c_w = (width - 25 - 240 - 45) // 4
    for title, val, sub, col in metric_cards:
        draw.rounded_rectangle([x_card, 190, x_card + c_w, 280], radius=8, fill="#0c1322", outline="#1e2e4f", width=1)
        draw.text((x_card + 15, 200), title, font=font_mono, fill="#94a3b8")
        draw.text((x_card + 15, 220), val, font=font_big, fill=col)
        draw.text((x_card + 15, 258), sub, font=font_body, fill="#64748b")
        x_card += c_w + 15

    # Lower Grid: Left Table (width: 630), Right Auth Triad (width: 350)
    # Table Box
    draw.rounded_rectangle([240, 295, 880, 775], radius=10, fill="#0c1322", outline="#1e2e4f", width=1)
    draw.text((260, 312), "FORENSIC EMAIL SPECIMENS", font=font_h2, fill="#ffffff")
    draw.text((260, 332), "Select any specimen to inspect raw headers and forensic evidence callout markers.", font=font_body, fill="#64748b")

    samples_preview = [
        ("Specimen 01: Fake Bank KYC Verification", "PHISHING", "96/100", "security-verify@apextrust-secure-auth.xyz", True),
        ("Specimen 02: Fake Job Offer & Recruitment Scam", "PHISHING", "92/100", "hr-careers@apexcorp-careers-global.work", True),
        ("Specimen 03: Fake Parcel Delivery Notification", "PHISHING", "89/100", "notifications@fasttrack-delivery-update.info", True),
        ("Specimen 04: Normal Professional Communication", "SAFE", "4/100", "s.jenkins@innovatetech.internal", False),
        ("Specimen 05: Legitimate Order Confirmation", "SAFE", "2/100", "orders@cloudgear.com", False),
    ]

    y_row = 360
    for title, verdict, risk, sender, is_p in samples_preview:
        row_bg = "#120f1a" if is_p else "#0a1822"
        v_col = "#f87171" if is_p else "#34d399"
        v_box = "#7f1d1d" if is_p else "#064e3b"

        draw.rounded_rectangle([255, y_row, 865, y_row + 70], radius=6, fill=row_bg, outline="#1e2e4f", width=1)
        draw.text((270, y_row + 10), title, font=font_bold, fill="#ffffff")
        draw.text((270, y_row + 32), f"From: {sender}", font=font_mono, fill="#94a3b8")
        draw.text((270, y_row + 50), f"Risk Score: {risk}", font=font_mono, fill="#64748b")

        # Verdict pill
        draw.rounded_rectangle([760, y_row + 18, 850, y_row + 45], radius=4, fill=v_box, outline=v_col, width=1)
        draw.text((775, y_row + 24), verdict, font=font_bold, fill=v_col)

        y_row += 80

    # Right Card: Cryptographic Auth Triad
    draw.rounded_rectangle([900, 295, width - 25, 520], radius=10, fill="#0c1322", outline="#1e2e4f", width=1)
    draw.text((920, 312), "EMAIL AUTH TRIAD", font=font_h2, fill="#ffffff")
    draw.text((920, 332), "Protocol status across 5 specimens", font=font_body, fill="#64748b")

    draw.rounded_rectangle([920, 360, width - 45, 405], radius=6, fill="#070b14", outline="#1e2e4f", width=1)
    draw.text((930, 370), "SPF: 2 Pass / 3 Fail", font=font_mono, fill="#f87171")
    draw.text((930, 388), "IP spoofing detected on all 3 phish", font=font_body, fill="#64748b")

    draw.rounded_rectangle([920, 415, width - 45, 460], radius=6, fill="#070b14", outline="#1e2e4f", width=1)
    draw.text((930, 425), "DKIM: 2 Pass / 3 Fail", font=font_mono, fill="#f87171")
    draw.text((930, 443), "Missing/broken body hash signatures", font=font_body, fill="#64748b")

    draw.rounded_rectangle([920, 470, width - 45, 515], radius=6, fill="#070b14", outline="#1e2e4f", width=1)
    draw.text((930, 480), "DMARC: 2 Pass / 3 Fail", font=font_mono, fill="#f87171")
    draw.text((930, 498), "Domain alignment rejects rogues", font=font_body, fill="#64748b")

    # Right Card: 5-Stage SOP Quick Box
    draw.rounded_rectangle([900, 535, width - 25, 775], radius=10, fill="#0c162d", outline="#0284c7", width=1)
    draw.text((920, 552), "RESPONSE LIFECYCLE", font=font_mono, fill="#38bdf8")
    draw.text((920, 575), "STOP • VERIFY • REPORT", font=font_h2, fill="#ffffff")
    draw.text((920, 600), "DELETE • WARN", font=font_h2, fill="#ffffff")
    draw.text((920, 630), "Human incident response SOP to", font=font_body, fill="#cbd5e1")
    draw.text((920, 650), "contain threats across the org.", font=font_body, fill="#cbd5e1")
    draw.text((920, 680), "SOC Emergency Hotline:", font=font_mono, fill="#38bdf8")
    draw.text((920, 700), "1-800-SEC-TEAM (Ext. 9911)", font=font_bold, fill="#ffffff")

    img.save(filename, "PNG")
    print(f"Created dashboard overview screenshot: {filename}")

if __name__ == "__main__":
    create_dashboard_screenshot()
