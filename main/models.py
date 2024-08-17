from django.db import models
from django.utils import timezone
from django.core.validators import FileExtensionValidator
from django.contrib.auth.models import User

video_extensions = ["mp4"]
thumb_extensions = ["png", "jpg", "jpeg"]

class Video(models.Model):
    title       = models.CharField(max_length=100)
    description = models.TextField()
    video_file  = models.FileField(upload_to="uploads/videos", 
                                validators = [FileExtensionValidator(allowed_extensions=video_extensions)])
    thumbnail   = models.FileField(upload_to="uploads/thumbnails", 
                                validators = [FileExtensionValidator(allowed_extensions=thumb_extensions)])
    date_posted = models.DateTimeField(default=timezone.now)
    uploader    = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title