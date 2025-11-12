from rest_framework import permissions


class IsStudentOwnerOrCoordinator(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.user.role == 'coordinator':
            return True
        return obj.student == request.user


class IsCoordinator(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'coordinator'
