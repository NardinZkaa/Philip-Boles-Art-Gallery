import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

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

const ExhibitionsPageAdmin: React.FC = () => {
  const [content, setContent] = useState<ExhibitionsContent>({
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
        .eq('slug', 'exhibitions')
        .single();

      if (data?.content_en) {
        const parsedContent = JSON.parse(data.content_en);
        setContent(parsedContent);
      }
    } catch (error) {
      console.error('Error loading exhibitions content:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('pages')
        .update({ content_en: JSON.stringify(content) })
        .eq('slug', 'exhibitions');

      if (error) throw error;
      
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving exhibitions content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExhibitionChange = (type: 'upcoming' | 'past', index: number, field: keyof ExhibitionItem, value: string) => {
    const newExhibitions = [...content[`${type}_exhibitions`]];
    newExhibitions[index] = { ...newExhibitions[index], [field]: value };
    setContent({ ...content, [`${type}_exhibitions`]: newExhibitions });
  };

  const addExhibition = (type: 'upcoming' | 'past') => {
    const newExhibition: ExhibitionItem = {
      title_en: '',
      title_ar: '',
      date_en: '',
      date_ar: '',
      location_en: '',
      location_ar: '',
      description_en: '',
      description_ar: '',
      image_url: ''
    };
    
    setContent({
      ...content,
      [`${type}_exhibitions`]: [...content[`${type}_exhibitions`], newExhibition]
    });
  };

  const removeExhibition = (type: 'upcoming' | 'past', index: number) => {
    const newExhibitions = content[`${type}_exhibitions`].filter((_, i) => i !== index);
    setContent({ ...content, [`${type}_exhibitions`]: newExhibitions });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-100">Exhibitions Page Content</h2>
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
              <textarea
                value={content.hero_subtitle_en}
                onChange={(e) => setContent({ ...content, hero_subtitle_en: e.target.value })}
                rows={3}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Subtitle (Arabic)</label>
              <textarea
                value={content.hero_subtitle_ar}
                onChange={(e) => setContent({ ...content, hero_subtitle_ar: e.target.value })}
                rows={3}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
          </div>
        </motion.div>

        {/* Section Titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-primary-800 p-6 rounded-lg border border-primary-700"
        >
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">Section Titles</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Upcoming Title (English)</label>
              <input
                type="text"
                value={content.upcoming_title_en}
                onChange={(e) => setContent({ ...content, upcoming_title_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Upcoming Title (Arabic)</label>
              <input
                type="text"
                value={content.upcoming_title_ar}
                onChange={(e) => setContent({ ...content, upcoming_title_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Past Title (English)</label>
              <input
                type="text"
                value={content.past_title_en}
                onChange={(e) => setContent({ ...content, past_title_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Past Title (Arabic)</label>
              <input
                type="text"
                value={content.past_title_ar}
                onChange={(e) => setContent({ ...content, past_title_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Exhibitions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-primary-800 p-6 rounded-lg border border-primary-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-100">Upcoming Exhibitions</h3>
          <button
            onClick={() => addExhibition('upcoming')}
            className="bg-accent-600 hover:bg-accent-700 text-white px-3 py-1 rounded-lg text-sm"
          >
            Add Exhibition
          </button>
        </div>
        
        <div className="space-y-6">
          {content.upcoming_exhibitions.map((exhibition, index) => (
            <div key={index} className="bg-primary-700 p-4 rounded-lg border border-primary-600">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-neutral-300">Exhibition {index + 1}</span>
                <button
                  onClick={() => removeExhibition('upcoming', index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Title (English)</label>
                  <input
                    type="text"
                    value={exhibition.title_en}
                    onChange={(e) => handleExhibitionChange('upcoming', index, 'title_en', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Title (Arabic)</label>
                  <input
                    type="text"
                    value={exhibition.title_ar}
                    onChange={(e) => handleExhibitionChange('upcoming', index, 'title_ar', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Date (English)</label>
                  <input
                    type="text"
                    value={exhibition.date_en}
                    onChange={(e) => handleExhibitionChange('upcoming', index, 'date_en', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Date (Arabic)</label>
                  <input
                    type="text"
                    value={exhibition.date_ar}
                    onChange={(e) => handleExhibitionChange('upcoming', index, 'date_ar', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Location (English)</label>
                  <input
                    type="text"
                    value={exhibition.location_en}
                    onChange={(e) => handleExhibitionChange('upcoming', index, 'location_en', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Location (Arabic)</label>
                  <input
                    type="text"
                    value={exhibition.location_ar}
                    onChange={(e) => handleExhibitionChange('upcoming', index, 'location_ar', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Description (English)</label>
                  <textarea
                    value={exhibition.description_en}
                    onChange={(e) => handleExhibitionChange('upcoming', index, 'description_en', e.target.value)}
                    rows={3}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Description (Arabic)</label>
                  <textarea
                    value={exhibition.description_ar}
                    onChange={(e) => handleExhibitionChange('upcoming', index, 'description_ar', e.target.value)}
                    rows={3}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={exhibition.image_url}
                    onChange={(e) => handleExhibitionChange('upcoming', index, 'image_url', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Past Exhibitions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-primary-800 p-6 rounded-lg border border-primary-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-100">Past Exhibitions</h3>
          <button
            onClick={() => addExhibition('past')}
            className="bg-accent-600 hover:bg-accent-700 text-white px-3 py-1 rounded-lg text-sm"
          >
            Add Exhibition
          </button>
        </div>
        
        <div className="space-y-6">
          {content.past_exhibitions.map((exhibition, index) => (
            <div key={index} className="bg-primary-700 p-4 rounded-lg border border-primary-600">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-neutral-300">Exhibition {index + 1}</span>
                <button
                  onClick={() => removeExhibition('past', index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Title (English)</label>
                  <input
                    type="text"
                    value={exhibition.title_en}
                    onChange={(e) => handleExhibitionChange('past', index, 'title_en', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Title (Arabic)</label>
                  <input
                    type="text"
                    value={exhibition.title_ar}
                    onChange={(e) => handleExhibitionChange('past', index, 'title_ar', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Date (English)</label>
                  <input
                    type="text"
                    value={exhibition.date_en}
                    onChange={(e) => handleExhibitionChange('past', index, 'date_en', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Date (Arabic)</label>
                  <input
                    type="text"
                    value={exhibition.date_ar}
                    onChange={(e) => handleExhibitionChange('past', index, 'date_ar', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Location (English)</label>
                  <input
                    type="text"
                    value={exhibition.location_en}
                    onChange={(e) => handleExhibitionChange('past', index, 'location_en', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Location (Arabic)</label>
                  <input
                    type="text"
                    value={exhibition.location_ar}
                    onChange={(e) => handleExhibitionChange('past', index, 'location_ar', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Description (English)</label>
                  <textarea
                    value={exhibition.description_en}
                    onChange={(e) => handleExhibitionChange('past', index, 'description_en', e.target.value)}
                    rows={3}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Description (Arabic)</label>
                  <textarea
                    value={exhibition.description_ar}
                    onChange={(e) => handleExhibitionChange('past', index, 'description_ar', e.target.value)}
                    rows={3}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={exhibition.image_url}
                    onChange={(e) => handleExhibitionChange('past', index, 'image_url', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ExhibitionsPageAdmin; 