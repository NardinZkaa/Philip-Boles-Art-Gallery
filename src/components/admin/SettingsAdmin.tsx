import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import { Save, Settings, Globe, Palette, Database, Shield } from 'lucide-react';

interface WebsiteSettings {
  id?: string;
  site_name_en: string;
  site_name_ar: string;
  site_description_en: string;
  site_description_ar: string;
  contact_email: string;
  contact_phone: string;
  social_facebook: string;
  social_instagram: string;
  social_twitter: string;
  primary_color: string;
  secondary_color: string;
  maintenance_mode: boolean;
  analytics_code: string;
  created_at?: string;
  updated_at?: string;
}

const SettingsAdmin: React.FC = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Omit<WebsiteSettings, 'id' | 'created_at' | 'updated_at'>>({
    site_name_en: '',
    site_name_ar: '',
    site_description_en: '',
    site_description_ar: '',
    contact_email: '',
    contact_phone: '',
    social_facebook: '',
    social_instagram: '',
    social_twitter: '',
    primary_color: '#1f2937',
    secondary_color: '#f59e0b',
    maintenance_mode: false,
    analytics_code: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }
      
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data: existingData } = await supabase
        .from('website_settings')
        .select('id')
        .single();

      if (existingData) {
        // Update existing settings
        await supabase
          .from('website_settings')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', existingData.id);
      } else {
        // Create new settings
        await supabase
          .from('website_settings')
          .insert(formData);
      }
      
      alert(language === 'ar' ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert(language === 'ar' ? 'حدث خطأ في حفظ الإعدادات' : 'Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const resetToDefaults = () => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من إعادة تعيين الإعدادات؟' : 'Are you sure you want to reset settings?')) {
      setFormData({
        site_name_en: '',
        site_name_ar: '',
        site_description_en: '',
        site_description_ar: '',
        contact_email: '',
        contact_phone: '',
        social_facebook: '',
        social_instagram: '',
        social_twitter: '',
        primary_color: '#1f2937',
        secondary_color: '#f59e0b',
        maintenance_mode: false,
        analytics_code: ''
      });
    }
  };

  return (
    <div>
      <motion.div 
        className="bg-primary-900 rounded-lg shadow-lg p-8 border border-primary-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-serif text-neutral-100 mb-6 flex items-center">
          <Settings className="w-6 h-6 mr-3 text-accent-400" />
          {language === 'ar' ? 'إعدادات الموقع' : 'Website Settings'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Settings */}
          <div>
            <h3 className="text-lg font-medium text-neutral-100 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-accent-400" />
              {language === 'ar' ? 'الإعدادات العامة' : 'General Settings'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  {language === 'ar' ? 'اسم الموقع (إنجليزي)' : 'Site Name (English)'}
                </label>
                <input
                  type="text"
                  name="site_name_en"
                  value={formData.site_name_en}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  {language === 'ar' ? 'اسم الموقع (عربي)' : 'Site Name (Arabic)'}
                </label>
                <input
                  type="text"
                  name="site_name_ar"
                  value={formData.site_name_ar}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  {language === 'ar' ? 'وصف الموقع (إنجليزي)' : 'Site Description (English)'}
                </label>
                <textarea
                  name="site_description_en"
                  value={formData.site_description_en}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  {language === 'ar' ? 'وصف الموقع (عربي)' : 'Site Description (Arabic)'}
                </label>
                <textarea
                  name="site_description_ar"
                  value={formData.site_description_ar}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-neutral-100 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-accent-400" />
              {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  {language === 'ar' ? 'رقم الهاتف' : 'Phone'}
                </label>
                <input
                  type="text"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-medium text-neutral-100 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-accent-400" />
              {language === 'ar' ? 'وسائل التواصل الاجتماعي' : 'Social Media'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  name="social_facebook"
                  value={formData.social_facebook}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  name="social_instagram"
                  value={formData.social_instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  name="social_twitter"
                  value={formData.social_twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/..."
                  className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div>
            <h3 className="text-lg font-medium text-neutral-100 mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-accent-400" />
              {language === 'ar' ? 'المظهر' : 'Appearance'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  {language === 'ar' ? 'اللون الأساسي' : 'Primary Color'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="primary_color"
                    value={formData.primary_color}
                    onChange={handleInputChange}
                    className="w-12 h-12 rounded-lg border border-primary-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    name="primary_color"
                    value={formData.primary_color}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  {language === 'ar' ? 'اللون الثانوي' : 'Secondary Color'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="secondary_color"
                    value={formData.secondary_color}
                    onChange={handleInputChange}
                    className="w-12 h-12 rounded-lg border border-primary-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    name="secondary_color"
                    value={formData.secondary_color}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div>
            <h3 className="text-lg font-medium text-neutral-100 mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-accent-400" />
              {language === 'ar' ? 'الإعدادات المتقدمة' : 'Advanced Settings'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="maintenance_mode"
                  checked={formData.maintenance_mode}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-accent-600 bg-primary-800 border-primary-600 rounded focus:ring-accent-500"
                />
                <label className="ml-2 text-sm font-medium text-neutral-300">
                  {language === 'ar' ? 'وضع الصيانة' : 'Maintenance Mode'}
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  {language === 'ar' ? 'كود التحليلات' : 'Analytics Code'}
                </label>
                <textarea
                  name="analytics_code"
                  value={formData.analytics_code}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="<!-- Google Analytics or other tracking code -->"
                  className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-primary-700">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 disabled:opacity-50 transition-colors font-medium"
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? 
                (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') : 
                (language === 'ar' ? 'حفظ الإعدادات' : 'Save Settings')
              }
            </button>
            
            <button
              type="button"
              onClick={resetToDefaults}
              className="px-6 py-3 bg-primary-700 text-neutral-300 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              {language === 'ar' ? 'إعادة تعيين' : 'Reset to Defaults'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SettingsAdmin; 