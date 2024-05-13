import os
import csv
from rest_framework.response import Response
from django.core.management.base import BaseCommand
from django.core.exceptions import ValidationError
from bdd.models import Chercheur, Publication, ConfJournal

def fill_confjournals_from_csv(csv_file_path):
    """
    Remplit le modèle ConfJournal à partir d'un fichier CSV.

    Arguments :
        csv_file_path (str) : Chemin vers le fichier CSV contenant les données de ConfJournal.

    Retour :
        None
    """
    # Ouvre le fichier CSV en mode lecture
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        # Crée un lecteur CSV qui parcourt les lignes du fichier
        reader = csv.DictReader(file)
        # Parcourt chaque ligne du fichier CSV
        for row in reader:
            try:
                # Vérifie si le ConfJournal existe déjà dans la base de données
                if not ConfJournal.objects.filter(ConfJournal_id=row['ConfJournal_id']).exists():
                    # Crée un nouvel objet ConfJournal à partir des données de la ligne actuelle du fichier CSV
                    ConfJournal.objects.create(
                        ConfJournal_id=row['ConfJournal_id'],  # ID du ConfJournal
                        nom=row.get('nom', None),  # Nom du ConfJournal (optionnel)
                        type=row.get('type', None),  # Type du ConfJournal (optionnel)
                        periodicite=row.get('periodicite', None),  # Périodicité du ConfJournal (optionnel)
                        lien=row.get('lien', None),  # Lien vers le ConfJournal (optionnel)
                    )
            except ValidationError as e:
                # Gère les erreurs de validation lors de la création du ConfJournal
                print(f"Erreur lors de la création du ConfJournal : {e}")
                Response({"Daja"})

class Command(BaseCommand):
    # Description de la commande pour la gestion de commande Django
    help = 'Peuple le modèle ConfJournal à partir d\'un fichier CSV'

    def handle(self, *args, **options):
        # Mettez à jour le chemin du fichier CSV ici
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        csv_file_path = os.path.join(base_dir, 'data', 'confjournal.csv') 
        # Appelle la fonction pour remplir le modèle ConfJournal à partir du fichier CSV
        fill_confjournals_from_csv(csv_file_path)
        # Affiche un message de succès une fois que le peuplement est terminé
        self.stdout.write(self.style.SUCCESS('Données de ConfJournal peuplées avec succès.'))
