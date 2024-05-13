import random
import datetime
from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from faker import Faker  # Import de la bibliothèque Faker pour la génération de données aléatoires
from bdd.models import Chercheur, ConfJournal, Publication, ConfJournalClassification, Encadrement, Encadrement_Chercheur, Projet, Prj_Cher, Utilisateur

fake = Faker()  # Initialisation de Faker pour générer des données factices

class Command(BaseCommand):
    help = 'Générer des données factices pour les modèles'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Indique le nombre de données factices à générer')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        chercheurs = Chercheur.objects.all()

        for _ in range(total):
            # Sélection aléatoire d'un chercheur dans la base de données
            chercheur = random.choice(chercheurs)

            # Création d'un ConfJournal factice
            conf_journal = ConfJournal.objects.create(
                ConfJournal_id=fake.uuid4(),
                nom=fake.company(),
                type=fake.random_element(elements=('Conference', 'Journal')),
                periodicite=fake.random_element(elements=('Annuelle', 'Semestrielle', 'Trimestrielle')),
                lien=fake.url(),
                Maison_Edition=fake.company()
            )

            # Création d'une Publication factice associée
            Publication.objects.create(
                ConfJournal_id=conf_journal,
                chercheur_id=chercheur,
                date_publication=random.randint(1990, datetime.datetime.now().year),
                titre_publication=fake.sentence(),
                nombre_pages=fake.random_number(digits=3),
                nombre_volumes=fake.random_number(digits=2),
                lien=fake.url(),
                rang=fake.random_number(digits=2)
            )

            # Création d'un Encadrement factice
            encadrement = Encadrement.objects.create(
                encad_id=fake.uuid4(),
                type=fake.random_element(elements=('Thèse', 'Mémoire', 'Stage')),
                titre=fake.sentence(),
                noms_prenoms=fake.name(),
                annee_debut=random.randint(1990, datetime.datetime.now().year),
                annee_fin_previsionnelle=random.randint(datetime.datetime.now().year, datetime.datetime.now().year + 5)
            )

            # Création d'un Encadrement_Chercheur factice associé
            Encadrement_Chercheur.objects.create(
                encad_id=encadrement,
                chercheur_id=chercheur
            )

            # Création d'un Projet factice
            projet = Projet.objects.create(
                projet_id=fake.uuid4(),
                intitule=fake.sentence(),
                chef_projet=fake.name(),
                domaine=fake.random_element(elements=('Informatique', 'Mathématiques', 'Physique')),
                liste_membres=','.join(fake.name() for _ in range(fake.random_number(digits=1))),
                date_debut=fake.date(),
                date_fin=fake.date()
            )

            # Création d'un Prj_Cher factice associé
            Prj_Cher.objects.create(
                projet_id=projet,
                chercheur_id=chercheur,
                role=fake.random_element(elements=('Chef de projet', 'Membre'))
            )

            # Création d'un Utilisateur factice
            Utilisateur.objects.create(
                email=fake.email(),
                password=make_password(fake.password()),  # Utilisation de make_password pour hasher le mot de passe
                chercheur_id=chercheur,
                role=fake.random_element(elements=('directeur', 'assistant', 'chercheur', 'admin')),
                nom_utilisateur=fake.user_name(),
                nom_complet=fake.name(),
                photo_url=fake.image_url()
            )

        self.stdout.write(self.style.SUCCESS(f'Généré {total} données factices pour les modèles'))  # Message de réussite
