import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

interface AboutContent {
  hero_title_en: string;
  hero_title_ar: string;
  hero_subtitle_en: string;
  hero_subtitle_ar: string;
  hero_info_en: string;
  hero_info_ar: string;
  artist_statement_title_en: string;
  artist_statement_title_ar: string;
  artist_statement_1_en: string;
  artist_statement_1_ar: string;
  artist_statement_2_en: string;
  artist_statement_2_ar: string;
  artist_statement_3_en: string;
  artist_statement_3_ar: string;
  artist_statement_4_en: string;
  artist_statement_4_ar: string;
  timeline_title_en: string;
  timeline_title_ar: string;
  timeline_items: Array<{
    year: string;
    event_en: string;
    event_ar: string;
  }>;
}

const About: React.FC = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('content_en')
        .eq('slug', 'about')
        .single();

      if (data?.content_en) {
        const parsedContent = JSON.parse(data.content_en);
        setContent(parsedContent);
      } else {
        // Fallback to default content
        setContent({
          hero_title_en: 'About the Artist',
          hero_title_ar: 'عن الفنان',
          hero_subtitle_en: 'Philip Boles, born in 1972, is an established Egyptian painter whose work explores the intersection of traditional realism with contemporary conceptual frameworks.',
          hero_subtitle_ar: 'فيليب بولز، مواليد 1972، رسام مصري راسخ يستكشف عمله تقاطع الواقعية التقليدية مع الأطر المفاهيمية المعاصرة.',
          hero_info_en: 'Age 52 • Fine Arts \'96',
          hero_info_ar: 'العمر 52 • الفنون الجميلة \'96',
          artist_statement_title_en: 'Artist Statement',
          artist_statement_title_ar: 'بيان الفنان',
          artist_statement_1_en: 'Philip Boulos is a visual artist from Egypt, born in 1973 and a graduate of the Faculty of Fine Arts, class of 1996. With over two decades of experience, his artistic journey spans across painting, sculpture, installation, and stage design, including theatrical sets and costume creation—each infused with a unique and personal artistic vision.',
          artist_statement_1_ar: 'تدور ممارستي الفنية حول ما أسميه "الفواليا" – المبدأ الفعال الذي يحكم العلاقة بين الوعي والإدراك البصري. هذا المفهوم، المتجذر في الظاهرة العربية، يشكل الأساس النظري لعملي.',
          artist_statement_2_en: 'Philip\'s work is known for its rich symbolism, experimental nature, and deep philosophical undertones. His pieces often explore themes of identity, human struggle, and societal transformation, using a variety of materials and forms to evoke reflection and emotional depth. His approach fuses classical art principles with contemporary expressions, creating a dynamic visual language that stands out in both local and international exhibitions.',
          artist_statement_2_ar: 'من خلال "الطبقات الفيلولوجية"، أنقب في الأعماق الدلالية للغة البصرية، معاملاً كل ضربة فرشاة كعنصر نصي يحمل التأثير الحسي المباشر والرنين الثقافي الأعمق. لوحاتي مواقع أثرية للمعنى، حيث تتقارب التقاليد الفنية المصرية القديمة مع الخطاب العالمي المعاصر.',
          artist_statement_3_en: 'The "Phenomenology of Light and Shadow" in my work transcends mere technical execution. Light becomes a metaphor for consciousness itself – the illuminating force that reveals hidden truths within the mundane. Shadow, conversely, represents the unconscious, the suppressed, the culturally invisible.',
          artist_statement_3_ar: '"ظاهرة الضوء والظل" في عملي تتجاوز مجرد التنفيذ التقني. يصبح الضوء استعارة للوعي نفسه – القوة المنيرة التي تكشف الحقائق المخفية داخل المألوف. الظل، على العكس، يمثل اللاوعي، المقموع، غير المرئي ثقافياً.',
          artist_statement_4_en: 'My "Expressive Realism" refuses the false binary between representation and abstraction. Instead, I seek to capture the emotional truth that lies beneath surface appearances, using traditional techniques to explore thoroughly modern anxieties about identity, belonging, and cultural authenticity in a globalized world.',
          artist_statement_4_ar: '"الواقعية التعبيرية" ترفض الثنائية الزائفة بين التمثيل والتجريد. بدلاً من ذلك، أسعى لالتقاط الحقيقة العاطفية التي تكمن تحت المظاهر السطحية، مستخدماً التقنيات التقليدية لاستكشاف القلق الحديث حول الهوية والانتماء والأصالة الثقافية في عالم معولم.',
          timeline_title_en: 'Career Milestones',
          timeline_title_ar: 'معالم المسيرة المهنية',
          timeline_items: [
            { year: '1996', event_en: 'Fine Arts Graduation, Cairo University', event_ar: 'تخرج من الفنون الجميلة، جامعة القاهرة' },
            { year: '1998', event_en: 'First Group Exhibition, Gezira Art Center', event_ar: 'أول معرض جماعي، مركز الجزيرة للفنون' },
            { year: '2001', event_en: 'European Study Tour - Paris, Florence, Madrid', event_ar: 'جولة دراسية أوروبية - باريس، فلورنسا، مدريد' },
            { year: '2005', event_en: 'Solo Exhibition "Shadows of Memory"', event_ar: 'معرض فردي "ظلال الذاكرة"' },
            { year: '2008', event_en: 'Residency at Delfina Foundation, London', event_ar: 'إقامة فنية في مؤسسة دلفينا، لندن' },
            { year: '2012', event_en: 'Al-Faw\'aliya Series Launch', event_ar: 'إطلاق سلسلة الفواليا' },
            { year: '2015', event_en: 'Venice Biennale Participation', event_ar: 'مشاركة في بينالي البندقية' },
            { year: '2018', event_en: 'Retrospective at Cairo Opera House', event_ar: 'معرض استعادي في دار أوبرا القاهرة' },
            { year: '2020', event_en: 'International Recognition Award', event_ar: 'جائزة الاعتراف الدولي' },
            { year: '2023', event_en: 'Major Solo Exhibition "Phenomenology of Light"', event_ar: 'معرض فردي كبير "ظاهرة الضوء"' }
          ]
        });
      }
    } catch (error) {
      console.error('Error loading about content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-neutral-300">Loading...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="pt-16 min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-neutral-300">Content not found</div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-serif text-neutral-100 mb-6">
                {language === 'en' ? content.hero_title_en : content.hero_title_ar}
              </h1>
              <p className="text-xl text-neutral-300 mb-8">
                {language === 'en' ? content.hero_subtitle_en : content.hero_subtitle_ar}
              </p>
              <div className="text-accent-400 font-medium">
                {language === 'en' ? content.hero_info_en : content.hero_info_ar}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Philip Boles Portrait"
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="py-24 bg-primary-800">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-serif text-center text-neutral-100 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'en' ? content.artist_statement_title_en : content.artist_statement_title_ar}
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-primary-700 p-8 rounded-lg border border-primary-600"
            >
              <div className="prose prose-invert prose-lg max-w-none">
                {language === 'en' ? (
                  <div>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                      {content.artist_statement_1_en}
                    </p>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                      {content.artist_statement_2_en}
                    </p>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                      {content.artist_statement_3_en}
                    </p>
                    <p className="text-neutral-300 leading-relaxed">
                      {content.artist_statement_4_en}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                      {content.artist_statement_1_ar}
                    </p>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                      {content.artist_statement_2_ar}
                    </p>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                      {content.artist_statement_3_ar}
                    </p>
                    <p className="text-neutral-300 leading-relaxed">
                      {content.artist_statement_4_ar}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual Timeline */}
      <section className="py-24 bg-primary-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-serif text-center text-neutral-100 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'en' ? content.timeline_title_en : content.timeline_title_ar}
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            {content.timeline_items.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex items-center mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mr-6">
                  <span className="text-white font-bold text-sm">{item.year}</span>
                </div>
                <div className="flex-1 bg-primary-800 p-4 rounded-lg border border-primary-700">
                  <p className="text-neutral-300">
                    {language === 'en' ? item.event_en : item.event_ar}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;