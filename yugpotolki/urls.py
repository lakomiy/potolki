from django.urls import path
from .views import home, second, collback, collback_mail


urlpatterns = [
    path('', home, name="home"),
    path('second', second, name="second"),
    path('collback', collback, name='collback'),
    path('collback_mail', collback_mail, name='collback_mail'),
]