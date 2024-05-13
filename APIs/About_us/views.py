from django.http import JsonResponse
from bdd.models import Chercheur
from rest_framework.views import APIView
from django.shortcuts import render

class Team(APIView):
    def get(self, request):
        # Noms des équipes
        equipe_names = [
            'EIAH',
            'Sures',
            'Codesign',
            'Optimisation',
            'Managment des systèmes d’information',
            'Traitement et interpretation des images'
        ]

        equipes_data = []
        # Parcours de chaque équipe pour obtenir les membres et le chef d'équipe
        for equipe_name in equipe_names:
            # Récupération des membres de l'équipe
            members = Chercheur.objects.filter(equipe=equipe_name).values_list('nom_complet', flat=True)
            membres = list(members) if members else [""]
            # Récupération du chef d'équipe s'il existe
            chef_equipe = Chercheur.objects.filter(equipe=equipe_name, chef_E=True).first()
            chef_nom = chef_equipe.nom_complet if chef_equipe else ""
            # Construction des données de l'équipe
            equipe_data = {
                'nom': equipe_name,
                'members': list(membres),
                'chef_equipe': chef_nom
            }
            equipes_data.append(equipe_data)

        # Retour des données au format JSON
        return JsonResponse(equipes_data, safe=False)
