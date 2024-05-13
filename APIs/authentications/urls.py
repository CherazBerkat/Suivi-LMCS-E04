from django.urls import path
from .views import Login, ResetPassword , Send_verification_code , Reset_password_verification_code , google_auth , User_par_email,Test_email ,User_par_id

urlpatterns = [
    path('Get_user/', User_par_email.as_view() , name='User_par_email'),
    path('Get_user_by_id/', User_par_id.as_view() , name='User_par_id'),
    path('login/', Login.as_view() , name='login'),
    path('test_email/', Test_email.as_view() , name='test_email'),
    path('Send_verification_code/' , Send_verification_code.as_view(), name= 'Send_verification_code'),
    path('resetPassword/', ResetPassword.as_view(), name='reset-password'),
    path("reset_password_verification_code/" , Reset_password_verification_code.as_view(), name="Reset_password_verification_code"),
    #path('api/google/login/', GoogleLogin.as_view(), name='google_login'),
    path('google_auth/', google_auth, name='google_auth'),
]