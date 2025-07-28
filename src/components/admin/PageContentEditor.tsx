import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import { Save, FileText, Globe, Edit, Eye } from 'lucide-react';

interface PageContent {
  id?: string;
  slug: string;
  title_en: string;
  title_ar: string;
  content_en: string;
  content_ar: string;
  meta_description_en: string;
  meta_description_ar: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

interface PageSection {
  key: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
}

const PageContentEditor: React.FC = () => {
  const { language } = useLanguage();
  const [pages, setPages] = useState<PageContent[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Define all the sections that can be edited for each page
  const pageSections: Record<string, PageSection[]> = {
    home: [
      {
        key: 'hero_title',
        title_en: 'Hero Title',
        title_ar: 'العنوان الرئيسي',
        description_en: 'Main heading on the homepage',
        description_ar: 'العنوان الرئيسي في الصفحة الرئيسية'
      },
      {
        key: 'hero_subtitle',
        title_en: 'Hero Subtitle',
        title_ar: 'العنوان الفرعي',
        description_en: 'Subtitle under the main heading',
        description_ar: 'العنوان الفرعي تحت العنوان الرئيسي'
      },
      {
        key: 'hero_cta_primary',
        title_en: 'Primary CTA Button',
        title_ar: 'زر الدعوة للعمل الرئيسي',
        description_en: 'Text for the main call-to-action button',
        description_ar: 'نص زر الدعوة للعمل الرئيسي'
      },
      {
        key: 'hero_cta_secondary',
        title_en: 'Secondary CTA Button',
        title_ar: 'زر الدعوة للعمل الثانوي',
        description_en: 'Text for the secondary call-to-action button',
        description_ar: 'نص زر الدعوة للعمل الثانوي'
      },
      {
        key: 'timeline_title',
        title_en: 'Timeline Title',
        title_ar: 'عنوان الجدول الزمني',
        description_en: 'Title for the artistic journey timeline',
        description_ar: 'عنوان الجدول الزمني للرحلة الفنية'
      },
      {
        key: 'featured_title',
        title_en: 'Featured Works Title',
        title_ar: 'عنوان الأعمال المميزة',
        description_en: 'Title for the featured works section',
        description_ar: 'عنوان قسم الأعمال المميزة'
      },
      {
        key: 'review_link_text',
        title_en: 'Review Link Text',
        title_ar: 'نص رابط المراجعة',
        description_en: 'Text for the critical review link',
        description_ar: 'نص رابط المراجعة النقدية'
      }
    ],
    about: [
      {
        key: 'page_title',
        title_en: 'Page Title',
        title_ar: 'عنوان الصفحة',
        description_en: 'Main page title',
        description_ar: 'العنوان الرئيسي للصفحة'
      },
      {
        key: 'page_subtitle',
        title_en: 'Page Subtitle',
        title_ar: 'العنوان الفرعي للصفحة',
        description_en: 'Subtitle or introduction text',
        description_ar: 'العنوان الفرعي أو نص المقدمة'
      },
      {
        key: 'age_info',
        title_en: 'Age Information',
        title_ar: 'معلومات العمر',
        description_en: 'Artist age and background info',
        description_ar: 'عمر الفنان ومعلومات الخلفية'
      },
      {
        key: 'statement_title',
        title_en: 'Artist Statement Title',
        title_ar: 'عنوان بيان الفنان',
        description_en: 'Title for the artist statement section',
        description_ar: 'عنوان قسم بيان الفنان'
      },
      {
        key: 'timeline_title',
        title_en: 'Career Milestones Title',
        title_ar: 'عنوان المحطات المهنية',
        description_en: 'Title for career milestones section',
        description_ar: 'عنوان قسم المحطات المهنية'
      }
    ],
    gallery: [
      {
        key: 'page_title',
        title_en: 'Page Title',
        title_ar: 'عنوان الصفحة',
        description_en: 'Main page title',
        description_ar: 'العنوان الرئيسي للصفحة'
      },
      {
        key: 'filter_all',
        title_en: 'Filter All Text',
        title_ar: 'نص فلتر الكل',
        description_en: 'Text for "All Works" filter',
        description_ar: 'نص فلتر "جميع الأعمال"'
      },
      {
        key: 'discover_text',
        title_en: 'Discover Text',
        title_ar: 'نص الاستكشاف',
        description_en: 'Text for the discover section',
        description_ar: 'نص قسم الاستكشاف'
      },
      {
        key: 'inquiry_button',
        title_en: 'Inquiry Button',
        title_ar: 'زر الاستفسار',
        description_en: 'Text for the inquiry button',
        description_ar: 'نص زر الاستفسار'
      }
    ],
    review: [
      {
        key: 'page_title',
        title_en: 'Page Title',
        title_ar: 'عنوان الصفحة',
        description_en: 'Main page title',
        description_ar: 'العنوان الرئيسي للصفحة'
      },
      {
        key: 'page_subtitle',
        title_en: 'Page Subtitle',
        title_ar: 'العنوان الفرعي للصفحة',
        description_en: 'Subtitle or introduction text',
        description_ar: 'العنوان الفرعي أو نص المقدمة'
      },
      {
        key: 'interview_title',
        title_en: 'Interview Title',
        title_ar: 'عنوان المقابلة',
        description_en: 'Title for the artist interview section',
        description_ar: 'عنوان قسم مقابلة الفنان'
      },
      {
        key: 'interview_subtitle',
        title_en: 'Interview Subtitle',
        title_ar: 'العنوان الفرعي للمقابلة',
        description_en: 'Subtitle for the interview section',
        description_ar: 'العنوان الفرعي لقسم المقابلة'
      }
    ],
    exhibitions: [
      {
        key: 'page_title',
        title_en: 'Page Title',
        title_ar: 'عنوان الصفحة',
        description_en: 'Main page title',
        description_ar: 'العنوان الرئيسي للصفحة'
      },
      {
        key: 'page_subtitle',
        title_en: 'Page Subtitle',
        title_ar: 'العنوان الفرعي للصفحة',
        description_en: 'Subtitle or introduction text',
        description_ar: 'العنوان الفرعي أو نص المقدمة'
      },
      {
        key: 'next_exhibition',
        title_en: 'Next Exhibition',
        title_ar: 'المعرض القادم',
        description_en: 'Title for next exhibition section',
        description_ar: 'عنوان قسم المعرض القادم'
      },
      {
        key: 'archive_title',
        title_en: 'Exhibition Archive',
        title_ar: 'أرشيف المعارض',
        description_en: 'Title for exhibition archive section',
        description_ar: 'عنوان قسم أرشيف المعارض'
      },
      {
        key: 'partners_title',
        title_en: 'Partner Galleries',
        title_ar: 'المعارض الشريكة',
        description_en: 'Title for partner galleries section',
        description_ar: 'عنوان قسم المعارض الشريكة'
      }
    ],
    contact: [
      {
        key: 'page_title',
        title_en: 'Page Title',
        title_ar: 'عنوان الصفحة',
        description_en: 'Main page title',
        description_ar: 'العنوان الرئيسي للصفحة'
      },
      {
        key: 'page_subtitle',
        title_en: 'Page Subtitle',
        title_ar: 'العنوان الفرعي للصفحة',
        description_en: 'Subtitle or introduction text',
        description_ar: 'العنوان الفرعي أو نص المقدمة'
      },
      {
        key: 'contact_info_title',
        title_en: 'Contact Information',
        title_ar: 'معلومات الاتصال',
        description_en: 'Title for contact information section',
        description_ar: 'عنوان قسم معلومات الاتصال'
      },
      {
        key: 'send_message_title',
        title_en: 'Send a Message',
        title_ar: 'إرسال رسالة',
        description_en: 'Title for message form section',
        description_ar: 'عنوان قسم نموذج الرسالة'
      },
      {
        key: 'studio_location_title',
        title_en: 'Studio Location',
        title_ar: 'موقع الاستوديو',
        description_en: 'Title for studio location section',
        description_ar: 'عنوان قسم موقع الاستوديو'
      },
      {
        key: 'newsletter_title',
        title_en: 'Newsletter Signup',
        title_ar: 'الاشتراك في النشرة الإخبارية',
        description_en: 'Title for newsletter signup section',
        description_ar: 'عنوان قسم الاشتراك في النشرة الإخبارية'
      }
    ]
  };

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('slug', { ascending: true });
      
      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error loading pages:', error);
    }
  };

