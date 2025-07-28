-- Add sample content to pages for testing the content editor
-- This will populate the pages with some initial content that can be edited

-- Update existing pages with sample content
UPDATE pages 
SET content_en = '{
  "hero_title": {
    "en": "Contemporary Art Gallery",
    "ar": "معرض الفن المعاصر"
  },
  "hero_subtitle": {
    "en": "Exploring the boundaries of artistic expression",
    "ar": "استكشاف حدود التعبير الفني"
  },
  "hero_cta_primary": {
    "en": "View Gallery",
    "ar": "عرض المعرض"
  },
  "hero_cta_secondary": {
    "en": "Learn More",
    "ar": "اعرف المزيد"
  },
  "timeline_title": {
    "en": "Artistic Journey",
    "ar": "الرحلة الفنية"
  },
  "featured_title": {
    "en": "Featured Works",
    "ar": "الأعمال المميزة"
  },
  "review_link_text": {
    "en": "Read Review",
    "ar": "اقرأ المراجعة"
  }
}'
WHERE slug = 'home';

UPDATE pages 
SET content_en = '{
  "page_title": {
    "en": "About the Artist",
    "ar": "عن الفنان"
  },
  "page_subtitle": {
    "en": "Discover the story behind the art",
    "ar": "اكتشف القصة وراء الفن"
  },
  "age_info": {
    "en": "Born in 1985, the artist has been creating for over 20 years",
    "ar": "ولد في عام 1985، الفنان يبدع منذ أكثر من 20 عاماً"
  },
  "statement_title": {
    "en": "Artist Statement",
    "ar": "بيان الفنان"
  },
  "timeline_title": {
    "en": "Career Milestones",
    "ar": "المحطات المهنية"
  }
}'
WHERE slug = 'about';

UPDATE pages 
SET content_en = '{
  "page_title": {
    "en": "Gallery",
    "ar": "المعرض"
  },
  "filter_all": {
    "en": "All Works",
    "ar": "جميع الأعمال"
  },
  "discover_text": {
    "en": "Discover our collection of contemporary artworks",
    "ar": "اكتشف مجموعتنا من الأعمال الفنية المعاصرة"
  },
  "inquiry_button": {
    "en": "Inquire About This Work",
    "ar": "استفسر عن هذا العمل"
  }
}'
WHERE slug = 'gallery';

UPDATE pages 
SET content_en = '{
  "page_title": {
    "en": "Critical Review",
    "ar": "المراجعة النقدية"
  },
  "page_subtitle": {
    "en": "Expert analysis of contemporary art",
    "ar": "تحليل خبير للفن المعاصر"
  },
  "interview_title": {
    "en": "Artist Interview",
    "ar": "مقابلة الفنان"
  },
  "interview_subtitle": {
    "en": "Insights into the creative process",
    "ar": "رؤى في العملية الإبداعية"
  }
}'
WHERE slug = 'review';

UPDATE pages 
SET content_en = '{
  "page_title": {
    "en": "Exhibitions",
    "ar": "المعارض"
  },
  "page_subtitle": {
    "en": "Current and upcoming exhibitions",
    "ar": "المعارض الحالية والقادمة"
  },
  "next_exhibition": {
    "en": "Next Exhibition",
    "ar": "المعرض القادم"
  },
  "archive_title": {
    "en": "Exhibition Archive",
    "ar": "أرشيف المعارض"
  },
  "partners_title": {
    "en": "Partner Galleries",
    "ar": "المعارض الشريكة"
  }
}'
WHERE slug = 'exhibitions';

UPDATE pages 
SET content_en = '{
  "page_title": {
    "en": "Contact",
    "ar": "اتصل بنا"
  },
  "page_subtitle": {
    "en": "Get in touch with us",
    "ar": "تواصل معنا"
  },
  "contact_info_title": {
    "en": "Contact Information",
    "ar": "معلومات الاتصال"
  },
  "send_message_title": {
    "en": "Send a Message",
    "ar": "إرسال رسالة"
  },
  "studio_location_title": {
    "en": "Studio Location",
    "ar": "موقع الاستوديو"
  },
  "newsletter_title": {
    "en": "Newsletter Signup",
    "ar": "الاشتراك في النشرة الإخبارية"
  }
}'
WHERE slug = 'contact'; 