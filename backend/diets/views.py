from django.shortcuts import render
from .models import Diet
from rest_framework import viewsets
from .serializers import DietSerializer

class DietView(viewsets.ModelViewSet):
    serializer_class = DietSerializer
    queryset = Diet.objects.all()

# Create your views here.
