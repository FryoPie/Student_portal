# Generated migration for adding student_id to User model

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='student_id',
            field=models.CharField(default='TEMP000', help_text='Roll Number', max_length=10, unique=True),
            preserve_default=False,
        ),
    ]