  const handlePageSelect = (page: PageContent) => {
    setSelectedPage(page);
    setPreviewMode(false);
  };

  const handleSectionChange = (sectionKey: string, field: 'en' | 'ar', value: string) => {
    if (!selectedPage) return;

    let content;
    try {
      content = JSON.parse(selectedPage.content_en || '{}');
    } catch {
      content = {};
    }
    
    content[sectionKey] = content[sectionKey] || {};
    content[sectionKey][field] = value;

    setSelectedPage({
      ...selectedPage,
      content_en: JSON.stringify(content, null, 2)
    });
  };

  const handleSave = async () => {
    if (!selectedPage) return;
    setSaving(true);

    try {
      await supabase
        .from('pages')
        .update({ 
          ...selectedPage, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', selectedPage.id);
      
      alert(language === 'ar' ? 'تم حفظ المحتوى بنجاح' : 'Content saved successfully');
      loadPages();
    } catch (error) {
      console.error('Error saving content:', error);
      alert(language === 'ar' ? 'حدث خطأ في الحفظ' : 'Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const getSectionValue = (sectionKey: string, field: 'en' | 'ar'): string => {
    if (!selectedPage) return '';
    
    try {
      const content = JSON.parse(selectedPage.content_en || '{}');
      return content[sectionKey]?.[field] || '';
    } catch {
      return '';
    }
  };

  // Initialize content when page is selected
  useEffect(() => {
    if (selectedPage && !selectedPage.content_en) {
      // Initialize with empty content structure
      const initialContent: Record<string, { en: string; ar: string }> = {};
      getSectionsForPage(selectedPage.slug).forEach(section => {
        initialContent[section.key] = { en: '', ar: '' };
      });
      
      setSelectedPage({
        ...selectedPage,
        content_en: JSON.stringify(initialContent, null, 2)
      });
    }
  }, [selectedPage]);

  const getSectionsForPage = (slug: string): PageSection[] => {
    return pageSections[slug] || [];
  };

  return (
    <div className="space-y-6">
      {/* Page Selection */}
      <motion.div 
        className="bg-primary-900 rounded-lg shadow-lg p-6 border border-primary-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-serif text-neutral-100 mb-6 flex items-center">
          <FileText className="w-6 h-6 mr-3 text-accent-400" />
          {language === 'ar' ? 'محرر محتوى الصفحات' : 'Page Content Editor'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => handlePageSelect(page)}
              className={`p-4 rounded-lg border transition-colors ${
                selectedPage?.id === page.id
                  ? 'border-accent-500 bg-accent-600 text-white'
                  : 'border-primary-600 bg-primary-800 text-neutral-300 hover:border-accent-500 hover:bg-primary-700'
              }`}
            >
              <div className="font-medium">{page.title_en}</div>
              <div className="text-sm opacity-75">{page.title_ar}</div>
              <div className="text-xs opacity-50">/{page.slug}</div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content Editor */}
      {selectedPage && (
        <motion.div 
          className="bg-primary-900 rounded-lg shadow-lg p-6 border border-primary-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif text-neutral-100">
              {language === 'ar' ? 'تحرير محتوى' : 'Edit Content'}: {selectedPage.title_en}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center px-4 py-2 bg-primary-700 text-neutral-300 rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'معاينة' : 'Preview'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 disabled:opacity-50 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 
                  (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') : 
                  (language === 'ar' ? 'حفظ' : 'Save')
                }
              </button>
            </div>
          </div>

          {previewMode ? (
            <div className="bg-primary-800 rounded-lg p-6">
              <h4 className="text-lg font-medium text-neutral-100 mb-4">
                {language === 'ar' ? 'معاينة المحتوى' : 'Content Preview'}
              </h4>
              <pre className="text-sm text-neutral-300 whitespace-pre-wrap">
                {selectedPage.content_en}
              </pre>
            </div>
          ) : (
            <div className="space-y-6">
              {getSectionsForPage(selectedPage.slug).map((section) => (
                <div key={section.key} className="border border-primary-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-neutral-100 mb-4">
                    {section.title_en} / {section.title_ar}
                  </h4>
                  <p className="text-sm text-neutral-400 mb-4">
                    {section.description_en} / {section.description_ar}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        {language === 'ar' ? 'النص (إنجليزي)' : 'Text (English)'}
                      </label>
                      <input
                        type="text"
                        value={getSectionValue(section.key, 'en')}
                        onChange={(e) => handleSectionChange(section.key, 'en', e.target.value)}
                        className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        {language === 'ar' ? 'النص (عربي)' : 'Text (Arabic)'}
                      </label>
                      <input
                        type="text"
                        value={getSectionValue(section.key, 'ar')}
                        onChange={(e) => handleSectionChange(section.key, 'ar', e.target.value)}
                        className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default PageContentEditor; 