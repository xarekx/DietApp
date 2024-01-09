# Generated by Django 4.2.3 on 2023-08-08 07:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='calories',
            field=models.PositiveIntegerField(default=0, help_text='calories per 100g', verbose_name='fat'),
        ),
        migrations.AddField(
            model_name='product',
            name='carbohydrates',
            field=models.PositiveIntegerField(default=0, verbose_name='carbohydrates'),
        ),
        migrations.AddField(
            model_name='product',
            name='fat',
            field=models.PositiveIntegerField(default=0, verbose_name='fat'),
        ),
        migrations.AddField(
            model_name='product',
            name='protein',
            field=models.PositiveIntegerField(default=0, verbose_name='protein'),
        ),
    ]
