import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Artwork {
  id: number;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  collection: string;
  theme: string;
  image: string;
  description: string;
}

const Gallery: React.FC = () => {
  const { language } = useLanguage();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [filter, setFilter] = useState('all');

  const artworks: Artwork[] = [
    {
      id: 1,
      title: 'The Chair',
      year: 'Apr 2023',
      medium: 'Acrylic on canvas',
      dimensions: '130 × 100 cm',
      collection: 'Al-Faw\'aliya',
      theme: 'Urban',
      image: '/images/1.jpg',
      description: 'An exploration of urban consciousness through the interplay of light and architectural forms.'
    },
    {
      id: 2,
      title: 'Desert Contemplation',
      year: '2018',
      medium: 'Acrylic on Canvas',
      dimensions: '100 x 80 cm',
      collection: 'Phenomenology',
      theme: 'Landscape',
      image: '/images/2.jpg',
      description: 'A meditation on solitude and the vastness of the Egyptian landscape.'
    },
    {
      id: 3,
      title: 'Urban Phenomenology',
      year: '2021',
      medium: 'Mixed Media',
      dimensions: '150 x 100 cm',
      collection: 'Al-Faw\'aliya',
      theme: 'Urban',
      image: '/images/3.jpg',
      description: 'Contemporary urban life filtered through the lens of phenomenological investigation.'
    },
    {
      id: 4,
      title: 'Memory Palace',
      year: '2019',
      medium: 'Oil on Canvas',
      dimensions: '110 x 85 cm',
      collection: 'Philological Layers',
      theme: 'Abstract',
      image: '/images/4.jpg',
      description: 'An archaeological excavation of personal and collective memory through visual metaphor.'
    },
    {
      id: 5,
      title: 'Light Studies III',
      year: '2022',
      medium: 'Watercolor',
      dimensions: '70 x 50 cm',
      collection: 'Phenomenology',
      theme: 'Portrait',
      image: '/images/5.jpg',
      description: 'A study in the phenomenology of light as it reveals and conceals human emotion.'
    },
    {
      id: 6,
      title: 'Cultural Sediments',
      year: '2017',
      medium: 'Mixed Media',
      dimensions: '130 x 95 cm',
      collection: 'Philological Layers',
      theme: 'Abstract',
      image: '/images/6.jpg',
      description: 'Layers of cultural meaning embedded in the visual substrate of contemporary experience.'
    },
    {
      id: 7,
      title: 'Cultural Sediments',
      year: '2017',
      medium: 'Mixed Media',
      dimensions: '130 x 95 cm',
      collection: 'Philological Layers',
      theme: 'Abstract',
      image: '/images/7.jpg',
      description: 'Layers of cultural meaning embedded in the visual substrate of contemporary experience.'
    },
    {
      id: 8,
      title: 'Cultural Sediments',
      year: '2017',
      medium: 'Mixed Media',
      dimensions: '130 x 95 cm',
      collection: 'Philological Layers',
      theme: 'Abstract',
      image: '/images/8.jpg',
      description: 'Layers of cultural meaning embedded in the visual substrate of contemporary experience.'
    },
  ];

  const filters = [
    { key: 'all', label: { en: 'All Works', ar: 'جميع الأعمال' } },
    { key: 'Al-Faw\'aliya', label: { en: 'Al-Faw\'aliya', ar: 'الفواليا' } },
    { key: 'Phenomenology', label: { en: 'Phenomenology', ar: 'الظاهرة' } },
    { key: 'Philological Layers', label: { en: 'Philological Layers', ar: 'الطبقات الفيلولوجية' } },
  ];

  const filteredArtworks = filter === 'all' 
    ? artworks 
    : artworks.filter(artwork => artwork.collection === filter);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 bg-primary-900">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-5xl font-serif text-center text-neutral-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === 'en' ? 'Gallery' : 'المعرض'}
          </motion.h1>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {filters.map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-accent-600 text-white'
                    : 'bg-primary-700 text-neutral-300 hover:bg-primary-600'
                }`}
              >
                {filterOption.label[language]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-primary-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence>
              {filteredArtworks.map((artwork) => (
                <motion.div
                  key={artwork.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <div className="relative overflow-hidden rounded-lg bg-primary-700 aspect-[3/4]">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                        <MagnifyingGlassIcon className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-sm font-medium">
                          {language === 'en' ? 'Discover Work' : 'استكشف العمل'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-serif text-neutral-100 mb-1">{artwork.title}</h3>
                    <p className="text-sm text-neutral-400">{artwork.year} • {artwork.medium}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-primary-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-serif text-neutral-100">{selectedArtwork.title}</h2>
                  <button
                    onClick={() => setSelectedArtwork(null)}
                    className="text-neutral-400 hover:text-neutral-200 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden">
                    <img
                      src={selectedArtwork.image}
                      alt={selectedArtwork.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-neutral-100 mb-2">
                        {language === 'en' ? 'Details' : 'التفاصيل'}
                      </h3>
                      <div className="space-y-2 text-sm text-neutral-400">
                        <p><strong className="text-neutral-300">Date:</strong> {selectedArtwork.year}</p>
                        <p><strong className="text-neutral-300">Medium:</strong> {selectedArtwork.medium}</p>
                        <p><strong className="text-neutral-300">Dimensions:</strong> {selectedArtwork.dimensions}</p>
                        <p><strong className="text-neutral-300">Collection:</strong> {selectedArtwork.collection}</p>
                        <p><strong className="text-neutral-300">Theme:</strong> {selectedArtwork.theme}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-neutral-100 mb-2">
                        {language === 'en' ? 'Artist Note' : 'ملاحظة الفنان'}
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {selectedArtwork.description}
                      </p>
                    </div>
                    
                    <button className="w-full bg-accent-600 hover:bg-accent-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                      {language === 'en' ? 'Inquire About This Work' : 'الاستفسار عن هذا العمل'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;