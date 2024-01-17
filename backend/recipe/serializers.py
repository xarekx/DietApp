from rest_framework import serializers
from .models import Recipe
from ingredients.serializers import IngredientSerializer
from product.serializers import ProductSerializer

class RecipeSerializer(serializers.ModelSerializer):
    
    ingredients = IngredientSerializer(many=True)

    
    class Meta:
        model = Recipe
        fields = ("id", "title", "ingredients",)
        depth = 2