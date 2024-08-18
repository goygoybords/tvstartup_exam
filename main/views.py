from django.shortcuts import render, redirect, get_object_or_404, reverse
from django.http import HttpResponseRedirect
from django.db.models import Q
from django.contrib.auth.decorators import login_required

from .models import Video, Comments
from .forms import VideoUploadForm, CommentForm
from .tasks import uploadVideoFiles
from django.views.generic.edit import CreateView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.core.exceptions import PermissionDenied

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

class uploadVideo(LoginRequiredMixin, CreateView):
    model  = Video
    form_class = VideoUploadForm
    template_name = 'layouts/upload_video.html'
    
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def form_valid(self, form):
        form.instance.uploader = self.request.user
        titles = self.request.POST.getlist('title')
        descriptions = self.request.POST.getlist('description')
        video_files = self.request.FILES.getlist('video_file')
        thumbnails = self.request.FILES.getlist('thumbnail')

        for i in range(len(titles)):
            video_instance = Video.objects.create(
                title=titles[i],
                description=descriptions[i],
                video_file=video_files[i],
                thumbnail=thumbnails[i],
                uploader=self.request.user
            )
            celery_worker = uploadVideoFiles.delay(video_instance.id, video_files[i].read(), thumbnails[i].read())
            print(f"{titles[i]} processed by celery {celery_worker.id}")
            video_instance.save()

        return HttpResponseRedirect (reverse('home'))

    def form_invalid(self, form):
        return super().form_invalid(form)

    def get_success_url(self) -> str:
        return reverse('view_video', kwargs={'pk': self.object.pk})

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





