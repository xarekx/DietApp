from django.contrib import admin
from .models import ProductCategory

# Register your models here.
@admin.register(ProductCategory)
class ProductCategory(admin.ModelAdmin):
    pass