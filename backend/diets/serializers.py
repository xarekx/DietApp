from rest_framework import serializers
from .models import Diet
from recipe.serializers import RecipeSerializer
from user_api.models import AppUser
from recipe.models import Recipe

class DietSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=AppUser.objects.all())
    breakfast = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all(), required=False, allow_null=True)
    second_breakfast = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all(), required=False, allow_null=True)
    lunch = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all(), required=False, allow_null=True)
    afternoon_meal = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all(), required=False, allow_null=True)
    dinner = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Diet
        fields = [
                'id', 
                'day', 
                'is_active', 
                'user', 
                'breakfast', 
                'second_breakfast', 
                'lunch', 
                'afternoon_meal', 
                'dinner', 
                'start_diet_date', 
                'end_diet_date'
                ]

class DietCreateSerializer(serializers.Serializer):
    days = DietSerializer(many=True)
    
    def create(self, validated_data):
        days_data = validated_data.pop('days')
        diet_instances = []
        
        for day_data in days_data:
            diet_instance = Diet.objects.create(
                user=day_data['user'],
                day=day_data['day'],
                breakfast=day_data['breakfast'],
                second_breakfast=day_data['second_breakfast'],
                lunch=day_data['lunch'],
                afternoon_meal=day_data['afternoon_meal'],
                dinner=day_data['dinner'],
                start_diet_date=day_data['start_diet_date'],
                end_diet_date=day_data['end_diet_date']
            )
            diet_instances.append(diet_instance)
        
        return diet_instances