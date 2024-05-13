from django.contrib import admin
from .models import Chercheur, Publication, ConfJournal, ConfJournalClassification, Encadrement, Encadrement_Chercheur, Projet, Prj_Cher, Utilisateur

# Register your models here.
admin.site.register(Chercheur)
admin.site.register(Publication)
admin.site.register(Projet)
admin.site.register(Prj_Cher)
admin.site.register(Encadrement)
admin.site.register(Encadrement_Chercheur)
admin.site.register(ConfJournal)
admin.site.register(ConfJournalClassification)
admin.site.register(Utilisateur)
