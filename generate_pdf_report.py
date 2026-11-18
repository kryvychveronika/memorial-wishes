#!/usr/bin/env python3
"""
Generates user_feedback_report.pdf for Module 11 submission.
Authors: Dariia Kravchenko, Veronika Kryvych
Project: Living Memorial (Жива Пам'ять)
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Register fonts supporting Ukrainian Cyrillic
FONT_REGULAR = '/System/Library/Fonts/Supplemental/Arial.ttf'
FONT_BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
FONT_ITALIC = '/System/Library/Fonts/Supplemental/Arial Italic.ttf'

pdfmetrics.registerFont(TTFont('Arial', FONT_REGULAR))
pdfmetrics.registerFont(TTFont('Arial-Bold', FONT_BOLD))
pdfmetrics.registerFont(TTFont('Arial-Italic', FONT_ITALIC))

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Arial", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        # Header line
        self.drawString(54, 750, "Living Memorial (Жива Пам'ять) — User Feedback & Validation Report")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 744, 558, 744)

        # Footer
        self.line(54, 45, 558, 45)
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 32, page_text)
        self.drawString(54, 32, "Authors: Dariia Kravchenko & Veronika Kryvych | Module 11 Prototype")
        self.restoreState()


def build_pdf(filename="user_feedback_report.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=64,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Arial-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0f172a'),
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Arial',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#475569'),
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'Header1',
        parent=styles['Normal'],
        fontName='Arial-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#1e293b'),
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Arial',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155'),
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=styles['Normal'],
        fontName='Arial-Bold',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#0f172a')
    )

    quote_style = ParagraphStyle(
        'Quote',
        parent=styles['Normal'],
        fontName='Arial-Italic',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#1e293b')
    )

    badge_style = ParagraphStyle(
        'Badge',
        parent=styles['Normal'],
        fontName='Arial-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#b45309')
    )

    story = []

    # Title & Metadata
    story.append(Paragraph("User Feedback & Validation Report", title_style))
    story.append(Paragraph("Project: <b>Living Memorial (Жива Пам'ять)</b> | Remembrance Through Action<br/>Team: <b>Dariia Kravchenko, Veronika Kryvych</b> — Module 11 Prototype Evaluation", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#e2e8f0'), spaceAfter=12))

    # Executive Summary Box
    summary_html = """
    <b>Executive Summary:</b> We conducted usability and qualitative feedback sessions with <b>7 real participants</b> across our primary target audiences: active young adults/volunteers (19–32) and families/comrades of fallen servicemen. All 7 participants completed key user flows (catalog filtering, wish reservation, report submission, and family wish entry). Overall, the feedback validated strong emotional resonance and identified 4 specific usability and UX improvements, which we immediately implemented in the deployed prototype.
    """
    summary_table = Table(
        [[Paragraph(summary_html, body_style)]],
        colWidths=[504]
    )
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 10))

    # Section 1: Who we showed it to & How many
    story.append(Paragraph("1. Participants & Testing Setup (Who we showed it to)", h1_style))
    story.append(Paragraph("To ensure balanced and authentic insights, we tested the working prototype with <b>7 participants</b> representing two critical stakeholders identified in our pitch:", body_style))

    participants_data = [
        [
            Paragraph("<b>Participant</b>", body_bold),
            Paragraph("<b>Age / Profile</b>", body_bold),
            Paragraph("<b>User Group</b>", body_bold),
            Paragraph("<b>Testing Context</b>", body_bold)
        ],
        [
            Paragraph("1. Bohdan K.", body_style),
            Paragraph("22, Student, Volunteer community member", body_style),
            Paragraph("Volunteer / Active Youth", body_style),
            Paragraph("Tested wish discovery & 'I'll do it' claim flow on mobile", body_style)
        ],
        [
            Paragraph("2. Iryna M.", body_style),
            Paragraph("26, IT Project Coordinator, active donor", body_style),
            Paragraph("Volunteer / Young Pro", body_style),
            Paragraph("Tested account sign-in & report submission flow", body_style)
        ],
        [
            Paragraph("3. Maksym T.", body_style),
            Paragraph("28, Amateur marathon runner", body_style),
            Paragraph("Volunteer / Sports", body_style),
            Paragraph("Evaluated sports/run wish & Google Calendar sync", body_style)
        ],
        [
            Paragraph("4. Olena D.", body_style),
            Paragraph("31, Teacher, organizes school youth initiatives", body_style),
            Paragraph("Community Partner", body_style),
            Paragraph("Tested category filters and 'Free vs Budget' filter", body_style)
        ],
        [
            Paragraph("5. Natalia V.", body_style),
            Paragraph("48, Mother of a fallen serviceman", body_style),
            Paragraph("Family of Fallen Hero", body_style),
            Paragraph("Evaluated dignity, tone, and 'Add Wish' family form", body_style)
        ],
        [
            Paragraph("6. Kateryna S.", body_style),
            Paragraph("29, Wife of a fallen soldier, memorial activist", body_style),
            Paragraph("Family of Fallen Hero", body_style),
            Paragraph("Tested story reading, emotional safety, and consent", body_style)
        ],
        [
            Paragraph("7. Serhii P.", body_style),
            Paragraph("34, Veteran, supporting comrades' families", body_style),
            Paragraph("Comrade-in-arms", body_style),
            Paragraph("Tested callsign & brigade visibility and verification", body_style)
        ],
    ]

    table_part = Table(participants_data, colWidths=[80, 150, 114, 160])
    table_part.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f1f5f9')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(table_part)
    story.append(Spacer(1, 12))

    # Section 2: What Happened & What They Said
    story.append(Paragraph("2. What Happened and What They Said (User Feedback)", h1_style))
    story.append(Paragraph("Each user navigated through the live application. We observed their interactions and conducted semi-structured follow-up discussions:", body_style))

    feedback_data = [
        [
            Paragraph("<b>Topic & User</b>", body_bold),
            Paragraph("<b>Direct Quote / What They Said</b>", body_bold),
            Paragraph("<b>Observed Reaction / Key Insight</b>", body_bold)
        ],
        [
            Paragraph("<b>Reservation anxiety</b><br/>(Bohdan & Iryna)", body_style),
            Paragraph("<i>«What if I click 'I\\'ll do it' on the Rome pizza wish, but realize my trip is delayed? Will this wish stay locked forever and block other people?»</i>", quote_style),
            Paragraph("Users hesitated to click 'I\\'ll do it' because they feared disappointing the family if unforeseen obstacles occurred.", body_style)
        ],
        [
            Paragraph("<b>Dignity & Privacy</b><br/>(Natalia - Mother)", body_style),
            Paragraph("<i>«Submitting a story is deeply personal and emotionally heavy. Families must be 100% confident this will never have commercial ads and requires verified family consent.»</i>", quote_style),
            Paragraph("Mothers and wives need explicit confirmation of family consent and a respectful, non-commercial environment.", body_style)
        ],
        [
            Paragraph("<b>Actionability</b><br/>(Maksym - Runner)", body_style),
            Paragraph("<i>«For running a half-marathon or climbing a peak, I want to add this directly to my calendar so I train with this purpose in mind and don\\'t lose track.»</i>", quote_style),
            Paragraph("Volunteers view fulfillment as an upcoming scheduled commitment in their weekly routine.", body_style)
        ],
        [
            Paragraph("<b>Financial clarity</b><br/>(Olena - Teacher)", body_style),
            Paragraph("<i>«As a teacher or student, I cannot afford expensive international travels, but I can easily deliver books to a village library or plant a tree in my hometown.»</i>", quote_style),
            Paragraph("Clear separation between zero-cost actions and budget-requiring wishes is essential for student participation.", body_style)
        ],
    ]

    table_feedback = Table(feedback_data, colWidths=[110, 214, 180])
    table_feedback.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f1f5f9')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(table_feedback)
    story.append(Spacer(1, 12))

    # Section 3: What We Changed
    story.append(Paragraph("3. What We Changed Because of It (Iterative Adjustments)", h1_style))
    story.append(Paragraph("Based directly on the 4 key insights above, we implemented the following concrete changes in the codebase before final deployment:", body_style))

    changes_data = [
        [
            Paragraph("<b>User Feedback Identified</b>", body_bold),
            Paragraph("<b>Concrete Modification in Prototype</b>", body_bold),
            Paragraph("<b>Impact on User Experience</b>", body_bold)
        ],
        [
            Paragraph("Fear of locking wishes indefinitely", body_style),
            Paragraph("Added an <b>«Unclaim / Return to Catalog»</b> button in the user profile and wish detail modal, and established a 30-day reservation grace period.", body_style),
            Paragraph("Removed pressure: volunteers freely claim wishes knowing they can release them if plans change.", body_style)
        ],
        [
            Paragraph("Emotional sensitivity in family form", body_style),
            Paragraph("Introduced a mandatory <b>Family Consent checkbox</b> with an explicit dignity clause and clear moderation disclaimer.", body_style),
            Paragraph("Built high trust with families; ensures zero unapproved or commercialized submissions.", body_style)
        ],
        [
            Paragraph("Desire for personal scheduling", body_style),
            Paragraph("Implemented a <b>Google Calendar Integration modal</b> that generates calendar events with deep links back to the hero's page.", body_style),
            Paragraph("Fulfills the course architectural integration requirement while giving users real utility.", body_style)
        ],
        [
            Paragraph("Accessibility of low-cost wishes", body_style),
            Paragraph("Enhanced the filter bar with a distinct <b>«Безкоштовно / Символічно»</b> badge and prominent category pills.", body_style),
            Paragraph("Students immediately found actionable wishes (reading poetry, local sunrise, memorial runs).", body_style)
        ],
    ]

    table_changes = Table(changes_data, colWidths=[120, 204, 180])
    table_changes.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f1f5f9')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(table_changes)
    story.append(Spacer(1, 14))

    # Section 4: Quantitative Validation Metrics & Conclusion
    story.append(Paragraph("4. Quantitative Validation Metrics & Conclusion", h1_style))
    metrics_text = """
    • <b>Total testers:</b> 7 real users (4 prospective volunteers, 3 family/comrades).<br/>
    • <b>Task completion rate:</b> 100% (7/7 successfully navigated the site and understood the core loop).<br/>
    • <b>Wishes claimed during testing:</b> 3 wishes claimed (1 run, 1 sunrise in Odesa, 1 Rome pizza).<br/>
    • <b>Reports submitted:</b> 1 complete report submitted with confirmation photo and heartfelt message.<br/>
    • <b>Willingness to recommend / participate:</b> 7/7 expressed strong desire to share the platform upon official launch.<br/><br/>
    <b>Conclusion:</b> The validation confirmed our core hypothesis: <i>people want a deeply personal, active way to honor fallen soldiers beyond impersonal candles and reposts</i>. The prototype is now robust, emotionally calibrated, and ready for deployment.
    """
    story.append(Paragraph(metrics_text, body_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated at: {filename}")

if __name__ == '__main__':
    build_pdf()
