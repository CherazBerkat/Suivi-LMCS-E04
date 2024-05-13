# Import des modules Django nécessaires
from django.db import models  # Import du module de définition de modèles de Django

# Modèles de données

class Chercheur(models.Model):
    chercheur_id = models.CharField(primary_key=True, max_length=255)  # Identifiant du chercheur
    nom_complet = models.CharField(max_length=255, null=True)  # Nom complet du chercheur
    email = models.EmailField(blank=True, null=True)  # Adresse e-mail du chercheur
    tel = models.CharField(max_length=20, blank=True, null=True)  # Numéro de téléphone du chercheur
    diplome = models.CharField(max_length=255, null=True)  # Diplôme du chercheur
    etablissement_origine = models.CharField(max_length=255, null=True)  # Établissement d'origine du chercheur
    qualite = models.CharField(max_length=255, null=True)  # Qualité du chercheur
    grade_enseignement = models.CharField(max_length=255, null=True, blank=True)  # Grade d'enseignement du chercheur
    grade_recherche = models.CharField(max_length=255, null=True, blank=True)  # Grade de recherche du chercheur
    hindex = models.IntegerField(null=True)  # Indice h du chercheur
    equipe = models.CharField(max_length=255, null=True)  # Équipe du chercheur
    chef_E = models.BooleanField(default=False)  # Chef d'équipe (booléen)
    dblp = models.URLField(null=True)  # URL du profil DBLP du chercheur
    ggl_scholar = models.URLField(null=True)  # URL du profil Google Scholar du chercheur
    site_personel = models.URLField(null=True)  # URL du site personnel du chercheur
    search_gate = models.URLField(null=True)  # URL du profil ResearchGate du chercheur
    statut = models.CharField(max_length=255, null=True)  # Statut du chercheur
    ORCID = models.CharField(max_length=255, null=True)  # Identifiant ORCID du chercheur

    def save(self, *args, **kwargs):
        # Vérification et mise à jour du statut de chef d'équipe
        if self.chef_E:
            Chercheur.objects.filter(equipe=self.equipe, chef_E=True).exclude(chercheur_id=self.chercheur_id).update(chef_E=False)
        super().save(*args, **kwargs)  # Appel de la méthode save() de la classe parente


class ConfJournal(models.Model):
    ConfJournal_id = models.CharField(max_length=255, primary_key=True)  # Identifiant de la conférence ou du journal
    nom = models.CharField(max_length=255, null=True)  # Nom de la conférence ou du journal
    type = models.CharField(max_length=255, null=True)  # Type de la conférence ou du journal
    periodicite = models.CharField(max_length=255, null=True)  # Périodicité de la conférence ou du journal
    lien = models.URLField(null=True)  # Lien vers la conférence ou le journal en ligne
    Maison_Edition = models.CharField(max_length=255, default='', null=True)  # Maison d'édition du journal


class Publication(models.Model):
    ConfJournal_id = models.ForeignKey(ConfJournal, on_delete=models.CASCADE)  # Clé étrangère vers la conférence ou le journal
    chercheur_id = models.ForeignKey(Chercheur, on_delete=models.CASCADE)  # Clé étrangère vers le chercheur
    date_publication = models.PositiveIntegerField()  # Date de publication de la publication
    titre_publication = models.CharField(max_length=255, null=True)  # Titre de la publication
    nombre_pages = models.CharField(max_length=255, null=True)  # Nombre de pages de la publication
    nombre_volumes = models.CharField(max_length=255, null=True)  # Nombre de volumes de la publication
    lien = models.URLField(default='', null=True)  # Lien vers la publication complète
    rang = models.CharField(max_length=255, null=True)  # Rang de la publication

    class Meta:
        unique_together = (('ConfJournal_id', 'titre_publication', 'date_publication', 'chercheur_id'),)


class ConfJournalClassification(models.Model):
    ConfJournal_id = models.ForeignKey(ConfJournal, on_delete=models.CASCADE)  # Clé étrangère vers la conférence ou le journal
    Class_CORE = models.CharField(max_length=255, null=True)  # Classification CORE
    Class_Scimago = models.CharField(max_length=255, null=True)  # Classification Scimago
    Class_DGRSDT = models.CharField(max_length=255, null=True)  # Classification DGRSDT
    Class_Qualis = models.CharField(max_length=255, null=True)  # Classification Qualis
    Class_Autres = models.CharField(max_length=255, null=True)  # Autres classifications


class Encadrement(models.Model):
    encad_id = models.CharField(primary_key=True, max_length=255)  # Identifiant de l'encadrement
    type = models.CharField(max_length=255, null=True)  # Type d'encadrement
    titre = models.CharField(max_length=255, null=True)  # Titre de l'encadrement
    noms_prenoms = models.CharField(max_length=255, null=True)  # Noms et prénoms de l'encadrant
    annee_debut = models.IntegerField(null=True)  # Année de début de l'encadrement
    annee_fin_previsionnelle = models.IntegerField(null=True)  # Année de fin prévisionnelle de l'encadrement


class Encadrement_Chercheur(models.Model):
    encad_id = models.ForeignKey(Encadrement, on_delete=models.CASCADE)  # Clé étrangère vers l'encadrement
    chercheur_id = models.ForeignKey(Chercheur, on_delete=models.CASCADE)  # Clé étrangère vers le chercheur

    class Meta:
        unique_together = (('chercheur_id', 'encad_id'),)


class Projet(models.Model):
    projet_id = models.CharField(primary_key=True, max_length=255)  # Identifiant du projet
    intitule = models.CharField(max_length=255, null=True)  # Intitulé du projet
    chef_projet = models.CharField(max_length=255, null=True)  # Chef de projet du projet
    domaine = models.CharField(max_length=255, null=True)  # Domaine du projet
    liste_membres = models.TextField(null=True, blank=True)  # Liste des membres du projet
    date_debut = models.DateField(null=True)  # Date de début du projet
    date_fin = models.DateField(null=True)  # Date de fin du projet


class Prj_Cher(models.Model):
    projet_id = models.ForeignKey(Projet, on_delete=models.CASCADE)  # Clé étrangère vers le projet
    chercheur_id = models.ForeignKey(Chercheur, on_delete=models.CASCADE)  # Clé étrangère vers le chercheur
    role = models.CharField(max_length=255)  # Rôle dans le projet (chef de projet ou membre)

    class Meta:
        unique_together = (('projet_id', 'chercheur_id'),)


class Utilisateur(models.Model):
    utilisateur_id = models.AutoField(primary_key=True)  # Identifiant de l'utilisateur
    email = models.EmailField(null=True)  # Adresse e-mail de l'utilisateur
    password = models.CharField(max_length=255, null=True)  # Mot de passe de l'utilisateur
    chercheur_id = models.ForeignKey(Chercheur, on_delete=models.SET_NULL, null=True)  # Clé étrangère vers le chercheur
    NOMS_ROLES = [
        ('directeur', 'Directeur'),
        ('assistant', 'Assistant'),
        ('chercheur', 'Chercheur'),
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=20, choices=NOMS_ROLES, null=True)  # Rôle de l'utilisateur
    nom_utilisateur = models.CharField(max_length=255, default='', null=True)  # Nom d'utilisateur
    nom_complet = models.CharField(max_length=255, null=True)  # Nom complet de l'utilisateur
    photo_url = models.URLField(default='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')  # URL de la photo de profil de l'utilisateur
