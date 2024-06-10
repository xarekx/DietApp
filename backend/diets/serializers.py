from rest_framework import serializers
from .models import Diet
from recipe.serializers import RecipeSerializer


class DietSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(read_only=True)
    breakfast = RecipeSerializer()
    second_breakfast = RecipeSerializer()
    lunch = RecipeSerializer()
    afternoon_meal = RecipeSerializer()
    dinner = RecipeSerializer()
    
    class Meta:
        model = Diet
        fields = ['id','day','is_active', 'user', 'breakfast', 'second_breakfast', 'lunch', 'afternoon_meal', 'dinner']
        
        
        