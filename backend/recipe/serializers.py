from rest_framework import serializers
from .models import Recipe
from product.serializers import ProductSerializer

class RecipeSerializer(serializers.ModelSerializer):
    
    products = ProductSerializer(many=True)
    
    class Meta:
        model = Recipe
        fields = ('id', 'title', 'products')