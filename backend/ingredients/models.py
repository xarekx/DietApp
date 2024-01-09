from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from product.models import Product

# Create your models here.

class Ingredient(models.Model):
    
    quantity = models.PositiveIntegerField(_("quantity"), default=1)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    
    class Meta:
        verbose_name = _("Ingredient")
        verbose_name_plural = _("Ingredients")
