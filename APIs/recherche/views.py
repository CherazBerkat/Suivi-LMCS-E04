from django.shortcuts import render
from django.db.models.functions import Lower, Replace
from django.db.models import Value 
from itertools import groupby
from rest_framework.views import APIView
from django.db.models import Q
from rest_framework.response import Response
from bdd.models import Chercheur, Publication, ConfJournal , Utilisateur
from bdd.serializers import ChercheurSerializer, PublicationSerializer , ConfJournalSerializer

class RechercheView(APIView):


      # transfer les carractere des phrase en moniscule
       def lowercase( self ,text):
        
        lowercase_ascii = ''.join(c.lower() if ord(c) < 128 else c for c in text)
        return lowercase_ascii
       

       # remove spaces from the senteces
       def convert ( self ,sentence ):
             text = self.lowercase(sentence.replace(' ', '') )
             return text  #convert to lowercase and remove espace
    
       # filtrage par revue 
       def get_venue (self, venue ) :
                

                Nom = venue.get('nom')
                Acronyme= venue.get('Acronyme') 
                type =  venue.get('type')
                Periodicite =  venue.get('periodicite') 

                # convert the value of the fields in the db to lowercase and remove espace 
                queryset = ConfJournal.objects.all().annotate(
                        acronyme=Lower(Replace('ConfJournal_id', Value(' '), Value(''))) ,
                        nom_lower=Lower(Replace('nom', Value(' '), Value(''))) ,
                        Periodicite_lower=Lower(Replace('periodicite', Value(' '), Value(''))) ,
                        type_lower=Lower(Replace('type', Value(' '), Value(''))) 
                        )

                if Nom:
                      queryset = queryset.filter( nom_lower= self.convert(Nom) )
                if Acronyme:
                      queryset = queryset.filter(acronyme= self.convert(Acronyme))
                if Periodicite:
                      queryset = queryset.filter(Periodicite_lower=self.convert(Periodicite ))
                if type:
                      queryset = queryset.filter(type_lower= self.convert(type))   

                
                venue_ids = queryset.values_list('ConfJournal_id', flat=True)
                venue_ids_list = list(venue_ids)   # list de revues ids 

                return venue_ids_list   
       
       
       # filtrage par publication et date   
       def get_pub (self, pub , date ) :
              
                # field of the pub request
                if pub :
                  name = pub.get('name') 
                  nb_pages= pub.get('nbpages')
                  nb_volume = pub.get('nbvols')
                  key = pub.get('mot_cle')

                #filed of the date request
                if date :
                  year = date.get('Annee')
                  fin = date.get('date_fin')
                  debut =  date.get('date_debut')
                  ordre = date.get('Affichage')

                # convert the value of the fields in the db to lowercase and remove espace 
                queryset = Publication.objects.all().annotate(
                        titre_publication_lower=Lower(Replace('titre_publication', Value(' '), Value('')))
                        )

                # filtrage pub s'il exist 
                if pub :
                 if name:
                      queryset = queryset.filter(titre_publication_lower = self.convert(name) )
                 if nb_pages:
                      queryset = queryset.filter(nombre_pages=nb_pages)  
                 if nb_volume:
                      queryset = queryset.filter(nombre_volumes=nb_volume) 
                 if key :
                       query_words=[]
                       query_words = key.lower().split()
                       for word in query_words:
                           queryset = queryset.filter(titre_publication_lower__icontains=word) 
                      

                # filtrage date et affichage s'il exist  
                if date :     
                 if year : 
                      queryset = queryset.filter(date_publication=year)
                 if fin  and  debut :
                      queryset = queryset.filter(date_publication__gte=debut , date_publication__lte=fin)

                
                 if ordre == 'Alpha':
                             queryset = queryset.order_by('titre_publication_lower')
                 elif ordre == 'Ancien':
                             queryset = queryset.order_by('date_publication')
                 elif ordre == 'Recent':
                             queryset = queryset.order_by('-date_publication')
               

                return queryset
       


       # filtrage par chercheurs 
       def get_chercheurs( self , chercheurs ) :
          
           chercheurs_ids_set = set()
           chercheurs_ids = []

           # convert the value of the fields in the db to lowercase and remove espace
           chercheurQueryset= Chercheur.objects.all().annotate(
                        nom_complet_lower=Lower(Replace('nom_complet', Value(' '), Value(''))),
                        equipe_lower=Lower(Replace('equipe', Value(' '), Value(''))),
                        qualite_lower=Lower(Replace('qualite', Value(' '), Value(''))),
                        diplome_lower=Lower(Replace('diplome', Value(' '), Value(''))),
                        grade_enseignement_lower=Lower(Replace('grade_enseignement', Value(' '), Value(''))),
                        grade_recherche_lower=Lower(Replace('grade_recherche', Value(' '), Value(''))) , 
                        statut_lower=Lower(Replace('statut', Value(' '), Value('')))
                   )

           for chercheur in chercheurs :
                
                chercheur_object = {}
                
                chercheur_id = chercheur.get('matricule') 
                name = chercheur.get('nom') 
                equipe =  chercheur.get('equipe') 
                diplome = chercheur.get('diplome') 
                qualite = chercheur.get('qualite')
                hindex = chercheur.get('hindex') 
                grade_enseignement = chercheur.get('grade_ens')
                grade_recherche = chercheur.get('grade_rech') 
                statut = chercheur.get('statut') 

                # recherche selon les attributs damandé
                if chercheur_id:
                       chercheur_object['chercheur_id'] = chercheur_id
                if name:
                       chercheur_object['nom_complet_lower'] = self.convert(name)
                if equipe:
                       chercheur_object['equipe_lower'] = self.convert( equipe )
                if diplome:
                       chercheur_object['diplome_lower'] = self.convert( diplome )
                if qualite:
                       chercheur_object['qualite_lower'] = self.convert( qualite )      
                if hindex:
                       chercheur_object['hindex'] = hindex
                if grade_enseignement:
                       chercheur_object['grade_enseignement_lower'] = self.convert(grade_enseignement)
                if grade_recherche:
                       chercheur_object['grade_recherche_lower'] = self.convert(grade_recherche) 
                if statut : 
                        chercheur_object['statut_lower'] = self.convert( statut )       
               
                
                rang = chercheur.get('rang')

                if chercheur_object :
                   chercheurs_ids = chercheurQueryset.filter(**chercheur_object).values_list('chercheur_id', flat=True)
                  
                 
                if rang :   
                       queryset = Publication.objects.all()
                       if chercheurs_ids :
                              queryset =  queryset.filter(chercheur_id__in=chercheurs_ids)
                       chercheurs_ids = queryset.filter(rang__icontains=rang).values_list('chercheur_id', flat=True) 
                
                
                if chercheurs_ids :
                        chercheurs_ids_set.update(chercheurs_ids)
               
           # chercheurs list ids 
           chercheurs_ids_list = list(chercheurs_ids_set)
          
           return chercheurs_ids_list



       

       # la recherche  
       def post(self, request):
            
            venue_ids = []
            chercheurs_ids = []

            venue = request.data.get('objConfJournal',None)
            pub = request.data.get('objPub',None)
            date = request.data.get('objDate',None)
            chercheurs = request.data.get('ArrayChercheurs',None)
            
            # recherche selon les criteres demandé 
            if date :
               date=date[0]

            if pub : 
               pub=pub[0]       
       
            pub_data = self.get_pub(pub, date)

            if venue  :
               venue=venue[0]
               venue_ids = self.get_venue (venue ) 
               pub_data =pub_data.filter(ConfJournal_id__in=venue_ids ) 
               

            if chercheurs  :
               chercheurs_ids = self.get_chercheurs (chercheurs)
               pub_data =pub_data.filter( chercheur_id__in=chercheurs_ids) 

             
            if pub_data :  
                chercheurs_ids = pub_data.values_list('chercheur_id', flat=True).distinct()
                venue_ids = pub_data.values_list('ConfJournal_id', flat=True).distinct()
  
            chercheurs_ids_list = list(chercheurs_ids)
            chercheurs_data = Chercheur.objects.filter(chercheur_id__in=chercheurs_ids_list)
            
           
            venue_ids_list = list(venue_ids)
            venue_data = ConfJournal.objects.filter(ConfJournal_id__in=venue_ids_list)
          

            unique_publications = []
            for key, group in groupby(pub_data, key=lambda x: (
                              x.titre_publication_lower, x.ConfJournal_id, x.date_publication)):
                              unique_publications.append(next(group))
                              

            serialized_chercheurs = ChercheurSerializer(chercheurs_data, many=True).data
            serialized_venue = ConfJournalSerializer(venue_data, many=True).data 
            serialized_pub = PublicationSerializer(unique_publications, many=True).data  

            queryset = Publication.objects.all().annotate(
                        titre_publication_lower=Lower(Replace('titre_publication', Value(' '), Value(''))) 
            )  

            for pub in  serialized_pub : 
                   pub['Authors']=self.get_authors(pub , queryset ) 

            for chercheur in  serialized_chercheurs : 
                   user = Utilisateur.objects.get(chercheur_id = chercheur['chercheur_id'])
                   chercheur['pic'] = user.photo_url  
                   chercheur['nb_pub'] = self.get_Pubs( chercheur['chercheur_id'])     


           
            serialized_data = {
                   "chercheurs": serialized_chercheurs ,
                   "venue": serialized_venue ,
                   "publication": serialized_pub
            }
            
            return Response (serialized_data)   

                   
       # la liste des cherchurs de labo        
       def get ( self , request ):  

              chercheurs = Chercheur.objects.all()
              chercheurs_nom = chercheurs.values_list('nom_complet', flat=True).distinct()
              
              return Response (chercheurs_nom) 
       

       # liste des auteurs d'une plublications 
       def get_authors ( self , pub , queryset ) :
              
              title = self.convert( pub['titre_publication'] ) 
             
              Pubs= queryset.filter( titre_publication_lower = title , 
                                     ConfJournal_id = pub['ConfJournal_id'] , 
                                     date_publication = pub['date_publication'] )
           
              chercheurs_ids = Pubs.values_list('chercheur_id', flat=True).distinct()
            
              chercheurs_ids_list = list(chercheurs_ids)
              chercheurs = Chercheur.objects.filter(chercheur_id__in=chercheurs_ids_list) 
              chercheurs_nom = chercheurs.values_list('nom_complet', flat=True)

              return(chercheurs_nom )
       
       # liste des publication d'un chercheurs 
       def get_Pubs( self , id ) : 
              
              Pubs = Publication.objects.filter(chercheur_id = id )
              pubs = len (Pubs.values_list('chercheur_id', flat=True))

              return pubs
       

       

       
              

       

