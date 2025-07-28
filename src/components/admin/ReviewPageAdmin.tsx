import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ReviewContent {
  hero_title_en: string;
  hero_title_ar: string;
  hero_subtitle_en: string;
  hero_subtitle_ar: string;
  audio_title_en: string;
  audio_title_ar: string;
  audio_description_en: string;
  audio_description_ar: string;
  sections: Array<{
    title_en: string;
    title_ar: string;
    content_en: string;
    content_ar: string;
  }>;
}

const ReviewPageAdmin: React.FC = () => {
  const [content, setContent] = useState<ReviewContent>({
    hero_title_en: 'Critical Review',
    hero_title_ar: 'المراجعة النقدية',
    hero_subtitle_en: 'An in-depth analysis of Philip Boles\' artistic practice and conceptual framework',
    hero_subtitle_ar: 'تحليل متعمق للممارسة الفنية والإطار المفاهيمي لفيليب بولز',
    audio_title_en: 'Artist Interview',
    audio_title_ar: 'مقابلة مع الفنان',
    audio_description_en: 'Philip Boles discusses his Al-Faw\'aliya concept (1:23)',
    audio_description_ar: 'فيليب بولز يناقش مفهومه للفواليا (1:23)',
    sections: [
      {
        title_en: 'Stylistic Blend',
        title_ar: 'الخليط الأسلوبي',
        content_en: 'Philip Boles occupies a unique position in contemporary Egyptian art, masterfully synthesizing traditional realist techniques with conceptually rigorous contemporary frameworks. His painterly approach demonstrates technical virtuosity while maintaining intellectual depth—a combination that has become increasingly rare in today\'s art world. The surface beauty of his work never overshadows its conceptual sophistication, creating a dialogue between immediate visual pleasure and sustained intellectual engagement.',
        content_ar: 'يحتل فيليب بولز موقعاً فريداً في الفن المصري المعاصر، حيث يمزج بمهارة التقنيات الواقعية التقليدية مع الأطر المعاصرة المفاهيمية الصارمة. يُظهر نهجه الرسامي براعة تقنية مع الحفاظ على العمق الفكري - مزيج أصبح نادراً بشكل متزايد في عالم الفن اليوم.'
      },
      {
        title_en: 'Conceptual Unity: Al-Faw\'aliya',
        title_ar: 'الوحدة المفاهيمية: الفواليا',
        content_en: 'The concept of Al-Faw\'aliya—roughly translated as "the active principle"—serves as the theoretical backbone of Boles\' mature work. This Arabic phenomenological framework allows him to explore consciousness not as a passive receptor of experience, but as an active force that shapes reality through perception. Each painting becomes a meditation on how consciousness constructs meaning from the raw material of sensory experience.',
        content_ar: 'مفهوم الفواليا - المترجم تقريباً كـ "المبدأ الفعال" - يخدم كالعمود الفقري النظري لأعمال بولز الناضجة. يسمح له هذا الإطار الظاهري العربي باستكشاف الوعي ليس كمستقبل سلبي للتجربة، بل كقوة فعالة تشكل الواقع من خلال الإدراك.'
      },
      {
        title_en: 'Emotional Depth vs. Drama',
        title_ar: 'العمق العاطفي مقابل الدراما',
        content_en: 'What distinguishes Boles from his contemporaries is his ability to achieve profound emotional resonance without resorting to melodrama. His restraint is masterful—each work pulses with contained intensity, like a held breath or a suppressed scream. This emotional sophistication reflects his understanding that true psychological depth emerges not from expressive excess, but from the tension between revelation and concealment.',
        content_ar: 'ما يميز بولز عن معاصريه هو قدرته على تحقيق رنين عاطفي عميق دون اللجوء إلى الميلودراما. ضبط النفس لديه بارع - كل عمل ينبض بكثافة محتواة، مثل نفس محبوس أو صرخة مكبوتة. هذا التطور العاطفي يعكس فهمه أن العمق النفسي الحقيقي لا ينبع من الإفراط التعبيري، بل من التوتر بين الكشف والإخفاء.'
      },
      {
        title_en: 'Void & Time',
        title_ar: 'الفراغ والزمن',
        content_en: 'Boles demonstrates an exceptional understanding of negative space and temporal rhythm. His compositions breathe with carefully calibrated intervals of emptiness that serve not as absence, but as pregnant pause—moments where meaning accumulates and consciousness has space to unfold. Time in his paintings moves not chronologically, but psychologically, following the internal logic of memory and association rather than external narrative sequence.',
        content_ar: 'يُظهر بولز فهماً استثنائياً للفراغ السلبي والإيقاع الزمني. تتنفس تكويناته بفترات مُعايرة بعناية من الفراغ التي لا تخدم كغياب، بل كوقفة حامل - لحظات حيث يتراكم المعنى ويحصل الوعي على مساحة للانكشاف.'
      },
      {
        title_en: 'Universality vs. Local Symbols',
        title_ar: 'العالمية مقابل الرموز المحلية',
        content_en: 'Perhaps most remarkably, Boles achieves genuine universality while remaining deeply rooted in Egyptian cultural specificity. His work speaks a global visual language while maintaining its distinctive Arabic accent. This balance—between the particular and the universal—positions him as a significant voice in contemporary art\'s ongoing dialogue about cultural identity in an increasingly connected world.',
        content_ar: 'والأمر الأكثر إثارة للإعجاب، يحقق بولز عالمية حقيقية مع بقائه متجذراً بعمق في الخصوصية الثقافية المصرية. يتحدث عمله لغة بصرية عالمية مع الحفاظ على لهجته العربية المميزة. هذا التوازن - بين الخاص والعام - يضعه كصوت مهم في الحوار المستمر للفن المعاصر حول الهوية الثقافية في عالم متصل بشكل متزايد.'
      },
      {
        title_en: 'Biennale Suitability',
        title_ar: 'مناسبة البينالي',
        content_en: 'Boles\' work possesses the rare quality of being simultaneously accessible to diverse audiences and intellectually rigorous enough to sustain scholarly attention. His paintings function effectively in the compressed viewing conditions of major international exhibitions while rewarding extended contemplation. This dual capacity—for immediate impact and sustained engagement—makes him an ideal candidate for prestigious biennales and major museum presentations.',
        content_ar: 'يمتلك عمل بولز الصفة النادرة للكونه مفهوماً في الوقت نفسه لجماهير متنوعة وصارماً فكرياً بما يكفي لاستمرار الاهتمام الأكاديمي. تعمل لوحاته بفعالية في ظروف المشاهدة المضغوطة للمعارض الدولية الكبرى مع مكافأة التأمل المطول.'
      },
      {
        title_en: 'Future Directions',
        title_ar: 'الاتجاهات المستقبلية',
        content_en: 'As Boles continues to develop his Al-Faw\'aliya framework, we can anticipate even more sophisticated explorations of consciousness and cultural identity. His trajectory suggests an artist still in the process of discovering his full potential—a thrilling prospect for both the artist and the art world. The depth of his theoretical foundation combined with his technical mastery positions him to make increasingly significant contributions to contemporary art discourse.',
        content_ar: 'بينما يواصل بولز تطوير إطار الفواليا الخاص به، يمكننا توقع استكشافات أكثر تطوراً للوعي والهوية الثقافية. مسيرته تشير إلى فنان ما زال في عملية اكتشاف إمكاناته الكاملة - احتمال مثير للفنان وعالم الفن على حد سواء.'
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
        .eq('slug', 'review')
        .single();

      if (data?.content_en) {
        const parsedContent = JSON.parse(data.content_en);
        setContent(parsedContent);
      }
    } catch (error) {
      console.error('Error loading review content:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('pages')
        .update({ content_en: JSON.stringify(content) })
        .eq('slug', 'review');

      if (error) throw error;
      
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving review content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (index: number, field: 'title_en' | 'title_ar' | 'content_en' | 'content_ar', value: string) => {
    const newSections = [...content.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setContent({ ...content, sections: newSections });
  };

  const addSection = () => {
    setContent({
      ...content,
      sections: [...content.sections, { title_en: '', title_ar: '', content_en: '', content_ar: '' }]
    });
  };

  const removeSection = (index: number) => {
    const newSections = content.sections.filter((_, i) => i !== index);
    setContent({ ...content, sections: newSections });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-100">Review Page Content</h2>
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

        {/* Audio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-primary-800 p-6 rounded-lg border border-primary-700"
        >
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">Audio Player Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Title (English)</label>
              <input
                type="text"
                value={content.audio_title_en}
                onChange={(e) => setContent({ ...content, audio_title_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Title (Arabic)</label>
              <input
                type="text"
                value={content.audio_title_ar}
                onChange={(e) => setContent({ ...content, audio_title_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Description (English)</label>
              <input
                type="text"
                value={content.audio_description_en}
                onChange={(e) => setContent({ ...content, audio_description_en: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Description (Arabic)</label>
              <input
                type="text"
                value={content.audio_description_ar}
                onChange={(e) => setContent({ ...content, audio_description_ar: e.target.value })}
                className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-neutral-100"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-primary-800 p-6 rounded-lg border border-primary-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-100">Content Sections</h3>
          <button
            onClick={addSection}
            className="bg-accent-600 hover:bg-accent-700 text-white px-3 py-1 rounded-lg text-sm"
          >
            Add Section
          </button>
        </div>
        
        <div className="space-y-6">
          {content.sections.map((section, index) => (
            <div key={index} className="bg-primary-700 p-4 rounded-lg border border-primary-600">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-neutral-300">Section {index + 1}</span>
                <button
                  onClick={() => removeSection(index)}
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
                    value={section.title_en}
                    onChange={(e) => handleSectionChange(index, 'title_en', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Title (Arabic)</label>
                  <input
                    type="text"
                    value={section.title_ar}
                    onChange={(e) => handleSectionChange(index, 'title_ar', e.target.value)}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Content (English)</label>
                  <textarea
                    value={section.content_en}
                    onChange={(e) => handleSectionChange(index, 'content_en', e.target.value)}
                    rows={4}
                    className="w-full bg-primary-600 border border-primary-500 rounded px-2 py-1 text-neutral-100 text-sm"
                  />
                </div>
                
                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Content (Arabic)</label>
                  <textarea
                    value={section.content_ar}
                    onChange={(e) => handleSectionChange(index, 'content_ar', e.target.value)}
                    rows={4}
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

export default ReviewPageAdmin; 