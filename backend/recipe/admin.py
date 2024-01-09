from django.contrib import admin
from .models import Recipe

# Register your models here.

@admin.register(Recipe)
class Recipe(admin.ModelAdmin):
    list_display = ['title']
