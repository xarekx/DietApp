from rest_framework import serializers
from .models import Ingredient
from product.serializers import ProductSerializer

class IngredientSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Ingredient
        fields = '__all__'