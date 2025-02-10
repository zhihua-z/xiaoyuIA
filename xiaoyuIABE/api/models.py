from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100) 
    image = models.CharField(max_length=500) 
    author = models.CharField(max_length= 50)
    createdTime = models.DateTimeField()
    typename = models.ForeignKey('PostType', on_delete=models.CASCADE)  
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
    typename = models.ForeignKey('TaskType', on_delete=models.CASCADE) 
    taskName = models.CharField(max_length=100)
    taskUser = models.CharField(max_length=50)
    taskCreateTime = models.DateTimeField()
    duration = models.FloatField(help_text='amount of time to complete in hours')
    taskDeadline = models.DateTimeField()
    completed = models.BooleanField(default=False)
    completedDateTime = models.DateTimeField(null=True, blank=True, default=None)
    
    def __str__(self):
        return f'{self.typename} - {self.taskName} for {self.taskUser} due on {self.taskDeadline}'
    
class PostType(models.Model):
    typename = models.CharField(max_length=100)
    
    def __str__(self):
        return self.typename
    
class TaskType(models.Model):
    typename = models.CharField(max_length=100)
    
    def __str__(self):
        return self.typename
    
class HealthData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=False)
    datatype = models.CharField(max_length=10)
    water_intake = models.IntegerField(help_text="Water intake in ml")
    calorie_intake = models.IntegerField(help_text="Calorie intake in kcal")
    heart_rate = models.IntegerField(help_text="Average heart rate in bpm")
    run_distance = models.FloatField()

    def __str__(self):
        return f"{self.user.username} - {self.date}"
