# Import des modules Django nécessaires
from django.core.management.base import BaseCommand  # Import de la classe de commande de base de Django
from bdd.models import Utilisateur  # Import du modèle Utilisateur depuis le module bdd.models

# Définition de la commande personnalisée
class Command(BaseCommand):
    help = 'Ajouter un assistant et un administrateur à la base de données'  # Description de la commande

    # Méthode de gestion de la commande
    def handle(self, *args, **options):
        # Définition des informations de l'assistant
        assistant_email = 'assistant@gmail.com'
        assistant_password = 'assistant_password'
        nom_utilisateur = 'assistant'
        nom_complet = 'assistant'
        photo_url = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        
        # Création de l'assistant dans la base de données
        assistant = Utilisateur.objects.create(
            email=assistant_email,
            password=assistant_password,
            photo_url=photo_url,
            nom_complet=nom_complet,
            nom_utilisateur=nom_utilisateur,
            role='assistant'
        )
        
        # Définition des informations de l'administrateur
        admin_email = 'admin@gmail.com'
        admin_password = 'admin_password'
        nom_utilisateur = 'admin'
        nom_complet = 'admin'
        photo_url = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        
        # Création de l'administrateur dans la base de données
        admin = Utilisateur.objects.create(
            email=admin_email,
            password=admin_password,
            photo_url=photo_url,
            nom_complet=nom_complet,
            nom_utilisateur=nom_utilisateur,
            role='admin'
        )

        # Affichage d'un message de réussite dans la console
        self.stdout.write(self.style.SUCCESS('Starting...'))
