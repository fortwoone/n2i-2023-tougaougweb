from django.urls import path
from .views import index,dark

urlpatterns = [
    path('', index, name='index'),
    path('dark', dark, name='dark')
]