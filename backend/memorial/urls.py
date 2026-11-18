from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WishViewSet, register_user, login_user, get_me

router = DefaultRouter()
router.register(r'wishes', WishViewSet, basename='wish')

urlpatterns = [
    path('auth/register/', register_user, name='register'),
    path('auth/login/', login_user, name='login'),
    path('auth/me/', get_me, name='me'),
    path('', include(router.urls)),
]
