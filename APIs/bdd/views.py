# Import des modules nécessaires
from django.core.management import call_command  # Appel de la commande Django
from rest_framework.response import Response  # Import de la réponse de l'API REST Framework

# Fonction pour peupler les données
def populate_data(request):
    # Liste des commandes de gestion à exécuter
    management_commands = [
        "fill_chercheurs",  # Remplir les chercheurs
        "fill_confjournal",  # Remplir les conférences et les journaux
        "fill_pubs",  # Remplir les publications
    ]
    # Boucle à travers les commandes de gestion
    for command in management_commands:
        # Appel de la commande de gestion actuelle
        call_command(command)
    # Retourne une réponse indiquant que les données ont été peuplées avec succès
    return Response({"message": "Données peuplées avec succès."})
