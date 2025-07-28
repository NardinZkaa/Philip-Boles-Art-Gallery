-- Save actual website content to the database
-- This migration will populate the pages table with real content from your website

-- Clear existing content first
DELETE FROM pages WHERE slug IN ('home', 'about', 'gallery', 'review', 'exhibitions', 'contact');

-- Insert Home page content
INSERT INTO pages (slug, title_en, title_ar, content_en, content_ar, meta_description_en, meta_description_ar, is_published) VALUES
('home', 'Home', 'الرئيسية', 
'{
  "hero_title": {
    "en": "Contemporary Art Gallery",
    "ar": "معرض الفن المعاصر"
  },
  "hero_subtitle": {
    "en": "Exploring the boundaries of artistic expression through innovative techniques and bold perspectives",
    "ar": "استكشاف حدود التعبير الفني من خلال التقنيات المبتكرة والمنظورات الجريئة"
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
    "en": "Read Critical Review",
    "ar": "اقرأ المراجعة النقدية"
  }
}', 
'{
  "hero_title": {
    "en": "Contemporary Art Gallery",
    "ar": "معرض الفن المعاصر"
  },
  "hero_subtitle": {
    "en": "Exploring the boundaries of artistic expression through innovative techniques and bold perspectives",
    "ar": "استكشاف حدود التعبير الفني من خلال التقنيات المبتكرة والمنظورات الجريئة"
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
    "en": "Read Critical Review",
    "ar": "اقرأ المراجعة النقدية"
  }
}',
'Contemporary art gallery showcasing innovative artistic expressions',
'معرض فني معاصر يعرض التعبيرات الفنية المبتكرة',
true);

-- Insert About page content
INSERT INTO pages (slug, title_en, title_ar, content_en, content_ar, meta_description_en, meta_description_ar, is_published) VALUES
('about', 'About', 'عن الفنان', 
'{
  "page_title": {
    "en": "About the Artist",
    "ar": "عن الفنان"
  },
  "page_subtitle": {
    "en": "Discover the story behind the art and the creative journey that shapes each piece",
    "ar": "اكتشف القصة وراء الفن والرحلة الإبداعية التي تشكل كل قطعة"
  },
  "age_info": {
    "en": "Born in 1985, the artist has been creating for over 20 years, developing a unique style that blends traditional techniques with contemporary themes",
    "ar": "ولد في عام 1985، الفنان يبدع منذ أكثر من 20 عاماً، طور أسلوباً فريداً يدمج التقنيات التقليدية مع الموضوعات المعاصرة"
  },
  "statement_title": {
    "en": "Artist Statement",
    "ar": "بيان الفنان"
  },
  "timeline_title": {
    "en": "Career Milestones",
    "ar": "المحطات المهنية"
  }
}', 
'{
  "page_title": {
    "en": "About the Artist",
    "ar": "عن الفنان"
  },
  "page_subtitle": {
    "en": "Discover the story behind the art and the creative journey that shapes each piece",
    "ar": "اكتشف القصة وراء الفن والرحلة الإبداعية التي تشكل كل قطعة"
  },
  "age_info": {
    "en": "Born in 1985, the artist has been creating for over 20 years, developing a unique style that blends traditional techniques with contemporary themes",
    "ar": "ولد في عام 1985، الفنان يبدع منذ أكثر من 20 عاماً، طور أسلوباً فريداً يدمج التقنيات التقليدية مع الموضوعات المعاصرة"
  },
  "statement_title": {
    "en": "Artist Statement",
    "ar": "بيان الفنان"
  },
  "timeline_title": {
    "en": "Career Milestones",
    "ar": "المحطات المهنية"
  }
}',
'Learn about the artist and their creative journey',
'تعرف على الفنان ورحلته الإبداعية',
true);

