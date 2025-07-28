import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw } from 'lucide-react';
import { supabase } from '../../lib/supabase';

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

const AboutPageAdmin: React.FC = () => {
  const [content, setContent] = useState<AboutContent>({
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
        .eq('slug', 'about')
        .single();

      if (data?.content_en) {
        const parsedContent = JSON.parse(data.content_en);
        setContent(parsedContent);
      }
    } catch (error) {
      console.error('Error loading about content:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('pages')
        .update({ content_en: JSON.stringify(content) })
        .eq('slug', 'about');

      if (error) throw error;
      
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving about content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimelineItemChange = (index: number, field: 'year' | 'event_en' | 'event_ar', value: string) => {
    const newTimelineItems = [...content.timeline_items];
    newTimelineItems[index] = { ...newTimelineItems[index], [field]: value };
    setContent({ ...content, timeline_items: newTimelineItems });
  };

  const addTimelineItem = () => {
    setContent({
      ...content,
      timeline_items: [...content.timeline_items, { year: '', event_en: '', event_ar: '' }]
    });
  };

  const removeTimelineItem = (index: number) => {
    const newTimelineItems = content.timeline_items.filter((_, i) => i !== index);
    setContent({ ...content, timeline_items: newTimelineItems });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-100">About Page Content</h2>
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
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Info (English)</label>
              <input
                type="text"
                value={content.hero_info_en}
                onChange={(e) => setContent({ ...content, hero_info_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Info (Arabic)</label>
              <input
                type="text"
                value={content.hero_info_ar}
                onChange={(e) => setContent({ ...content, hero_info_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
          </div>
        </motion.div>

        {/* Artist Statement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-primary-800 p-6 rounded-lg border border-primary-700"
        >
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">Artist Statement</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Section Title (English)</label>
              <input
                type="text"
                value={content.artist_statement_title_en}
                onChange={(e) => setContent({ ...content, artist_statement_title_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Section Title (Arabic)</label>
              <input
                type="text"
                value={content.artist_statement_title_ar}
                onChange={(e) => setContent({ ...content, artist_statement_title_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Paragraph 1 (English)</label>
              <textarea
                value={content.artist_statement_1_en}
                onChange={(e) => setContent({ ...content, artist_statement_1_en: e.target.value })}
                rows={4}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Paragraph 1 (Arabic)</label>
              <textarea
                value={content.artist_statement_1_ar}
                onChange={(e) => setContent({ ...content, artist_statement_1_ar: e.target.value })}
                rows={4}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Paragraph 2 (English)</label>
              <textarea
                value={content.artist_statement_2_en}
                onChange={(e) => setContent({ ...content, artist_statement_2_en: e.target.value })}
                rows={4}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Paragraph 2 (Arabic)</label>
              <textarea
                value={content.artist_statement_2_ar}
                onChange={(e) => setContent({ ...content, artist_statement_2_ar: e.target.value })}
                rows={4}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Paragraph 3 (English)</label>
              <textarea
                value={content.artist_statement_3_en}
                onChange={(e) => setContent({ ...content, artist_statement_3_en: e.target.value })}
                rows={4}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Paragraph 3 (Arabic)</label>
              <textarea
                value={content.artist_statement_3_ar}
                onChange={(e) => setContent({ ...content, artist_statement_3_ar: e.target.value })}
                rows={4}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Paragraph 4 (English)</label>
              <textarea
                value={content.artist_statement_4_en}
                onChange={(e) => setContent({ ...content, artist_statement_4_en: e.target.value })}
                rows={4}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Paragraph 4 (Arabic)</label>
              <textarea
                value={content.artist_statement_4_ar}
                onChange={(e) => setContent({ ...content, artist_statement_4_ar: e.target.value })}
                rows={4}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-primary-800 p-6 rounded-lg border border-primary-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-100">Timeline Section</h3>
          <button
            onClick={addTimelineItem}
            className="bg-accent-600 hover:bg-accent-700 text-white px-3 py-1 rounded-lg text-sm"
          >
            Add Item
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Section Title (English)</label>
            <input
              type="text"
              value={content.timeline_title_en}
              onChange={(e) => setContent({ ...content, timeline_title_en: e.target.value })}
              className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Section Title (Arabic)</label>
            <input
              type="text"
              value={content.timeline_title_ar}
              onChange={(e) => setContent({ ...content, timeline_title_ar: e.target.value })}
              className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
            />
          </div>
          
          <div className="space-y-4">
            <h4 className="text-md font-medium text-neutral-200">Timeline Items</h4>
            {content.timeline_items.map((item, index) => (
              <div key={index} className="bg-primary-700 p-4 rounded-lg border border-primary-600">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-neutral-300">Item {index + 1}</span>
                  <button
                    onClick={() => removeTimelineItem(index)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">Year</label>
                    <input
                      type="text"
                      value={item.year}
                      onChange={(e) => handleTimelineItemChange(index, 'year', e.target.value)}
                      className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">Event (English)</label>
                    <input
                      type="text"
                      value={item.event_en}
                      onChange={(e) => handleTimelineItemChange(index, 'event_en', e.target.value)}
                      className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">Event (Arabic)</label>
                    <input
                      type="text"
                      value={item.event_ar}
                      onChange={(e) => handleTimelineItemChange(index, 'event_ar', e.target.value)}
                      className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPageAdmin; 