recherche_view = RechercheView() 

class ViewsAll ( APIView ) :

       #  toutes la liste de la bdd
       def get ( self , request ) :
            
            
            pub_data = Publication.objects.all().annotate(
                        titre_publication_lower=Lower(Replace('titre_publication', Value(' '), Value('')))
                        )

            chercheurs_data = Chercheur.objects.all()
            venue_data = ConfJournal.objects.all()

            unique_publications = []
            for key, group in groupby(pub_data, key=lambda x: (
                              x.titre_publication_lower, x.ConfJournal_id, x.date_publication)):
                              unique_publications.append(next(group))
                              

            serialized_chercheurs = ChercheurSerializer(chercheurs_data, many=True).data
            serialized_venue = ConfJournalSerializer(venue_data, many=True).data 
            serialized_pub = PublicationSerializer(unique_publications, many=True).data  

            queryset = Publication.objects.all().annotate(
                        titre_publication_lower=Lower(Replace('titre_publication', Value(' '), Value(''))) 
            )  

            for pub in  serialized_pub : 
                   pub['Authors'] = recherche_view.get_authors(pub,queryset)

            for chercheur in  serialized_chercheurs : 
                   user = Utilisateur.objects.get(chercheur_id = chercheur['chercheur_id'])
                   chercheur['pic'] = user.photo_url  
                   chercheur['nb_pub'] = recherche_view.get_Pubs( chercheur['chercheur_id'])     

       
                    
            serialized_data = {
                   "chercheurs": serialized_chercheurs ,
                   "venue": serialized_venue ,
                   "publication": serialized_pub
             }
            
            return Response (serialized_data) 
       


# liste des autreurs 
class Authors ( APIView ) : 
      def post(self , request) :
          
          titre = request.data.get('titre')

          pub = request.data
          pub['titre_publication']= recherche_view.convert(titre)
          queryset  = Publication.objects.all().annotate(
                        titre_publication_lower=Lower(Replace('titre_publication', Value(' '), Value('')))
                        )
          Authors= recherche_view.get_authors(pub,queryset)
          return Response(Authors)
      
      
# listes des pubs 
class Pubs ( APIView ) :
      def post ( self , request ) : 
            id = request.data.get('Matricule') 
            nbpubs = recherche_view.get_Pubs(id)
            return Response( nbpubs )

