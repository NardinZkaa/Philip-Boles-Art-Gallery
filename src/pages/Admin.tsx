import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { paintingService, Painting, PaintingInsert } from '../lib/supabase';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  PhotoIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const Admin: React.FC = () => {
  const { language } = useLanguage();
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPainting, setEditingPainting] = useState<Painting | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<PaintingInsert>({
    title: '',
    title_ar: '',
    year: '',
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

  const collections = [
    { en: 'Al-Faw\'aliya', ar: 'الفواليا' },
    { en: 'Phenomenology', ar: 'الظاهرة' },
    { en: 'Philological Layers', ar: 'الطبقات الفيلولوجية' }
  ];

  const themes = ['Urban', 'Landscape', 'Portrait', 'Abstract'];

  useEffect(() => {
    loadPaintings();
  }, []);

  const loadPaintings = async () => {
    try {
      const data = await paintingService.getAll();
      setPaintings(data);
    } catch (error) {
      console.error('Error loading paintings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (editingPainting) {
        await paintingService.update(editingPainting.id, formData);
      } else {
        await paintingService.create(formData);
      }
      
      await loadPaintings();
      resetForm();
    } catch (error) {
      console.error('Error saving painting:', error);
      alert('Error saving painting. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await paintingService.uploadImage(file);
      setFormData({ ...formData, image_url: imageUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (painting: Painting) => {
    setEditingPainting(painting);
    setFormData({
      title: painting.title,
      title_ar: painting.title_ar || '',
      year: painting.year,
      medium: painting.medium,
      medium_ar: painting.medium_ar || '',
      dimensions: painting.dimensions,
      collection: painting.collection,
      collection_ar: painting.collection_ar || '',
      theme: painting.theme,
      image_url: painting.image_url,
      description: painting.description,
      description_ar: painting.description_ar || '',
      is_featured: painting.is_featured,
      display_order: painting.display_order
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this painting?')) return;

    try {
      await paintingService.delete(id);
      await loadPaintings();
    } catch (error) {
      console.error('Error deleting painting:', error);
      alert('Error deleting painting. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      title_ar: '',
      year: '',
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
    setEditingPainting(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-neutral-100">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-primary-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif text-neutral-100">
            {language === 'en' ? 'Admin Panel' : 'لوحة الإدارة'}
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>{language === 'en' ? 'Add Painting' : 'إضافة لوحة'}</span>
          </button>
        </div>

        {/* Paintings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paintings.map((painting) => (
            <motion.div
              key={painting.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary-800 rounded-lg overflow-hidden border border-primary-600"
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={painting.image_url}
                  alt={painting.title}
                  className="w-full h-full object-cover"
                />
                {painting.is_featured && (
                  <div className="absolute top-2 right-2 bg-accent-600 text-white px-2 py-1 rounded text-xs">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-serif text-neutral-100 mb-2">{painting.title}</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  {painting.year} • {painting.collection}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(painting)}
                    className="bg-primary-600 hover:bg-primary-500 text-white px-3 py-2 rounded text-sm flex items-center space-x-1"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(painting.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm flex items-center space-x-1"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-primary-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-neutral-100">
                  {editingPainting ? 'Edit Painting' : 'Add New Painting'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-neutral-400 hover:text-neutral-200"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Title (English)
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Title (Arabic)
                    </label>
                    <input
                      type="text"
                      value={formData.title_ar}
                      onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Year
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Medium (English)
                    </label>
                    <input
                      type="text"
                      value={formData.medium}
                      onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Medium (Arabic)
                    </label>
                    <input
                      type="text"
                      value={formData.medium_ar}
                      onChange={(e) => setFormData({ ...formData, medium_ar: e.target.value })}
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Collection
                    </label>
                    <select
                      value={formData.collection}
                      onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    >
                      <option value="">Select Collection</option>
                      {collections.map((collection) => (
                        <option key={collection.en} value={collection.en}>
                          {collection.en}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Theme
                    </label>
                    <select
                      value={formData.theme}
                      onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    >
                      <option value="">Select Theme</option>
                      {themes.map((theme) => (
                        <option key={theme} value={theme}>
                          {theme}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Image Upload
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-2"
                    >
                      <PhotoIcon className="w-5 h-5" />
                      <span>Choose Image</span>
                    </label>
                    {formData.image_url && (
                      <div className="flex items-center space-x-2 text-green-400">
                        <CheckIcon className="w-5 h-5" />
                        <span>Image uploaded</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Description (English)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Description (Arabic)
                  </label>
                  <textarea
                    value={formData.description_ar}
                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                    rows={3}
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm text-neutral-300">Featured Painting</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={uploading || !formData.image_url}
                    className="flex-1 bg-accent-600 hover:bg-accent-700 disabled:bg-accent-800 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    {uploading ? 'Saving...' : editingPainting ? 'Update Painting' : 'Add Painting'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-primary-600 text-neutral-300 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;