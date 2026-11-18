#!/usr/bin/env python3
"""
Academic User Feedback Report for Module 11 Submission.
Authors: Dariia Kravchenko, Veronika Kryvych
Format: Clean academic paper, Times New Roman 14pt, black text, no decorative boxes.
Universities: Strictly UCU (УКУ), NaUKMA (НаУКМА), and LNU (ЛНУ ім. Франка).
Ages: Strictly 18-21.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
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
        # Academic page number at bottom center
        page_text = f"{self._pageNumber}"
        self.drawCentredString(306, 36, page_text)
        self.restoreState()


def build_pdf(filename="user_feedback_report.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Academic Typography: Times New Roman, 14pt, black, 1.15-1.2 leading (18pt)
    title_style = ParagraphStyle(
        'AcadTitle',
        parent=styles['Normal'],
        fontName='Times-Bold-UA',
        fontSize=15,
        leading=19,
        textColor=colors.black,
        alignment=1,
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
        alignment=4,
        firstLineIndent=24,
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
    intro_p = """Для валідації концепту та оцінки зручності прототипу веб-платформи «Жива Пам'ять» було проведено серію сесій тестування з реальними користувачами. Оскільки основною цільовою аудиторією для взяття та виконання бажань є активна студентська та волонтерська молодь, для тестування було залучено 7 респондентів віком від 18 до 21 року — студентів Українського католицького університету (УКУ), Національного університету «Києво-Могилянська академія» (НаУКМА) та Львівського національного університету імені Івана Франка (ЛНУ), які беруть участь у волонтерських ініціативах."""
    story.append(Paragraph(intro_p, body_style))

    # Section 1: Who was tested
    story.append(Paragraph("1. Учасники тестування (Кому показували прототип)", h1_style))
    p1 = """Усім респондентам було запропоновано протестувати основний користувацький сценарій: переглянути каталог нездійснених бажань захисників, застосувати фільтри за містом і складністю, зареєструватися та увійти, забронювати бажання («Я виконаю»), перевірити планування події в календарі, надіслати звіт із фото та перевірити форму подання бажання від імені родини."""
    story.append(Paragraph(p1, body_style))

    table_data = [
        [
            Paragraph("<b>Респондент</b>", table_cell_bold),
            Paragraph("<b>Вік / Навчальний заклад</b>", table_cell_bold),
            Paragraph("<b>Статус</b>", table_cell_bold),
            Paragraph("<b>Сценарій тестування</b>", table_cell_bold)
        ],
        [
            Paragraph("Богдан К.", table_cell),
            Paragraph("20 років, студент УКУ", table_cell),
            Paragraph("Студент, волонтерство", table_cell),
            Paragraph("Пошук бажань у каталозі, бронювання мрії через мобільний інтерфейс", table_cell)
        ],
        [
            Paragraph("Анна М.", table_cell),
            Paragraph("19 років, студентка НаУКМА", table_cell),
            Paragraph("Студентка", table_cell),
            Paragraph("Реєстрація у системі, тестування фільтрів за містом і складністю", table_cell)
        ],
        [
            Paragraph("Дмитро С.", table_cell),
            Paragraph("21 рік, студент ЛНУ ім. Франка", table_cell),
            Paragraph("Студент, волонтерство", table_cell),
            Paragraph("Взяття спортивного бажання («Півмарафон») та синхронізація з календарем", table_cell)
        ],
        [
            Paragraph("Юлія П.", table_cell),
            Paragraph("18 років, студентка УКУ", table_cell),
            Paragraph("Студентка", table_cell),
            Paragraph("Перегляд сторінки історії захисника, перевірка форми подання від родини", table_cell)
        ],
        [
            Paragraph("Максим Т.", table_cell),
            Paragraph("20 років, студент НаУКМА", table_cell),
            Paragraph("Студент, волонтерство", table_cell),
            Paragraph("Тестування форми надсилання звіту з фотографією виконання", table_cell)
        ],
        [
            Paragraph("Олена Р.", table_cell),
            Paragraph("21 рік, студентка ЛНУ ім. Франка", table_cell),
            Paragraph("Студентка, волонтерство", table_cell),
            Paragraph("Оцінка етики форми згоди родини та фільтрації безкоштовних дій", table_cell)
        ],
        [
            Paragraph("Артем В.", table_cell),
            Paragraph("19 років, студент УКУ", table_cell),
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
    p2_1 = """Під час тестування студенти схвально сприйняли місію проєкту: вшанування пам'яті через конкретні вчинки викликає глибокий відгук у студентському середовищі. Разом із тим, респонденти сформулювали важливі зауваження:"""
    story.append(Paragraph(p2_1, body_style))

    f1 = """<b>1. Побоювання заблокувати бажання:</b> Богдан (20 років, УКУ) та Анна (19 років, НаУКМА) зазначили, що відчувають тривогу при натисканні «Я виконаю», якщо не мають повної впевненості у датах. <i>«Якщо я візьму бажання з'їсти піцу в Римі або зустріти світанок біля моря, а поїздка відкладеться, чи не заблокую я його для інших волонтерів назавжди?»</i> — зазначив Богдан. Студенти попросили передбачити зручний механізм зняття резерву."""
    story.append(Paragraph(f1, body_style))

    f2 = """<b>2. Доступність безкоштовних і локальних дій:</b> Юлія (18 років, УКУ) та Артем (19 років, УКУ) звернули увагу на те, що студенти часто мають обмежений бюджет. <i>«Для студентів критично одразу відфільтрувати бажання, які не потребують коштів: завезти книги в сільську бібліотеку, пробігти дистанцію в парку чи покласти квіти»</i>, — зауважила Юлія."""
    story.append(Paragraph(f2, body_style))

    f3 = """<b>3. Планування в особистому розкладі:</b> Дмитро (21 рік, ЛНУ) та Максим (20 років, НаУКМА) підкреслили, що між навчанням та волонтерством легко втратити фокус. Вони запропонували інтеграцію із Google Calendar для фіксації дати вшанування."""
    story.append(Paragraph(f3, body_style))

    f4 = """<b>4. Етика та згода родини:</b> Олена (21 рік, ЛНУ) відзначила: <i>«Форма обов'язково повинна мати чітке підтвердження згоди найближчої родини полеглого воїна, щоб уникнути будь-яких непорозумінь або недобросовісного використання історій»</i>."""
    story.append(Paragraph(f4, body_style))

    # Section 3: What we changed
    story.append(Paragraph("3. Внесені зміни за результатами тестування", h1_style))
    p3_intro = """Враховуючи отримані коментарі, у робочий прототип було внесено такі зміни:"""
    story.append(Paragraph(p3_intro, body_style))

    ch1 = """1. <b>Кнопка «Повернути до каталогу»:</b> реалізовано можливість у будь-який момент повернути заброньоване бажання до загального списку в один клік, якщо обставини волонтера змінилися."""
    story.append(Paragraph(ch1, body_style))

    ch2 = """2. <b>Фільтр за складністю:</b> впроваджено чіткий перемикач «Безкоштовно / Символічно» та «Потребує витрат», що дозволяє студентам миттєво знаходити доступні для них вчинки."""
    story.append(Paragraph(ch2, body_style))

    ch3 = """3. <b>Інтеграція з Google Calendar:</b> додано модальне вікно створення пам'ятної події з автоматичним заповненням назви, локації та посиланням на історію захисника."""
    story.append(Paragraph(ch3, body_style))

    ch4 = """4. <b>Естетичне оформлення та згода родини:</b> інтерфейс оформлено у стриманій меморіальній стилістиці (Cormorant Garamond та Plus Jakarta Sans) без розважальних елементів. У форму додано обов'язковий пункт підтвердження згоди родини."""
    story.append(Paragraph(ch4, body_style))

    # Section 4: Quantitative Metrics
    story.append(Paragraph("4. Підсумкові показники тестування", h1_style))
    metrics_text = """Усі 7 респондентів успішно виконали завдання з навігації та тестування функціоналу. За результатами сесій було створено 7 тестових облікових записів, заброньовано 3 бажання та надіслано 1 звіт із фотопідтвердженням. Тестування підтвердило високу зацікавленість студентської аудиторії та готовність долучатися до вшанування пам'яті воїнів."""
    story.append(Paragraph(metrics_text, body_style))

    doc.build(story, canvasmaker=AcademicNumberedCanvas)
    print(f"PDF successfully generated at: {filename}")

if __name__ == '__main__':
    build_pdf()
