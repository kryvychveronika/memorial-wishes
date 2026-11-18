from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from memorial.models import Wish

class MemorialApiTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testvolunteer', password='password123')
        self.wish = Wish.objects.create(
            hero_name='Тестовий Герой',
            wish_title='Побачити гори',
            wish_description='Опис бажання',
            city='Яремче',
            category='travel',
            difficulty='free',
            submitted_by_name='Родина',
            submitted_by_email='test@example.com',
            status='approved'
        )

    def test_list_wishes(self):
        response = self.client.get('/api/wishes/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) >= 1)

    def test_claim_wish_requires_auth(self):
        response = self.client.post(f'/api/wishes/{self.wish.id}/claim/')
        self.assertEqual(response.status_code, 401)

    def test_claim_wish_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(f'/api/wishes/{self.wish.id}/claim/')
        self.assertEqual(response.status_code, 200)
        self.wish.refresh_from_db()
        self.assertEqual(self.wish.status, 'claimed')
        self.assertEqual(self.wish.claimed_by, self.user)
