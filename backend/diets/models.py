from django.db import models
from django.utils.translation import gettext_lazy as _
from recipe.models import Recipe
from django.contrib.auth.models import User
# Create your models here.
class Diet(models.Model):

    DAY_OF_WEEK_CHOICES = [
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday'),
        ('sunday', 'Sunday'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    day = models.CharField(max_length=20, choices=DAY_OF_WEEK_CHOICES, default=DAY_OF_WEEK_CHOICES[0])
    breakfast = models.ForeignKey(Recipe, related_name='breakfast_recipe', on_delete=models.CASCADE, null=True, blank=True)
    second_breakfast = models.ForeignKey(Recipe, related_name='second_breakfast_recipe', on_delete=models.CASCADE, null=True, blank=True)
    lunch = models.ForeignKey(Recipe, related_name='lunch_recipe', on_delete=models.CASCADE, null=True, blank=True)
    afternoon_meal = models.ForeignKey(Recipe, related_name='afternoon_meal_recipe', on_delete=models.CASCADE, null=True, blank=True)
    dinner = models.ForeignKey(Recipe, related_name='dinner_recipe', on_delete=models.CASCADE, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("Diet")
        verbose_name_plural = _("Diets")