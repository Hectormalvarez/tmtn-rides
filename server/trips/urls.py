from django.urls import path

from .views import TripView


app_name = 'rides'

urlpatterns = [
    path('', TripView.as_view({'get': 'list'}), name="trip_list"),
]
