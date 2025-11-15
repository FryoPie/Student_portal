from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

User = get_user_model()


class StudentIDBackend(ModelBackend):
    """
    Custom authentication backend that allows users to log in using their student_id (roll number)
    instead of username.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        student_id = kwargs.get('student_id') or username

        if student_id is None or password is None:
            return None

        try:
            user = User.objects.get(student_id=student_id)
        except User.DoesNotExist:
            return None

        if user.check_password(password) and self.user_can_authenticate(user):
            return user

        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
