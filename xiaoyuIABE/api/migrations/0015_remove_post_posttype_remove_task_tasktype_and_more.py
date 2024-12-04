# Generated by Django 5.1 on 2024-12-04 14:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0014_posttype_tasktype"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="post",
            name="postType",
        ),
        migrations.RemoveField(
            model_name="task",
            name="taskType",
        ),
        migrations.AddField(
            model_name="post",
            name="typename",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="api.posttype",
            ),
        ),
        migrations.AddField(
            model_name="task",
            name="typename",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="api.tasktype",
            ),
        ),
    ]
