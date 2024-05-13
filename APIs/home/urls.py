from django.urls import path
from . import views

urlpatterns = [
    # URL pour les statistiques générales
    path('stats/', views.stats.as_view(), name='stats'),
    # URL pour les publications par année
    path('PublicationsByYear/', views.PublicationsByYear.as_view(), name='publications_by_year'),
    # URL pour la qualité des chercheurs
    path('quality/', views.quality.as_view(), name='quality'),
    # URL pour les dernières publications
    path('LatestPublications/', views.LatestPublications.as_view(), name='latest_publications_by_year'),
    # URL pour les chefs d'équipe
    path('Chefsequipes/', views.Chefsequipes.as_view(), name='Chefsequipes'),
]
