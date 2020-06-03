from django.db import models


class Employee(models.Model):
    class Meta:
        db_table = 'employees'
    photo = models.CharField(max_length=255, default="/media/images/default.png", blank=True, null=True)
    name = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    birthday = models.DateField(blank=True, null=True, default=None)
    remote = models.BooleanField()
    city = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    house = models.CharField(max_length=255)
    flat = models.CharField(max_length=255)


