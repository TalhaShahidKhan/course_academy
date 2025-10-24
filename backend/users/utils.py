from django.core.mail import EmailMessage
from decouple import config


class Util:
    @staticmethod
    def send_mail(data):
        email = EmailMessage(
            subject=data["subject"],
            body=data["body"],
            from_email=config("EMAIL_FROM", cast=str),
            to=[data["to_email"]],
        )
        email.send()
