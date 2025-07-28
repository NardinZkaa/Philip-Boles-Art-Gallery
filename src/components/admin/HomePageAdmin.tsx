import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

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

const HomePageAdmin: React.FC = () => {
  const [content, setContent] = useState<HomeContent>({
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

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

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
      }
    } catch (error) {
      console.error('Error loading home content:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('pages')
        .update({ content_en: JSON.stringify(content) })
        .eq('slug', 'home');

      if (error) throw error;
      
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving home content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-100">Home Page Content</h2>
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-800 p-6 rounded-lg border border-primary-700"
        >
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">Hero Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Title (English)</label>
              <input
                type="text"
                value={content.hero_title_en}
                onChange={(e) => setContent({ ...content, hero_title_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Title (Arabic)</label>
              <input
                type="text"
                value={content.hero_title_ar}
                onChange={(e) => setContent({ ...content, hero_title_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Subtitle (English)</label>
              <input
                type="text"
                value={content.hero_subtitle_en}
                onChange={(e) => setContent({ ...content, hero_subtitle_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Subtitle (Arabic)</label>
              <input
                type="text"
                value={content.hero_subtitle_ar}
                onChange={(e) => setContent({ ...content, hero_subtitle_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Description (English)</label>
              <textarea
                value={content.hero_description_en}
                onChange={(e) => setContent({ ...content, hero_description_en: e.target.value })}
                rows={3}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Description (Arabic)</label>
              <textarea
                value={content.hero_description_ar}
                onChange={(e) => setContent({ ...content, hero_description_ar: e.target.value })}
                rows={3}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
          </div>
        </motion.div>

        {/* Featured Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-primary-800 p-6 rounded-lg border border-primary-700"
        >
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">Featured Works Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Title (English)</label>
              <input
                type="text"
                value={content.featured_works_title_en}
                onChange={(e) => setContent({ ...content, featured_works_title_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Title (Arabic)</label>
              <input
                type="text"
                value={content.featured_works_title_ar}
                onChange={(e) => setContent({ ...content, featured_works_title_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Subtitle (English)</label>
              <input
                type="text"
                value={content.featured_works_subtitle_en}
                onChange={(e) => setContent({ ...content, featured_works_subtitle_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Subtitle (Arabic)</label>
              <input
                type="text"
                value={content.featured_works_subtitle_ar}
                onChange={(e) => setContent({ ...content, featured_works_subtitle_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-primary-800 p-6 rounded-lg border border-primary-700"
        >
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">About Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Title (English)</label>
              <input
                type="text"
                value={content.about_section_title_en}
                onChange={(e) => setContent({ ...content, about_section_title_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Title (Arabic)</label>
              <input
                type="text"
                value={content.about_section_title_ar}
                onChange={(e) => setContent({ ...content, about_section_title_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Content (English)</label>
              <textarea
                value={content.about_section_content_en}
                onChange={(e) => setContent({ ...content, about_section_content_en: e.target.value })}
                rows={4}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Content (Arabic)</label>
              <textarea
                value={content.about_section_content_ar}
                onChange={(e) => setContent({ ...content, about_section_content_ar: e.target.value })}
                rows={4}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Button Text (English)</label>
              <input
                type="text"
                value={content.about_section_button_en}
                onChange={(e) => setContent({ ...content, about_section_button_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Button Text (Arabic)</label>
              <input
                type="text"
                value={content.about_section_button_ar}
                onChange={(e) => setContent({ ...content, about_section_button_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-primary-800 p-6 rounded-lg border border-primary-700"
        >
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">Contact Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Title (English)</label>
              <input
                type="text"
                value={content.contact_section_title_en}
                onChange={(e) => setContent({ ...content, contact_section_title_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Title (Arabic)</label>
              <input
                type="text"
                value={content.contact_section_title_ar}
                onChange={(e) => setContent({ ...content, contact_section_title_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Content (English)</label>
              <textarea
                value={content.contact_section_content_en}
                onChange={(e) => setContent({ ...content, contact_section_content_en: e.target.value })}
                rows={4}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Content (Arabic)</label>
              <textarea
                value={content.contact_section_content_ar}
                onChange={(e) => setContent({ ...content, contact_section_content_ar: e.target.value })}
                rows={4}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Button Text (English)</label>
              <input
                type="text"
                value={content.contact_section_button_en}
                onChange={(e) => setContent({ ...content, contact_section_button_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Button Text (Arabic)</label>
              <input
                type="text"
                value={content.contact_section_button_ar}
                onChange={(e) => setContent({ ...content, contact_section_button_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePageAdmin; 