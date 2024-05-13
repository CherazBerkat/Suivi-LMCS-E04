from django.urls import path
from . import views

urlpatterns = [
    # Chemin pour obtenir les informations personnelles d'un chercheur
    path('chercheur_personal_info/', views.ChercheurPersonalInfo.as_view(), name='chercheur_personal_info'),
    
    # Chemin pour obtenir les informations personnelles d'un utilisateur
    path('user_personal_info/', views.UserPersonalInfo.as_view(), name='user_personal_info'),
    
    # Chemin pour obtenir les publications d'un chercheur
    path('chercheur_publications/', views.ChercheurPublications.as_view(), name='chercheur_publications'),
    
    # Chemin pour obtenir les détails d'une publication
    path('view_publication/', views.ViewPublication.as_view(), name='view_publication'),
    
    # Chemin alternatif pour obtenir les détails d'une publication
    path("view_publication2/", views.ViewPublication2.as_view(), name="view_publication2"),
    
    # Chemin pour modifier une publication
    path('modif_publication/', views.ModifPublication.as_view(), name='modif_publication'),
    
    # Chemin pour modifier la photo d'un utilisateur
    path('modif_photo/', views.ModifPhoto.as_view(), name='modif_photo'),
    
    # Chemin pour obtenir les encadrements d'un chercheur
    path('chercheur_encadrements/', views.ChercheurEncadrements.as_view(), name='chercheur_encadrements'),
    
    # Chemin pour obtenir les projets d'un chercheur
    path('chercheur_projects/', views.ChercheurProjects.as_view(), name='chercheur_projects'),
]
