from django.shortcuts import render
from .serializers import IngredientSerializer
from rest_framework import viewsets
from .models import Ingredient

class IngredientView(viewsets.ModelViewSet):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()
    

# Create your views here.
