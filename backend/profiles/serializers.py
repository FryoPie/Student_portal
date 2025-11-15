from rest_framework import serializers
from .models import StudentProfile
from users.serializers import UserSerializer


class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    student_id = serializers.CharField(source='user.student_id', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = StudentProfile
        fields = [
            'id', 'user', 'student_id', 'email', 'full_name',
            'profile_picture', 'bio', 'department',
            'year', 'cgpa', 'phone', 'linkedin_url', 'github_url',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'student_id', 'created_at', 'updated_at']

    def get_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}".strip() or obj.user.student_id
