# Import des modules Django nécessaires
from django.urls import path  # Import du module de gestion des URLs de Django
from .views import populate_data  # Import de la fonction populate_data depuis le fichier views du même répertoire

# Définition des URL de l'application
urlpatterns = [
    # Chemin pour l'action de remplissage des données
    path('populate_data/', populate_data, name='populate_data'),  # Lien vers la fonction populate_data avec le nom 'populate_data'
]
