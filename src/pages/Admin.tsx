import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import SupabaseSetup from '../components/SupabaseSetup';
import { LogOut } from 'lucide-react';
import AdminLogin from '../components/admin/AdminLogin';

// Admin Components
import PaintingsAdmin from '../components/admin/PaintingsAdmin';
import CollectionsAdmin from '../components/admin/CollectionsAdmin';
import SettingsAdmin from '../components/admin/SettingsAdmin';

// Page-specific Admin Components
import AboutPageAdmin from '../components/admin/AboutPageAdmin';
import ReviewPageAdmin from '../components/admin/ReviewPageAdmin';
import ExhibitionsPageAdmin from '../components/admin/ExhibitionsPageAdmin';
import HomePageAdmin from '../components/admin/HomePageAdmin';

type AdminTab = 'paintings' | 'collections' | 'settings' | 'about' | 'review' | 'exhibitions' | 'home';

const Admin: React.FC = () => {
  const { language } = useLanguage();
  const [supabaseReady, setSupabaseReady] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('paintings');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkSupabaseConnection();
    checkAuthStatus();
  }, []);

  const checkSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('paintings').select('count').limit(1);
      if (!error) {
        setSupabaseReady(true);
      }
    } catch (error) {
      console.log('Supabase connection check failed:', error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      }
    } catch (error) {
      console.log('Auth check failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const tabs = [
    {
      id: 'paintings' as AdminTab,
      label: { en: 'Paintings', ar: 'اللوحات' },
      icon: '🎨'
    },
    {
      id: 'collections' as AdminTab,
      label: { en: 'Collections', ar: 'المجموعات' },
      icon: '📁'
    },
    {
      id: 'about' as AdminTab,
      label: { en: 'About Page', ar: 'صفحة عن الفنان' },
      icon: '👤'
    },
    {
      id: 'review' as AdminTab,
      label: { en: 'Review Page', ar: 'صفحة المراجعة' },
      icon: '📖'
    },
    {
      id: 'exhibitions' as AdminTab,
      label: { en: 'Exhibitions Page', ar: 'صفحة المعارض' },
      icon: '🎭'
    },
    {
      id: 'home' as AdminTab,
      label: { en: 'Home Page', ar: 'الصفحة الرئيسية' },
      icon: '🏠'
    },
    {
      id: 'settings' as AdminTab,
      label: { en: 'Settings', ar: 'الإعدادات' },
      icon: '⚙️'
    }
  ];

  if (!supabaseReady) {
    return <SupabaseSetup onComplete={() => setSupabaseReady(true)} />;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-primary-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-4xl font-serif text-neutral-100 mb-2">
              {language === 'en' ? 'Admin Panel' : 'لوحة الإدارة'}
            </h1>
            <p className="text-neutral-400">
              {language === 'en' ? 'Manage your art gallery content' : 'إدارة محتوى معرض الفنون'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-neutral-400">
              {language === 'en' ? 'Welcome,' : 'مرحباً،'} {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {language === 'en' ? 'Logout' : 'تسجيل الخروج'}
            </button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="bg-primary-800 rounded-lg p-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-accent-600 text-white'
                    : 'text-neutral-300 hover:text-neutral-100 hover:bg-primary-700'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label[language]}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          className="mt-8 bg-primary-900 rounded-lg shadow-lg p-8 border border-primary-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'paintings' && <PaintingsAdmin />}
          {activeTab === 'collections' && <CollectionsAdmin />}
          {activeTab === 'about' && <AboutPageAdmin />}
          {activeTab === 'review' && <ReviewPageAdmin />}
          {activeTab === 'exhibitions' && <ExhibitionsPageAdmin />}
          {activeTab === 'home' && <HomePageAdmin />}
          {activeTab === 'settings' && <SettingsAdmin />}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;