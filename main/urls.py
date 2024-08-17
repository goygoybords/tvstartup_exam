from django.urls import path
from . import views

# Define a list of url patterns
urlpatterns = [
    path('', views.index, name="home"),
    #video routes
    path('upload/', views.upload_video, name='upload'),
    path('<int:video_id>/', views.view_video, name="view_video"),
    path('<int:video_id>/delete', views.delete_video, name='delete_video' ),
    path('search/', views.search_video, name='search_video'),
]