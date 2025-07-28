import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import { Lock, Eye, EyeOff, User } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        onLoginSuccess();
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(
        language === 'ar' 
          ? 'خطأ في تسجيل الدخول. تحقق من البريد الإلكتروني وكلمة المرور.' 
          : 'Login failed. Please check your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-800 flex items-center justify-center px-4">
      <motion.div 
        className="bg-primary-900 rounded-lg shadow-2xl p-8 w-full max-w-md border border-primary-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif text-neutral-100 mb-2">
            {language === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}
          </h1>
          <p className="text-neutral-400">
            {language === 'ar' ? 'تسجيل الدخول للوصول إلى لوحة التحكم' : 'Sign in to access the admin panel'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div 
              className="bg-red-600 text-white p-4 rounded-lg text-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                placeholder={language === 'ar' ? 'admin@example.com' : 'admin@example.com'}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
                placeholder={language === 'ar' ? '••••••••' : '••••••••'}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {language === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing in...'}
              </div>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500">
            {language === 'ar' ? 'للمساعدة، اتصل بمدير النظام' : 'For assistance, contact the system administrator'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin; 