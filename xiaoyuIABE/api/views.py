from django.shortcuts import render
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
# Create your views here.

from .models import Post, VideoPost, User, EmailUserVerification
from .emailbot import sendVerification


def index(request):
    return HttpResponse("hi")

def getPosts(request):
    posts = Post.objects.all()

    post_list = []


    for post in posts:
        post_data = {
            "title" : post.title,
            "url" : post.image,
            "author" : post.author,
            "postTime" : post.createdTime.strftime('%Y-%m-%d %H:%M')
            
        }
        post_list.append(post_data)

    response = {}

    response['post'] = post_list
    response = json.dumps(response)

    return HttpResponse(response)

@csrf_exempt
def login(reqeust):
    
    # foundUser = User.objects.get(username = username)
    
    # if foundUser is not None:
    #     ///login successful
    
    return HttpResponse('')

@csrf_exempt
def register(request):
    response = {}
    
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        
        # check if user already exists:
        exists = User.objects.get(username=data['username'])
        if exists is not None:
            response['status'] = 'user exists'
        else:
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
