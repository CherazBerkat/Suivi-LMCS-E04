
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import jwt , datetime
import random
import os
from django.conf import settings
from social_django.utils import psa
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.core.mail import send_mail 
from bdd.models import Utilisateur
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import check_password
from google.auth.transport import requests
from google.oauth2.id_token import verify_oauth2_token
secret_key = os.getenv('JWT_SECRET')
debug = os.getenv('DEBUG') == 'True'
from .Serializer import UtilisateurSerializer

class User_par_email(APIView):
    def post(self, request):
        email = request.data['email']
        user = Utilisateur.objects.filter(email=email)
        if user :
            serializer = UtilisateurSerializer(user, many=True)
            return Response(serializer.data)
        else:
            return Response( 'not found',status=status.HTTP_404_NOT_FOUND)
class User_par_id(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        user = Utilisateur.objects.filter(utilisateur_id=user_id)
        if user :
            serializer = UtilisateurSerializer(user, many=True)
            return Response(serializer.data)
        else:
            return Response( 'not found',status=status.HTTP_404_NOT_FOUND)        
class Test_email(APIView):
    def post(self, request):
        email = request.data['email']
        user = Utilisateur.objects.filter(email=email)
        if user :
            
            return Response("email exist", status=status.HTTP_200_OK)
        else:
            return Response("email not exist", status=status.HTTP_404_NOT_FOUND)       
class Login(APIView):
    def post(self , request):
        email= request.data['email']
        password = request.data['password']
        user = Utilisateur.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found')
        if not  password == user.password:
            raise AuthenticationFailed('Incorrect password')
        payload = {
            "user_id": user.utilisateur_id,
            'role':user.role,
            "exp":datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=60),
            "iat":datetime.datetime.now(datetime.timezone.utc)
        }
        token = jwt.encode(payload , secret_key , algorithm="HS256")
        response = Response()
        #response.set_cookie(key='jwt', value=token, httponly=True , secure=True)
        response.data={
            'jwt':token,
            'role':user.role,
            'user_id':user.utilisateur_id,
        }
        return response     
    
class Send_verification_code(APIView):
    def post(self , request):
        email = request.data.get("email")
        user = Utilisateur.objects.filter(email=email)
        if user:
         verification_code = str(random.randint(100000, 999999))
         send_mail(
            'Password Reset Verification Code',
            f'Your verification code is: {verification_code}',
             settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False
         )
         response=Response( {'code' : verification_code, 'message' : 'Verification code sent successfully'}, status=status.HTTP_200_OK)
         print(verification_code)
         return response
        else:
         return Response("user does not exist" , status=status.HTTP_404_NOT_FOUND)
    

class Reset_password_verification_code(APIView):
    def post(self , request):
        verification_code = request.data.get("verification_code")
        saved_verification_code = request.data.get('code')
        if(saved_verification_code != verification_code):
            print(saved_verification_code)
            print(verification_code)
            return Response('Invalid verification code', status=status.HTTP_400_BAD_REQUEST) 
         
        response = Response('Correct verification code', status=status.HTTP_200_OK) 
        return response


class ResetPassword(APIView):
    def post(self, request):
        email = request.data.get('email')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not email:
            return Response( 'Email is required', status=status.HTTP_400_BAD_REQUEST)
        if new_password != confirm_password:
            return Response('Passwords do not match', status=status.HTTP_400_BAD_REQUEST)

        user = Utilisateur.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found')

        user.password = new_password
        user.save()
        serializer = UtilisateurSerializer(user)
        #return Response(serializer.data)

        return Response({'message':'Password reset successfully' ,'user':serializer.data }, status=status.HTTP_200_OK)

# Create your views here.

# class GoogleLogin(APIView):
#     permission_classes = [AllowAny]

#     @psa('social:complete')
#     def post(self, request):
#         try:
#             user = request.backend.user
#             email = user.email

#             existing_user = Utilisateur.objects.filter(email=email).first()

#             if existing_user:
#                 token, _ = Token.objects.get_or_create(user=existing_user)
#                 Response.set_cookie(key='jwt', value=token, httponly=True)
#                 return Response({'token': token.key}, status=status.HTTP_200_OK)
#             else:
#                 return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
def google_auth(request):
    token_id = request.data.get('tokenId')

    try:
        idinfo = verify_oauth2_token(token_id, requests.Request(), settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY)
        user_email = idinfo.get('email')
        user_name = idinfo.get('name')
        user = Utilisateur.objects.filter(email=user_email).first()
        if user:
          return Response({'message': 'Authentication successful', 'user_email': user_email, 'user_name': user_name}, status=status.HTTP_200_OK)
        return Response({'message': 'User not found', 'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'message': 'Authentication failed', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)