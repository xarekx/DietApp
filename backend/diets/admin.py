from django.contrib import admin
from .models import Diet
from django.contrib.auth.models import User


@admin.register(Diet)
class Diet(admin.ModelAdmin):
    list_display = ["id", "user", 'start_diet_date', 'end_diet_date', 'is_active']
    list_filter = ["user"]