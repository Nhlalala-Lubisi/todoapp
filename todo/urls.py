from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.signup, name='signup'),
    path('loginn/', views.loginn, name='loginn'),
    path('todopage/', views.todo, name='todo'),
    path('delete/<int:todo_id>/', views.delete_todo, name='delete_todo'),
    path('edit/<int:todo_id>/', views.edit_todo, name='edit_todo'),
    path('logout/',views.signout,name='logout')
]