from django.shortcuts import render


def index(request):
    user = request.user
    return render(request, 'accueil/index.html', {'user': user})


def contact(request):
    user = request.user
    return render(request, 'contact/index.html', {'user': user})


def question(request):
    user = request.user
    return render(request, 'quizz/question.html', {'user': user})
