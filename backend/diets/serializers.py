from rest_framework import serializers
from .models import Diet
from recipe.serializers import RecipeSerializer
from user_api.models import AppUser
from recipe.models import Recipe


class DietSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(queryset=AppUser.objects.all())
    breakfast = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all())
    second_breakfast = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all())
    lunch = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all())
    afternoon_meal = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all())
    dinner = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all())
    
    class Meta:
        model = Diet
        fields = ['id', 'day', 'is_active', 'user', 'breakfast', 'second_breakfast', 'lunch', 'afternoon_meal', 'dinner', 'start_diet_date', 'end_diet_date']
        
        
        