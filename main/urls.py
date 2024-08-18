from django.urls import path
from . import views

# Define a list of url patterns
urlpatterns = [
    path('', views.index, name="home"),
    #video routes
    path('upload/', views.uploadVideo.as_view(), name='upload'),
    path('<int:video_id>/', views.view_video, name="view_video"),
    path('<int:video_id>/delete', views.delete_video, name='delete_video'),
    path('<int:video_id>/update', views.update_video, name='update_video'),
    path('search/', views.search_video, name='search_video'),
]