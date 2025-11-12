from rest_framework import serializers
from .models import Achievement, Notification
from users.serializers import UserSerializer


class AchievementSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.username', read_only=True)
    student_id = serializers.IntegerField(source='student.id', read_only=True)
    verified_by_name = serializers.CharField(source='verified_by.username', read_only=True, allow_null=True)

    class Meta:
        model = Achievement
        fields = [
            'id', 'student', 'student_name', 'student_id', 'title',
            'description', 'category', 'status', 'proof_document',
            'achievement_date', 'verified_by', 'verified_by_name',
            'verification_notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'student', 'verified_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['student'] = self.context['request'].user
        return super().create(validated_data)


class NotificationSerializer(serializers.ModelSerializer):
    achievement_title = serializers.CharField(source='achievement.title', read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'user', 'achievement', 'achievement_title', 'message', 'is_read', 'created_at']
        read_only_fields = ['id', 'user', 'achievement', 'message', 'created_at']
