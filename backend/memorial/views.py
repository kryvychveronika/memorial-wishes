from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Q
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Wish, FulfillmentReport
from .serializers import WishSerializer, FulfillmentReportSerializer, UserSerializer


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    username = request.data.get('username', '').strip()
    email = request.data.get('email', '').strip()
    password = request.data.get('password', '')

    if not username or not password:
        return Response({'error': 'Будь ласка, введіть ім\'я користувача та пароль.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Користувач із таким ім\'ям вже існує.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        'token': token.key,
        'user': UserSerializer(user).data,
        'message': 'Реєстрація успішна'
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_user(request):
    username = request.data.get('username', '').strip()
    password = request.data.get('password', '')

    # Try authenticate by username or by email
    user = authenticate(username=username, password=password)
    if not user and '@' in username:
        try:
            matched_user = User.objects.get(email=username)
            user = authenticate(username=matched_user.username, password=password)
        except User.DoesNotExist:
            user = None

    if not user:
        return Response({'error': 'Невірний логін або пароль.'}, status=status.HTTP_400_BAD_REQUEST)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({
        'token': token.key,
        'user': UserSerializer(user).data,
        'message': 'Вхід успішний'
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_me(request):
    user = request.user
    user_data = UserSerializer(user).data
    claimed_wishes = Wish.objects.filter(claimed_by=user).exclude(status='completed')
    completed_wishes = Wish.objects.filter(claimed_by=user, status='completed')

    return Response({
        'user': user_data,
        'claimed_wishes': WishSerializer(claimed_wishes, many=True).data,
        'completed_wishes': WishSerializer(completed_wishes, many=True).data,
    })


class WishViewSet(viewsets.ModelViewSet):
    queryset = Wish.objects.all()
    serializer_class = WishSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Wish.objects.all()
        category = self.request.query_params.get('category')
        difficulty = self.request.query_params.get('difficulty')
        city = self.request.query_params.get('city')
        status_param = self.request.query_params.get('status')
        search = self.request.query_params.get('search')

        if category and category != 'all':
            queryset = queryset.filter(category=category)
        if difficulty and difficulty != 'all':
            queryset = queryset.filter(difficulty=difficulty)
        if city and city != 'all':
            queryset = queryset.filter(city__icontains=city)
        if status_param and status_param != 'all':
            queryset = queryset.filter(status=status_param)
        if search:
            queryset = queryset.filter(
                Q(hero_name__icontains=search) |
                Q(wish_title__icontains=search) |
                Q(wish_description__icontains=search) |
                Q(hero_story__icontains=search)
            )

        return queryset

    def perform_create(self, serializer):
        # Auto-publish for smooth demo, but allow pending in production
        serializer.save(status='approved')

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def claim(self, request, pk=None):
        wish = self.get_object()
        if wish.status == 'claimed':
            return Response({'error': 'Це бажання вже взяте іншим волонтером.'}, status=status.HTTP_400_BAD_REQUEST)
        if wish.status == 'completed':
            return Response({'error': 'Це бажання вже виконано.'}, status=status.HTTP_400_BAD_REQUEST)

        wish.claimed_by = request.user
        wish.claimed_at = timezone.now()
        wish.status = 'claimed'
        wish.save()

        return Response({
            'message': 'Ви успішно взяли бажання в роботу! Дякуємо за ваше велике серце.',
            'wish': WishSerializer(wish).data
        })

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def unclaim(self, request, pk=None):
        wish = self.get_object()
        if wish.claimed_by != request.user:
            return Response({'error': 'Ви можете скасувати лише власне взяття в роботу.'}, status=status.HTTP_403_FORBIDDEN)

        wish.claimed_by = None
        wish.claimed_at = None
        wish.status = 'approved'
        wish.save()

        return Response({
            'message': 'Бажання повернуто до загального каталогу.',
            'wish': WishSerializer(wish).data
        })

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def complete(self, request, pk=None):
        wish = self.get_object()
        if wish.claimed_by != request.user:
            return Response({'error': 'Тільки волонтер, який взяв бажання, може надіслати звіт.'}, status=status.HTTP_403_FORBIDDEN)

        report_text = request.data.get('report_text', '').strip()
        report_photo_url = request.data.get('report_photo_url', '').strip()

        if not report_text:
            return Response({'error': 'Будь ласка, напишіть кілька слів про те, як ви виконали це бажання.'}, status=status.HTTP_400_BAD_REQUEST)

        report, created = FulfillmentReport.objects.update_or_create(
            wish=wish,
            defaults={
                'volunteer': request.user,
                'report_text': report_text,
                'report_photo_url': report_photo_url,
                'is_approved': True
            }
        )

        wish.status = 'completed'
        wish.save()

        return Response({
            'message': 'Звіт про виконання успішно збережено! Родина захисника обов\'язково побачить це вшанування.',
            'wish': WishSerializer(wish).data,
            'report': FulfillmentReportSerializer(report).data
        })
