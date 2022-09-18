from django.core.asgi import get_asgi_application
from django.urls import path

from channels.routing import ProtocolTypeRouter, URLRouter

from rides.middleware import TokenAuthMiddleWareStack
from trips.consumers import TaxiConsumer

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": TokenAuthMiddleWareStack(
            URLRouter(
                [
                    path("rides/", TaxiConsumer.as_asgi()),
                ]
            ),
        ),
    }
)
