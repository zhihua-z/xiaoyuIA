from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from datetime import timedelta

import pytz
# Create your views here.

from .models import HealthData, Post, User, EmailUserVerification, PostUserLike, Task, TaskType
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
        print('-0----------')
        print(data.get('username'))
        username = data.get('username')
        
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
        print(post_list)
#  "userLiked": PostUserLike.objects.filter(user=user, post=post).exists()
        
        post_list.sort(key=sortByTime, reverse=True)

        response['post'] = post_list
            
    else:
        response['status'] = 'method not allowed'
    
    # force our return type to be application/json
    response = json.dumps(response)
    
    return HttpResponse(response)

@csrf_exempt
def login(request):
    response = {}
    
    if request.method == 'POST':
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
            t.duration = data['duration']
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

def getMeHealthData(user, current_date):
    
    total_water_intake = 0
    total_calorie_intake = 0
    average_heartrate = 0
    total_heartcount = 0
    total_run_distance = 0
    
    
    health_data = HealthData.objects.filter(user=user, date=current_date)

    if not health_data.exists():
        return {
            'runDistance': 0,
            'water': 0,
            'calorie': 0,
            'heartrate': 0
        }
    else:
        for item in health_data:
            if item.datatype == 'run':
                total_run_distance += item.run_distance
            if item.datatype == 'water':
                total_water_intake += item.water_intake
            elif item.datatype == 'calorie':
                total_calorie_intake += item.calorie_intake
            elif item.datatype == 'heartrate':
                average_heartrate += item.heart_rate
                total_heartcount += 1

    if total_heartcount != 0:
        average_heartrate = int(average_heartrate / total_heartcount)
        
    return {
        'runDistance': round(total_run_distance, 1),
        'water': total_water_intake,
        'calorie': total_calorie_intake,
        'heartrate': average_heartrate
    }

@csrf_exempt
def getMePageData(request):
    response = {}

    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            user = User.objects.get(username=username)
            current_date = timezone.now().date()

            result = getMeHealthData(user, current_date)
            
            if result is None:
                response = {
                    'status': 'failed',
                    'total_run_distance_km': 0,
                    'total_water_intake_ml': 0,
                    'total_calorie_intake_kcal': 0,
                    'average_heart_rate': 0
                }
            else:
                print(result)
                print('---=-=--=-=--=')
                response = {
                    'status': 'success',
                    'total_run_distance_km': result['runDistance'],
                    'total_water_intake_ml': result['water'],
                    'total_calorie_intake_kcal': result['calorie'],
                    'average_heart_rate': result['heartrate']
                }
            return JsonResponse(response)

        except User.DoesNotExist:
            return JsonResponse({'status': 'failed', 'message': 'User not found'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'failed', 'message': 'Invalid JSON'}, status=400)

    return JsonResponse({'status': 'method not allowed'}, status=405)

@csrf_exempt
def postMePageData(request):
    response = {}
    
    total_water_intake = 0
    total_calorie_intake = 0
    average_heartrate = 0
    total_heartcount = 0

    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            datatype = data.get('datatype')
            data = data.get('data')
            
            user = User.objects.get(username=username)
            current_date = timezone.now().date()
            
            healthData = HealthData()
            healthData.user = user
            healthData.date = current_date
            healthData.datatype = datatype
            
            if datatype == 'run':
                healthData.water_intake = 0
                healthData.calorie_intake = 0
                healthData.heart_rate = 0
                healthData.run_distance = data
            if datatype == 'water':
                healthData.water_intake = data
                healthData.calorie_intake = 0
                healthData.heart_rate = 0
                healthData.run_distance = 0
            elif datatype == 'calorie':
                healthData.water_intake = 0
                healthData.calorie_intake = data
                healthData.heart_rate = 0
                healthData.run_distance = 0
            elif datatype == 'heartrate':
                healthData.water_intake = 0
                healthData.calorie_intake = 0
                healthData.heart_rate = data
                healthData.run_distance = 0
            healthData.save()
            
            
            # after add new items, need to refresh data
            result = getMeHealthData(user, current_date)
            
            if result is None:
                response = {
                    'status': 'failed',
                    'total_run_distance_km': 0,
                    'total_water_intake_ml': 0,
                    'total_calorie_intake_kcal': 0,
                    'average_heart_rate': 0
                }
            else:
                response = {
                    'status': 'success',
                    'total_run_distance_km': result['runDistance'],
                    'total_water_intake_ml': result['water'],
                    'total_calorie_intake_kcal': result['calorie'],
                    'average_heart_rate': result['heartrate']
                }
            return JsonResponse(response)

        except User.DoesNotExist:
            return JsonResponse({'status': 'failed', 'message': 'User not found'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'failed', 'message': 'Invalid JSON'}, status=400)

    return JsonResponse({'status': 'method not allowed'}, status=405)

