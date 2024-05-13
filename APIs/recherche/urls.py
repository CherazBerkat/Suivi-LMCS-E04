
from django.urls import path
from .views import RechercheView , ViewsAll , Authors , Pubs 

urlpatterns = [
    path('Search/', RechercheView.as_view(), name='search'),
    path('Pubs/',Pubs.as_view(),name='Pubs'),
    path('SearchAll/', ViewsAll.as_view(), name='searchall'),
    path('Authors/', Authors.as_view(), name='Authors'),
    path('Pubs/', Pubs.as_view(), name='Pubs'),
]

