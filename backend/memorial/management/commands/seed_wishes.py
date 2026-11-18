from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from memorial.models import Wish, FulfillmentReport

class Command(BaseCommand):
    help = 'Seeds initial sample wishes for the memorial culture of remembrance project'

    def handle(self, *args, **options):
        # Create demo admin and demo volunteer if not exists
        admin_user, created = User.objects.get_or_create(
            username='admin',
            defaults={'email': 'admin@memorial.ua', 'is_staff': True, 'is_superuser': True}
        )
        if created:
            admin_user.set_password('admin123')
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("Created demo admin user: admin / admin123"))

        volunteer_user, _ = User.objects.get_or_create(
            username='volodymyr_v',
            defaults={'email': 'volodymyr@volunteer.ua'}
        )
        if _:
            volunteer_user.set_password('volunteer123')
            volunteer_user.save()

        # Seed wishes matching the pitch
        wishes_data = [
            {
                "hero_name": "Олексій «Сокіл» Мельник",
                "photo_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
                "military_unit": "72-га окрема механізована бригада імені Чорних Запорожців",
                "hero_story": "Олексій був інженером-робототехніком і щирим оптимістом. У мирному житті мріяв про велику подорож Італією з дружиною, завжди складав список піцерій у Трастевере, але пішов захищати Київ у лютому 2022.",
                "wish_title": "З'їсти справжню піцу Маргариту в Римі",
                "wish_description": "Олексій роками мріяв потрапити до Риму і з'їсти піцу в автентичній вуличній піцерії на заході сонця. Якщо ви подорожуєте до Риму або живете там — замовте піцу, згадайте Олексія і сфотографуйте цей момент для його дружини Оксани.",
                "city": "Рим (або будь-яке італійське кафе)",
                "category": "food",
                "difficulty": "free",
                "submitted_by_name": "Оксана Мельник (дружина)",
                "submitted_by_email": "oksana.melnyk@example.com",
                "status": "approved",
            },
            {
                "hero_name": "Тарас «Кіт» Бондаренко",
                "photo_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
                "military_unit": "128-ма окрема гірсько-штурмова Закарпатська бригада",
                "hero_story": "Тарас народився в Полтаві і все дитинство мріяв про море. Влітку 2023 року планував після ротації вперше поїхати до Одеси, щоб зустріти світанок на Ланжероні.",
                "wish_title": "Зустріти світанок біля Чорного моря",
                "wish_description": "Побачити світанок на узбережжі моря в Одесі, подихати солоним вітром і подумки сказати Тарасу: «Друже, ми тут, і море вільне». Надіслати відео або фото сходу сонця.",
                "city": "Одеса",
                "category": "travel",
                "difficulty": "free",
                "submitted_by_name": "Марія Бондаренко (мати)",
                "submitted_by_email": "maria.b@example.com",
                "status": "approved",
            },
            {
                "hero_name": "Дмитро «Хват» Савченко",
                "photo_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
                "military_unit": "3-тя окрема штурмова бригада",
                "hero_story": "Дмитро займався бігом, щоранку долав по 10 км і готувався пробігти свій перший офіційний півмарафон у Києві, який мав відбутися восени 2022.",
                "wish_title": "Пробігти дистанцію півмарафону (21.1 км)",
                "wish_description": "Дмитро тренувався в будь-яку погоду. Будемо надзвичайно зворушені, якщо хтось із бігової спільноти присвятить йому забіг на дистанцію півмарафону і надішле трек або фото фінішної медалі з написом імені Дмитра.",
                "city": "Київ (або будь-яке місто)",
                "category": "sport",
                "difficulty": "free",
                "submitted_by_name": "Сергій Савченко (брат)",
                "submitted_by_email": "serhii.s@example.com",
                "status": "claimed",
                "claimed_by": volunteer_user,
            },
            {
                "hero_name": "Ярослав «Літописець» Гриценко",
                "photo_url": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400",
                "military_unit": "93-тя ОМБр «Холодний Яр»",
                "hero_story": "Ярослав був учителем літератури. Понад усе любив поезію Василя Симоненка і мріяв подарувати повну збірку віршів бібліотеці своєї рідної сільської школи на Черкащині.",
                "wish_title": "Подарувати книги української поезії сільській бібліотеці",
                "wish_description": "Купити кілька збірок українських поетів та надіслати або завезти до бібліотеки в с. Мошни на Черкащині із підписом «У пам'ять про захисника Ярослава Гриценка».",
                "city": "Черкаська обл. / Черкаси",
                "category": "culture",
                "difficulty": "budget",
                "submitted_by_name": "Ганна Гриценко (сестра)",
                "submitted_by_email": "hanna.g@example.com",
                "status": "completed",
                "claimed_by": volunteer_user,
            },
            {
                "hero_name": "Богдан «Верес» Ковальчук",
                "photo_url": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
                "military_unit": "80-та окрема десантно-штурмова Галицька бригада",
                "hero_story": "Богдан любив Карпати, щороку збирав друзів на сходження на Говерлу на День Незалежності. Мріяв піднятися на Чорногірський хребет разом зі своїм маленьким сином Лукою.",
                "wish_title": "Підняти синьо-жовтий прапор на вершині гори Говерла",
                "wish_description": "Здійснити підйом на вершину гори Говерла або іншу вершину Карпат і зробити фото з українським прапором на згадку про десантника Богдана.",
                "city": "Карпати / Івано-Франківська обл.",
                "category": "sport",
                "difficulty": "free",
                "submitted_by_name": "Ольга Ковальчук (дружина)",
                "submitted_by_email": "olga.k@example.com",
                "status": "approved",
            }
        ]

        for item in wishes_data:
            claimed_by = item.pop("claimed_by", None)
            wish, created = Wish.objects.get_or_create(
                hero_name=item["hero_name"],
                defaults={**item, "claimed_by": claimed_by}
            )
            if not created and claimed_by:
                wish.claimed_by = claimed_by
                wish.save()

            # If completed, add report
            if wish.status == 'completed' and not hasattr(wish, 'report'):
                FulfillmentReport.objects.create(
                    wish=wish,
                    volunteer=volunteer_user,
                    report_text="Я зв'язався з бібліотекою в Мошнах і надіслав пакунок із 8 книгами сучасної української поезії та класиків, включно з повним виданням Василя Симоненка. Працівники бібліотеки були дуже зворушені і розмістили пам'ятний куточок на честь Ярослава.",
                    report_photo_url="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
                    is_approved=True
                )

        self.stdout.write(self.style.SUCCESS(f"Successfully seeded {len(wishes_data)} wishes!"))
