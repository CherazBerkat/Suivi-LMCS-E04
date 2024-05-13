from django.urls import path
from .views import UpdatePersonalInfo, UpdateChercheurURL, UpdateChercheurPassword

urlpatterns = [
    # URL pour mettre à jour les informations personnelles de l'utilisateur
    path('update_personal_info/', UpdatePersonalInfo.as_view(), name='update_personal_info'),
    # URL pour mettre à jour les URL du chercheur
    path('update_chercheur_url/', UpdateChercheurURL.as_view(), name='update_chercheur_url'),
    # URL pour mettre à jour le mot de passe du chercheur
    path('update_chercheur_password/', UpdateChercheurPassword.as_view(), name='update_chercheur_password'),
]
