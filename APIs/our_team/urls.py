from django.urls import path
from . import views

urlpatterns = [
    # URL pour afficher les équipes de recherche et leurs membres
    path('', views.our_team.as_view(), name='our_team'),
]
