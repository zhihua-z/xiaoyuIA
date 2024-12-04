from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100) 
    image = models.CharField(max_length=500) 
    author = models.CharField(max_length= 50)
    createdTime = models.DateTimeField()
    postType = models.CharField(max_length=20)
    likedCount = models.BigIntegerField()
    
    def __str__(self):
        return self.title

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=150)
    password = models.CharField(max_length=100)
    createdTime = models.DateTimeField()
    
    # define a string converter for this user
    # to tell the system what to do when printing this user as a string
    def __str__(self):
        return self.username

class EmailUserVerification(models.Model):
    email = models.CharField(max_length=150)
    verificationCode = models.CharField(max_length=6)
    createdTime = models.DateTimeField()
    
    def __str__(self):
        return self.email + ' ' + self.verificationCode

class PostUserLike(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE)  
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    createdTime = models.DateTimeField()
    
    class Meta:
        unique_together = (('post', 'user'),)


class Task(models.Model):
    taskType = models.CharField(max_length=20)
    taskName = models.CharField(max_length=100)
    taskUser = models.CharField(max_length=50)
    taskCreateTime = models.DateTimeField()
    taskDeadline = models.DateTimeField()