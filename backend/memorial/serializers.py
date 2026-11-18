from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Wish, FulfillmentReport

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class FulfillmentReportSerializer(serializers.ModelSerializer):
    volunteer_name = serializers.ReadOnlyField(source='volunteer.username')

    class Meta:
        model = FulfillmentReport
        fields = ['id', 'wish', 'volunteer', 'volunteer_name', 'report_text', 'report_photo_url', 'created_at', 'is_approved']
        read_only_fields = ['volunteer', 'is_approved', 'created_at']


class WishSerializer(serializers.ModelSerializer):
    claimed_by_username = serializers.ReadOnlyField(source='claimed_by.username')
    report = FulfillmentReportSerializer(read_only=True)

    class Meta:
        model = Wish
        fields = [
            'id', 'hero_name', 'photo_url', 'hero_story', 'military_unit',
            'wish_title', 'wish_description', 'city', 'category', 'difficulty',
            'submitted_by_name', 'submitted_by_email', 'family_consent',
            'status', 'claimed_by', 'claimed_by_username', 'claimed_at',
            'created_at', 'report'
        ]
        read_only_fields = ['claimed_by', 'claimed_at', 'created_at']
