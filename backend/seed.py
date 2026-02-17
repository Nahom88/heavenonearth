import asyncio
import uuid
from datetime import datetime, date, time, timedelta, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import async_session_maker, engine, Base
from app.models.admin import Admin
from app.models.ministry import Ministry
from app.models.event import Event
from app.models.gallery import GalleryItem
from app.models.testimonial import Testimonial
from app.models.prayer import PrayerRequest
from app.security import get_password_hash
from app.config import settings

async def seed_data():
    async with async_session_maker() as db:
        # 1. Create Initial Admin
        admin_email = settings.admin_email.lower()
        result = await db.execute(select(Admin).where(Admin.email == admin_email))
        admin = result.scalar_one_or_none()
        
        if not admin:
            print(f"Creating admin: {admin_email}")
            admin = Admin(
                email=admin_email,
                hashed_password=get_password_hash(settings.admin_password),
                full_name=settings.admin_full_name,
                is_superadmin=True,
                is_active=True,
            )
            db.add(admin)
            await db.flush()
        else:
            print(f"Admin {admin_email} already exists")

        # 2. Seed Ministries
        ministries_data = [
            {
                "ministry_key": "prayer",
                "title": "Prayer Ministry",
                "title_am": "የጸሎት አገልግሎት",
                "description": """- 24/7 Prayer Coverage
- Weekly Prayer Vigils
- Intercession Team
- Prayer Chain Network""",
                "description_am": "24/7 የጸሎት ሽፋን፣ ሳምንታዊ የጸሎት ቪጂሎች፣ የምልጃ ቡድን፣ የጸሎት ሰንሰለት።",
                "icon_name": "HeartHandshake",
                "is_featured": True,
                "display_order": 1
            },
            {
                "ministry_key": "outreach",
                "title": "Community Outreach",
                "title_am": "የማህበረሰብ ተደራሽነት",
                "description": "Food distribution, helping the needy, and showing Christ's love through action.",
                "description_am": "ምግብ ማሰራጨት፣ ችግረኞችን መርዳት እና የክርስቶስን ፍቅር በተግባር ማሳየት።",
                "icon_name": "HeartHandshake",
                "is_featured": True,
                "display_order": 2
            },
            {
                "ministry_key": "discipleship",
                "title": "Discipleship",
                "title_am": "ደቀ መዝሙርነት",
                "description": "Bible studies, small groups, and spiritual mentoring for growth in faith.",
                "description_am": "የመጽሐፍ ቅዱስ ጥናቶች፣ ትናንሽ ቡድኖች እና በእምነት ለማደግ መንፈሳዊ አማካሪነት።",
                "icon_name": "BookOpen",
                "is_featured": True,
                "display_order": 3
            },
            {
                "ministry_key": "youth",
                "title": "Youth Ministry",
                "title_am": "የወጣቶች አገልግሎት",
                "description": "Weekly meetings, mentorship, and activities for young believers.",
                "description_am": "ሳምንታዊ ስብሰባዎች፣ አማካሪነት እና ለወጣት አማኞች እንቅስቃሴዎች።",
                "icon_name": "Users",
                "is_featured": True,
                "display_order": 4
            },
            {
                "ministry_key": "children",
                "title": "Children's Ministry",
                "title_am": "የልጆች አገልግሎት",
                "description": "Sunday School, Bible stories, and nurturing the faith of our little ones.",
                "description_am": "የሰንበት ትምህርት ቤት፣ የመጽሐፍ ቅዱስ ታሪኮች እና የትንንሾቻችንን እምነት ማሳደግ።",
                "icon_name": "Church",
                "is_featured": True,
                "display_order": 5
            },
            {
                "ministry_key": "worship",
                "title": "Worship Ministry",
                "title_am": "የአምልኮ አገልግሎት",
                "description": "Leading the congregation in praise and worship, fostering a spirit of adoration.",
                "description_am": "ምዕመናንን በአምልኮ መምራት፣ የአምልኮ መንፈስን ማሳደግ።",
                "icon_name": "Music",
                "is_featured": True,
                "display_order": 6
            },
            {
                "ministry_key": "women",
                "title": "Women's Ministry",
                "title_am": "የሴቶች አገልግሎት",
                "description": "Empowering women through fellowship, Bible study, and support groups.",
                "description_am": "በኅብረት፣ በመጽሐፍ ቅዱስ ጥናት እና በድጋፍ ቡድኖች ሴቶችን ማብቃት።",
                "icon_name": "Users",
                "is_featured": True,
                "display_order": 7
            },
            {
                "ministry_key": "missions",
                "title": "Missions",
                "title_am": "ሚሲዮን",
                "description": "Spreading the Gospel locally and globally through various mission initiatives.",
                "description_am": "ወንጌልን በአገር ውስጥ እና በዓለም አቀፍ ደረጃ በተለያዩ ሚሲዮን ተነሳሽነቶች ማሰራጨት።",
                "icon_name": "Mic2",
                "is_featured": True,
                "display_order": 8
            }
        ]

        for m_data in ministries_data:
            result = await db.execute(select(Ministry).where(Ministry.ministry_key == m_data["ministry_key"]))
            if not result.scalar_one_or_none():
                print(f"Seeding ministry: {m_data['title']}")
                ministry = Ministry(**m_data, created_by_id=admin.id)
                db.add(ministry)

        # 3. Seed Events
        events_data = [
            {
                "title": "Sunday Worship Service",
                "title_am": "የእሁድ አገልግሎት",
                "description": "Join us for powerful worship, prayer, and the Word of God.",
                "description_am": "በአምልኮ፣ በጸሎት እና በእግዚአብሔር ቃል ከእኛ ጋር ተቀላቀሉ።",
                "event_date": date.today() + timedelta(days=(6 - date.today().weekday()) % 7), # Next Sunday
                "start_time": time(9, 0),
                "end_time": time(12, 0),
                "location": "Main Sanctuary, Bole Road",
                "location_am": "ዋናው አዳራሽ፣ ቦሌ መንገድ",
                "category": "worship",
                "is_featured": True,
                "is_recurring": True,
                "recurrence_pattern": "weekly"
            },
            {
                "title": "Wednesday Prayer Meeting",
                "title_am": "የረቡዕ ጸሎት",
                "description": "Corporate prayer and intercession for our community and nation.",
                "description_am": "ለማህበረሰባችን እና ለሀገራችን የጋራ ጸሎት እና ምልጃ።",
                "event_date": date.today() + timedelta(days=(2 - date.today().weekday()) % 7), # Next Wednesday
                "start_time": time(18, 0),
                "end_time": time(20, 0),
                "location": "Prayer Hall",
                "location_am": "የጸሎት አዳራሽ",
                "category": "prayer",
                "is_featured": True,
                "is_recurring": True,
                "recurrence_pattern": "weekly"
            },
            {
                "title": "Youth Fellowship",
                "title_am": "የወጣቶች ኅብረት",
                "description": "Bible study, worship, and fellowship for young believers.",
                "description_am": "ለመጽሐፍ ቅዱስ ጥናት፣ ለአምልኮ እና ለወጣት አማኞች ኅብረት።",
                "event_date": date.today() + timedelta(days=(4 - date.today().weekday()) % 7), # Next Friday
                "start_time": time(17, 0),
                "end_time": time(19, 0),
                "location": "Youth Center",
                "location_am": "የወጣቶች ማዕከል",
                "category": "youth",
                "is_featured": True,
                "is_recurring": True,
                "recurrence_pattern": "weekly"
            }
        ]

        for e_data in events_data:
            result = await db.execute(select(Event).where(Event.title == e_data["title"]))
            if not result.scalar_one_or_none():
                print(f"Seeding event: {e_data['title']}")
                event = Event(**e_data, created_by_id=admin.id)
                db.add(event)

        # 4. Seed Gallery Items
        gallery_data = [
            {
                "title": "Sunday Worship",
                "title_am": "የእሁድ አምልኮ",
                "category": "worship",
                "media_type": "image",
                "src_url": "/images/gallery/worship-1.jpg",
                "alt_text": "Congregation worshiping together",
                "event_date": datetime.now(timezone.utc) - timedelta(days=10)
            },
            {
                "title": "Baptism Service",
                "title_am": "የጥምቀት አገልግሎት",
                "category": "worship",
                "media_type": "image",
                "src_url": "/images/gallery/baptism-1.jpg",
                "alt_text": "Baptism ceremony",
                "event_date": datetime.now(timezone.utc) - timedelta(days=20)
            },
            {
                "title": "Community Outreach",
                "title_am": "የማህበረሰብ ተደራሽነት",
                "category": "outreach",
                "media_type": "image",
                "src_url": "/images/gallery/outreach-1.jpg",
                "alt_text": "Community service event",
                "event_date": datetime.now(timezone.utc) - timedelta(days=30)
            }
        ]

        for g_data in gallery_data:
            result = await db.execute(select(GalleryItem).where(GalleryItem.title == g_data["title"]))
            if not result.scalar_one_or_none():
                print(f"Seeding gallery item: {g_data['title']}")
                item = GalleryItem(**g_data, created_by_id=admin.id)
                db.add(item)

        # 5. Seed Sample Testimonials
        testimonials_data = [
            {
                "name": "Abebe Kebede",
                "content": "This ministry has been a blessing to my family. We've grown so much in our faith.",
                "category": "General",
                "status": "published",
                "published_at": datetime.now(timezone.utc)
            },
            {
                "name": "Marta Alemu",
                "content": "The prayer ministry supported me during a very difficult time. I am forever grateful.",
                "category": "Prayer",
                "status": "published",
                "published_at": datetime.now(timezone.utc)
            }
        ]

        for t_data in testimonials_data:
            result = await db.execute(select(Testimonial).where(Testimonial.name == t_data["name"]))
            if not result.scalar_one_or_none():
                print(f"Seeding testimonial from: {t_data['name']}")
                testimonial = Testimonial(**t_data)
                db.add(testimonial)

        await db.commit()
        print("Seeding completed successfully!")

if __name__ == "__main__":
    asyncio.run(seed_data())
