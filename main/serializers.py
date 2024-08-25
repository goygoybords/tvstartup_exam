from rest_framework import serializers
from .models import Video

class VideoSerializer(serializers.ModelSerializer):
    uploader_username = serializers.CharField(source='uploader.username', read_only=True)
    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'video_file', 'thumbnail', 'date_posted', 'uploader_username']


class UpdateVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['title', 'description']