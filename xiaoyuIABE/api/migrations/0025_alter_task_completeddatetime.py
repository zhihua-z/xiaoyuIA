# Generated by Django 5.1 on 2025-02-10 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0024_task_duration"),
    ]

    operations = [
        migrations.AlterField(
            model_name="task",
            name="completedDateTime",
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
    ]
