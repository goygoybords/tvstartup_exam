from django.urls import path
from . import views

urlpatterns = [
    #Login Routes:
    path('', views.login_process, name="login"),
    path('register/', views.register_process, name="register"),
    path('logout/', views.logout_process, name="logout"),

    #User routes:
    path('profile/', views.view_profile, name='profile'),
    path('<str:user>/update', views.edit_profile, name="edit_profile"),

    #login api routes
    path('register_api', views.RegisterAPIView.as_view(), name="register_api"),
    path('login_api', views.LoginAPIView.as_view(), name="login_api"),
    path('logout_api', views.LogoutAPIView.as_view(), name="logout_api"),
]
