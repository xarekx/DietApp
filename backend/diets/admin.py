from django.contrib import admin
from .models import Diet
from django.contrib.auth.models import User


@admin.register(Diet)
class Diet(admin.ModelAdmin):
    list_display = ["id", "user"]
    list_filter = ["user"]