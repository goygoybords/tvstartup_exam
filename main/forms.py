from django import forms
from .models import Video

class VideoUploadForm(forms.ModelForm):
    class Meta:
        model = Video
        fields = ['title', 'description', 'video_file', 'thumbnail']

        widgets = {
            'title': forms.TextInput(attrs={
                'placeholder': 'Title',
                'autocomplete': 'title',
                'minlength': '1',
                'maxlength': '150',
                'class': 'textinput form-control',
                'required': 'required',
                'id': 'id_title',
            }),
            'description': forms.Textarea(attrs={
                'placeholder': 'Description',
                'autocomplete': 'description',
                'class': 'form-control',
                'rows': 5,
                'cols': 40,
                'required': 'required',
                'id': 'id_description',
            }),
            'video_file': forms.FileInput(attrs={
                'class': 'form-control-file',
                'accept': 'video/*',
            }),
            'thumbnail': forms.FileInput(attrs={
                'class': 'form-control-file',
                'accept': 'image/png, image/jpeg',
            }),
        }

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
