# Generated by Django 3.0.6 on 2020-05-29 00:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='position',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]
