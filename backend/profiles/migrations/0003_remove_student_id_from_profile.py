# Generated migration for removing student_id from StudentProfile

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_remove_studentprofile_gpa_studentprofile_cgpa_and_more'),
        ('users', '0003_migrate_student_ids_from_profile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentprofile',
            name='student_id',
        ),
    ]
