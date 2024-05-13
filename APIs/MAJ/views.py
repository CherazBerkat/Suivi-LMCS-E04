from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models.functions import Lower, Replace
from django.db.models import Value 
from rest_framework import status
from bdd.models import Chercheur, Publication, ConfJournal, ConfJournalClassification, Encadrement, Encadrement_Chercheur, Projet, Prj_Cher, Utilisateur
from bdd.serializers import ChercheurSerializer, PublicationSerializer ,ProjetSerializer , Prj_CherSerializer , Encadrement_ChercheurSerializer,EncadrementSerializer , UtilisateurSerializer , ConfJournalSerializer , ConfJournalClassificationSerializer
from django.contrib.auth.models import User
from recherche.views import RechercheView  

# Create an instance of RechercheView
recherche_view = RechercheView() 


# info de tous les cherchuers dan la bdd 
class Getchercheurs(APIView):
    def get(self, request):
        chercheurs = Chercheur.objects.all()
        serializer = ChercheurSerializer(chercheurs, many=True)
        return Response(serializer.data)
    
  # info de touts les utilisateurs de labo
class Getutilisateurs(APIView):
    def get(self, request):
        utilisateurs = Utilisateur.objects.all()
        serializer = UtilisateurSerializer(utilisateurs, many=True) 
        return Response(serializer.data) 
    
    

class AjouterChercheur(APIView):
    

    # l'ajout d'un chercheurs dansla bdd 
    def post(self, request, *args, **kwargs):

      matricule = request.data.get ('chercheur_id',None)  

      if matricule :
          
          # les infos collecté 
          chercheur =Chercheur.objects.filter(chercheur_id=matricule)
          Orcid = request.data.get ('ORCID',None)
          dblp = request.data.get ('dblp',None)
          ggl_scholar = request.data.get ('ggl_scholar',None)
          site_personel = request.data.get ('site_personel',None)
          search_gate = request.data.get ('search_gate',None)
          
          if not Orcid :
             Orcid = request.data.pop ('ORCID')
          if not dblp :
             dblp = request.data.pop ('dblp')
          if not ggl_scholar :
             ggl_scholar = request.data.pop ('ggl_scholar')
          if not site_personel :
             site_personel = request.data.pop ('site_personel')
          if not search_gate :
             search_gate = request.data.pop ('search_gate')



          if not chercheur.exists() :

              request.data['chercheur_id']=matricule 
              request.data['role'] ='chercheur'
              request.data['nom_utilisateur'] = request.data.get('nom_complet','') 

              # Generate a random password
              password_length = 12  
              request.data['password'] = User.objects.make_random_password(password_length)
      
              serializer_chercheur = ChercheurSerializer(data=request.data)
              serializer_user = UtilisateurSerializer(data=request.data)

              if serializer_chercheur.is_valid() :
           
                 serializer_chercheur.save()
                 if serializer_user.is_valid() :
              
                      serializer_user.save()
                      return Response({'message': 'Object created successfully'}, status=status.HTTP_201_CREATED)
                 else :
                      return Response({'errors': serializer_user.errors  }, status=status.HTTP_400_BAD_REQUEST) 
        
              else:
                 return Response({'errors': serializer_chercheur.errors  }, status=status.HTTP_400_BAD_REQUEST)
        
          else:
               return Response({'message': 'Chercheur with given matricule already exists'})  

      else :
               return Response({'message': 'Chercheur with no matricule '})
      


