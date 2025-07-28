import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, paintingService, Painting, PaintingInsert } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

const PaintingsAdmin: React.FC = () => {
  const { language } = useLanguage();
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<PaintingInsert>({
    title: '',
    title_ar: '',
    year: new Date().getFullYear().toString(),
    medium: '',
    medium_ar: '',
    dimensions: '',
    collection: '',
    collection_ar: '',
    theme: '',
    image_url: '',
    description: '',
    description_ar: '',
    is_featured: false,
    display_order: 0
  });

  useEffect(() => {
    loadPaintings();
  }, []);

  const loadPaintings = async () => {
    try {
      const data = await paintingService.getAll();
      setPaintings(data || []);
    } catch (error) {
      console.error('Error loading paintings:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form, editingId:', editingId);
    setLoading(true);

    try {
      let imageUrl = formData.image_url;
      
      // Upload file if selected
      if (selectedFile) {
        console.log('Uploading file:', selectedFile.name);
        setUploading(true);
        try {
          imageUrl = await uploadImage(selectedFile);
          console.log('File uploaded, URL:', imageUrl);
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          alert(language === 'ar' ? 'حدث خطأ في رفع الصورة' : 'Error uploading image');
          setUploading(false);
          setLoading(false);
          return;
        }
        setUploading(false);
      }

      const paintingData = {
        ...formData,
        image_url: imageUrl
      };

      console.log('Painting data to save:', paintingData);

      if (editingId) {
        console.log('Updating painting with id:', editingId);
        await paintingService.update(editingId, paintingData);
        console.log('Painting updated successfully');
        alert(language === 'ar' ? 'تم تحديث اللوحة بنجاح' : 'Painting updated successfully');
      } else {
        console.log('Creating new painting');
        await paintingService.create(paintingData);
        console.log('Painting created successfully');
        alert(language === 'ar' ? 'تم إضافة اللوحة بنجاح' : 'Painting added successfully');
      }
      
      resetForm();
      setSelectedFile(null);
      loadPaintings();
    } catch (error) {
      console.error('Error saving painting:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(language === 'ar' ? `حدث خطأ في الحفظ: ${errorMessage}` : `Error saving painting: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (painting: Painting) => {
    console.log('Editing painting:', painting);
    // Convert Painting to PaintingInsert by excluding id, created_at, updated_at
    const { id, created_at, updated_at, ...paintingData } = painting;
    console.log('Form data to set:', paintingData);
    setFormData(paintingData);
    setEditingId(id || null);
  };

  const handleDelete = async (id: string) => {
    console.log('Deleting painting with id:', id);
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذه اللوحة؟' : 'Are you sure you want to delete this painting?')) {
      try {
        await paintingService.delete(id);
        console.log('Painting deleted successfully');
        alert(language === 'ar' ? 'تم حذف اللوحة بنجاح' : 'Painting deleted successfully');
        loadPaintings();
      } catch (error) {
        console.error('Error deleting painting:', error);
        alert(language === 'ar' ? 'حدث خطأ في الحذف' : 'Error deleting painting');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      title_ar: '',
      year: new Date().getFullYear().toString(),
      medium: '',
      medium_ar: '',
      dimensions: '',
      collection: '',
      collection_ar: '',
      theme: '',
      image_url: '',
      description: '',
      description_ar: '',
      is_featured: false,
      display_order: 0
    });
    setEditingId(null);
    setSelectedFile(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'display_order' ? Number(value) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image_url: previewUrl
      }));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    // Use data URL for simplicity - no need for Supabase storage setup
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
            (language === 'ar' ? 'تعديل اللوحة' : 'Edit Painting') : 
            (language === 'ar' ? 'إضافة لوحة جديدة' : 'Add New Painting')
          }
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'العنوان' : 'Title'}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'المجموعة' : 'Collection'}
            </label>
            <input
              type="text"
              name="collection"
              value={formData.collection}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'السنة' : 'Year'}
            </label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'الوسط' : 'Medium'}
            </label>
            <input
              type="text"
              name="medium"
              value={formData.medium}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'الأبعاد' : 'Dimensions'}
            </label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'الموضوع' : 'Theme'}
            </label>
            <input
              type="text"
              name="theme"
              value={formData.theme}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {language === 'ar' ? 'صورة اللوحة' : 'Painting Image'}
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
              {language === 'ar' ? 'الوصف' : 'Description'}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-primary-800 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-neutral-100 placeholder-neutral-500"
            />
          </div>

          <div className="md:col-span-2 flex gap-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex items-center px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 disabled:opacity-50 transition-colors font-medium"
            >
              <Save className="w-5 h-5 mr-2" />
              {uploading ? 
                (language === 'ar' ? 'جاري رفع الصورة...' : 'Uploading image...') :
                loading ? 
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

      {/* Paintings List */}
      <motion.div 
        className="bg-primary-900 rounded-lg shadow-lg p-8 border border-primary-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-serif text-neutral-100 mb-6">
          {language === 'ar' ? 'اللوحات المحفوظة' : 'Saved Paintings'}
        </h2>

        {paintings.length === 0 ? (
          <p className="text-neutral-400 text-center py-12">
            {language === 'ar' ? 'لا توجد لوحات محفوظة' : 'No paintings saved yet'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paintings.map((painting) => (
              <motion.div 
                key={painting.id} 
                className="bg-primary-800 border border-primary-700 rounded-lg p-6 hover:border-accent-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={painting.image_url}
                  alt={painting.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
                <h3 className="font-serif text-lg text-neutral-100 mb-2">{painting.title}</h3>
                <p className="text-neutral-400 mb-1">{painting.collection}</p>
                <p className="text-sm text-neutral-500 mb-4">{painting.year}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(painting)}
                    className="flex items-center px-4 py-2 bg-accent-600 text-white rounded-lg text-sm hover:bg-accent-700 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'تعديل' : 'Edit'}
                  </button>
                  <button
                    onClick={() => painting.id && handleDelete(painting.id)}
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

export default PaintingsAdmin; 