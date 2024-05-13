from django.http import JsonResponse
from bdd.models import Chercheur, Utilisateur
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import Http404
from rest_framework.exceptions import ValidationError

# Vue pour mettre à jour les informations personnelles de l'utilisateur
class UpdatePersonalInfo(APIView):
    
    # Méthode pour récupérer un utilisateur par son ID
    def get_utilisateur_or_404(self, utilisateur_id):
        try:
            return Utilisateur.objects.get(utilisateur_id=utilisateur_id)
        except Utilisateur.DoesNotExist:
            raise Http404('User not found')
    
    # Méthode pour récupérer un chercheur par son ID
    def get_chercheur_or_404(self, chercheur_id):
        try:
            return Chercheur.objects.get(chercheur_id=chercheur_id)
        except Chercheur.DoesNotExist:
            raise Http404('Chercheur not found')
    
    # Méthode pour traiter les requêtes POST
    def post(self, request):
        try:
            # Récupérer l'identifiant de l'utilisateur
            utilisateur_id = request.data.get('utilisateur_id')
            if utilisateur_id is None:
                return Response({'error': 'utilisateur_id is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Récupérer l'utilisateur à l'aide de l'identifiant utilisateur
            user = self.get_utilisateur_or_404(utilisateur_id) 
            
            # Mettre à jour les informations de l'utilisateur
            user.email = request.data.get('email', user.email)
            user.nom_complet = request.data.get('nom_complet', user.nom_complet)
            user.nom_utilisateur = request.data.get('username', user.nom_utilisateur)
            user.save()
            
            # Vérifier si l'utilisateur est un chercheur
            if user.role == "chercheur":
                chercheur_id = request.data.get('Matricule')
                if chercheur_id:
                    # Récupérer le chercheur à l'aide de l'identifiant chercheur
                    chercheur = self.get_chercheur_or_404(chercheur_id)
                    # Mettre à jour les informations du chercheur
                    chercheur.diplome = request.data.get('diplome', chercheur.diplome)
                    chercheur.email = request.data.get('email', chercheur.email)
                    # Continuer avec les autres champs du chercheur
                    
                    # Enregistrer le chercheur mis à jour
                    chercheur.save()
                    
                    return Response({'success': 'Personal information updated successfully', 'chercheur_id': chercheur_id})
                else:
                    return Response({'error': 'Matricule is required for Chercheur'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'success': 'Personal information updated successfully', 'utilisateur_id': utilisateur_id})
        except Utilisateur.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Chercheur.DoesNotExist:
            return Response({'error': 'Chercheur not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Vue pour mettre à jour les URL du chercheur
class UpdateChercheurURL(APIView):
    
    # Méthode pour récupérer un chercheur par son ID
    def get_chercheur_or_404(self, chercheur_id):
        try:
            return Chercheur.objects.get(chercheur_id=chercheur_id)
        except Chercheur.DoesNotExist:
            raise Http404('Chercheur not found')

    # Méthode pour traiter les requêtes POST
    def post(self, request):
        # Récupérer l'identifiant du chercheur à partir des données de la requête
        chercheur_id = request.data.get('Matricule', '')
        
        # Vérifier si l'identifiant du chercheur est fourni
        if chercheur_id:
            try:
                # Récupérer l'objet Chercheur en utilisant l'identifiant du chercheur
                chercheur = self.get_chercheur_or_404(chercheur_id)
                
                # Mettre à jour l'objet Chercheur avec les URL fournies
                chercheur.dblp = request.data.get('Dblp', chercheur.dblp)
                chercheur.search_gate = request.data.get('ReasearchGate', chercheur.search_gate)
                # Continuer avec les autres URL du chercheur
                
                # Enregistrer l'objet Chercheur mis à jour
                chercheur.save()
                
                return Response({'success': 'URLs updated successfully'})
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Matricule not provided'}, status=status.HTTP_400_BAD_REQUEST)

# Vue pour mettre à jour le mot de passe du chercheur
class UpdateChercheurPassword(APIView):
    def post(self, request):
        utilisateur_id = request.data.get('utilisateur_id')
        ancien_password = request.data.get('ancien_mot_de_passe')
        new_password = request.data.get('nouveau_mot_de_passe')
        confirm_password = request.data.get('R_nouveau_mot_de_passe')
        try:
            user = Utilisateur.objects.get(utilisateur_id=utilisateur_id)
        except Utilisateur.DoesNotExist:
            return Response({'error': 'Utilisateur not found'}, status=status.HTTP_404_NOT_FOUND)
        password_matches = ancien_password == user.password
        if not password_matches:
            return Response({'matches': False}, status=status.HTTP_200_OK)
        if new_password != confirm_password:
            return Response({'error': 'Les nouveaux mots de passe ne correspondent pas'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UtilisateurSerializer(user, data={'password': new_password}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Le mot de passe de l\'utilisateur a été mis à jour avec succès', 'matches': True})
        else:
            return Response({'error': 'Une erreur s\'est produite lors de la mise à jour du mot de passe'}, status=status.HTTP_400_BAD_REQUEST)
