from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MovieSerializer, UserSerializer
from .models import Movie, User

# Create your views here.
class MovieView(viewsets.ModelViewSet):       # add this
      serializer_class = MovieSerializer          # add this
      queryset = Movie.objects.all() 

class UserView(viewsets.ModelViewSet):       # add this
      serializer_class = UserSerializer          # add this
      queryset = User.objects.all() 

def Index(request):       # add this
    return render(request, 'index.html')
