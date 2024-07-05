from .models import Diet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import DietSerializer
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
import math
from collections import defaultdict

class DietView(viewsets.ModelViewSet):
    serializer_class = DietSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Diet.objects.filter(user=user)

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
                                'quantity': 0,
                                'category': product.category.name
                            }
                        ingredients_sum[product.id]['quantity'] += ingredient.quantity

        ingredients_sum_list = [
            {
                'product_id': product_id,
                'name': data['name'],
                'category': data['category'],
                'total_quantity': data['quantity']
                
            }
            for product_id, data in ingredients_sum.items()
        ]
        grouped_by_category = defaultdict(list)
        for item in ingredients_sum_list:
            grouped_by_category[item['category']].append(item)
        
        grouped_ingredients_sum_list = [{
            'category': category,
            'products': sorted(products,key=lambda x: x['name'])

        } for category, products in grouped_by_category.items()]

        return Response(grouped_ingredients_sum_list)

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
    
    @action(detail=False, methods=['get'], url_path='count-weeks')
    def count_weeks(self, request):
        diets = self.get_queryset()
        if not diets.exists():
            return Response({'weeks_count': 0, 'diet_days': []})

        days = self.get_dates_between(str(diets[0].start_diet_date),str(diets[0].end_diet_date))

        # weeks_count rounded up to easier get weeks count 
        weeks_count = math.ceil(len(days)/7)
    
        return Response({'weeks_count': weeks_count, 'diet_days': days})
    
    @staticmethod
    def calculate_meal_calories(meal):
        total_calories = 0
        if meal:
            for ingredient in meal.ingredients.all():
                quantity = ingredient.quantity
                calories_per_100g = float(ingredient.product.calories)
                total_calories += (quantity * calories_per_100g) / 100
        return total_calories
    
    @classmethod
    def calculate_weekly_calories(cls, data):
        weekly_calories = []
        for day_data in data:
            day = day_data.day
            total_calories = 0
            meals = []
            for meal_type in ['breakfast', 'second_breakfast', 'lunch', 'afternoon_meal', 'dinner']:
                meal = getattr(day_data, meal_type)
                total_calories += cls.calculate_meal_calories(meal)
                if meal:
                    meals.append({"title": meal.title})
                else:
                    meals.append({"title": "null"})
            weekly_calories.append({
                "day": str(day),
                "total_calories": round(total_calories,2),
                "meals": meals
            })

        return weekly_calories

    @action(detail=False, methods=['get'], url_path='diet-plan')
    def diet_plan(self, request):
        diets = self.get_queryset()
        if not diets.exists():
            return Response({})

        return Response(self.calculate_weekly_calories(diets))
