import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Painting {
  id: string;
  title: string;
  title_ar?: string;
  year: string;
  medium: string;
  medium_ar?: string;
  dimensions: string;
  collection: string;
  collection_ar?: string;
  theme: string;
  image_url: string;
  description: string;
  description_ar?: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PaintingInsert {
  title: string;
  title_ar?: string;
  year: string;
  medium: string;
  medium_ar?: string;
  dimensions: string;
  collection: string;
  collection_ar?: string;
  theme: string;
  image_url: string;
  description: string;
  description_ar?: string;
  is_featured?: boolean;
  display_order?: number;
}

// Painting CRUD operations
export const paintingService = {
  // Get all paintings
  async getAll(): Promise<Painting[]> {
    const { data, error } = await supabase
      .from('paintings')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Get paintings by collection
  async getByCollection(collection: string): Promise<Painting[]> {
    const { data, error } = await supabase
      .from('paintings')
      .select('*')
      .eq('collection', collection)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Get featured paintings
  async getFeatured(): Promise<Painting[]> {
    const { data, error } = await supabase
      .from('paintings')
      .select('*')
      .eq('is_featured', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Get single painting
  async getById(id: string): Promise<Painting | null> {
    const { data, error } = await supabase
      .from('paintings')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create painting
  async create(painting: PaintingInsert): Promise<Painting> {
    const { data, error } = await supabase
      .from('paintings')
      .insert(painting)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update painting
  async update(id: string, painting: Partial<PaintingInsert>): Promise<Painting> {
    const { data, error } = await supabase
      .from('paintings')
      .update({ ...painting, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete painting
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('paintings')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Upload image to Supabase Storage
  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `paintings/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};