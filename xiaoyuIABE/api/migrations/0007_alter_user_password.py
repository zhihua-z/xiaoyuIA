# Generated by Django 5.1.2 on 2024-11-14 17:54

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0006_user_videopost"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="password",
            field=models.CharField(max_length=100),
        ),
    ]