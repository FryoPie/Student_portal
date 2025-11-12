from django.contrib import admin
from .models import Achievement, Notification


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ['title', 'student', 'category', 'status', 'verified_by', 'created_at']
    list_filter = ['status', 'category', 'created_at']
    search_fields = ['title', 'student__username', 'description']
    readonly_fields = ['created_at', 'updated_at']
    list_editable = ['status']


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'achievement', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['user__username', 'message']
    readonly_fields = ['created_at']
