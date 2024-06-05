from .models import Diet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import DietSerializer
from rest_framework.permissions import IsAuthenticated

class DietView(viewsets.ModelViewSet):
    serializer_class = DietSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        queryset = Diet.objects.filter(user=user)
        
        return queryset
    
    @action(detail=False, methods=['get'], url_path='recipes-by-day')
    def recipes_by_day(self, request):
        user = request.user
        # list of day as a parameter
        days = request.query_params.getlist('day')
        if days:
            diets = Diet.objects.filter(user=user, day__in=days)
        else:
            diets = Diet.objects.filter(user=user)

        serializer = self.get_serializer(diets, many=True)
        return Response(serializer.data)

