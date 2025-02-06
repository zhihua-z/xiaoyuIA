from django.shortcuts import render
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
# Create your views here.

from .models import Post, User, EmailUserVerification, PostUserLike, Task, TaskType
from .emailbot import sendVerification


def index(request):
    return HttpResponse("hi")

def sortByTime(item):
    return item['postTime']

def sortByTaskCreateTime(item):
    return item['taskCreateTime']

@csrf_exempt
def getPosts(request):
    
    response = {}
    
    if request.method == 'POST':
        
        # ╭──────────────────────────────────────────────────────────────╮
        # │                     Check for form data                      │
        # ╰──────────────────────────────────────────────────────────────╯
        data = json.loads(request.body.decode('utf-8'))
        username = data['username']
        
        if username is None or username == '':
            username = 'heizi'
        
        print(f'||||||||{username}|||||||')
        
        
        # ╭──────────────────────────────────────────────────────────────╮
        # │                        Check db logic                        │
        # ╰──────────────────────────────────────────────────────────────╯
        posts = Post.objects.all()
        user = User.objects.get(username=username)

        post_list = []
        response = {}

        for post in posts:
            post_data = {
                "id": post.id,
                "title" : post.title,
                "url" : post.image,
                "author" : post.author,
                "postTime" : post.createdTime.strftime('%Y-%m-%d %H:%M'),
                "type": str(post.typename),
                "likedCount": post.likedCount,
                "userLiked": PostUserLike.objects.filter(user = user, post=post).exists()
            }
            post_list.append(post_data)
#  "userLiked": PostUserLike.objects.filter(user=user, post=post).exists()
        
        post_list.sort(key=sortByTime, reverse=True)

        response['post'] = post_list
            
    else:
        response['status'] = 'method not allowed'
    
    # force our return type to be application/json
    response = json.dumps(response)
    
    print('-------------')
    print(response)
    
    return HttpResponse(response)

@csrf_exempt
def login(request):
    response = {}
    
    if request.method == 'POST':
        print(request.body)
        # ╭──────────────────────────────────────────────────────────────╮
        # │                     Check for form data                      │
        # ╰──────────────────────────────────────────────────────────────╯
        data = json.loads(request.body.decode('utf-8'))
        username = data['username']
        password = data['password']
        
        
        # ╭──────────────────────────────────────────────────────────────╮
        # │                        Check db logic                        │
        # ╰──────────────────────────────────────────────────────────────╯
        # check if user already exists:
        try:
            user = User.objects.get(username=username)
            
            if user.password == password:
                response['status'] = 'success'
            else:
                response['status'] = 'wrong password'
        except User.DoesNotExist:
            response['status'] = 'user not exists'
            
    else:
        response['status'] = 'method not allowed'
    
    # force our return type to be application/json
    response = json.dumps(response)
    
    return HttpResponse(response)

@csrf_exempt
def register(request):
    response = {}
    
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        
        # check if user already exists:
        try:
            exists = User.objects.get(username=data['username'])
            if exists is not None:
                response['status'] = 'user exists'
        except User.DoesNotExist:
            u = User()
            u.username = data['username']
            u.password = data['password']
            u.email = data['email']
            u.createdTime = timezone.now()
            u.save()
            
            response['status'] = 'success'
    else:
        response['status'] = 'method not allowed'
    
    # force our return type to be application/json
    response = json.dumps(response)
    
    return HttpResponse(response)

@csrf_exempt
def sendVerificationCode(request):
    response = {}

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        email = data['email']

        code = sendVerification(email)

        euv = EmailUserVerification()
        euv.email = email
        euv.verificationCode = code
        euv.createdTime = timezone.now()

        euv.save()

        response['emailStatus'] = True
        response['code'] = code

    return HttpResponse(json.dumps(response))


@csrf_exempt
def verifyCode(request):
    response = {}

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))


        email = data['email']
        code = data['code']

        obj = EmailUserVerification.objects \
            .filter(email=email) \
            .order_by('-createdTime') \
            .first()


        if obj.verificationCode == code:
            response['success'] = True
        else:
            response['success'] = False

    return HttpResponse(json.dumps(response))

