from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Achievement, Notification
from .serializers import AchievementSerializer, NotificationSerializer
from .permissions import IsStudentOwnerOrCoordinator, IsCoordinator


class AchievementViewSet(viewsets.ModelViewSet):
    queryset = Achievement.objects.select_related('student', 'verified_by').all()
    serializer_class = AchievementSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        elif self.action in ['verify', 'pending']:
            permission_classes = [permissions.IsAuthenticated, IsCoordinator]
        else:
            permission_classes = [permissions.IsAuthenticated, IsStudentOwnerOrCoordinator]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Achievement.objects.select_related('student', 'verified_by').all()

        student_id = self.request.query_params.get('student_id', None)
        if student_id:
            queryset = queryset.filter(student_id=student_id)

        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)

        return queryset

    @action(detail=False, methods=['get'])
    def my_achievements(self, request):
        achievements = Achievement.objects.filter(student=request.user)
        serializer = self.get_serializer(achievements, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated, IsCoordinator])
    def pending(self, request):
        pending_achievements = Achievement.objects.filter(status='pending')
        serializer = self.get_serializer(pending_achievements, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsCoordinator])
    def verify(self, request, pk=None):
        achievement = self.get_object()
        new_status = request.data.get('status')
        verification_notes = request.data.get('verification_notes', '')

        if new_status not in ['verified', 'rejected']:
            return Response(
                {'error': 'Status must be either "verified" or "rejected"'},
                status=status.HTTP_400_BAD_REQUEST
            )

        achievement.status = new_status
        achievement.verified_by = request.user
        achievement.verification_notes = verification_notes
        achievement.save()

        serializer = self.get_serializer(achievement)
        return Response(serializer.data)


class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        serializer = self.get_serializer(notification)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def mark_all_read(self, request):
        Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
        return Response({'status': 'all notifications marked as read'})
