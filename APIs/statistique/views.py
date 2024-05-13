from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from bdd.models import Chercheur, Publication, ConfJournal
from django.db.models.functions import Lower, Replace , Upper
from django.db.models import Value 
from collections import Counter
from itertools import groupby



# Create your views here.
class CritereEquip(APIView) : 

    
    def get(self, request):
        chercheurs = Chercheur.objects.all()
        chercheurs_equipe = list(chercheurs.values_list('equipe', flat=True))

        data = [{ 'nom': equipe ,
                  'nombre' : count } for equipe, count in Counter(chercheurs_equipe).items()]

        return data


class CritereGrade_enseignement(APIView) : 

    def get( self , request ) : 
              
              chercheurs = Chercheur.objects.all()
              chercheurs_grade_enseignement = chercheurs.values_list('grade_enseignement', flat=True)
             
              data = [{ 'nom': grade_enseignement ,
                        'nombre' : count } for grade_enseignement, count in Counter(chercheurs_grade_enseignement).items()]


              return data
             
    

class CritereGrade_recherche(APIView) : 

    def get( self , request ) : 
              
              chercheurs = Chercheur.objects.all()
              chercheurs_grade_recherche = chercheurs.values_list('grade_recherche', flat=True)
              
              data = [{ 'nom': grade_recherche ,
                        'nombre' : count } for grade_recherche, count in Counter(chercheurs_grade_recherche).items()]


              return data
              
          

class CriterePeriodicite (APIView): 

    def get( self , request ) : 
              
              revues = ConfJournal.objects.all()
              revues_periodicite = revues.values_list('periodicite', flat=True)
                 
              data = [{ 'nom': periodicite ,
                        'nombre' : count } for periodicite, count in Counter(revues_periodicite).items()]


              return data
              

class CritereType (APIView) : 

    def get( self , request ) : 
              
              revues = ConfJournal.objects.all()
              revues_type = revues.values_list('type', flat=True)

              data = [{ 'nom': type ,
                        'nombre' : count } for type, count in Counter(revues_type).items()]

              return data
              
            
                


class CritereDate (APIView): 

    def get ( self , request ) : 
              
            
            fin = request.data.get('date_fin')
            debut =  request.data.get('date_debut')  
            if fin  and  debut :
                queryset = Publication.objects.all().annotate(
                        titre_publication_lower=Lower(Replace('titre_publication', Value(' '), Value('')))
                        )
                
                Pubs = queryset.filter(date_publication__gte=debut , date_publication__lte=fin )
              

                unique_publications = []
                for key, group in groupby(Pubs, key=lambda x: (
                              x.titre_publication_lower, x.ConfJournal_id, x.date_publication)):
                              unique_publications.append(next(group))
            
                Pubs_Date = [item.date_publication for item in unique_publications]

                data = [{ 'nom': year ,
                          'nombre' : count } for year, count in Counter(Pubs_Date).items()]
             
                return data
         
            return Response ({'error':'date fin et debut required'})
    


class PubRevue ( APIView ):
      
      def get ( self , request )    :
           
            queryset = Publication.objects.all().annotate(
                        titre_publication_lower=Lower(Replace('titre_publication', Value(' '), Value('')))
                        )
            
            for p in queryset :
                   print(p.titre_publication_lower)

            unique_publications = []
            for key, group in groupby(queryset, key=lambda x: (
                              x.titre_publication_lower, x.ConfJournal_id, x.date_publication)):
                              unique_publications.append(next(group))
            
            Pubs = [item.ConfJournal_id.ConfJournal_id for item in unique_publications]

            data = [{ 'nom': acronyme ,
                      'nombre' : count } for acronyme, count in Counter(Pubs).items()]
             
            return data
      


class CriterStat ( APIView )    :
       
       def post ( self , request ) :
              critere = request.data.get('critere')   

              if critere == 'Nombre_De_Chercheur_Par_Equipe':
                  result = CritereEquip().get(request)

              elif critere == 'Nombre_De_Revue_Par_Periodicite':
                  result = CriterePeriodicite().get(request)

              elif critere == 'Nombre_de_Revue_Par_Type':
                  result = CritereType().get(request)

              elif critere == 'Nombre_De_Chercheur_Par_Grade_Enseignant':
                  result = CritereGrade_enseignement().get(request)

              elif critere == 'Nombre_De_Chercheur_Par_Grade_De_Recherche':
                  result = CritereGrade_recherche().get(request) 

              elif critere == 'Nombre_De_Publication_Par_Revue':
                  result = PubRevue().get(request)

              elif critere == 'Nombre_De_Publication_Par_Date':
                  result = CritereDate().get(request) 

              else:
                  return Response({'error': 'Invalid critere'})

              return Response({'result': result})


 
      

