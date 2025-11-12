from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AchievementViewSet, NotificationViewSet

router = DefaultRouter()
router.register(r'list', AchievementViewSet, basename='achievement')
router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = [
    path('', include(router.urls)),
]
