# Generated by Django 5.1 on 2025-02-10 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0022_healthdata_run_distance"),
    ]

    operations = [
        migrations.AlterField(
            model_name="healthdata",
            name="run_distance",
            field=models.FloatField(),
        ),
    ]
