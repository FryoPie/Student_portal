from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Achievement, Notification


@receiver(pre_save, sender=Achievement)
def create_status_change_notification(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = Achievement.objects.get(pk=instance.pk)
            if old_instance.status != instance.status and instance.status in ['verified', 'rejected']:
                status_text = 'verified' if instance.status == 'verified' else 'rejected'
                message = f'Your achievement "{instance.title}" has been {status_text}.'

                if instance.verification_notes:
                    message += f' Note: {instance.verification_notes}'

                Notification.objects.create(
                    user=instance.student,
                    achievement=instance,
                    message=message
                )
        except Achievement.DoesNotExist:
            pass
