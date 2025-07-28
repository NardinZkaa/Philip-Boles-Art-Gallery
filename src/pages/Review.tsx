import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';

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

const Review: React.FC = () => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [content, setContent] = useState<ReviewContent | null>(null);
  const [loading, setLoading] = useState(true);

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
      } else {
        // Fallback to default content
        setContent({
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
      }
    } catch (error) {
      console.error('Error loading review content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAudioToggle = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control audio playback
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
      {/* Header */}
      <section className="py-16 bg-primary-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-serif text-neutral-100 mb-4">
              {language === 'en' ? content.hero_title_en : content.hero_title_ar}
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              {language === 'en' ? content.hero_subtitle_en : content.hero_subtitle_ar}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Article */}
      <section className="py-16 bg-primary-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {/* Audio Player */}
            <div className="bg-primary-700 rounded-lg p-6 mb-12 border border-primary-600">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-neutral-100 mb-2">
                    {language === 'en' ? content.audio_title_en : content.audio_title_ar}
                  </h3>
                  <p className="text-sm text-neutral-400">
                    {language === 'en' ? content.audio_description_en : content.audio_description_ar}
                  </p>
                </div>
                <button
                  onClick={handleAudioToggle}
                  className="bg-accent-600 hover:bg-accent-700 text-white p-3 rounded-full transition-colors"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-6 h-6" />
                  ) : (
                    <PlayIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="space-y-8">
              {content.sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-3xl font-serif text-accent-400 mb-4">
                    {language === 'en' ? section.title_en : section.title_ar}
                  </h2>
                  <p className="text-neutral-300 leading-relaxed">
                    {language === 'en' ? section.content_en : section.content_ar}
                  </p>
                </section>
              ))}
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
};

export default Review;