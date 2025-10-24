from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    profile_pic = models.ImageField(upload_to="profile_pic", null=True, blank=True)
    bio = models.TextField(max_length=500, null=True, blank=True)
    REQUIRED_FIELDS = ["email"]
    objects = CustomUserManager()
