from django import forms

class PhoneForm(forms.Form):
    phone_form = forms.CharField(label='phone', max_length=20)

class EmailPhoneNameForm(forms.Form):
    name = forms.CharField(label="yourname", max_length=100)
    email = forms.EmailInput()
    phone = forms.CharField(label="phone", max_length=20)
    message = forms.Textarea()