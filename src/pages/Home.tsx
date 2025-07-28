import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface HomeContent {
  hero_title_en: string;
  hero_title_ar: string;
  hero_subtitle_en: string;
  hero_subtitle_ar: string;
  hero_description_en: string;
  hero_description_ar: string;
  featured_works_title_en: string;
  featured_works_title_ar: string;
  featured_works_subtitle_en: string;
  featured_works_subtitle_ar: string;
  about_section_title_en: string;
  about_section_title_ar: string;
  about_section_content_en: string;
  about_section_content_ar: string;
  about_section_button_en: string;
  about_section_button_ar: string;
  contact_section_title_en: string;
  contact_section_title_ar: string;
  contact_section_content_en: string;
  contact_section_content_ar: string;
  contact_section_button_en: string;
  contact_section_button_ar: string;
}

const Home: React.FC = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('content_en')
        .eq('slug', 'home')
        .single();

      if (data?.content_en) {
        const parsedContent = JSON.parse(data.content_en);
        setContent(parsedContent);
      } else {
        // Fallback to default content
        setContent({
          hero_title_en: 'Philip Boles',
          hero_title_ar: 'فيليب بولز',
          hero_subtitle_en: 'Contemporary Egyptian Artist',
          hero_subtitle_ar: 'فنان مصري معاصر',
          hero_description_en: 'Exploring the intersection of traditional realism with contemporary conceptual frameworks through the lens of Al-Faw\'aliya.',
          hero_description_ar: 'استكشاف تقاطع الواقعية التقليدية مع الأطر المفاهيمية المعاصرة من خلال عدسة الفواليا.',
          featured_works_title_en: 'Featured Works',
          featured_works_title_ar: 'أعمال مميزة',
          featured_works_subtitle_en: 'A selection of recent paintings and installations',
          featured_works_subtitle_ar: 'مجموعة من اللوحات والتركيبات الحديثة',
          about_section_title_en: 'About the Artist',
          about_section_title_ar: 'عن الفنان',
          about_section_content_en: 'Philip Boles is an established Egyptian painter whose work explores the intersection of traditional realism with contemporary conceptual frameworks. His artistic journey spans across painting, sculpture, installation, and stage design.',
          about_section_content_ar: 'فيليب بولز رسام مصري راسخ يستكشف عمله تقاطع الواقعية التقليدية مع الأطر المفاهيمية المعاصرة. تمتد رحلته الفنية عبر الرسم والنحت والتركيب وتصميم المسرح.',
          about_section_button_en: 'Learn More',
          about_section_button_ar: 'اعرف المزيد',
          contact_section_title_en: 'Get in Touch',
          contact_section_title_ar: 'تواصل معنا',
          contact_section_content_en: 'Interested in Philip\'s work? Contact us for inquiries about exhibitions, commissions, or collaborations.',
          contact_section_content_ar: 'مهتم بعمل فيليب؟ تواصل معنا للاستفسار عن المعارض أو الطلبات أو التعاون.',
          contact_section_button_en: 'Contact Us',
          contact_section_button_ar: 'تواصل معنا'
        });
      }
    } catch (error) {
      console.error('Error loading home content:', error);
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
      <section className="relative h-screen flex items-center justify-center bg-primary-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Philip Boles Studio"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif text-neutral-100 mb-6">
              {language === 'en' ? content.hero_title_en : content.hero_title_ar}
            </h1>
            <p className="text-2xl md:text-3xl text-accent-400 mb-8">
              {language === 'en' ? content.hero_subtitle_en : content.hero_subtitle_ar}
            </p>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-12">
              {language === 'en' ? content.hero_description_en : content.hero_description_ar}
            </p>
            <Link
              to="/gallery"
              className="inline-block bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              {language === 'en' ? 'View Gallery' : 'عرض المعرض'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-24 bg-primary-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-neutral-100 mb-4">
              {language === 'en' ? content.featured_works_title_en : content.featured_works_title_ar}
            </h2>
            <p className="text-xl text-neutral-400">
              {language === 'en' ? content.featured_works_subtitle_en : content.featured_works_subtitle_ar}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-primary-700 rounded-lg overflow-hidden border border-primary-600 hover:border-accent-600 transition-colors"
              >
                <div className="aspect-square">
                  <img
                    src={`https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=600&v=${index}`}
                    alt={`Featured Work ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-neutral-100 mb-2">
                    {language === 'en' ? `Work ${index}` : `العمل ${index}`}
                  </h3>
                  <p className="text-neutral-400">
                    {language === 'en' ? 'Oil on canvas' : 'زيت على قماش'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/gallery"
              className="inline-block bg-accent-600 hover:bg-accent-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              {language === 'en' ? 'View All Works' : 'عرض جميع الأعمال'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-serif text-neutral-100 mb-6">
                {language === 'en' ? content.about_section_title_en : content.about_section_title_ar}
              </h2>
              <p className="text-lg text-neutral-300 leading-relaxed mb-8">
                {language === 'en' ? content.about_section_content_en : content.about_section_content_ar}
              </p>
              <Link
                to="/about"
                className="inline-block bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                {language === 'en' ? content.about_section_button_en : content.about_section_button_ar}
              </Link>
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
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-primary-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif text-neutral-100 mb-6">
              {language === 'en' ? content.contact_section_title_en : content.contact_section_title_ar}
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              {language === 'en' ? content.contact_section_content_en : content.contact_section_content_ar}
            </p>
            <Link
              to="/contact"
              className="inline-block bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              {language === 'en' ? content.contact_section_button_en : content.contact_section_button_ar}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;