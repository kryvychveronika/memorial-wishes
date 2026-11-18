from django.contrib import admin
from .models import Wish, FulfillmentReport

@admin.register(Wish)
class WishAdmin(admin.ModelAdmin):
    list_display = ('hero_name', 'wish_title', 'city', 'category', 'difficulty', 'status', 'claimed_by', 'created_at')
    list_filter = ('status', 'category', 'difficulty', 'city')
    search_fields = ('hero_name', 'wish_title', 'hero_story', 'submitted_by_name')
    actions = ['approve_wishes', 'mark_completed']

    @admin.action(description='Схвалити вибрані бажання')
    def approve_wishes(self, request, queryset):
        queryset.update(status='approved')

    @admin.action(description='Позначити як виконані')
    def mark_completed(self, request, queryset):
        queryset.update(status='completed')


@admin.register(FulfillmentReport)
class FulfillmentReportAdmin(admin.ModelAdmin):
    list_display = ('wish', 'volunteer', 'created_at', 'is_approved')
    list_filter = ('is_approved', 'created_at')
    search_fields = ('wish__hero_name', 'wish__wish_title', 'volunteer__username', 'report_text')
