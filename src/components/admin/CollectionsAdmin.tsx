import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Collection {
  id?: string;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

const CollectionsAdmin: React.FC = () => {
  const { language } = useLanguage();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<Omit<Collection, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    name_ar: '',
    description: '',
    description_ar: '',
    image_url: '',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      console.error('Error loading collections:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image_url;
      
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const collectionData = {
        ...formData,
        image_url: imageUrl
      };

      if (editingId) {
        await supabase
          .from('collections')
          .update({ ...collectionData, updated_at: new Date().toISOString() })
          .eq('id', editingId);
        alert(language === 'ar' ? 'تم تحديث المجموعة بنجاح' : 'Collection updated successfully');
      } else {
        await supabase
          .from('collections')
          .insert(collectionData);
        alert(language === 'ar' ? 'تم إضافة المجموعة بنجاح' : 'Collection added successfully');
      }
      
      resetForm();
      setSelectedFile(null);
      loadCollections();
    } catch (error) {
      console.error('Error saving collection:', error);
      alert(language === 'ar' ? 'حدث خطأ في الحفظ' : 'Error saving collection');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (collection: Collection) => {
    const { id, created_at, updated_at, ...collectionData } = collection;
    setFormData(collectionData);
    setEditingId(id || null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذه المجموعة؟' : 'Are you sure you want to delete this collection?')) {
      try {
        await supabase
          .from('collections')
          .delete()
          .eq('id', id);
        alert(language === 'ar' ? 'تم حذف المجموعة بنجاح' : 'Collection deleted successfully');
        loadCollections();
      } catch (error) {
        console.error('Error deleting collection:', error);
        alert(language === 'ar' ? 'حدث خطأ في الحذف' : 'Error deleting collection');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      name_ar: '',
      description: '',
      description_ar: '',
      image_url: '',
      display_order: 0,
      is_active: true
    });
    setEditingId(null);
    setSelectedFile(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image_url: previewUrl
      }));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      {/* Add/Edit Form */}
      <motion.div 
        className="bg-primary-900 rounded-lg shadow-lg p-8 mb-8 border border-primary-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-serif text-neutral-100 mb-6 flex items-center">
          <Plus className="w-6 h-6 mr-3 text-accent-400" />
          {editingId ? 
            (language === 'ar' ? 'تعديل المجموعة' : 'Edit Collection') : 
            (language === 'ar' ? 'إضافة مجموعة جديدة' : 'Add New Collection')
          }
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'اسم المجموعة (إنجليزي)' : 'Collection Name (English)'}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'اسم المجموعة (عربي)' : 'Collection Name (Arabic)'}
            </label>
            <input
              type="text"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'ترتيب العرض' : 'Display Order'}
            </label>
            <input
              type="number"
              name="display_order"
              value={formData.display_order}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'صورة المجموعة' : 'Collection Image'}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent-600 file:text-white hover:file:bg-accent-700"
            />
            {formData.image_url && (
              <div className="mt-3">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border border-primary-600"
                />
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
            </label>
            <textarea
              name="description_ar"
              value={formData.description_ar}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
            />
          </div>

          <div className="md:col-span-2 flex items-center">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleInputChange}
              className="w-4 h-4 text-accent-600 bg-primary-800 border-primary-600 rounded focus:ring-accent-500"
            />
            <label className="ml-2 text-sm font-medium text-neutral-300">
              {language === 'ar' ? 'مجموعة نشطة' : 'Active Collection'}
            </label>
          </div>

          <div className="md:col-span-2 flex gap-4">
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

      {/* Collections List */}
      <motion.div 
        className="bg-primary-900 rounded-lg shadow-lg p-8 border border-primary-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-serif text-neutral-100 mb-6">
          {language === 'ar' ? 'المجموعات المحفوظة' : 'Saved Collections'}
        </h2>

        {collections.length === 0 ? (
          <p className="text-neutral-400 text-center py-12">
            {language === 'ar' ? 'لا توجد مجموعات محفوظة' : 'No collections saved yet'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <motion.div 
                key={collection.id} 
                className="bg-primary-800 border border-primary-700 rounded-lg p-6 hover:border-accent-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {collection.image_url && (
                  <img
                    src={collection.image_url}
                    alt={collection.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="font-serif text-lg text-neutral-100 mb-2">{collection.name}</h3>
                <p className="text-neutral-400 mb-2">{collection.name_ar}</p>
                <p className="text-sm text-neutral-500 mb-4">{collection.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    collection.is_active 
                      ? 'bg-green-600 text-white' 
                      : 'bg-red-600 text-white'
                  }`}>
                    {collection.is_active ? 
                      (language === 'ar' ? 'نشط' : 'Active') : 
                      (language === 'ar' ? 'غير نشط' : 'Inactive')
                    }
                  </span>
                  <span className="text-sm text-neutral-500">
                    Order: {collection.display_order}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(collection)}
                    className="flex items-center px-4 py-2 bg-accent-600 text-white rounded-lg text-sm hover:bg-accent-700 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'تعديل' : 'Edit'}
                  </button>
                  <button
                    onClick={() => collection.id && handleDelete(collection.id)}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'حذف' : 'Delete'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CollectionsAdmin; 