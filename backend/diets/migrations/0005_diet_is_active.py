# Generated by Django 4.2.3 on 2024-04-16 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diets', '0004_alter_diet_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='diet',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
