from django.urls import path
from .views import CustomTokenObtainPairView, RegisterView, CurrentUserView

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', CurrentUserView.as_view(), name='current_user'),
]