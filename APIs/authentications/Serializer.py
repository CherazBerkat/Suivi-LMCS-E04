from rest_framework import serializers
from bdd.models import Utilisateur
from bdd.serializers import ChercheurSerializer
class UtilisateurSerializer(serializers.ModelSerializer):
    chercheur = ChercheurSerializer(source='chercheur_id')
    class Meta:
        model = Utilisateur
        fields = ['utilisateur_id', 'email', 'role', 'chercheur_id','photo_url','nom_complet' ,'nom_utilisateur' , 'chercheur'] 