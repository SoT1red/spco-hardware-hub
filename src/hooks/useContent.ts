
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

type ContentType = 
  | 'hero' 
  | 'partners' 
  | 'testimonials' 
  | 'product_categories' 
  | 'industries'
  | 'products'
  | 'contact_info'
  | 'faqs'
  | 'general';

export function useContent<T>(
  contentType: ContentType, 
  options?: { 
    id?: string;
    filter?: Record<string, any>;
    single?: boolean;
  }
) {
  const { id, filter = {}, single = false } = options || {};
  
  return useQuery({
    queryKey: [contentType, id, filter],
    queryFn: async () => {
      let query = supabase.from(contentType).select('*');
      
      // Apply filters
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
      
      // If ID is provided, filter by ID
      if (id) {
        query = query.eq('id', id);
      }
      
      // Order by order field if it exists
      if (['partners', 'testimonials', 'product_categories', 'faqs'].includes(contentType)) {
        query = query.order('order');
      }
      
      const { data, error } = single 
        ? await query.single() 
        : await query;
      
      if (error) {
        toast({
          title: "Error fetching content",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      return data as T;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Specific hook for each content type
export const useHeroContent = () => useContent('hero', { single: true });
export const usePartners = () => useContent('partners');
export const useTestimonials = () => useContent('testimonials');
export const useProductCategories = () => useContent('product_categories');
export const useIndustries = () => useContent('industries');
export const useProducts = (filter?: Record<string, any>) => useContent('products', { filter });
export const useProduct = (id: string) => useContent('products', { id, single: true });
export const useIndustry = (id: string) => useContent('industries', { id, single: true });
export const useContactInfo = () => useContent('contact_info');
export const useFAQs = () => useContent('faqs');
export const useGeneralContent = (key: string) => useContent('general', { filter: { key }, single: true });
