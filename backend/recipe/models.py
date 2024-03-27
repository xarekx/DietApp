from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from product.models import Product
# Create your models here.

class Recipe(models.Model):

    title = models.CharField(_("name"), max_length=128, default="")
    
    class Meta:
        verbose_name = _("recipe")
        verbose_name_plural = _("recipes")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("_detail", kwargs={"pk": self.pk})

