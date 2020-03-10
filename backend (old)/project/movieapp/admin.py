from django.contrib import admin
from .models import Movie
from .models import User

class MovieAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'movie_id',
        'genre',
        'datetime',
        'location',
        'capacity',
        'attendees',
        'url'
    )

class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'movie_list', 'attending')

# Register your models here.
admin.site.register(Movie, MovieAdmin)
admin.site.register(User, UserAdmin)