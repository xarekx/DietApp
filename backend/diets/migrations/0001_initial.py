# Generated by Django 4.2.3 on 2024-04-15 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('recipe', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Diet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recipe', models.ManyToManyField(to='recipe.recipe')),
            ],
            options={
                'verbose_name': 'Diet',
                'verbose_name_plural': 'Diets',
            },
        ),
    ]