class AjouterPublication(APIView):
 
 def post(self, request, *args, **kwargs):
        
        # les infos collecté d'une pub  
        Authors_list = request.data.pop('ListChercheurs','') 
        date = request.data.get('annee','')
        Acronyme = request.data.pop('acronyme','')

        Acronym = recherche_view.convert(Acronyme)
        

        # sauvgarder  
        try :  
          venue = ConfJournal.objects.annotate(
                 ConfJournal_id_lower=Lower(Replace('ConfJournal_id', Value(' '), Value(''))) 
                 ).get( ConfJournal_id_lower=Acronym )

          lien = request.data.get ('lien','')
          if not lien :
             lien = request.data.pop('lien')       
    
          for Author in Authors_list :
            print(Author)
            try :  
                 chercheurId=Chercheur.objects.get(chercheur_id=Author['Matricule'])
             
                 pub = Publication.objects.filter(
                            ConfJournal_id=venue.ConfJournal_id , 
                            chercheur_id= chercheurId.chercheur_id ,date_publication=date )
                 
                 if not pub.exists() :
                     
                     request.data['chercheur_id']= chercheurId.chercheur_id
                     request.data['ConfJournal_id']= venue.ConfJournal_id
                     request.data['date_publication'] = date
                     request.data['rang'] = Author['rang']

                     serializer = PublicationSerializer(data=request.data)

                     if serializer.is_valid():
                           serializer.save()
                     else:
                           return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 
                     
                 
                 
            except Chercheur.DoesNotExist: 
              continue  

          return Response({'message': 'terminer'}, status=status.HTTP_201_CREATED)   
         
        except ConfJournal.DoesNotExist :
          return Response({'message': 'venue exist pas'})
          





# l'ajout d'un revue avec ses classements
class AjouterVenue(APIView):
    
    def post(self, request, *args, **kwargs):

      Acronyme = request.data.get ('acronyme','')  
      Acronym = recherche_view.convert(Acronyme)

      if Acronyme :
          Venue =ConfJournal.objects.annotate(
                     ConfJournal_id_lower=Lower(Replace('ConfJournal_id', Value(' '), Value(''))) ).filter(
                     ConfJournal_id_lower=Acronym)

          if not Venue.exists() :
              
              # les infos collecté

              me = request.data.get ('Maison_Edition','')
              perio = request.data.get ('periodicite','')
              lien = request.data.get ('lien','')
              if not perio :
                  perio = request.data.pop('periodicite')
              if not lien :
                  lien = request.data.pop('lien')  
              if not me :
                  me = request.data.pop('Maison_Edition')     

              request.data['ConfJournal_id']=Acronyme 
              VenueClasses = request.data.pop('listClassement',[]) 
              otherClass = []

              if VenueClasses :
               # les classements ajouté par user
               for VenueClass in VenueClasses :
                  
                  if VenueClass['nom'] == 'Core' :
                      request.data['Class_CORE'] =  VenueClass['rang']

                  elif VenueClass['nom'] == 'Scimago' : 
                      request.data['Class_Scimago'] =  VenueClass['rang'] 

                  elif VenueClass['nom'] == 'DGRSDT' :
                      request.data['Class_DGRSDT'] =  VenueClass['rang']  

                  elif VenueClass['nom'] == 'Qualis' :
                      request.data['Class_Qualis'] =  VenueClass['rang']

                  else : 
                      otherClass.append(f"{VenueClass['nom']}:{VenueClass['rang']}")    

               if otherClass : 
                 otherClass_str = ','.join(otherClass) 
                 request.data['Class_Autres'] = otherClass_str 

   


              # sauvgarder 
              serializer_venue = ConfJournalSerializer(data=request.data)
              serializer_venueClass = ConfJournalClassificationSerializer(data=request.data)

              if serializer_venue.is_valid() :
           
                 serializer_venue.save()

                 if VenueClasses :
                   
                   if serializer_venueClass.is_valid() :
                      serializer_venueClass.save()
                      return Response({'message': 'Object created successfully'}, status=status.HTTP_201_CREATED)
                   else :
                      return Response({'errors': serializer_venueClass.errors  }, status=status.HTTP_400_BAD_REQUEST) 
                   
                 return Response({'message': 'Object created successfully'}, status=status.HTTP_201_CREATED)
              else:
                 return Response({'errors': serializer_venue.errors  }, status=status.HTTP_400_BAD_REQUEST)
        
          else:
               return Response({'message': 'Venue with given Acronyme already exists'})  

      else :
               return Response({'message': 'Venue with no Acronyme  '})
 

