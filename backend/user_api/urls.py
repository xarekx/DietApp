from django.urls import path
from . import views

urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
    path('user', views.UserView.as_view(), name='user'),
    path('list', views.UserList.as_view(), name='list'),
]