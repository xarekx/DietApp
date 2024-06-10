from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.timezone import now
from recipe.models import Recipe
from user_api.models import AppUser

class Diet(models.Model):


    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, null=True)
    day = models.DateField(_('day'), default=now)
    breakfast = models.ForeignKey(Recipe, related_name='breakfast_recipe', on_delete=models.CASCADE, null=True, blank=True)
    second_breakfast = models.ForeignKey(Recipe, related_name='second_breakfast_recipe', on_delete=models.CASCADE, null=True, blank=True)
    lunch = models.ForeignKey(Recipe, related_name='lunch_recipe', on_delete=models.CASCADE, null=True, blank=True)
    afternoon_meal = models.ForeignKey(Recipe, related_name='afternoon_meal_recipe', on_delete=models.CASCADE, null=True, blank=True)
    dinner = models.ForeignKey(Recipe, related_name='dinner_recipe', on_delete=models.CASCADE, null=True, blank=True)
    start_diet_date = models.DateField(_("start_diet_date"),default=now, editable=True)
    end_diet_date = models.DateField(_("end_diet_date"),default=now, editable=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("Diet")
        verbose_name_plural = _("Diets")