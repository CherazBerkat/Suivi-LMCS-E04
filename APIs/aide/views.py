from django.core.mail import send_mail
from django.conf import settings
from bdd.models import Utilisateur
from django.http import HttpResponse
from rest_framework.views import APIView
from django.db.models.functions import Lower, Replace
from rest_framework import status
from rest_framework.response import Response

class Signaler(APIView):
    def get_utilisateur_or_404(self, utilisateur_id):
        try:
            return Utilisateur.objects.get(utilisateur_id=utilisateur_id)
        except Utilisateur.DoesNotExist:
            return None

    def post(self, request):
        utilisateur_id = request.data.get('utilisateur_id')  
        if not utilisateur_id:
            return Response({'error': 'ID utilisateur requis'}, status=status.HTTP_400_BAD_REQUEST)
        signaleur_nom = request.data.get('nom')
        type_probleme = request.data.get('type')
        titre = request.data.get('titre')
        description = request.data.get('description')
        
        # Vérifier s'il s'agit d'un problème en laboratoire
        est_probleme_labo = (type_probleme == 'labo')
        if est_probleme_labo:
            # Sélectionner le destinataire en tant qu'assistant
            destinataire = Utilisateur.objects.filter(role='assistant').first()
            if not destinataire:
                return Response({'error': "Assistant non trouvé dans la table Utilisateur"}, status=status.HTTP_404_NOT_FOUND)
            destinataire_email = destinataire.email
        else:
            # Sélectionner le destinataire en tant qu'admin
            destinataire = Utilisateur.objects.filter(role='admin').first()
            if not destinataire:
                return Response({'error': "Admin non trouvé dans la table Utilisateur"}, status=status.HTTP_404_NOT_FOUND)
            destinataire_email = destinataire.email
        
        # Récupération du signaleur en utilisant l'ID utilisateur
        signaleur = self.get_utilisateur_or_404(utilisateur_id)
        if not signaleur:
            return Response({'error': f"User with ID '{utilisateur_id}' not found in the Utilisateur table"}, status=status.HTTP_404_NOT_FOUND)
        
        signaleur_nom = signaleur_nom
        objet_email = f"Signalement d'un Problème en Laboratoire LMCS(l'application du suivis)" if est_probleme_labo else f"Signalement d'un Problème en aplication LMCS"
        if est_probleme_labo:
            intro_email = f"Bonjour {destinataire.nom_utilisateur} ,\n\nNous vous écrivons pour signaler un problème concernant le laboratoire LMCS .\nLe signaleur est : {signaleur_nom}.\nLe titre ou sujet du problème est {titre}, et une description détaillée de la situation est la suivante :{description}.\n\n" 
        else:
            intro_email = f"Bonjour {destinataire.nom_utilisateur},\n\nNous vous écrivons pour signaler un problème concernant l'application du suivis du LMCS'.\nLe signaleur est : {signaleur_nom}.\n\nLe titre ou sujet du problème est {titre}, et une description détaillée de la situation est la suivante :{description}.\n\n" 
        contenu_email = f"{intro_email} Nous vous serions reconnaissants de porter une attention rapide à cette question. \n Nous vous remercions pour votre assistance.\n Cordialement."
        send_mail(
            objet_email,
            contenu_email,
            settings.EMAIL_HOST_USER,
            [destinataire_email],
            fail_silently=False,
        )

        return Response({'success': 'Email sent successfully'}, status=status.HTTP_200_OK)