@csrf_exempt
def like(request):
    response = {}

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        response['status'] = None
        response['newLikedCount'] = None

        pid = data['postId']
        un = data['username']
        action = data['action']
        
        print(request.body)
        
        # 0. get user
        user: User = None
        post: Post = None
        
        # check user
        try:
            user = User.objects.get(username=un)
        except User.DoesNotExist:
            response['status'] = 'User does not exists'
        
        # check post
        try:
            post = Post.objects.get(id=pid)
        except Post.DoesNotExist:
            response['status'] = 'Post does not exists'

        if response['status'] is None:
            # 1. check user never liked this post before
            exists = PostUserLike.objects.filter(user=user, post=post).exists()
            
            if action == 'like':
                if exists:
                    response['status'] = 'Already liked'
                    response['newLikedCount'] = post.likedCount
                else:
                    # 2. add a like to the post
                    post.likedCount += 1
                    
                    # 3. add a like record
                    record = PostUserLike()
                    record.user = user
                    record.post = post
                    record.createdTime = timezone.now()
                    
                    post.save()
                    record.save()

                    response['status'] = 'success'
                    response['newLikedCount'] = post.likedCount
            elif action == 'unlike':
                if exists:
                    # 2.a. remove 1 from post like count
                    
                    # 2.b. remove the like record
                    post.likedCount -= 1
                    post.save()
                    
                    record = PostUserLike.objects.get(user=user, post=post)
                    record.delete()
                    
                    response['status'] = 'success'
                    response['newLikedCount'] = post.likedCount
                else:
                    response['status'] = 'not liked before'
                    response['newLikedCount'] = post.likedCount
                    
            else:
                response['status'] = 'action not found'   
                response['newLikedCount'] = post.likedCount       

    return HttpResponse(json.dumps(response))

@csrf_exempt
def createTask(request):
    response = {}

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        try:
            exists = Task.objects.get(taskName=data['taskName'])
            if exists is not None:
                response['status'] = 'task exists'
        except Task.DoesNotExist:
            typename = TaskType.objects.get(typename=data['taskType'])
            t = Task()
            t.typename = typename
            t.taskName = data['taskName']
            t.taskUser = data['taskUser']
            t.taskCreateTime = timezone.now()
            t.taskDeadline = data['deadline']
            t.save()
            
            response['status'] = 'success'
    else:
        response['status'] = 'method not allowed'
    
    # force our return type to be application/json
    response = json.dumps(response)
    
    return HttpResponse(response)

def getTaskByCriteria(request, completed):
    response = {}
    
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        username = data['username']
        
        
        # ╭──────────────────────────────────────────────────────────────╮
        # │                        Check db logic                        │
        # ╰──────────────────────────────────────────────────────────────╯
        tasks = Task.objects.filter(taskUser=username, completed=completed)
        Tasks_list = []
        response = {}

        for task in tasks:
            Tasks_data = {
                "id": task.id,
                "Type" : str(task.typename),
                "name" : task.taskName,
                "user" : task.taskUser,
                "taskCreateTime" : task.taskCreateTime.strftime('%Y-%m-%d %H:%M'),
                "taskDeadline" : task.taskDeadline.strftime('%Y-%m-%d %H:%M'),
            }
            Tasks_list.append(Tasks_data)
        Tasks_list.sort(key=sortByTaskCreateTime, reverse=True)
        response['status'] = 'success'
        response['task'] = Tasks_list
            
    else:
        response['status'] = 'method not allowed'
    
    # force our return type to be application/json
    response = json.dumps(response)
    
    return HttpResponse(response)

@csrf_exempt
def getTask(request):
    return getTaskByCriteria(request=request, completed=False)
    

@csrf_exempt
def getHistoricalTask(request):
    return getTaskByCriteria(request=request, completed=True)


@csrf_exempt
def setTaskComplete(request):
    response = {}

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        taskId = data['taskId']
        
        try:
            task = Task.objects.get(id=taskId)
            
            task.completed = True
            task.completedDateTime = timezone.now()
            task.save()
            
            response['status'] = 'success'
        except Task.DoesNotExist:
            response['status'] = 'task not exists'
    else:
        response['status'] = 'method not allowed'
    
    # force our return type to be application/json
    response = json.dumps(response)
    
    return HttpResponse(response)