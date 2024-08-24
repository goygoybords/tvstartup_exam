from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from main.models import Video
from .forms import RegisterForm, EditProfileForm
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from .serializers import LoginSerializer, UserSerializer


def register_process(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            first_name = form.cleaned_data.get("first_name")
            last_name = form.cleaned_data.get("last_name")
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = User.objects.create_user(first_name = first_name, last_name = last_name,username=username, password=password)
            login(request, user)
            return redirect('home')
    else:
        form = RegisterForm()
    return render(request, 'accounts/register.html', {'form':form})


def login_process(request):
    error_message = None
    if request.method == "POST":  
        username = request.POST.get("username")  
        password = request.POST.get("password")  
        user = authenticate(request, username=username, password=password)  
        if user is not None:  
            login(request, user)  
            next_url = request.POST.get('next') or request.GET.get('next') or 'home'  
            return redirect(next_url) 
        else:
            error_message = "The username and/or password you specified are not correct."  
    return render(request, 'accounts/login.html', {'error': error_message})

    
def logout_process(request):
    if request.method == "POST":
        logout(request)
        return redirect('login')
    else:
        return redirect('home')

@login_required(login_url='/account/', redirect_field_name='redirect_to')
def view_profile(request):
    profile = get_object_or_404(User, id=request.user.id)
    video = Video.objects.all().filter(uploader=request.user).order_by('-date_posted')

    context = {
        'profile': profile,
        'videos': video
    }

    return render(request, 'layouts/profile.html', context)

@login_required(login_url='/account/', redirect_field_name='redirect_to')
def edit_profile(request, user):
    profile = get_object_or_404(User, username=user)
    if request.method == 'POST':
        form = EditProfileForm(request.POST, instance=profile)  # Use the correct form class here
        if form.is_valid():
            form.save()
            messages.success(request, 'Your profile has been successfully updated.')
            return redirect('edit_profile', user=profile.username)  # Redirect to the profile page
    else:
        form = EditProfileForm(instance=profile)  # Use the correct form class here

    return render(request, 'layouts/edit_profile.html', {'form': form, 'profile': profile})

class RegisterAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
         # user = authenticate(request, username=username, password=password)
        user = { "username" : username , "password" : password}
        return Response(user)
       
        # if user is not None:
        #     token, created = Token.objects.get_or_create(user=user)
        #     return Response({'token': token.key})
        # else:
        #     return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
class LogoutAPIView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = { 'message': 'success' }
        return response
    