-- Insert Gallery page content
INSERT INTO pages (slug, title_en, title_ar, content_en, content_ar, meta_description_en, meta_description_ar, is_published) VALUES
('gallery', 'Gallery', 'المعرض', 
'{
  "page_title": {
    "en": "Gallery",
    "ar": "المعرض"
  },
  "filter_all": {
    "en": "All Works",
    "ar": "جميع الأعمال"
  },
  "discover_text": {
    "en": "Discover our collection of contemporary artworks that challenge perceptions and inspire new ways of seeing",
    "ar": "اكتشف مجموعتنا من الأعمال الفنية المعاصرة التي تتحدى التصورات وتلهم طرقاً جديدة للرؤية"
  },
  "inquiry_button": {
    "en": "Inquire About This Work",
    "ar": "استفسر عن هذا العمل"
  }
}', 
'{
  "page_title": {
    "en": "Gallery",
    "ar": "المعرض"
  },
  "filter_all": {
    "en": "All Works",
    "ar": "جميع الأعمال"
  },
  "discover_text": {
    "en": "Discover our collection of contemporary artworks that challenge perceptions and inspire new ways of seeing",
    "ar": "اكتشف مجموعتنا من الأعمال الفنية المعاصرة التي تتحدى التصورات وتلهم طرقاً جديدة للرؤية"
  },
  "inquiry_button": {
    "en": "Inquire About This Work",
    "ar": "استفسر عن هذا العمل"
  }
}',
'Browse our collection of contemporary artworks',
'تصفح مجموعتنا من الأعمال الفنية المعاصرة',
true);

-- Insert Review page content
INSERT INTO pages (slug, title_en, title_ar, content_en, content_ar, meta_description_en, meta_description_ar, is_published) VALUES
('review', 'Review', 'المراجعة', 
'{
  "page_title": {
    "en": "Critical Review",
    "ar": "المراجعة النقدية"
  },
  "page_subtitle": {
    "en": "Expert analysis of contemporary art and its impact on cultural discourse",
    "ar": "تحليل خبير للفن المعاصر وتأثيره على الخطاب الثقافي"
  },
  "interview_title": {
    "en": "Artist Interview",
    "ar": "مقابلة الفنان"
  },
  "interview_subtitle": {
    "en": "Insights into the creative process and artistic philosophy",
    "ar": "رؤى في العملية الإبداعية والفلسفة الفنية"
  }
}', 
'{
  "page_title": {
    "en": "Critical Review",
    "ar": "المراجعة النقدية"
  },
  "page_subtitle": {
    "en": "Expert analysis of contemporary art and its impact on cultural discourse",
    "ar": "تحليل خبير للفن المعاصر وتأثيره على الخطاب الثقافي"
  },
  "interview_title": {
    "en": "Artist Interview",
    "ar": "مقابلة الفنان"
  },
  "interview_subtitle": {
    "en": "Insights into the creative process and artistic philosophy",
    "ar": "رؤى في العملية الإبداعية والفلسفة الفنية"
  }
}',
'Expert analysis and critical review of contemporary art',
'تحليل خبير ومراجعة نقدية للفن المعاصر',
true);

-- Insert Exhibitions page content
INSERT INTO pages (slug, title_en, title_ar, content_en, content_ar, meta_description_en, meta_description_ar, is_published) VALUES
('exhibitions', 'Exhibitions', 'المعارض', 
'{
  "page_title": {
    "en": "Exhibitions",
    "ar": "المعارض"
  },
  "page_subtitle": {
    "en": "Current and upcoming exhibitions showcasing contemporary art",
    "ar": "المعارض الحالية والقادمة التي تعرض الفن المعاصر"
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
}', 
'{
  "page_title": {
    "en": "Exhibitions",
    "ar": "المعارض"
  },
  "page_subtitle": {
    "en": "Current and upcoming exhibitions showcasing contemporary art",
    "ar": "المعارض الحالية والقادمة التي تعرض الفن المعاصر"
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
}',
'Current and upcoming art exhibitions',
'المعارض الفنية الحالية والقادمة',
true);

-- Insert Contact page content
INSERT INTO pages (slug, title_en, title_ar, content_en, content_ar, meta_description_en, meta_description_ar, is_published) VALUES
('contact', 'Contact', 'اتصل بنا', 
'{
  "page_title": {
    "en": "Contact",
    "ar": "اتصل بنا"
  },
  "page_subtitle": {
    "en": "Get in touch with us to learn more about our exhibitions and artworks",
    "ar": "تواصل معنا لمعرفة المزيد عن معارضنا وأعمالنا الفنية"
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
}', 
'{
  "page_title": {
    "en": "Contact",
    "ar": "اتصل بنا"
  },
  "page_subtitle": {
    "en": "Get in touch with us to learn more about our exhibitions and artworks",
    "ar": "تواصل معنا لمعرفة المزيد عن معارضنا وأعمالنا الفنية"
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
}',
'Contact us for more information about our exhibitions',
'اتصل بنا للحصول على مزيد من المعلومات حول معارضنا',
true); 