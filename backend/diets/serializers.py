from rest_framework import serializers
from .models import Diet
from recipe.serializers import RecipeSerializer


class DietSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = Diet
        fields = '__all__'
        depth = 1 
        
        
        