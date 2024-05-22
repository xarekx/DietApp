from django.shortcuts import render
from .models import Diet
from rest_framework import viewsets
from .serializers import DietSerializer
from rest_framework.permissions import IsAuthenticated

class DietView(viewsets.ModelViewSet):
    serializer_class = DietSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Diet.objects.filter(user=user)

