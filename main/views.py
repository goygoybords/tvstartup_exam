from django.shortcuts import render, redirect, get_object_or_404, reverse
from django.http import HttpResponseRedirect
from django.db.models import Q
from django.contrib.auth.decorators import login_required

from .models import Video, Comments
from .forms import VideoUploadForm, CommentForm
from django.core.exceptions import PermissionDenied
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import VideoSerializer

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
    if request.method == 'POST':
        form = VideoUploadForm(request.POST, request.FILES)
        if form.is_valid():
            titles = request.POST.getlist('title')
            descriptions = request.POST.getlist('description')
            video_files = request.FILES.getlist('video_file')
            thumbnails = request.FILES.getlist('thumbnail')

            for i in range(len(titles)):
                Video.objects.create(
                    title=titles[i],
                    description=descriptions[i],
                    video_file=video_files[i],
                    thumbnail=thumbnails[i],
                    uploader=request.user
                )
            return HttpResponseRedirect(reverse('profile'))
    else:
        form = VideoUploadForm()

    return render(request, 'layouts/upload_video.html', {'form': form})

@login_required(login_url='/account/', redirect_field_name='redirect_to')
def update_video(request, video_id):
    video = get_object_or_404(Video, id=video_id)
    if request.user != video.uploader:
        raise PermissionDenied

    if request.method == 'POST':
        form = VideoUploadForm(request.POST, request.FILES, instance=video)
        if form.is_valid():
            form.save()
            return redirect('view_video', video_id=video_id)
    else:
        form = VideoUploadForm(instance=video)

    return render(request, 'layouts/edit_video.html', {'form': form})

def view_video(request, video_id):
    video = get_object_or_404(Video, id=video_id)
    if request.method == 'GET':
        form = CommentForm()
        comments = Comments.objects.filter(video=video).order_by('-created_on')
        context = {
            'video': video,     
            'comments': comments,
            'form': form,
        }
        return render(request, 'layouts/view_video.html', context)

    elif request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            user = str(request.user)
            comment = Comments(
                user=request.user,
                comment=form.cleaned_data['comment'],
                video=video
            )
            comment.save()
            response = {
                'user': user,
                'comment': form.cleaned_data['comment'],
            }
            return JsonResponse(response)
        else:
            response = {
                'errors': form.errors
            }
            return JsonResponse(response, status=400)

@login_required(login_url='/account/', redirect_field_name='redirect_to')
def delete_video(request, video_id):
    video = get_object_or_404(Video, id=video_id)
    if request.user != video.uploader:
        return redirect('home')

    if request.method == 'POST':
        video.delete()
        return redirect(reverse('home'))
    
    return render(request, 'layouts/delete_video.html', {'video': video})

class VideoListAPIView(APIView):
    def get(self, request):
        videos = Video.objects.all().order_by('-date_posted')
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)
class ViewVideoAPIView(APIView):
    def get(self, request, video_id):
        video = get_object_or_404(Video, id=video_id)
        serializer = VideoSerializer(video)
        return Response(serializer.data)
class SearchVideoAPIView(APIView):
    def get(self, request):
        videos = None
        searched_data = request.GET.get("search")
        if searched_data:
            videos = Video.objects.filter(
                    Q(title__icontains=searched_data) |
                    Q(description__icontains=searched_data) |
                    Q(uploader__username__icontains=searched_data)
                )
        else:
            videos = Video.objects.none()

        video_list = list(videos.values('id', 'title', 'description', 'video_file', 'thumbnail', 'date_posted'))
        serializer = VideoSerializer(video_list, many=True)
        return Response(serializer.data)