def getWorkdoneThatDay(user: User, date):
    hours_completed = 0
    
    start_of_day = timezone.make_aware(timezone.datetime.combine(date, timezone.datetime.min.time()))
    end_of_day = timezone.make_aware(timezone.datetime.combine(date, timezone.datetime.max.time()))
    
    health_data = Task.objects.filter(taskUser=user.username, completed=True, completedDateTime__range=(start_of_day, end_of_day))

    if not health_data.exists():
        hours_completed = 0
    else:
        for item in health_data:
            hours_completed += item.duration
    
    return hours_completed

@csrf_exempt
def getWorkoutData(request):
    response = {}

    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            user = User.objects.get(username=username)
            sg_timezone = pytz.timezone('Asia/Singapore')
            current_date = timezone.now().astimezone(sg_timezone).date()
            
            lastweek = [0, 0, 0, 0, 0, 0, 0]
            thisweek = [0, 0, 0, 0, 0, 0, 0]
            startDay = current_date - timedelta(days=7 + current_date.weekday())
            
            # calculate data for last week
            for i in range(7):
                lastweek[i] = getWorkdoneThatDay(user, startDay)
                startDay = startDay + timedelta(days=1)
            
            # calculate data for this week
            for i in range(current_date.weekday() + 1):
                thisweek[i] = getWorkdoneThatDay(user, startDay)
                startDay = startDay + timedelta(days=1)
            
            result = [
                {
                    'label': 'This Week',
                    'data': thisweek,

                },
                {
                    'label': 'Last Week',
                    'data': lastweek,

                },
            ]
            
            response = {
                'status': 'success',
                'workoutData': result
            }
            return JsonResponse(response)

        except User.DoesNotExist:
            return JsonResponse({'status': 'failed', 'message': 'User not found'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'failed', 'message': 'Invalid JSON'}, status=400)

    return JsonResponse({'status': 'method not allowed'}, status=405)


@csrf_exempt
def getProgressData(request):
    response = {}

    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            user = User.objects.get(username=username)
            sg_timezone = pytz.timezone('Asia/Singapore')
            current_date = timezone.now().astimezone(sg_timezone).date()
            
            strength = 0
            cardio = 0
            stretches = 0
            general = 0
            
            # do calculations here
    
            start_of_day = timezone.make_aware(timezone.datetime.combine(current_date, timezone.datetime.min.time()))
            end_of_day = timezone.make_aware(timezone.datetime.combine(current_date, timezone.datetime.max.time()))
            
            taskData = Task.objects.filter(taskUser=user.username, completed=True, completedDateTime__range=(start_of_day, end_of_day))

            strength_type = TaskType.objects.get(typename='strength')
            cardio_type = TaskType.objects.get(typename='cardio')
            stretches_type = TaskType.objects.get(typename='stretches')
            general_type = TaskType.objects.get(typename='general')

            if taskData is not None:
                for item in taskData:
                    if item.typename == strength_type:
                        strength += item.duration
                    if item.typename == cardio_type:
                        cardio += item.duration
                    if item.typename == stretches_type:
                        stretches += item.duration
                    if item.typename == general_type:
                        general += item.duration
            
            result = [
                { 'id': 0, 'value': strength, 'label': 'Strength' },
                { 'id': 1, 'value': cardio, 'label': 'Cardio' },
                { 'id': 2, 'value': stretches, 'label': 'Streches' },
                { 'id': 3, 'value': general, 'label': 'General' },
            ]
            
            response = {
                'status': 'success',
                'progressData': result
            }
            return JsonResponse(response)

        except User.DoesNotExist:
            return JsonResponse({'status': 'failed', 'message': 'User not found'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'failed', 'message': 'Invalid JSON'}, status=400)

    return JsonResponse({'status': 'method not allowed'}, status=405)