# Generated by Django 4.2.3 on 2024-04-15 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0008_alter_product_calories_alter_product_carbohydrates_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='calories',
            field=models.DecimalField(decimal_places=2, help_text='calories per 100g', max_digits=18, verbose_name='calories'),
        ),
        migrations.AlterField(
            model_name='product',
            name='carbohydrates',
            field=models.DecimalField(decimal_places=2, help_text='carbohydrates per 100g', max_digits=18, verbose_name='carbohydrates'),
        ),
        migrations.AlterField(
            model_name='product',
            name='fat',
            field=models.DecimalField(decimal_places=2, help_text='fat per 100g', max_digits=18, verbose_name='fat'),
        ),
        migrations.AlterField(
            model_name='product',
            name='protein',
            field=models.DecimalField(decimal_places=2, help_text='protein per 100g', max_digits=18, verbose_name='protein'),
        ),
    ]
