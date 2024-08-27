from django.urls import path
from .views import list_todos, add_todo, update_todo, delete_todo

urlpatterns = [
    path('todos/', list_todos, name='todos'),
    path('todos/add/', add_todo, name='add_todo'),
    path('todos/<int:id>/update', update_todo, name='update_todo'),
    path('todos/<int:id>/delete', delete_todo, name='delete_todo'),
]
