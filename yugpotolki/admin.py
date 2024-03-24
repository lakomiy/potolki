from django.contrib import admin
from .models import Phone, EmailPhoneName

@admin.register(Phone)
class PhoneAdmin(admin.ModelAdmin):
    list_display = ['phone', "create" ]
# Register your models here.

@admin.register(EmailPhoneName)
class  EmailPhoneNameAdmin(admin.ModelAdmin):
    list_display = ['name','phone', 'email', "create", "message"  ]