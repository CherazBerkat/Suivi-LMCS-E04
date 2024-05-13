from django.http import JsonResponse
from bdd.models import Chercheur
from rest_framework.views import APIView
from django.shortcuts import render

# Vue pour récupérer les équipes de recherche et leurs membres
class our_team(APIView):
    def get(self, request):
        # Récupération des noms des équipes de recherche
        equipe_names = list(Chercheur.objects.order_by('equipe').values_list('equipe', flat=True).distinct())

        # Liste pour stocker les données des équipes
        equipes_data = []
        
        # Parcours des équipes
        for equipe_name in equipe_names:
            # Récupération des membres de l'équipe
            members = Chercheur.objects.filter(equipe=equipe_name).values_list('nom_complet', flat=True)
            membres = list(members) if members else [""]
            # Récupération du chef d'équipe s'il existe
            chef_equipe = Chercheur.objects.filter(equipe=equipe_name, chef_E=True).first()
            chef_nom = chef_equipe.nom_complet if chef_equipe else ""
            # Création des données de l'équipe
            equipe_data = {
                'nom': equipe_name,
                'members': list(membres),
                'chef_equipe': chef_nom
            }
            # Ajout des données de l'équipe à la liste
            equipes_data.append(equipe_data)

        # Renvoi des données au format JSON
        return JsonResponse(equipes_data, safe=False)
