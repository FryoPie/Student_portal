from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('coordinator', 'Coordinator'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    email = models.EmailField(unique=True)
    student_id = models.CharField(max_length=10, unique=True, help_text='Roll Number')

    USERNAME_FIELD = 'student_id'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return f"{self.student_id} ({self.get_role_display()})"

    class Meta:
        ordering = ['-date_joined']
