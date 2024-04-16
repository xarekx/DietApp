from rest_framework import serializers
from .models import Diet
from recipe.serializers import RecipeSerializer


class DietSerializer(serializers.ModelSerializer):

    class Meta:
        model = Diet
        fields = '__all__'
        
        