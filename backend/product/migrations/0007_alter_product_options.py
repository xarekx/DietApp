# Generated by Django 4.2.3 on 2024-03-11 12:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0006_remove_product_recipe'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['name'], 'verbose_name': 'Product', 'verbose_name_plural': 'Products'},
        ),
    ]
