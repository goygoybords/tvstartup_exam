from rest_framework import serializers
from .models import Video, Comments

class VideoSerializer(serializers.ModelSerializer):
    uploader_username = serializers.CharField(source='uploader.username', read_only=True)
    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'video_file', 'thumbnail', 'date_posted', 'uploader_username']


class UpdateVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['title', 'description']

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Comments
        fields = ['id', 'comment', 'username', 'video_id']