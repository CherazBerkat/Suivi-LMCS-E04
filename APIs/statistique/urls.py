from django.urls import path
from .views import ( CritereDate , CriterePeriodicite , CritereGrade_recherche , CriterStat ,
                    CritereEquip , CritereGrade_enseignement ,CritereType , PubRevue )

urlpatterns = [
    path('Publication/', CritereDate.as_view(), name='statistique'),
    path('Periodicite_Revue/', CriterePeriodicite.as_view(), name='statistique'),
    path('Grade_Enseignement/', CritereGrade_enseignement.as_view(), name='statistique'),
    path('Grade_recherche/', CritereGrade_recherche.as_view(), name='statistique'),
    path('Type_Revue/', CritereType.as_view(), name='statistique'),
    path('Pub_Revue/', PubRevue.as_view(), name='statistique'), 
    path('Equipe/', CritereEquip.as_view(), name='statistique'),
    path('Stat/', CriterStat.as_view(), name='statistique'),
]