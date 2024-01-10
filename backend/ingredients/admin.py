from django.contrib import admin
from .models import Ingredient


@admin.register(Ingredient)
class Ingredient(admin.ModelAdmin):
    list_display = ['product', 'quantity']

# Register your models here.
