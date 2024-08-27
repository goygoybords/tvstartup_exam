from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator

class Profile(models.Model):
    thumb_extensions = ["png", "jpg", "jpeg"]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=100, blank=True)
    image   = models.ImageField(upload_to="uploads/profile_picture",
        validators = [FileExtensionValidator(allowed_extensions=thumb_extensions)],blank=True)

    def __str__(self):
        return self.user.username