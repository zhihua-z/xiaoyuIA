# Generated by Django 5.1 on 2024-12-04 14:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0015_remove_post_posttype_remove_task_tasktype_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="typename",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="api.posttype"
            ),
        ),
    ]
