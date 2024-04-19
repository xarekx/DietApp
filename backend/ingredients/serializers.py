from rest_framework import serializers
from .models import Ingredient
from product.serializers import ProductSerializer

class IngredientSerializer(serializers.ModelSerializer):
    
    product = ProductSerializer()

    class Meta:
        model = Ingredient
        fields = ['product', 'quantity']