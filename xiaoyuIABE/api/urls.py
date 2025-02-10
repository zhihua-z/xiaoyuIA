from django.urls import path

from . import views 

urlpatterns = [
    path("", views.index, name="index"),
    
    path("posts", views.getPosts, name="getPost"),
    path("login", views.login, name='login'),
    path("register", views.register, name='register'),
    path("sendVerificationCode", views.sendVerificationCode, name='sendVerification'),
    path("verifyCode", views.verifyCode, name='verifyCode'),
    path("like", view=views.like, name="like"),
    path("createTask", views.createTask, name="createTask"),
    path("getTask", views.getTask, name="getTask"),
    path("setTaskComplete", views.setTaskComplete, name="setTaskComplete"),
    path("getMePageData", views.getMePageData, name="getMePageData"),
    path("postMePageData", views.postMePageData, name="postMePageData"),
    path("getWorkoutData", views.getWorkoutData, name="getWorkoutData"),
    path("getProgressData", views.getProgressData, name="getProgressData")
    
]