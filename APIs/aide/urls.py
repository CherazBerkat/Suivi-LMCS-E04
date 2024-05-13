from django.urls import path
from .views import Signaler

urlpatterns = [
    # Définition de l'URL pour le signalement
    path('signaler/', Signaler.as_view(), name='signaler'),
]
