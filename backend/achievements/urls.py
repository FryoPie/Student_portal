from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AchievementViewSet, NotificationViewSet
from . import views

router = DefaultRouter()
router.register(r'list', AchievementViewSet, basename='achievement')
router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.custom_login, name='login'),
    path('create-admin/', views.create_admin_user, name='create_admin'),
]
