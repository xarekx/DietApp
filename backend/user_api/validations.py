from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

UserModel = get_user_model()


def custom_validation(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()

    # validation for email 
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('choose another email')

    # validation for password
    if not password or len(password) < 8:
        raise ValidationError('choose another password, min 8 characters')

    #validation for username
    if not username:
        raise ValidationError('choose another username')
    
    return data
