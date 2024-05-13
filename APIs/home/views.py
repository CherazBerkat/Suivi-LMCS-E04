from rest_framework import generics
from django.http import JsonResponse
from django.db.models import Count
from django.db.models.functions import Length
from bdd.models import Chercheur, Publication, ConfJournal, ConfJournalClassification, Encadrement, Encadrement_Chercheur, Projet, Prj_Cher, Utilisateur
from bdd.serializers import (
    ChercheurSerializer, UtilisateurSerializer,
    PublicationSerializer, EncadrementSerializer, ProjetSerializer
)
from datetime import datetime
from rest_framework.views import APIView
from collections import defaultdict
from rest_framework import serializers
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

#########################################################################################################################################################################################
# Vue pour récupérer les statistiques générales
class stats(APIView):
    def get(self, request):
        # Calcul des statistiques
        total_publications = Publication.objects.values('ConfJournal_id', 'titre_publication', 'date_publication').distinct().count()
        total_chercheurs = Chercheur.objects.count()
        total_profs = Chercheur.objects.filter(qualite='Enseignat Chercheur').count()
        total_doctorants = Chercheur.objects.filter(qualite='Doctorant').count()
        total_ConfJournals = ConfJournal.objects.count()
        
        # Création d'un dictionnaire avec les statistiques
        data = {
            'nbProfesseurs': total_profs,
            'nbChercheurs': total_chercheurs,
            'nbDoctorants': total_doctorants,
            'nbPublications': total_publications,
            'nbRevues': total_ConfJournals,
        }
        
        # Renvoi des données au format JSON
        return JsonResponse(data)
#########################################################################################################################################################################################

# Serializer pour les publications par année
class PublicationSerializer2(serializers.Serializer):
    nom = serializers.IntegerField()
    nombre = serializers.IntegerField()

# Vue pour récupérer les publications par année
class PublicationsByYear(generics.ListAPIView):
    serializer_class = PublicationSerializer2
    
    def get_queryset(self):
        # Année actuelle
        current_year = datetime.now().year
        publications_by_year = []
        
        # Parcours des années depuis 1999 jusqu'à l'année actuelle
        for the_year in range(1999, current_year + 1):  
            # Récupération des publications pour l'année en cours
            publications = Publication.objects.filter(
                date_publication=the_year
            ).values('date_publication').annotate(
                total_publications=Count('titre_publication', distinct=True)
            ).order_by('date_publication')
            
            # Ajout des données au résultat si des publications existent pour cette année
            if publications.exists():
                data = {
                    'nom': publications[0]['date_publication'],  
                    'nombre': publications[0]['total_publications']
                }
                publications_by_year.append(data)
        
        return publications_by_year

#########################################################################################################################################################################################
# Vue pour récupérer la qualité des chercheurs
class quality(APIView):
    def get(self, request):
        # Calcul du nombre total de chercheurs
        total_chercheurs = Chercheur.objects.count()
        # Récupération des différentes qualités de chercheurs
        qualities = list(Chercheur.objects.order_by('qualite').values_list('qualite', flat=True).distinct())
        results = []
        # Parcours des différentes qualités
        for quality in qualities:
            # Calcul du nombre de chercheurs pour chaque qualité
            chercheurs_with_quality = Chercheur.objects.filter(qualite=quality).count()
            # Calcul du pourcentage de chercheurs pour chaque qualité
            percentage = (chercheurs_with_quality / total_chercheurs) * 100 if total_chercheurs > 0 else 0
            # Ajout des résultats à la liste
            result = {'nom': quality, 'nombre': percentage}
            results.append(result)
        # Renvoi des données au format JSON
        return Response(results)

#########################################################################################################################################################################################

# Vue pour récupérer les chefs d'équipe
class Chefsequipes(APIView):
    def get(self, request):
        # Récupération des chefs d'équipe dont la longueur du nom est inférieure ou égale à 20 caractères
        chef_equipe = Chercheur.objects.annotate(nom_complet_length=Length('nom_complet')).filter(nom_complet_length__lte=20)
        result = []
        # Parcours des chefs d'équipe
        for chercheur in chef_equipe[:6]:
            # Récupération de l'utilisateur associé au chercheur
            utilisateur = Utilisateur.objects.filter(chercheur_id=chercheur.chercheur_id).first()
            photo_url = utilisateur.photo_url if utilisateur else None
            fonction = f"{chercheur.grade_enseignement} & {chercheur.grade_recherche}"
            data = {
                "name": chercheur.nom_complet,
                "fonction": fonction,
                "equipe": chercheur.equipe,
                "img": photo_url
            }
            result.append(data)
        # Renvoi des données au format JSON
        return Response(result)
#########################################################################################################################################################################################

# Vue pour récupérer les dernières publications
class LatestPublications(generics.ListAPIView):
    serializer_class = PublicationSerializer
    
    def get_queryset(self):
        # Récupération des dernières publications ordonnées par date de publication décroissante
        latest_publications = Publication.objects.order_by('-date_publication')
        return latest_publications
    
    def list(self, request):
        queryset = self.get_queryset()
        data = []
        seen_titles = set()
        count = 0
        # Parcours des publications
        for publication in queryset:
            if count == 6:
                break
            chercheurs_data = []
            publication_title = publication.titre_publication
            # Ignorer les doublons
            if publication_title in seen_titles:
                continue            
            seen_titles.add(publication_title)
            try:
                # Récupération des chercheurs associés à la publication
                chercheurs_ids = Publication.objects.filter(titre_publication=publication_title).values_list('chercheur_id', flat=True).distinct()                
                for chercheur_id in chercheurs_ids:
                    chercheur = Chercheur.objects.get(chercheur_id=chercheur_id)
                    chercheurs_data.append(chercheur.nom_complet)
            except ObjectDoesNotExist:
                pass
            # Création des données de publication
            publication_data = {
                "nbpages": publication.nombre_pages,
                "nom": publication_title,
                "authors": chercheurs_data
            }
            data.append(publication_data)
            count += 1
        # Renvoi des données au format JSON
        return Response(data)
