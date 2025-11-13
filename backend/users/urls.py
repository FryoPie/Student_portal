from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.custom_login, name='login'),
    path('create-admin/', views.create_admin_user, name='create_admin'),
    # Add other user-related URLs here
]
