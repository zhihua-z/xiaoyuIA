from django.urls import path

from . import views 

urlpatterns = [
    path("", views.index, name="index"),
    
    path("posts", views.getPosts, name="getPost"),
    path("login", views.login, name='login'),
    path("register", views.register, name='register'),
    path("sendVerificationCode", views.sendVerificationCode, name='sendVerification'),
    path("verifyCode", views.verifyCode, name='verifyCode'),
    path("like", view=views.like, name="like")
]