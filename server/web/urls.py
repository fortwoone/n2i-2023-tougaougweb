from django.urls import path
from .views import index,dark, calculateur,contact,question, goTo404, parti1, parti2
from django.conf.urls import handler404

urlpatterns = [
    path('', index, name='index'),
    path('dark', dark, name='dark'),

    path('calculateur', calculateur, name='calculateur'),
    path('contact', contact, name='contact'),
    path('question', question, name='question'),
    path("handler404", handler404, name="404"),
    path("goTo404", goTo404, name="goTo404"),
    path("ubisoft/parti1", parti1, name="parti1"),
    path("ubisoft/parti2", parti2, name="parti2"),
]


handler404 = 'web.views.handler404'
