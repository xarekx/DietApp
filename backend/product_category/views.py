from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProductCategorySerializer
from .models import ProductCategory

# Create your views here.
class ProductCategoryView(viewsets.ModelViewSet):
    serializer_class = ProductCategorySerializer
    queryset = ProductCategory.objects.all()