import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import { Plus, Edit, Trash2, Save, X, FileText, Globe, Type } from 'lucide-react';
import PageContentEditor from './PageContentEditor';

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

const ContentAdmin: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'pages' | 'content'>('pages');
  const [pages, setPages] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<PageContent, 'id' | 'created_at' | 'updated_at'>>({
    slug: '',
    title_en: '',
    title_ar: '',
    content_en: '',
    content_ar: '',
    meta_description_en: '',
    meta_description_ar: '',
    is_published: true
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await supabase
          .from('pages')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingId);
        alert(language === 'ar' ? 'تم تحديث الصفحة بنجاح' : 'Page updated successfully');
      } else {
        await supabase
          .from('pages')
          .insert(formData);
        alert(language === 'ar' ? 'تم إضافة الصفحة بنجاح' : 'Page added successfully');
      }
      
      resetForm();
      loadPages();
    } catch (error) {
      console.error('Error saving page:', error);
      alert(language === 'ar' ? 'حدث خطأ في الحفظ' : 'Error saving page');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: PageContent) => {
    const { id, created_at, updated_at, ...pageData } = page;
    setFormData(pageData);
    setEditingId(id || null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذه الصفحة؟' : 'Are you sure you want to delete this page?')) {
      try {
        await supabase
          .from('pages')
          .delete()
          .eq('id', id);
        alert(language === 'ar' ? 'تم حذف الصفحة بنجاح' : 'Page deleted successfully');
        loadPages();
      } catch (error) {
        console.error('Error deleting page:', error);
        alert(language === 'ar' ? 'حدث خطأ في الحذف' : 'Error deleting page');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      title_en: '',
      title_ar: '',
      content_en: '',
      content_ar: '',
      meta_description_en: '',
      meta_description_ar: '',
      is_published: true
    });
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div>
      {/* Tab Navigation */}
      <motion.div 
        className="bg-primary-900 rounded-lg shadow-lg p-2 mb-8 border border-primary-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('pages')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'pages'
                ? 'bg-accent-600 text-white'
                : 'bg-primary-800 text-neutral-300 hover:bg-primary-700'
            }`}
          >
            <FileText className="w-5 h-5 mr-2" />
            {language === 'ar' ? 'إدارة الصفحات' : 'Page Management'}
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'content'
                ? 'bg-accent-600 text-white'
                : 'bg-primary-800 text-neutral-300 hover:bg-primary-700'
            }`}
          >
            <Type className="w-5 h-5 mr-2" />
            {language === 'ar' ? 'تحرير المحتوى' : 'Content Editor'}
          </button>
        </div>
      </motion.div>

      {activeTab === 'pages' ? (
        <>
          {/* Add/Edit Form */}
          <motion.div 
            className="bg-primary-900 rounded-lg shadow-lg p-8 mb-8 border border-primary-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-serif text-neutral-100 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-accent-400" />
              {editingId ? 
                (language === 'ar' ? 'تعديل الصفحة' : 'Edit Page') : 
                (language === 'ar' ? 'إضافة صفحة جديدة' : 'Add New Page')
              }
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    {language === 'ar' ? 'رابط الصفحة' : 'Page Slug'}
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    placeholder="about"
                    className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-accent-600 bg-primary-800 border-primary-600 rounded focus:ring-accent-500"
                  />
                  <label className="ml-2 text-sm font-medium text-neutral-300">
                    {language === 'ar' ? 'صفحة منشورة' : 'Published Page'}
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    {language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}
                  </label>
                  <input
                    type="text"
                    name="title_en"
                    value={formData.title_en}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    {language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}
                  </label>
                  <input
                    type="text"
                    name="title_ar"
                    value={formData.title_ar}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    {language === 'ar' ? 'الوصف المختصر (إنجليزي)' : 'Meta Description (English)'}
                  </label>
                  <textarea
                    name="meta_description_en"
                    value={formData.meta_description_en}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    {language === 'ar' ? 'الوصف المختصر (عربي)' : 'Meta Description (Arabic)'}
                  </label>
                  <textarea
                    name="meta_description_ar"
                    value={formData.meta_description_ar}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  {language === 'ar' ? 'المحتوى (إنجليزي)' : 'Content (English)'}
                </label>
                <textarea
                  name="content_en"
                  value={formData.content_en}
                  onChange={handleInputChange}
                  rows={8}
                  required
                  className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  {language === 'ar' ? 'المحتوى (عربي)' : 'Content (Arabic)'}
                </label>
                <textarea
                  name="content_ar"
                  value={formData.content_ar}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 disabled:opacity-50 transition-colors font-medium"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {loading ? 
                    (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') : 
                    (editingId ? 
                      (language === 'ar' ? 'تحديث' : 'Update') : 
                      (language === 'ar' ? 'حفظ' : 'Save')
                    )
                  }
                </button>
                
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex items-center px-6 py-3 bg-primary-700 text-neutral-300 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    <X className="w-5 h-5 mr-2" />
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Pages List */}
          <motion.div 
            className="bg-primary-900 rounded-lg shadow-lg p-8 border border-primary-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-serif text-neutral-100 mb-6">
              {language === 'ar' ? 'الصفحات المحفوظة' : 'Saved Pages'}
            </h2>

            {pages.length === 0 ? (
              <p className="text-neutral-400 text-center py-12">
                {language === 'ar' ? 'لا توجد صفحات محفوظة' : 'No pages saved yet'}
              </p>
            ) : (
              <div className="space-y-4">
                {pages.map((page) => (
                  <motion.div 
                    key={page.id} 
                    className="bg-primary-800 border border-primary-700 rounded-lg p-6 hover:border-accent-500 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-serif text-lg text-neutral-100">{page.title_en}</h3>
                          <span className={`px-2 py-1 rounded text-xs ${
                            page.is_published 
                              ? 'bg-green-600 text-white' 
                              : 'bg-red-600 text-white'
                          }`}>
                            {page.is_published ? 
                              (language === 'ar' ? 'منشور' : 'Published') : 
                              (language === 'ar' ? 'مسودة' : 'Draft')
                            }
                          </span>
                        </div>
                        <p className="text-neutral-400 mb-2">{page.title_ar}</p>
                        <p className="text-sm text-neutral-500 mb-2">/{page.slug}</p>
                        <p className="text-sm text-neutral-500 line-clamp-2">{page.meta_description_en}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(page)}
                          className="flex items-center px-3 py-2 bg-accent-600 text-white rounded-lg text-sm hover:bg-accent-700 transition-colors"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          {language === 'ar' ? 'تعديل' : 'Edit'}
                        </button>
                        <button
                          onClick={() => page.id && handleDelete(page.id)}
                          className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          {language === 'ar' ? 'حذف' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      ) : (
        <PageContentEditor />
      )}
    </div>
  );
};

export default ContentAdmin; 