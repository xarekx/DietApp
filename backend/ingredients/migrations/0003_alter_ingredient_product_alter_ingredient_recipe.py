# Generated by Django 4.2.3 on 2024-03-11 12:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0007_alter_product_options'),
        ('recipe', '0001_initial'),
        ('ingredients', '0002_ingredient_recipe'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product'),
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='recipe',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ingredients', to='recipe.recipe'),
        ),
    ]