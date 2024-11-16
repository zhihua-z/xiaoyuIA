from django.shortcuts import render
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
# Create your views here.

from .models import Post, VideoPost, User


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
    
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        
        print(data['username'])
        print(data['password'])
        print(data['email'])
        
        u = User()
        u.username = data['username']
        u.password = data['password']
        u.email = data['email']
        u.createdTime = timezone.now()
        
        u.save()
        
    
    return HttpResponse('')


