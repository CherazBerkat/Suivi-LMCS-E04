from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.db.models.functions import Lower, Replace
from django.db.models import Value 
from rest_framework.response import Response
from rest_framework import status
from bdd.models import Chercheur, Publication, ConfJournal, ConfJournalClassification, Encadrement, Encadrement_Chercheur, Projet, Prj_Cher, Utilisateur
from bdd.serializers import (
    ChercheurSerializer, UtilisateurSerializer,
    PublicationSerializer, EncadrementSerializer, ProjetSerializer ,ConfJournalSerializer
)
from recherche.views import RechercheView  

# Créer une instance de RechercheView
recherche_view = RechercheView() 

#########################################################################################################################################################################################
class ChercheurPersonalInfo(APIView):
    """
    API pour obtenir les informations personnelles d'un chercheur.
    """
    def get_Chercheur_info(self, chercheur_id):
        """
        Obtenir les informations du chercheur à partir de son identifiant.
        """
        try:
            chercheur_obj = Chercheur.objects.get(chercheur_id=chercheur_id)
            chercheur_serializer = ChercheurSerializer(chercheur_obj)

            return chercheur_serializer.data
        except Chercheur.chercheur_serializer.data:
            return {'erreur': 'Chercheur non trouvé'}
    
    def post(self, request):
        """
        Endpoint POST pour obtenir les informations personnelles d'un chercheur.
        """
        chercheur_id = request.data.get('Matricule', None)  
        if chercheur_id:    
            data = self.get_Chercheur_info(chercheur_id)
            if 'erreur' in data:
                return Response(data, status=status.HTTP_404_NOT_FOUND)
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Matricule non fourni'}, status=status.HTTP_400_BAD_REQUEST)

#########################################################################################################################################################################################
class UserPersonalInfo(APIView):
    """
    API pour obtenir les informations personnelles d'un utilisateur.
    """
    def get_User_info(self, utilisateur_id):
        """
        Obtenir les informations de l'utilisateur à partir de son identifiant.
        """
        try:
            Utilisateur_obj = Utilisateur.objects.get(utilisateur_id=utilisateur_id)
            Utilisateur_serializer = UtilisateurSerializer(Utilisateur_obj)
            
            return Utilisateur_serializer.data
        except Utilisateur.DoesNotExist:
            return {'error': 'Utilisateur non trouvé'}

    def post(self, request):
        """
        Endpoint POST pour obtenir les informations personnelles d'un utilisateur.
        """
        utilisateur_id = request.data.get('User_id', None)  
        if utilisateur_id:  
            data = self.get_User_info(utilisateur_id)
            if 'error' in data:
                return Response(data, status=status.HTTP_404_NOT_FOUND)
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User_id non fourni'}, status=status.HTTP_400_BAD_REQUEST)

