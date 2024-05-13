import os
import django
from rest_framework.response import Response
import csv
from django.core.management.base import BaseCommand
from django.core.exceptions import ValidationError
from bdd.models import Chercheur, Utilisateur

def fill_db_from_csv(csv_file_path):
    """
    Remplit les modèles Chercheur et Utilisateur à partir d'un fichier CSV.

    Arguments :
        csv_file_path (str) : Chemin vers le fichier CSV contenant les données de Chercheur et Utilisateur.

    Retour :
        None
    """
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # Convertit les chaînes vides en None pour les champs qui ne peuvent pas être vides
            for key, value in row.items():
                if value == '':
                    row[key] = None
            try:
                # Crée un objet Chercheur à partir des données de la ligne actuelle du fichier CSV
                chercheur = Chercheur.objects.create(
                    chercheur_id=row['chercheur_id'],
                    nom_complet=row['nom_complet'],
                    email=row['email'],
                    tel=row['tel'],
                    diplome=row['diplome'],
                    etablissement_origine=row['etablissement_origine'],
                    qualite=row['qualite'],
                    grade_enseignement=row.get('grade_enseignement', None),
                    grade_recherche=row.get('grade_recherche', None),
                    hindex=row.get('hindex', None),
                    equipe=row['equipe'],
                    dblp=row.get('dblp', None),
                    ORCID=row.get('ORCID', None),
                    statut=row.get('statut', None),
                    chef_E=row['chef_E']
                )
                # Détermine le rôle en fonction du nom complet
                if row['nom_complet'] == "BENATCHBA Karima":
                    role = 'directeur'
                else:
                    role = 'chercheur'
                # Crée un objet Utilisateur associé au Chercheur
                Utilisateur.objects.create(
                    email=row['email'],
                    chercheur_id=chercheur,
                    nom_utilisateur=row['nom_utilisateur'],
                    nom_complet=row['nom_complet'],
                    role=role,
                    password=row['nom_complet'],  # Définit le mot de passe par défaut comme le nom complet
                    photo_url=row.get('photo_url', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')
                )
            except ValidationError as e:
                # Gère les erreurs de validation lors de la création du Chercheur ou de l'Utilisateur
                print(f"Erreur lors de la création du Chercheur ou de l'Utilisateur : {e}")
                Response({"Daja"})

class Command(BaseCommand):
    help = 'Peuple les modèles Chercheur et Utilisateur à partir d\'un fichier CSV'

    def handle(self, *args, **options):
        # Mettez à jour le chemin du fichier CSV ici
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        csv_file_path = os.path.join(base_dir, 'data', 'chercheur.csv') 
        # Appelle la fonction pour remplir les modèles Chercheur et Utilisateur à partir du fichier CSV
        fill_db_from_csv(csv_file_path)
        # Affiche un message de succès une fois que le peuplement est terminé
        self.stdout.write(self.style.SUCCESS('Données de Chercheur et Utilisateur peuplées avec succès.'))
