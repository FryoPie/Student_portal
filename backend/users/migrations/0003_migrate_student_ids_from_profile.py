# Generated migration for migrating student_id data from profile to user

from django.db import migrations


def migrate_student_ids(apps, schema_editor):
    """
    Migrate student_id from StudentProfile to User model.
    For users without a profile or profile.student_id, use their username as student_id.
    """
    User = apps.get_model('users', 'User')
    StudentProfile = apps.get_model('profiles', 'StudentProfile')

    for user in User.objects.all():
        try:
            profile = StudentProfile.objects.get(user=user)
            if profile.student_id:
                user.student_id = profile.student_id
            else:
                user.student_id = user.username
        except StudentProfile.DoesNotExist:
            user.student_id = user.username

        user.save()


def reverse_migrate_student_ids(apps, schema_editor):
    """
    Reverse migration: copy student_id back to profile
    """
    User = apps.get_model('users', 'User')
    StudentProfile = apps.get_model('profiles', 'StudentProfile')

    for user in User.objects.all():
        try:
            profile = StudentProfile.objects.get(user=user)
            profile.student_id = user.student_id
            profile.save()
        except StudentProfile.DoesNotExist:
            pass


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_add_student_id_to_user'),
        ('profiles', '0002_remove_studentprofile_gpa_studentprofile_cgpa_and_more'),
    ]

    operations = [
        migrations.RunPython(migrate_student_ids, reverse_migrate_student_ids),
    ]
