import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

interface ExhibitionItem {
  title_en: string;
  title_ar: string;
  date_en: string;
  date_ar: string;
  location_en: string;
  location_ar: string;
  description_en: string;
  description_ar: string;
  image_url: string;
}

interface ExhibitionsContent {
  hero_title_en: string;
  hero_title_ar: string;
  hero_subtitle_en: string;
  hero_subtitle_ar: string;
  upcoming_title_en: string;
  upcoming_title_ar: string;
  past_title_en: string;
  past_title_ar: string;
  upcoming_exhibitions: ExhibitionItem[];
  past_exhibitions: ExhibitionItem[];
}

const Exhibitions: React.FC = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState<ExhibitionsContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('content_en')
        .eq('slug', 'exhibitions')
        .single();

      if (data?.content_en) {
        const parsedContent = JSON.parse(data.content_en);
        setContent(parsedContent);
      } else {
        // Fallback to default content
        setContent({
          hero_title_en: 'Exhibitions',
          hero_title_ar: 'المعارض',
          hero_subtitle_en: 'Current and upcoming exhibitions featuring Philip Boles\' work',
          hero_subtitle_ar: 'المعارض الحالية والقادمة التي تعرض أعمال فيليب بولز',
          upcoming_title_en: 'Upcoming Exhibitions',
          upcoming_title_ar: 'المعارض القادمة',
          past_title_en: 'Past Exhibitions',
          past_title_ar: 'المعارض السابقة',
          upcoming_exhibitions: [
            {
              title_en: 'Phenomenology of Light',
              title_ar: 'ظاهرة الضوء',
              date_en: 'March 15 - April 30, 2024',
              date_ar: '15 مارس - 30 أبريل 2024',
              location_en: 'Cairo Opera House Gallery',
              location_ar: 'معرض دار أوبرا القاهرة',
              description_en: 'A major solo exhibition exploring the artist\'s latest series on light and consciousness.',
              description_ar: 'معرض فردي كبير يستكشف أحدث سلسلة للفنان حول الضوء والوعي.',
              image_url: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            {
              title_en: 'Al-Faw\'aliya: The Active Principle',
              title_ar: 'الفواليا: المبدأ الفعال',
              date_en: 'June 1 - July 15, 2024',
              date_ar: '1 يونيو - 15 يوليو 2024',
              location_en: 'Gezira Art Center',
              location_ar: 'مركز الجزيرة للفنون',
              description_en: 'A comprehensive retrospective of the artist\'s conceptual framework.',
              description_ar: 'معرض استعادي شامل للإطار المفاهيمي للفنان.',
              image_url: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=600'
            }
          ],
          past_exhibitions: [
            {
              title_en: 'Shadows of Memory',
              title_ar: 'ظلال الذاكرة',
              date_en: 'October 2023',
              date_ar: 'أكتوبر 2023',
              location_en: 'Venice Biennale',
              location_ar: 'بينالي البندقية',
              description_en: 'International recognition at the prestigious Venice Biennale.',
              description_ar: 'اعتراف دولي في بينالي البندقية المرموق.',
              image_url: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            {
              title_en: 'Expressive Realism',
              title_ar: 'الواقعية التعبيرية',
              date_en: 'March 2023',
              date_ar: 'مارس 2023',
              location_en: 'Delfina Foundation, London',
              location_ar: 'مؤسسة دلفينا، لندن',
              description_en: 'Solo exhibition during artist residency in London.',
              description_ar: 'معرض فردي خلال الإقامة الفنية في لندن.',
              image_url: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            {
              title_en: 'Cultural Dialogues',
              title_ar: 'حوارات ثقافية',
              date_en: 'September 2022',
              date_ar: 'سبتمبر 2022',
              location_en: 'Cairo International Art Fair',
              location_ar: 'معرض القاهرة الدولي للفنون',
              description_en: 'Featured artist at the annual international art fair.',
              description_ar: 'فنان مميز في المعرض الدولي السنوي للفنون.',
              image_url: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=600'
            }
          ]
        });
      }
    } catch (error) {
      console.error('Error loading exhibitions content:', error);
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
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-serif text-neutral-100 mb-6">
              {language === 'en' ? content.hero_title_en : content.hero_title_ar}
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              {language === 'en' ? content.hero_subtitle_en : content.hero_subtitle_ar}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Exhibitions */}
      <section className="py-16 bg-primary-800">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-serif text-center text-neutral-100 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'en' ? content.upcoming_title_en : content.upcoming_title_ar}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.upcoming_exhibitions.map((exhibition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-primary-700 rounded-lg overflow-hidden border border-primary-600"
              >
                <div className="aspect-video">
                  <img
                    src={exhibition.image_url}
                    alt={language === 'en' ? exhibition.title_en : exhibition.title_ar}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif text-neutral-100 mb-2">
                    {language === 'en' ? exhibition.title_en : exhibition.title_ar}
                  </h3>
                  <p className="text-accent-400 mb-2">
                    {language === 'en' ? exhibition.date_en : exhibition.date_ar}
                  </p>
                  <p className="text-neutral-400 mb-4">
                    {language === 'en' ? exhibition.location_en : exhibition.location_ar}
                  </p>
                  <p className="text-neutral-300">
                    {language === 'en' ? exhibition.description_en : exhibition.description_ar}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Exhibitions */}
      <section className="py-16 bg-primary-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-serif text-center text-neutral-100 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'en' ? content.past_title_en : content.past_title_ar}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.past_exhibitions.map((exhibition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-primary-800 rounded-lg overflow-hidden border border-primary-700"
              >
                <div className="aspect-video">
                  <img
                    src={exhibition.image_url}
                    alt={language === 'en' ? exhibition.title_en : exhibition.title_ar}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-neutral-100 mb-2">
                    {language === 'en' ? exhibition.title_en : exhibition.title_ar}
                  </h3>
                  <p className="text-accent-400 mb-2">
                    {language === 'en' ? exhibition.date_en : exhibition.date_ar}
                  </p>
                  <p className="text-neutral-400 mb-4">
                    {language === 'en' ? exhibition.location_en : exhibition.location_ar}
                  </p>
                  <p className="text-neutral-300 text-sm">
                    {language === 'en' ? exhibition.description_en : exhibition.description_ar}
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

export default Exhibitions;