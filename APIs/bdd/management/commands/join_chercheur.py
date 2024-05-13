import os
import pandas as pd
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Joindre les données CSV et peupler le modèle Chercheur'

    def handle(self, *args, **options):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Chemin vers le répertoire racine du projet
        chercheur_csv_path = os.path.join(base_dir, 'data', 'chercheurs.csv')  # Chemin vers le fichier CSV des chercheurs
        chercheur_api_csv_path = os.path.join(base_dir, 'data', 'chercheurs_api.csv')  # Chemin vers le fichier CSV des chercheurs de l'API
        utilisateur_csv_path = os.path.join(base_dir, 'data', 'utilisateur.csv')  # Chemin vers le fichier CSV des utilisateurs
        output_csv_path = os.path.join(base_dir, 'data', 'chercheur.csv')  # Chemin vers le fichier CSV de sortie
        
        # Lecture des fichiers CSV en DataFrames
        chercheur_df = pd.read_csv(chercheur_csv_path)
        chercheur_api_df = pd.read_csv(chercheur_api_csv_path)
        utilisateur_df = pd.read_csv(utilisateur_csv_path)        
        
        # Fusion des DataFrames
        merged_df = pd.merge(chercheur_df, chercheur_api_df, on='nom_complet', how='inner')
        merged_df = pd.merge(merged_df, utilisateur_df, on='nom_complet', how='inner')
        
        # Écriture du DataFrame fusionné dans un fichier CSV
        merged_df.to_csv(output_csv_path, index=False)
