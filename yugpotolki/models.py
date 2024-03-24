from django.db import models

# Create your models here.
class Phone(models.Model):
    phone = models.CharField(max_length=20)
    create = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ['-create']

    def __str__(self):
        return self.phone


class EmailPhoneName(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20,blank=True)
    email = models.EmailField(blank=True)
    message = models.TextField(blank=True)
    create = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ['-create']

    def __str__(self):
        return self.name