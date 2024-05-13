import os
import django
from datetime import datetime
from django.utils.dateparse import parse_date

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'APIs.settings')

# Initialize Django settings
django.setup()
import csv
from django.core.exceptions import ValidationError
from bdd.models import Chercheur, ConfJournal, Publication, ConfJournalClassification, Encadrement, Encadrement_Chercheur, Projet, Prj_Cher, Utilisateur

def fill_db_from_csv(csv_file_path):
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            try:
                Chercheur.objects.create(
                    chercheur_id=row['chercheur_id'],
                    nom_complet=row['nom_complet'],
                    email=row['email'],
                    tel=row['tel'],
                    diplome=row['diplome'],
                    etablissement_origine=row['etablissement_origine'],
                    qualite=row['qualite'],
                    grade_enseignement=row['grade_enseignement'],
                    grade_recherche=row['grade_recherche'],
                    hindex=int(row['hindex']),  
                    equipe=row['equipe'],
                    dblp=row['dblp'],
                    
                    statut=row['statut']
                )
            except ValidationError as e:
                print(f"Error creating Chercheur: {e}")


def fill_conf_journals(csv_file_path):
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            try:
                ConfJournal.objects.create(
                    ConfJournal_id=row['ConfJournal_id'],
                    nom=row['nom'],
                    type=row['type'],
                    periodicite=row['periodicite'],
                    lien=row['lien']
                )
            except ValidationError as e:
                print(f"Error creating ConfJournal: {e}")




def fill_publications(csv_file_path):
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            try:
                Publication.objects.create(
                    ConfJournal_id_id=row['ConfJournal_id'],  # Assuming 'ConfJournal_id' in CSV is the ForeignKey ID
                    chercheur_id_id=row['chercheur_id'],  # Assuming 'chercheur_id' in CSV is the ForeignKey ID
                    date_publication=row['date_publication'],
                    titre_publication=row['titre_publication'],
                    nombre_pages=row['nombre_pages'],
                    nombre_volumes=row['nombre_volumes'],
                    lien=row['lien'],
                    rang=int(row['rang'])
                )
            except ValidationError as e:
                print(f"Error creating Publication: {e}")

def fill_conf_journal_classifications(csv_file_path):
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            try:
                ConfJournalClassification.objects.create(
                    ConfJournal_id_id=row['ConfJournal_id'],  # Assuming 'ConfJournal_id' in CSV is the ForeignKey ID
                    Class_CORE=row['Class_CORE'],
                    Class_Scimago=row['Class_Scimago'],
                    Class_DGRSDT=row['Class_DGRSDT'],
                    Class_Qualis=row['Class_Qualis'],
                    Class_Autres=row['Class_Autres']
                )
            except ValidationError as e:
                print(f"Error creating ConfJournalClassification: {e}")



def fill_encadrements(csv_file_path):
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            try:
                annee_fin_previsionnelle_str = row['annee_fin_previsionnelle'].strip()
                if annee_fin_previsionnelle_str.lower() == 'null':
                    annee_fin_previsionnelle = None  # Store None for NULL values
                else:
                    annee_fin_previsionnelle = int(annee_fin_previsionnelle_str)
                
                Encadrement.objects.create(
                    encad_id=row['encad_id'],
                    type=row['type'],
                    titre=row['titre'],
                    noms_prenoms=row['noms_prenoms'],
                    annee_debut=int(row['annee_debut']),
                    annee_fin_previsionnelle=annee_fin_previsionnelle  # Use the converted value or None
                )
            except ValidationError as e:
                print(f"Error creating Encadrement: {e}")



def fill_encadrement_chercheurs(csv_file_path):
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            try:
                Encadrement_Chercheur.objects.create(
                    encad_id_id=row['encad_id'],  # Assuming 'encad_id' in CSV is the ForeignKey ID
                    chercheur_id_id=row['chercheur_id'],  # Assuming 'chercheur_id' in CSV is the ForeignKey ID
                )
            except ValidationError as e:
                print(f"Error creating Encadrement_Chercheur: {e}")



def fill_projets(csv_file_path):
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            try:
           
                date_debut_str = row['date_debut'].strip()
                date_fin_str = row['date_fin'].strip()

                # Convert date strings to datetime objects
                date_debut = parse_date(date_debut_str)
                date_fin = parse_date(date_fin_str) if date_fin_str.lower() != 'null' else None

                Projet.objects.create(
                    projet_id=row['projet_id'],
                    intitule=row['intitule'],
                    chef_projet=row['chef_projet'],
                    domaine=row['domaine'],
                    liste_membres=row['liste_membres'],
                    date_debut=date_debut,
                    date_fin=date_fin
                )
            except ValidationError as e:
                print(f"Error creating Projet: {e}")
             




common_path = '..\\csvfile\\'       # remplacer avec votre path vers le dossier de 

csv_file_path = common_path+'chercheur_fake_data.csv'
fill_db_from_csv(csv_file_path)

conf_journal_csv_path = common_path+'ConfJournal_fake_data.csv'
fill_conf_journals(conf_journal_csv_path)

publication_csv_path = common_path+'publications_fake_data.csv'
fill_publications(publication_csv_path)


conf_journal_class_csv_path = common_path+'ConfJournalClassification_fake_data.csv'
fill_conf_journal_classifications(conf_journal_class_csv_path)


projet_csv_path = common_path+'projet_fake_data.csv'
fill_projets(projet_csv_path)

encad_csv_path = common_path+'encadrement_fake_data.csv'
fill_encadrements(encad_csv_path)

