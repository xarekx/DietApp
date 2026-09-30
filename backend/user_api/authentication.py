from rest_framework.authentication import SessionAuthentication

class SessionAuth(SessionAuthentication):

    # Non-empty header makes DRF return 401 instead of 403 for unauthenticated requests
    def authenticate_header(self, request):
        return 'Session'