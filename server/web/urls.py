from django.urls import path
from .views import index,dark, question

urlpatterns = [
    path('', index, name='index'),
    path('dark', dark, name='dark'),
    path('question', question, name='question')
]