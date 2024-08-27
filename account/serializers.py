from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from rest_framework.exceptions import ValidationError
from django.contrib.auth import authenticate
import json
from django.core.files.storage import default_storage

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        username = validated_data.get('username')
        if User.objects.filter(username=username).exists():
            raise ValidationError({"username": "A user with this username already exists."})
        
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if not User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "A user with that username does not exist."})

        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError({"password": "The password is incorrect."})
        
        return data

class ProfileSerializer(serializers.ModelSerializer):
    bio = serializers.CharField(required=False)
    image = serializers.ImageField(required=False)

    class Meta:
        model = Profile
        fields = ['bio', 'image']

    def update(self, instance, validated_data):
        instance.bio = validated_data.get('bio', instance.bio)
        if 'image' in validated_data:
            instance.image = validated_data.get('image', instance.image)
        
        instance.save()
        return instance



class UserSerializerWithProfile(serializers.ModelSerializer):
    profile = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password', 'profile']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_profile_pic(self, value):
        allowed_types = ['image/png', 'image/jpeg']
        if value and value.content_type not in allowed_types:
            raise ValidationError("Only PNG, JPG, and JPEG files are allowed.")
        
        return value

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        if profile_data:
            try:
                profile_data = json.loads(profile_data)
            except json.JSONDecodeError:
                raise serializers.ValidationError({"profile": "Invalid JSON format in profile"})

        user = User.objects.create(
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            email=validated_data.get('email'),
            username=validated_data.get('username'),
        )
        user.set_password(validated_data['password'])
        user.save()

        profile_pic = validated_data.get('profile_pic', None)
        if profile_pic:
            self.validate_profile_pic(profile_pic)

        if profile_data:
            Profile.objects.create(
                user=user,
                bio=profile_data.get('bio', ''),
                image=profile_pic
            )
        return user

class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username']