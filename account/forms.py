from django import forms
from django.contrib.auth.models import User

class RegisterForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.label_suffix = ' *'
    
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Password',
            'class': 'form-control',
            'required': 'required',
            'id': 'id_password',
        })
    )

    password_confirm = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Confirm Password',
            'class': 'form-control',
            'required': 'required',
            'id': 'id_password_confirm',
        })
    )

    username = forms.CharField(
        max_length=150,
        widget=forms.TextInput(attrs={
            'placeholder': 'Username',
            'autocomplete': 'username',
            'minlength': '1',
            'maxlength': '150',
            'class': 'textinput form-control',
            'required': 'required',
            'id': 'id_username',
        }),
        help_text='',
    )

    class Meta:
        model = User
        fields  = ['first_name', 'last_name', 'username', 'password', 'password_confirm']
        widgets = {
            'first_name': forms.TextInput(attrs={
                'placeholder': 'First Name',
                'autocomplete': 'first_name',
                'minlength': '1',
                'maxlength': '150',
                'class': 'textinput form-control',
                'required': 'required',
                'id': 'id_first_name',
            }),
            'last_name': forms.TextInput(attrs={
                'placeholder': 'Last Name',
                'autocomplete': 'last_name',
                'minlength': '1',
                'maxlength': '150',
                'class': 'textinput form-control',
                'required': 'required',
                'id': 'id_last_name',
            }),
        }
    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        password_confirm = cleaned_data.get('password_confirm')
        # Check if the passwords match
        if password and password_confirm and password != password_confirm:
            raise forms.ValidationError("Passwords do not match!")
        return cleaned_data
    

class EditProfileForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(EditProfileForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.label_suffix = ' *'
    class Meta:
        model = User
        fields = ['first_name', 'last_name']  # Specify fields you want to include
        # OR use exclude to exclude specific fields
        exclude = ['username', 'password', 'password_confirm']
        widgets = {
            'first_name': forms.TextInput(attrs={
                'placeholder': 'First Name',
                'autocomplete': 'first_name',
                'minlength': '1',
                'maxlength': '150',
                'class': 'textinput form-control',
                'required': 'required',
                'id': 'id_first_name',
            }),
            'last_name': forms.TextInput(attrs={
                'placeholder': 'Last Name',
                'autocomplete': 'last_name',
                'minlength': '1',
                'maxlength': '150',
                'class': 'textinput form-control',
                'required': 'required',
                'id': 'id_last_name',
            }),
        }