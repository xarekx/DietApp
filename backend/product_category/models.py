from django.db import models
from django.utils.translation import gettext_lazy as _

class ProductCategory(models.Model):

    name = models.CharField(_("name"), max_length=64)

    class Meta:
        verbose_name = _("Product Category")
        verbose_name_plural = _("Product Categories")

    def __str__(self):
        return self.name