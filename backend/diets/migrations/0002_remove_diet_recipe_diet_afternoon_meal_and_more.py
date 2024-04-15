# Generated by Django 4.2.3 on 2024-04-15 11:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('diets', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='diet',
            name='recipe',
        ),
        migrations.AddField(
            model_name='diet',
            name='afternoon_meal',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='afternoon_meal_recipe', to='recipe.recipe'),
        ),
        migrations.AddField(
            model_name='diet',
            name='breakfast',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='breakfast_recipe', to='recipe.recipe'),
        ),
        migrations.AddField(
            model_name='diet',
            name='day',
            field=models.CharField(choices=[('monday', 'Monday'), ('tuesday', 'Tuesday'), ('wednesday', 'Wednesday'), ('thursday', 'Thursday'), ('friday', 'Friday'), ('saturday', 'Saturday'), ('sunday', 'Sunday')], default=('monday', 'Monday'), max_length=20),
        ),
        migrations.AddField(
            model_name='diet',
            name='dinner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='dinner_recipe', to='recipe.recipe'),
        ),
        migrations.AddField(
            model_name='diet',
            name='lunch',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lunch_recipe', to='recipe.recipe'),
        ),
        migrations.AddField(
            model_name='diet',
            name='second_breakfast',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='second_breakfast_recipe', to='recipe.recipe'),
        ),
        migrations.AddField(
            model_name='diet',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
