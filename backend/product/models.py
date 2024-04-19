from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse

# Create your models here.
class Product(models.Model):
    
    name = models.CharField(_("name"), max_length=64)
    protein = models.DecimalField(_("protein"), help_text="protein per 100g", max_digits=18, decimal_places=2)
    carbohydrates = models.DecimalField(_("carbohydrates"),  help_text="carbohydrates per 100g", max_digits=18, decimal_places=2)
    fat = models.DecimalField(_("fat"),  help_text="fat per 100g", max_digits=18, decimal_places=2)
    calories = models.DecimalField(_("calories"), help_text="calories per 100g", max_digits=18, decimal_places=2)
    
    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")
        ordering = ['name']

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("_detail", kwargs={"pk": self.pk})
    
