from django.shortcuts import render


def index(request):
    user = request.user
    return render(request, 'accueil/index.html', {'user': user})


def contact(request):
    user = request.user
    return render(request, 'contact/index.html', {'user': user})
def dark(request):
    user = request.user
    return render(request, 'dark/index.html', {'user':user})

def calculateur(request):
    # get the urser
    user = request.user
    return render(request, 'calculateur/index.html', {'user':user})


def question(request):
    user = request.user
    return render(request, 'quizz/question.html', {'user': user})

def handler404(request, exception):
    user = request.user
    return render(request, '404/index.html', status=404)
def goTo404(request):
    return render(request, '404.html', status=404)


def parti1(request):
    user = request.user
    return render(request, 'Ubisoft/parti1.html', {'user': user})

def parti2(request):
    user = request.user
    return render(request, 'Ubisoft/parti2.html', {'user': user})

def ubisoft(request):
    user = request.user
    return render(request, "ubisoft/pitch.html", {"user":user})
