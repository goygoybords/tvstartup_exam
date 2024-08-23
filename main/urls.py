from django.urls import path
from . import views

# Define a list of url patterns
urlpatterns = [
    path('', views.index, name="home"),
    #video routes
    path('upload/', views.upload_video, name='upload'),
    path('<int:video_id>/', views.view_video, name="view_video"),
    path('<int:video_id>/delete', views.delete_video, name='delete_video'),
    path('<int:video_id>/update', views.update_video, name='update_video'),
    path('search/', views.search_video, name='search_video'),

    path('video_list_api/', views.VideoListAPIView.as_view(), name='video_list_api'),   
    path('view_video_api/<int:video_id>', views.ViewVideoAPIView.as_view(), name='view_video_api'),   
]