class ChercheurUpdateStatuts(APIView):

    # mis a jour d'un status pour un chercheur 

    def patch(self, request):
        chercheur_id = request.data.get('Matricule', '')
        new_statut = request.data.get('statut', '')

        try:
            chercheur = Chercheur.objects.get(chercheur_id=chercheur_id)
        except Chercheur.DoesNotExist:
            return Response({'error': 'Chercheur not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ChercheurSerializer(chercheur, data={'statut': new_statut}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Statut updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class VenueUpdate(APIView):
    # mis a jour d'un revues meme logique avec l'ajout  
    def patch(self, request):

        Acronyme = request.data.pop('Acronyme', '')
        Acronym = recherche_view.convert(Acronyme)
 
        VenueClasses = request.data.pop('ListClassements',[])      

        try:
            confjournal = ConfJournal.objects.annotate(
                         ConfJournal_id_lower=Lower(Replace('ConfJournal_id', Value(' '), Value(''))) ).get(
                         ConfJournal_id_lower=Acronym)
            
        except confjournal.DoesNotExist:
            return Response({'error': 'Venue not found'}, status=status.HTTP_404_NOT_FOUND)
        

        if VenueClasses :
          
          try:
                ConfJournalClass, created = ConfJournalClassification.objects.get_or_create(
                    ConfJournal_id=confjournal,
                    defaults={
                        "Class_CORE": "",
                        "Class_Scimago": "",
                        "Class_DGRSDT": "",
                        "Class_Qualis": ""
                    }
                )
          except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



          data_class = {}
          otherClass = []
          for VenueClass in VenueClasses :
                  
                  if VenueClass['name'] == 'Core' :
                      data_class['Class_CORE'] =  VenueClass['Rang']

                  elif VenueClass['name'] == 'Scimago' : 
                      data_class['Class_Scimago'] =  VenueClass['Rang'] 

                  elif VenueClass['name'] == 'DGRSDT' :
                      data_class['Class_DGRSDT'] =  VenueClass['Rang']  

                  elif VenueClass['name'] == 'Qualis' :
                      data_class['Class_Qualis'] =  VenueClass['Rang']
                 
                  elif VenueClass['name'] == 'Autres' :
                      data_class['Class_Autres'] =  VenueClass['Rang']

                  else : 
                      otherClass.append(f"{VenueClass['nom']}:{VenueClass['rang']}") 

          otherClass_str = ','.join(otherClass)     
          data_class['Class_Autres'] = otherClass_str     
                

          serializer_class = ConfJournalClassificationSerializer(ConfJournalClass, data=data_class, partial=True)
          


        serializer = ConfJournalSerializer(confjournal, data=request.data, partial=True)
       
        if serializer.is_valid():

            serializer.save()

            if VenueClasses :  
              if serializer_class.is_valid():
                serializer_class.save()
                return Response({'message': 'venue updated successfully with classement'}, status=status.HTTP_200_OK)

            return Response({'message': 'venue updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 



class UserUpdateRole(APIView):

    # mis a jour des roles par l'admin  
    def patch(self, request):

        new_role = request.data.get('role', '')
        utilisateur_id = request.data.get('User_id','')  
       
        try :
                 user = Utilisateur.objects.get(utilisateur_id= utilisateur_id)
        except Utilisateur.DoesNotExist:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UtilisateurSerializer(user, data={'role': new_role}, partial=True)

        # sauvgarde le nouveau role pour l'utilisateur  
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'role updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

           
            
      
class AjouterProjet(APIView): 

     # l'ajout des projet 
    def post(self, request):
        # info entré par user
        projet_id = request.data.get('code')
        intitule = request.data.get('intitule', '')
        domaine = request.data.get('domaine',None)
        liste_membres = request.data.get('ListeMembres', [])
        date_debut = request.data.get('dateDeDebut', '')
        date_fin = request.data.get('DateDeFin', '')
        
         # validation des entre avant le sauvgarde 
        if not projet_id:
            return Response({'error': 'Projet ID not provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        liste_membres_str = ', '.join([membre['NomDeChercheur'] for membre in liste_membres])

        chef = next((m for m in liste_membres if m.get('RoleDeChercheur') == "Chef"), None)
        if chef:
            chef_projet = chef['NomDeChercheur']
        else:
            return Response({'error': 'chef de projet not found'}, status=status.HTTP_400_BAD_REQUEST)
        if domaine :
           
           projet_data = {
            'projet_id': projet_id,
            'intitule': intitule,
            'chef_projet': chef_projet,
            'domaine': domaine,
            'liste_membres': liste_membres_str,
            'date_debut': date_debut,
            'date_fin': date_fin,
         }
           
        else :
             projet_data = {
            'projet_id': projet_id,
            'intitule': intitule,
            'chef_projet': chef_projet,
            'liste_membres': liste_membres_str,
            'date_debut': date_debut,
            'date_fin': date_fin,
         }   


        projet_serializer = ProjetSerializer(data=projet_data)
        
        if not projet_serializer.is_valid():
            return Response(projet_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # remplir la table chercheur_projet 

        projet = projet_serializer.save()    
        for membre in liste_membres:
            Matricule = membre.get('Matricule', '')
            nom_membre = membre.get('NomDeChercheur', '')
            role = membre.get('RoleDeChercheur', '')
            chercheur = Chercheur.objects.filter(chercheur_id=Matricule).first()
            

            if chercheur:  
                membre_data = {
                    'projet_id': projet_id,
                    'chercheur_id': Matricule,
                    'role': role
                }
                membre_serializer = Prj_CherSerializer(data=membre_data)
                if not membre_serializer.is_valid():
                    return Response(membre_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                membre_serializer.save()
            else:
                liste_membres.append(membre)
            return Response({'message': 'Projet ajouté avec succès'}, status=status.HTTP_201_CREATED)
    



class AjouterEncadrement(APIView):
    def post(self, request):
        # info collecté 
        encad_id = request.data.get('encad_id', None)
        encadreurs_data = request.data.get('encadreurs', [])
        etudiants_data = request.data.get('etudiants', [])
        titre = request.data.get('titre', '')
        type_encadrement = request.data.get('type',None)
        annee_debut = request.data.get('Annee_debut', None)
        annee_fin_previsionnelle = request.data.get('annee_fin', None)

        if not encad_id:
            return Response({'error': 'encad ID not provided'}, status=status.HTTP_400_BAD_REQUEST)

        if Encadrement.objects.filter(encad_id=encad_id).exists():
            return Response({'error': 'Encad_id already exists'}, status=status.HTTP_400_BAD_REQUEST)

        noms_prenoms = ', '.join(etudiants_data)
        
        # validation des att 
        if not type_encadrement :
           
           encadrement_data = {
            'encad_id': encad_id,
            'titre': titre,
            'annee_debut': annee_debut,
            'annee_fin_previsionnelle': annee_fin_previsionnelle,
            'noms_prenoms': noms_prenoms  
           }

        else :   
            encadrement_data = {
            'encad_id': encad_id,
            'titre': titre,
            'annee_debut': annee_debut,
            'type': type_encadrement,
            'annee_fin_previsionnelle': annee_fin_previsionnelle,
            'noms_prenoms': noms_prenoms  
           } 

        encadrement_serializer = EncadrementSerializer(data=encadrement_data)
        if not encadrement_serializer.is_valid():
            return Response(encadrement_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        encadrement_serializer.save()
        
        # remplissage de la table encadrement_chercheur 
        for encadreur_data in encadreurs_data:
            nom_encadreur = encadreur_data.get('NomDeChercheur', '')  
            mat_encadreur = encadreur_data.get('Matricule','')

            chercheur = Chercheur.objects.filter(chercheur_id=mat_encadreur).first()
            if  chercheur:
              encadreur_data = {
                'encad_id': encad_id,
                'chercheur_id': mat_encadreur,}
              encadreur_encadrement_serializer = Encadrement_ChercheurSerializer(data=encadreur_data)
              if not encadreur_encadrement_serializer.is_valid():
                return Response(encadreur_encadrement_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
              encadreur_encadrement_serializer.save()

        return Response({'message': 'Encadrement ajouté avec succès'}, status=status.HTTP_201_CREATED)



#
class InfoUtilisateurs(APIView):
  def get(self,request):

        utilisateur_id = request.data.get('User_id','')  
       
        try :
                 user = Utilisateur.objects.get(utilisateur_id= utilisateur_id)
        except Utilisateur.DoesNotExist:
                 return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
   
        serializer_user = UtilisateurSerializer(user).data
                
        return Response(serializer_user) 
  

class InfoChercheur(APIView):
  def get(self,request):

        chercheur_id = request.data.get('Matricule','')  
       
        try :
                 chercheur = Chercheur.objects.get(chercheur_id= chercheur_id)
        except Chercheur.DoesNotExist:
                 return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
   
        serializer = UtilisateurSerializer(chercheur).data
                
        return Response(serializer)   
  

