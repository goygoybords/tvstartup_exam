from django import forms
from .models import Video

class VideoUploadForm(forms.ModelForm):
    class Meta:
        model = Video
        fields = ['title', 'description', 'video_file', 'thumbnail']

    def is_valid(self) -> bool:
        return True

class CommentForm(forms.Form):
    comment = forms.CharField(widget=forms.Textarea(
        attrs = {
            "class": "form-control",
            "placeholder": "Leave a comment",
            "rows": 1   
        }
        ))
