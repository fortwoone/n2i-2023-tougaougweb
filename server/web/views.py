from django.shortcuts import render

# Create your views here.

def index(request):
    user = request.user
    return render(request, 'accueil/index.html' , {'user':user})

def dark(request):
    # get the urser
    user = request.user
    return render(request, 'dark/index.html', {'user':user})