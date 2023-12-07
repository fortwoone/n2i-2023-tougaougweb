from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'accueil/index.html')

def dark(request):
    return render(request, 'dark/index.html')