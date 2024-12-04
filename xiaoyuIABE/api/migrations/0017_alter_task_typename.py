# Generated by Django 5.1 on 2024-12-04 14:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0016_alter_post_typename"),
    ]

    operations = [
        migrations.AlterField(
            model_name="task",
            name="typename",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="api.tasktype"
            ),
        ),
    ]
