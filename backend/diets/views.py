from .models import Diet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import DietSerializer
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta

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

    @action(detail=False, methods=['get'], url_path='products-by-day')
    def products_by_day(self,request):
        user = request.user

        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        
        if start_date and end_date:
            diets = Diet.objects.filter(user=user, day__in=self.get_dates_between(start_date,end_date))
        else:
            diets = Diet.objects.filter(user=user)
        
        ingredients_sum = {}

        for diet in diets:
            for meal_name in ['breakfast', 'second_breakfast', 'lunch', 'afternoon_meal', 'dinner']:
                meal = getattr(diet, meal_name)
                if meal:
                    for ingredient in meal.ingredients.all():
                        product = ingredient.product
                        if product.id not in ingredients_sum:
                            ingredients_sum[product.id] = {
                                'name': product.name,
                                'quantity': 0
                            }
                        ingredients_sum[product.id]['quantity'] += ingredient.quantity

        ingredients_sum_list = [
            {
                
                'product_id': product_id,
                'name': data['name'],
                'total_quantity': data['quantity']
            }
            for product_id, data in ingredients_sum.items()
        ]

        return Response(ingredients_sum_list)

    @staticmethod
    def get_dates_between(start_day_str, end_day_str):
        start_date = datetime.strptime(start_day_str, '%Y-%m-%d')
        end_date = datetime.strptime(end_day_str, '%Y-%m-%d')

        dates_list = [start_date.strftime('%Y-%m-%d')]

        current_date = start_date + timedelta(days=1)
        while current_date < end_date:
            dates_list.append(current_date.strftime('%Y-%m-%d'))
            current_date += timedelta(days=1)

        dates_list.append(end_date.strftime('%Y-%m-%d'))

        return dates_list