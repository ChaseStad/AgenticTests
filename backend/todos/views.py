from rest_framework import viewsets

from todos.models import Todo
from todos.serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.order_by("-created_at")
    serializer_class = TodoSerializer
