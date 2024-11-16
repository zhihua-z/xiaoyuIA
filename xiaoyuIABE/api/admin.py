from django.contrib import admin

# Register your models here.
from .models import Post, VideoPost, User

admin.site.register(Post)
admin.site.register(VideoPost)
admin.site.register(User)