from rest_framework import serializers
from .models import Recipe
from ingredients.serializers import IngredientSerializer
from product.serializers import ProductSerializer
from ingredients.models import Ingredient
from product.models import Product

class RecipeSerializer(serializers.ModelSerializer):
    
    ingredients = IngredientSerializer(many=True)
    
    class Meta:
        model = Recipe
        fields = ['title', 'ingredients']
        
    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            product_data = ingredient_data.pop('product')
            product, _ = Product.objects.get_or_create(**product_data)
            Ingredient.objects.create(recipe=recipe, product=product, **ingredient_data)
        return recipe    