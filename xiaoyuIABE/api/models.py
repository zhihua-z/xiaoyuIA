from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100) 
    image = models.CharField(max_length=500) 
    author = models.CharField(max_length= 50)
    createdTime = models.DateTimeField()

class VideoPost(models.Model):
    title = models.CharField(max_length=100) 
    videoURL = models.CharField(max_length=500) 
    author = models.CharField(max_length= 50)
    createdTime = models.DateTimeField()

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=150)
    password = models.CharField(max_length=100)
    createdTime = models.DateTimeField()
