# Generated by Django 5.1 on 2024-12-04 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0013_task"),
    ]

    operations = [
        migrations.CreateModel(
            name="PostType",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("typename", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="TaskType",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("typename", models.CharField(max_length=100)),
            ],
        ),
    ]
