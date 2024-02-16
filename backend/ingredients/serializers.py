from rest_framework import serializers
from .models import Ingredient
from product.serializers import ProductSerializer

class IngredientSerializer(serializers.ModelSerializer):
    
    product_name = serializers.CharField(source='product.name')
    
    class Meta:
        model = Ingredient
        fields = ['product_name', 'quantity']