
from django.contrib import admin
from django.urls import path , include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('maj/',include('MAJ.urls')) ,
    path('recherche/',include('recherche.urls')) ,
    path('params/',include('params.urls')) ,
    path('profil/',include('profil.urls')) ,
    path('home/',include('home.urls')) ,
    path('aide/',include('aide.urls')) ,
    path('our_team/',include('our_team.urls')) ,
    path('About_us/',include('About_us.urls')) ,
    path('', include('authentications.urls')) ,   
    path('Statistique/', include('statistique.urls')) ,
    path('bdd/',include('bdd.urls')) ,
]
