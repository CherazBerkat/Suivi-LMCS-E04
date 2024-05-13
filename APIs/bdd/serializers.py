# serializers.py
from rest_framework import serializers
from .models import Chercheur, Publication, ConfJournal, ConfJournalClassification, Encadrement, Encadrement_Chercheur, Projet, Prj_Cher, Utilisateur

class ChercheurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chercheur
        fields = '__all__'


class ConfJournalSerializer(serializers.ModelSerializer):
  

    class Meta:
        model = ConfJournal
        fields = '__all__'


class PublicationSerializer(serializers.ModelSerializer):
    date_publication = serializers.IntegerField()
    class Meta:
        model = Publication
        fields = '__all__'




class ConfJournalClassificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ConfJournalClassification
        fields = '__all__'

class EncadrementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encadrement
        fields = '__all__'

class Encadrement_ChercheurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encadrement_Chercheur
        fields = '__all__'

class ProjetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projet
        fields = '__all__'

class Prj_CherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prj_Cher
        fields = '__all__'

class UtilisateurSerializer(serializers.ModelSerializer):

    class Meta:
        model = Utilisateur
        fields = '__all__'
