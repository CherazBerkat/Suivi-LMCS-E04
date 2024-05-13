from django.urls import path
from . import views 
urlpatterns = [
    path('getchercheurs/' , views.Getchercheurs.as_view(), name='chercheurs-list'),
    path('getutilisateurs/', views.Getutilisateurs.as_view(), name='user-list'),
    path('Ajouterchercheurs/', views.AjouterChercheur.as_view(), name='chercheur-create'),
    path('AjouterConfJouranl/', views.AjouterVenue.as_view(), name='venue-create'),
    path('Ajouterpublication/',views.AjouterPublication.as_view(), name='pub-create'),
    path('Modifstatut/', views.ChercheurUpdateStatuts.as_view(), name='update-status'),
    path('Modifrole/',views.UserUpdateRole.as_view(), name='update-role'),
    path('ModifConfJouranl/', views.VenueUpdate.as_view(), name='update-venue'),
    path('AjouterProjet/',views.AjouterProjet.as_view(),name='AjouterProjet'),
    path('AjouterEncadrement/',views.AjouterEncadrement.as_view(),name='AjouterEncadrement'),
    path('InfoUtilisateurs/',views.InfoUtilisateurs.as_view(),name='InfoUtilisateurs'),
    path('InfoChercheur/',views.InfoChercheur.as_view(),name='InfoChercheur'),

]