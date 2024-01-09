"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from product import views as product_views
from recipe import views as recipe_views
from ingredients import views as ingridients_views

router = routers.DefaultRouter()
router.register(r'products', product_views.ProductView, 'product'),
router.register(r'recipes', recipe_views.RecipeView, 'recipe')
router.register(r'ingridients', ingridients_views.IngredientView, 'ingridient')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]
