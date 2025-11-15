from django.contrib import admin
from .models import StudentProfile


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'student_id', 'department', 'year', 'cgpa', 'created_at']
    list_filter = ['department', 'year', 'created_at']
    search_fields = ['user__username', 'user__email', 'student_id', 'department']
    readonly_fields = ['created_at', 'updated_at']
