import os
import csv
from rest_framework.response import Response
from django.core.management.base import BaseCommand
from django.core.exceptions import ValidationError
from bdd.models import Chercheur, Publication, ConfJournal

def fill_publications_from_csv(csv_file_path):
    """
    Remplit le modèle de publication à partir d'un fichier CSV.

    Arguments :
        csv_file_path (str) : Chemin vers le fichier CSV contenant les données de publication.

    Retour :
        None
    """
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            try:
                # Crée une instance de Publication à partir des données de la ligne du fichier CSV
                Publication.objects.create(
                    ConfJournal_id=ConfJournal.objects.get(ConfJournal_id=row['ConfJournal_id']),
                    chercheur_id=Chercheur.objects.get(chercheur_id=row['chercheur_id']),
                    date_publication=row['date_publication'],
                    titre_publication=row['titre_publication'],
                    nombre_pages=row.get('nombre_pages', None),  # Gère les champs optionnels manquants
                    nombre_volumes=row.get('nombre_volumes', None),  # Gère les champs optionnels manquants
                    lien=row.get('lien', ''),  # Fournit une valeur par défaut pour le champ optionnel
                    rang=row.get('rang', None),  # Gère les champs optionnels manquants
                )
            except ValidationError as e:
                # Gère les erreurs de validation lors de la création de la publication
                print(f"Erreur lors de la création de la publication : {e}")
                Response({"Erreur lors de la création de la publication"})
            except Chercheur.DoesNotExist:
                # Gère le cas où le chercheur spécifié n'existe pas dans la base de données
                print(f"Le chercheur avec chercheur_id {row['chercheur_id']} n'existe pas.")

class Command(BaseCommand):
    help = 'Peupler le modèle de publication à partir d\'un fichier CSV'

    def handle(self, *args, **options):
        # Chemin vers le répertoire contenant le fichier CSV
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        # Chemin complet vers le fichier CSV de publications
        csv_file_path = os.path.join(base_dir, 'data', 'publications.csv')
        # Appel de la fonction pour remplir le modèle de publication à partir du fichier CSV
        fill_publications_from_csv(csv_file_path)
        # Message de réussite affiché dans la console
        self.stdout.write(self.style.SUCCESS('Données de publication peuplées avec succès.'))
