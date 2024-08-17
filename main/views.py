from django.shortcuts import render, redirect, get_object_or_404, reverse
# from django.views.generic.detail import DetailView
# from django.views.generic.list import ListView
from django.contrib.auth.models import User
from .models import Video, Comments
# from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.decorators import login_required
from .forms import VideoUploadForm, CommentForm

# Create your views here.
def index(request):
    videos = Video.objects.all()
    return render(request, 'layouts/home.html', {'videos': videos})
    
@login_required(login_url='/login/', redirect_field_name='redirect_to')
def profile_view(request):
    profile = get_object_or_404(User, id=request.user.id)
    video = Video.objects.all().filter(uploader=request.user).order_by('-date_posted')

    context = {
        'profile': profile,
        'videos': video
    }

    return render(request, 'layouts/profile.html', context)

@login_required(login_url='/login/', redirect_field_name='redirect_to')
def upload_video(request):
    return render(request, 'layouts/upload_video.html')

@login_required(login_url='/login/', redirect_field_name='redirect_to')
def upload_video(request):
    if request.method == 'GET':
        form = VideoUploadForm()
        return render(request, 'layouts/upload_video.html', {'form': form})
    elif request.method == 'POST':
        form = VideoUploadForm(request.POST, request.FILES)
        if form.is_valid():
            video = form.save(commit=False)
            video.uploader = request.user
            video.save()
            return redirect('profile')

def view_video(request, video_id):
    video = get_object_or_404(Video, id=video_id)
    form = CommentForm()
    comments = Comments.objects.filter(video=video).order_by('-created_on')
    context = {
        'video': video,     
        'comments': comments,
        'form': form,
    }
    return render(request, 'layouts/view_video.html', context)


@login_required(login_url='/login/', redirect_field_name='redirect_to')
def delete_video(request, video_id):
    video = get_object_or_404(Video, id=video_id)
    # Check if the logged-in user is the uploader of the video
    if request.user != video.uploader:
        return redirect('home')  # Redirect to home if the user is not authorized

    if request.method == 'POST':
        video.delete()  # Delete the video
        return redirect(reverse('home'))  # Redirect to the home page after deletion
    
    return render(request, 'layouts/delete_video.html', {'video': video})



