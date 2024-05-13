from django.urls import path
from home.views import PublicationsByYear, quality
from .views import Team

urlpatterns = [
    # URL pour afficher les publications par année
    path('PublicationsByYear/', PublicationsByYear.as_view(), name='publications_by_year'),
    # URL pour afficher la qualité
    path('quality/', quality.as_view(), name='quality'),
    # URL pour afficher notre équipe
    path('ourTeam', Team.as_view(), name='ourTeam'),
]
