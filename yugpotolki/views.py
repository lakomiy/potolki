from django.shortcuts import render, redirect
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string

from .forms import PhoneForm, EmailPhoneNameForm
from .models import Phone, EmailPhoneName
# Create your views here.
def home(request):
    return render(request,'yugpotolki/index.html')

def second(request,error=None):
    return render(request, 'yugpotolki/second.html', {"error":error})

def collback(request):
    form = PhoneForm(request.POST)
    phone = form.data["phone"]
    Phone.objects.create(phone=phone)
    send_mail('Перезвони мне',
              'просит позвонить с сайта - ' + phone,
              settings.EMAIL_HOST_USER,
              ['lakomiy12@gmail.com'])
    return redirect('home')

def collback_mail(request):
    form = EmailPhoneNameForm(request.POST)
    if form.is_valid():
        phone = form.data["phone"]
        name = form.data["yourname"]
        email = form.data['email']
        message = form.data["message"]
        EmailPhoneName.objects.create(
            phone=phone,
            name=name,
            email=email,
            message=message
        )
        context = {"phone": phone, "name": name, "email":email, 'message': message}
        msg = render_to_string("yugpotolki/msgrender.html", {"context":context})
        send_mail('Перезвони мне',
                 msg,
                 settings.EMAIL_HOST_USER,
                 ['lakomiy12@gmail.com'],
                 html_message=msg
                 )
        return redirect("home")
    else:
        form = EmailPhoneNameForm()
        error = "Пожалуйста, заполните форму по образцу "

        return redirect('second',{"error":error})
