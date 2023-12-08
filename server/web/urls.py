from django.urls import path
from .views import index,dark, calculateur,contact,question

urlpatterns = [
    path('', index, name='index'),
    path('dark', dark, name='dark'),

    path('calculateur', calculateur, name='calculateur'),
    path('contact', contact, name='contact'),
    path('question', question, name='question')
]