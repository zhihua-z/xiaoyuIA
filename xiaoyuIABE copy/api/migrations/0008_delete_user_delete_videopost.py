# Generated by Django 5.1.2 on 2024-11-14 17:58

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0007_alter_user_password"),
    ]

    operations = [
        migrations.DeleteModel(
            name="User",
        ),
        migrations.DeleteModel(
            name="VideoPost",
        ),
    ]
