from django.db import models
from django.contrib.auth.models import User

class Wish(models.Model):
    CATEGORY_CHOICES = [
        ('travel', 'Подорожі та місця'),
        ('sport', 'Спорт та виклики'),
        ('food', 'Їжа та кулінарія'),
        ('culture', 'Культура та мистецтво'),
        ('family', 'Сім\'я та діти'),
        ('other', 'Інше'),
    ]

    DIFFICULTY_CHOICES = [
        ('free', 'Безкоштовно / Символічно'),
        ('budget', 'Потребує фінансових витрат'),
    ]

    STATUS_CHOICES = [
        ('pending', 'На модерації'),
        ('approved', 'Очікує волонтера'),
        ('claimed', 'В процесі виконання'),
        ('completed', 'Виконано'),
    ]

    # Hero info
    hero_name = models.CharField('Ім\'я та позивний захисника', max_length=200)
    photo_url = models.URLField('Посилання на фото захисника', max_length=500, blank=True)
    hero_story = models.TextField('Коротка історія про захисника')
    military_unit = models.CharField('Підрозділ / Бригада (за бажанням)', max_length=200, blank=True)

    # Wish info
    wish_title = models.CharField('Назва бажання', max_length=250)
    wish_description = models.TextField('Опис бажання')
    city = models.CharField('Місто / Локація', max_length=150, default='Вся Україна')
    category = models.CharField('Категорія', max_length=50, choices=CATEGORY_CHOICES, default='other')
    difficulty = models.CharField('Складність', max_length=20, choices=DIFFICULTY_CHOICES, default='free')

    # Family submission info
    submitted_by_name = models.CharField('Хто подав (ПІБ, ким доводиться)', max_length=150)
    submitted_by_email = models.EmailField('Email контактної особи')
    family_consent = models.BooleanField('Згода родини на публікацію', default=True)

    # Moderation & Lifecycle
    status = models.CharField('Статус', max_length=20, choices=STATUS_CHOICES, default='approved')
    claimed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='claimed_wishes', verbose_name='Волонтер')
    claimed_at = models.DateTimeField('Час взяття в роботу', null=True, blank=True)
    created_at = models.DateTimeField('Дата додавання', auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Бажання'
        verbose_name_plural = 'Бажання'

    def __str__(self):
        return f"{self.hero_name} — {self.wish_title} ({self.get_status_display()})"


class FulfillmentReport(models.Model):
    wish = models.OneToOneField(Wish, on_delete=models.CASCADE, related_name='report', verbose_name='Бажання')
    volunteer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reports', verbose_name='Волонтер')
    report_text = models.TextField('Як пройшло виконання / Звіт')
    report_photo_url = models.URLField('Фото-підтвердження (URL)', max_length=500, blank=True)
    created_at = models.DateTimeField('Дата виконання', auto_now_add=True)
    is_approved = models.BooleanField('Схвалено для публікації', default=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Звіт про виконання'
        verbose_name_plural = 'Звіти про виконання'

    def __str__(self):
        return f"Звіт: {self.wish.wish_title} від {self.volunteer.username}"
