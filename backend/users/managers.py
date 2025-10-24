from django.contrib.auth.base_user import BaseUserManager
from typing import Any


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username: str, password=None, password2=None, **extra_fields):
        if not username:
            raise ValueError("Username is required.")

        user = self.model(username=username, password=password, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, username: str, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, password, **extra_fields)
