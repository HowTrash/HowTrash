# Generated by Django 4.0.6 on 2022-07-13 04:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('HowTrash', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Uploadedtrash',
            fields=[
                ('upload_id', models.AutoField(primary_key=True, serialize=False)),
                ('upload_img', models.CharField(max_length=200)),
                ('upload_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'UploadedTrash',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='Uploadedimg',
        ),
    ]