#########################################################################################################################################################################################
class ChercheurPublications(APIView):
    """
    API pour obtenir les publications d'un chercheur.
    """
    def post(self, request):
        """
        Endpoint POST pour obtenir les publications d'un chercheur.
        """
        chercheur_id = request.data.get('Matricule', None)
        if chercheur_id:
            try:
                chercheur = Chercheur.objects.get(chercheur_id=chercheur_id)
            except Chercheur.DoesNotExist:
                return Response({'error': 'Chercheur non trouvé'}, status=status.HTTP_404_NOT_FOUND)
            
            publications = Publication.objects.filter(chercheur_id=chercheur_id)
            publication_data = []
            
            for publication in publications:
                chercheurs_data = []
                chercheurs_ids = Publication.objects.filter(titre_publication=publication.titre_publication).values_list('chercheur_id', flat=True).distinct()
                for chercheur_id in chercheurs_ids:
                    chercheur = Chercheur.objects.get(chercheur_id=chercheur_id)
                    chercheurs_data.append(chercheur.nom_complet)
                
                # Sérialiser la publication
                publication_serializer = PublicationSerializer(publication)
                publication_info = publication_serializer.data
                
                # Personnaliser la structure des données
                publication_info['Authors'] = chercheurs_data
                
                # Ajouter à la liste
                publication_data.append(publication_info)
            
            return Response(publication_data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Matricule non fourni'}, status=status.HTTP_400_BAD_REQUEST)
########################################################################################################################################

class ViewPublication(APIView):
    """
    API pour obtenir les détails d'une publication.
    """
    def get_publication_info(self, titre_publication, date_publication, ConfJournal_id):
        """
        Obtenir les informations détaillées d'une publication.
        """
        publication_obj = Publication.objects.filter(
                titre_publication=titre_publication,
                date_publication=date_publication,
                ConfJournal_id=ConfJournal_id
            ).first()
        if publication_obj:
            chercheurs_data = []
            chercheurs_ids = Publication.objects.filter(titre_publication=titre_publication, date_publication=date_publication, ConfJournal_id=ConfJournal_id).values_list('chercheur_id', flat=True).distinct()
            for chercheur_id in chercheurs_ids:
                chercheur = Chercheur.objects.get(chercheur_id=chercheur_id)
                chercheurs_data.append({"nom": chercheur.nom_complet, "chercheur_id": chercheur.chercheur_id})

            publication_data = {
                "titre_publication": publication_obj.titre_publication,
                "date_de_publication": publication_obj.date_publication,
                "nombre_pages": publication_obj.nombre_pages,
                "nombre_volume": publication_obj.nombre_volumes,
                "chercheurs": chercheurs_data,
                "url": publication_obj.lien,
            }
            
            return publication_data
        else:   
            return {'error': 'Publication non trouvée'}

    def post(self, request):
        """
        Endpoint POST pour obtenir les détails d'une publication.
        """
        titre_publication = request.data.get('titre_publication', '')
        date_publication = request.data.get('date_publication', '')
        ConfJournal_id = request.data.get('ConfJournal_id', '')

        if not titre_publication:
            return Response({'error': 'Veuillez fournir le titre de la publication'}, status=status.HTTP_400_BAD_REQUEST)

        data = self.get_publication_info(titre_publication, date_publication, ConfJournal_id)
        if 'error' in data:
            return Response(data, status=status.HTTP_404_NOT_FOUND)

        return Response(data, status=status.HTTP_200_OK)
#########################################################################################################################################################################################
class ViewPublication2(APIView):
    """
    API pour obtenir les détails d'une publication (alternative).
    """
    def post(self, request):
        """
        Endpoint POST pour obtenir les détails d'une publication (alternative).
        """
        titre_Publication = request.data['titre_publication']
        publication = Publication.objects.filter(titre_publication=titre_Publication).first()
        if not publication:
            return Response({'error': 'Publication non trouvée'}, status=status.HTTP_404_NOT_FOUND)
        serializer = PublicationSerializer(publication)
        return Response(serializer.data, status=status.HTTP_200_OK)

#########################################################################################################################################################################################
class ChercheurEncadrements(APIView):
    """
    API pour obtenir les encadrements d'un chercheur.
    """
    def post(self, request):
        """
        Endpoint POST pour obtenir les encadrements d'un chercheur.
        """
        chercheur_id = request.data.get('Matricule', None)
        if chercheur_id:
            encad_ids = Encadrement_Chercheur.objects.filter(chercheur_id=chercheur_id).values_list('encad_id', flat=True)
            if not encad_ids:
                return Response({'error': 'Aucun encadrement trouvé pour ce chercheur'}, status=status.HTTP_404_NOT_FOUND)

            encadrements = Encadrement.objects.filter(encad_id__in=encad_ids)
            if not encadrements.exists():
                return Response({'error': 'Aucun encadrement trouvé pour ce chercheur'}, status=status.HTTP_404_NOT_FOUND)

            encadrement_data = []
            for encadrement in encadrements:
                encadrement_serializer = EncadrementSerializer(encadrement)
                data = encadrement_serializer.data
                data['etudiants'] = [etudiant.strip() for etudiant in data.get('noms_prenoms', '').split(',')] if data.get('noms_prenoms') else []
                del data['noms_prenoms']  # Supprimer le champ noms_prenoms concaténé
                encadrement_data.append(data)

            return Response(encadrement_data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Matricule non fourni'}, status=status.HTTP_400_BAD_REQUEST)


#########################################################################################################################################################################################
class ChercheurProjects(APIView):
    """
    API pour obtenir les projets d'un chercheur.
    """
    def post(self, request):
        """
        Endpoint POST pour obtenir les projets d'un chercheur.
        """
        chercheur_id = request.data.get('Matricule', None)
        if chercheur_id:
            try:
                chercheur = Chercheur.objects.get(chercheur_id=chercheur_id)
            except Chercheur.DoesNotExist:
                return Response({'error': 'Chercheur non trouvé'}, status=status.HTTP_404_NOT_FOUND)

            proj_ids = Prj_Cher.objects.filter(chercheur_id=chercheur).values_list('projet_id', flat=True)
            if not proj_ids:
                return Response({'error': 'Aucun projet trouvé pour ce chercheur'}, status=status.HTTP_404_NOT_FOUND)

            projects_data = []
            for projet_id in proj_ids:
                projet = Projet.objects.filter(projet_id=projet_id).first()
                if not projet:
                    continue

                if projet.liste_membres:
                    membres_data_array = [membre.strip() for membre in projet.liste_membres.split(',')]
                else:
                    membres_data_array = []
                projet_data = {
                    'projet_id': projet.projet_id,
                    'intitule': projet.intitule,
                    'chef_projet': projet.chef_projet,
                    'domaine': projet.domaine,
                    'liste_membres': membres_data_array,
                    'date_debut': projet.date_debut,
                    'date_fin': projet.date_fin
                }
                projects_data.append(projet_data)

            return Response(projects_data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Matricule non fourni'}, status=status.HTTP_400_BAD_REQUEST)


#########################################################################################################################################################################################
class ModifPhoto(APIView):
    """
    API pour modifier la photo d'un utilisateur.
    """
    def get_utilisateur_or_404(self, utilisateur_id):
        """
        Obtenir un utilisateur à partir de son identifiant ou retourner une erreur 404.
        """
        try:
            return Utilisateur.objects.get(utilisateur_id=utilisateur_id)
        except Utilisateur.DoesNotExist:
            return None

    def post(self, request):
        """
        Endpoint POST pour modifier la photo d'un utilisateur.
        """
        utilisateur_id=request.data.get('User_id', None) 
        if utilisateur_id :
            utilisateur = self.get_utilisateur_or_404(utilisateur_id)
            if not utilisateur:
                return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)
            serializer = UtilisateurSerializer(utilisateur, data={'photo_url': request.data.get('photo_url')}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': 'Photo utilisateur mise à jour avec succès'})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#########################################################################################################################################################################################
class ModifPublication(APIView):
    """
    API pour modifier une publication.
    """
    def get_publications_or_404(self, titre_publication,ConfJournal_id,date_publication):
        """
        Obtenir une liste de publications correspondant aux critères donnés ou retourner une erreur 404.
        """
        queryset = Publication.objects.all().annotate(
                        titre_publication_lower=Lower(Replace('titre_publication', Value(' '), Value(''))),
                        ConfJournal_id_lower=Lower(Replace('ConfJournal_id', Value(' '), Value('')))    )  
            
        try:
            publication_obj = queryset.filter(titre_publication_lower=titre_publication,
                                              date_publication =date_publication,
                                              ConfJournal_id_lower=ConfJournal_id )
            return publication_obj
        except Publication.DoesNotExist:
            return None

    def post(self, request):
        """
        Endpoint POST pour modifier une publication.
        """
        titre_publication = recherche_view.convert(request.data.get('titre_publication', ''))
        ConfJournal_id= recherche_view.convert(request.data.get('ConfJournal_id', ''))
        date_publication = request.data.get('date_publication', '') 
        try:
            publications = self.get_publications_or_404(titre_publication,ConfJournal_id,date_publication)
            if not publications.exists():
                return Response({'error': 'Publications non trouvées'}, status=status.HTTP_404_NOT_FOUND)

            nombre_pages = request.data.get('nombre_pages', '')
            nombre_volumes = request.data.get('nombre_volumes', '')
            # Mettre à jour toutes les publications
            publications.update(nombre_pages=nombre_pages, nombre_volumes=nombre_volumes)

            return Response({'success': 'Publications mises à jour avec succès'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
