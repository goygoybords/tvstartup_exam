from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q
from .models import Video, Comments
from django.contrib.auth.decorators import login_required
from .forms import VideoUploadForm, CommentForm

# Create your views here.
def index(request):
    videos = Video.objects.all()
    return render(request, 'layouts/home.html', {'videos': videos})

def search_video(request):
    searched_data = request.GET.get("q")

    videos = Video.objects.filter(
        Q(title__icontains=searched_data) |
        Q(description__icontains=searched_data) |
        Q(uploader__username__icontains=searched_data)
    )

    context = {
        "videos": videos
    }
    return render(request, 'layouts/search_videos.html', context)
    
@login_required(login_url='/account/', redirect_field_name='redirect_to')
def upload_video(request):
    return render(request, 'layouts/upload_video.html')

@login_required(login_url='/account/', redirect_field_name='redirect_to')
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


@login_required(login_url='/account/', redirect_field_name='redirect_to')
def delete_video(request, video_id):
    video = get_object_or_404(Video, id=video_id)
    if request.user != video.uploader:
        return redirect('home')

    if request.method == 'POST':
        video.delete()
        return redirect(reverse('home'))
    
    return render(request, 'layouts/delete_video.html', {'video': video})





