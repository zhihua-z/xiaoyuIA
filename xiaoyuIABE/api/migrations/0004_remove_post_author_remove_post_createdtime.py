# Generated by Django 5.1.2 on 2024-11-09 18:37

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_alter_post_author"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="post",
            name="author",
        ),
        migrations.RemoveField(
            model_name="post",
            name="createdTime",
        ),
    ]