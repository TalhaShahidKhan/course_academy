from typing import Any

from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(
        self, username: str, email, password=None, password2=None, **extra_fields
    ):
        if not username:
            raise ValueError("Username is required.")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            password=password,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, password, **extra_fields)
