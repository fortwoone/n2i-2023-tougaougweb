from django.urls import path
from .views import index,dark, calculateur

urlpatterns = [
    path('', index, name='index'),
    path('dark', dark, name='dark'),

    path('calculateur', calculateur, name='calculateur'),
]