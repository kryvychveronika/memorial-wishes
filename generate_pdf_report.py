#!/usr/bin/env python3
"""
Academic User Feedback Report for Module 11 Submission.
Authors: Dariia Kravchenko, Veronika Kryvych
Format: Clean academic paper, Times New Roman 14pt, black text, no decorative boxes.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Register Times New Roman
FONT_REGULAR = '/System/Library/Fonts/Supplemental/Times New Roman.ttf'
FONT_BOLD = '/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf'
FONT_ITALIC = '/System/Library/Fonts/Supplemental/Times New Roman Italic.ttf'
FONT_BOLD_ITALIC = '/System/Library/Fonts/Supplemental/Times New Roman Bold Italic.ttf'

pdfmetrics.registerFont(TTFont('Times-Roman-UA', FONT_REGULAR))
pdfmetrics.registerFont(TTFont('Times-Bold-UA', FONT_BOLD))
pdfmetrics.registerFont(TTFont('Times-Italic-UA', FONT_ITALIC))
pdfmetrics.registerFont(TTFont('Times-BoldItalic-UA', FONT_BOLD_ITALIC))

class AcademicNumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(AcademicNumberedCanvas, self).__init__(*args, **kwargs)
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
        self.setFont("Times-Roman-UA", 11)
        self.setFillColor(colors.black)
        # Standard academic page number at bottom center
        page_text = f"{self._pageNumber}"
        self.drawCentredString(306, 36, page_text)
        self.restoreState()


def build_pdf(filename="user_feedback_report.pdf"):
    # Standard margins: 2.5 cm (approx 70 pt) left, right, top, bottom
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Academic Typography: Times New Roman, 14pt, black, 1.15-1.2 leading (17pt)
    title_style = ParagraphStyle(
        'AcadTitle',
        parent=styles['Normal'],
        fontName='Times-Bold-UA',
        fontSize=15,
        leading=19,
        textColor=colors.black,
        alignment=1, # Centered
        spaceAfter=14
    )

    meta_style = ParagraphStyle(
        'AcadMeta',
        parent=styles['Normal'],
        fontName='Times-Roman-UA',
        fontSize=14,
        leading=18,
        textColor=colors.black,
        alignment=1,
        spaceAfter=18
    )

    h1_style = ParagraphStyle(
        'AcadH1',
        parent=styles['Normal'],
        fontName='Times-Bold-UA',
        fontSize=14,
        leading=18,
        textColor=colors.black,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'AcadBody',
        parent=styles['Normal'],
        fontName='Times-Roman-UA',
        fontSize=14,
        leading=18,
        textColor=colors.black,
        alignment=4, # Justified
        firstLineIndent=24,
        spaceAfter=6
    )

    body_no_indent = ParagraphStyle(
        'AcadBodyNoIndent',
        parent=styles['Normal'],
        fontName='Times-Roman-UA',
        fontSize=14,
        leading=18,
        textColor=colors.black,
        spaceAfter=6
    )

    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Times-Roman-UA',
        fontSize=12,
        leading=15,
        textColor=colors.black
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Times-Bold-UA',
        fontSize=12,
        leading=15,
        textColor=colors.black
    )

    story = []

    # Title & Authors
    story.append(Paragraph("<b>ЗВІТ ПРО ТЕСТУВАННЯ ТА ВІДГУКИ КОРИСТУВАЧІВ</b>", title_style))
    story.append(Paragraph("Проєкт: «Жива Пам'ять» (Living Memorial)<br/>Автори: Дарія Кравченко, Вероніка Кривич<br/>Модуль 11. Працюючий прототип продукту", meta_style))
    story.append(Spacer(1, 10))

    # Introduction
    intro_p = """Для валідації концепту та оцінки зручності прототипу веб-платформи «Жива Пам'ять» було проведено серію сесій тестування з реальними користувачами. Оскільки основною цільовою аудиторією для взяття та виконання бажань є активна студентська та волонтерська молодь, для тестування було залучено 7 респондентів віком від 18 до 21 року, які є студентами українських університетів або беруть активну участь у волонтерських ініціативах."""
    story.append(Paragraph(intro_p, body_style))

    # Section 1: Who was tested
    story.append(Paragraph("1. Учасники тестування (Кому показували прототип)", h1_style))
    p1 = """У тестуванні взяли участь 7 осіб. Усім респондентам було запропоновано виконати ключові дії в інтерфейсі: переглянути каталог нездійснених бажань захисників, застосувати фільтри, зареєструватися / увійти, натиснути кнопку взяття бажання в роботу («Я виконаю»), перевірити додавання події в календар, надіслати звіт із фото та протестувати форму подання бажання від імені родини."""
    story.append(Paragraph(p1, body_style))

    table_data = [
        [
            Paragraph("<b>Респондент</b>", table_cell_bold),
            Paragraph("<b>Вік / Профіль</b>", table_cell_bold),
            Paragraph("<b>Статус</b>", table_cell_bold),
            Paragraph("<b>Сценарій тестування</b>", table_cell_bold)
        ],
        [
            Paragraph("Богдан К.", table_cell),
            Paragraph("20 років, студент КПІ", table_cell),
            Paragraph("Студент, волонтерство", table_cell),
            Paragraph("Пошук бажань у каталозі, бронювання мрії через смартфон", table_cell)
        ],
        [
            Paragraph("Анна М.", table_cell),
            Paragraph("19 років, студентка НаУКМА", table_cell),
            Paragraph("Студентка", table_cell),
            Paragraph("Реєстрація у системі, тестування фільтрів за містом і складністю", table_cell)
        ],
        [
            Paragraph("Дмитро С.", table_cell),
            Paragraph("21 рік, студент КНУ ім. Шевченка", table_cell),
            Paragraph("Студент, волонтерство", table_cell),
            Paragraph("Взяття спортивного бажання («Півмарафон») та синхронізація з календарем", table_cell)
        ],
        [
            Paragraph("Юлія П.", table_cell),
            Paragraph("18 років, студентка ЛНУ ім. Франка", table_cell),
            Paragraph("Студентка", table_cell),
            Paragraph("Перегляд сторінки історії захисника, подання форми від родини", table_cell)
        ],
        [
            Paragraph("Максим Т.", table_cell),
            Paragraph("20 років, студент НТУ «ДП»", table_cell),
            Paragraph("Студент, волонтерство", table_cell),
            Paragraph("Тестування форми надсилання звіту з фотографією виконання", table_cell)
        ],
        [
            Paragraph("Олена Р.", table_cell),
            Paragraph("21 рік, волонтерка молодіжного центру", table_cell),
            Paragraph("Волонтерство", table_cell),
            Paragraph("Оцінка етики форми згоди родини та фільтрації безкоштовних дій", table_cell)
        ],
        [
            Paragraph("Артем В.", table_cell),
            Paragraph("19 років, студент КНЕУ", table_cell),
            Paragraph("Студент", table_cell),
            Paragraph("Перевірка скасування взяття бажання та повернення до каталогу", table_cell)
        ]
    ]

    # Academic table with clean black borders
    table = Table(table_data, colWidths=[80, 140, 110, 174])
    table.setStyle(TableStyle([
        ('LINEABOVE', (0,0), (-1,0), 1, colors.black),
        ('LINEBELOW', (0,0), (-1,0), 1, colors.black),
        ('LINEBELOW', (0,-1), (-1,-1), 1, colors.black),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(table)
    story.append(Spacer(1, 10))

    # Section 2: What they said
    story.append(Paragraph("2. Результати спостережень та відгуки (Що сказали користувачі)", h1_style))
    p2_1 = """Під час тестування респонденти позитивно оцінили саму ідею платформи: перетворення скорботи на дію сприймається молоддю набагато глибше, ніж формальні свічки пам'яті в соціальних мережах. Водночас користувачі висловили низку важливих зауважень щодо інтерфейсу та логіки взаємодії:"""
    story.append(Paragraph(p2_1, body_style))

    f1 = """<b>1. Побоювання заблокувати бажання назавжди:</b> Богдан (20 років) та Анна (19 років) зазначили, що бояться натискати кнопку «Я виконаю», якщо не впевнені у точних термінах. <i>«Якщо я оберу бажання з'їсти піцу в Римі або поїхати в Одесу, а моя поїздка відкладеться, чи не заблокую я цю мрію для інших людей назавжди?»</i> — зазначив Богдан. Користувачі попросили можливість легко відмовитися від виконання, якщо обставини змінилися."""
    story.append(Paragraph(f1, body_style))

    f2 = """<b>2. Потреба у безкоштовних та простих вчинках для студентів:</b> Юлія (18 років) та Артем (19 років) наголосили, що більшість студентів не мають великих фінансових можливостей для далеких подорожей чи коштовних дій. <i>«Для мене важливо одразу бачити бажання, які не потребують грошей: передати збірку віршів бібліотеці, пробігти дистанцію чи відвідати пам'ятне місце в моєму місті»</i>, — зауважила Юлія."""
    story.append(Paragraph(f2, body_style))

    f3 = """<b>3. Планування виконання у календарі:</b> Дмитро (21 рік) та Максим (20 років) звернули увагу на те, що взяття бажання — це зобов'язання, яке легко загубити в щоденному розкладі. Вони запропонували додати швидку кнопку планування події у Google Calendar."""
    story.append(Paragraph(f3, body_style))

    f4 = """<b>4. Тональність та підтвердження згоди родини:</b> Олена (21 рік, волонтерка) підкреслила чутливість теми: <i>«Форма додавання обов'язково повинна містити чітку позначку про згоду найближчих родичів, щоб уникнути конфліктів та маніпуляцій, а також гарантію відсутності комерційної реклами»</i>."""
    story.append(Paragraph(f4, body_style))

    # Section 3: What we changed
    story.append(Paragraph("3. Внесені зміни за результатами тестування", h1_style))
    p3_intro = """На основі отриманих коментарів до робочого прототипу було внесено такі доопрацювання:"""
    story.append(Paragraph(p3_intro, body_style))

    ch1 = """1. <b>Додано функцію повернення бажання до каталогу:</b> у модальному вікні та особистому кабінеті волонтера реалізовано кнопку «Повернути до каталогу». Якщо плани волонтера змінилися, він може зняти бронювання в один клік без штрафів і психологічного бар'єру."""
    story.append(Paragraph(ch1, body_style))

    ch2 = """2. <b>Виділено фільтр за складністю та фінансами:</b> у каталог додано чіткий перемикач «Безкоштовно / Символічно» та «Потребує витрат». Це дозволило студентам одразу знаходити доступні для них вчинки пам'яті."""
    story.append(Paragraph(ch2, body_style))

    ch3 = """3. <b>Впроваджено інтеграцію з Google Calendar:</b> додано окреме вікно планування, яке генерує подію в Google Calendar з датою, описом мрії воїна та посиланням на картку пам'яті."""
    story.append(Paragraph(ch3, body_style))

    ch4 = """4. <b>Оновлено естетику та форми подання:</b> інтерфейс переведено на спокійну меморіальну палітру та академічні шрифти, усунено надмірно яскраві кольори. У форму додавання бажання введено обов'язковий пункт підтвердження згоди родини полеглого захисника."""
    story.append(Paragraph(ch4, body_style))

    # Section 4: Quantitative Metrics
    story.append(Paragraph("4. Підсумкові показники тестування", h1_style))
    metrics_text = """Усі 7 учасників успішно пройшли повний користувацький шлях від ознайомлення з концептом до бронювання бажання. За час тестування респонденти створили 7 облікових записів, взяли в роботу 3 бажання та надіслали 1 тестовий звіт із фотопідтвердженням. Тестування підтвердило життєздатність продукту та його глибоке емоційне сприйняття цільовою аудиторією молоді."""
    story.append(Paragraph(metrics_text, body_style))

    doc.build(story, canvasmaker=AcademicNumberedCanvas)
    print(f"PDF successfully generated at: {filename}")

if __name__ == '__main__':
    build_pdf()
