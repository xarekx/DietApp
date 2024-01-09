from django.shortcuts import render
from .serializers import RecipeSerializer
from rest_framework import viewsets
from .models import Recipe
from rest_framework import serializers

class RecipeView(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

# Create your views here.
