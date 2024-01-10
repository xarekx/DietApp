from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from recipe.models import Recipe

# Create your models here.
class Product(models.Model):
    
    name = models.CharField(_("name"), max_length=64)
    protein = models.PositiveIntegerField(_("protein"), default=0, help_text="protein per 100g")
    carbohydrates = models.PositiveIntegerField(_("carbohydrates"), default=0, help_text="carbohydrates per 100g")
    fat = models.PositiveIntegerField(_("fat"), default=0, help_text="fat per 100g")
    calories = models.PositiveIntegerField(_("calories"), default=0, help_text="calories per 100g")
    # recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, null=True, related_name='products')
    
    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("_detail", kwargs={"pk": self.pk})
