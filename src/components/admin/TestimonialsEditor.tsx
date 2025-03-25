
import * as React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BaseEditor } from './BaseEditor';
import { supabase } from '@/lib/supabase';
import { TestimonialContent } from '@/types/cms';
import { useTestimonials } from '@/hooks/useContent';

const TestimonialsEditor = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useTestimonials();
  const [selectedTestimonialId, setSelectedTestimonialId] = React.useState<string | null>(null);
  
  // Select the first testimonial by default when data loads
  React.useEffect(() => {
    if (data && data.length > 0 && !selectedTestimonialId) {
      setSelectedTestimonialId(data[0].id);
    }
  }, [data, selectedTestimonialId]);
  
  // Find the currently selected testimonial
  const selectedTestimonial = React.useMemo(() => {
    if (!data || !selectedTestimonialId) return null;
    return data.find(item => item.id === selectedTestimonialId) || null;
  }, [data, selectedTestimonialId]);

  const updateTestimonial = async (updatedTestimonial: TestimonialContent) => {
    const { error } = await supabase
      .from('testimonials')
      .update({
        content: updatedTestimonial.content,
        author: updatedTestimonial.author,
        title: updatedTestimonial.title,
        company: updatedTestimonial.company,
        rating: updatedTestimonial.rating,
        order: updatedTestimonial.order
      })
      .eq('id', updatedTestimonial.id);
    
    if (error) throw error;
    
    // Invalidate and refetch
    await queryClient.invalidateQueries({ queryKey: ['testimonials'] });
  };

  const mutation = useMutation({
    mutationFn: updateTestimonial,
  });

  const handleSave = async (testimonialData: TestimonialContent) => {
    await mutation.mutateAsync(testimonialData);
  };

  if (!selectedTestimonial && data && data.length > 0) {
    return <div className="p-8 text-center">Select a testimonial to edit</div>;
  }

  return (
    <div>
      {data && data.length > 0 && (
        <div className="mb-6">
          <Label htmlFor="testimonial-select" className="mb-2 block">Select Testimonial</Label>
          <select 
            id="testimonial-select"
            className="w-full p-2 border rounded-md"
            value={selectedTestimonialId || ''}
            onChange={(e) => setSelectedTestimonialId(e.target.value)}
          >
            {data.map((testimonial) => (
              <option key={testimonial.id} value={testimonial.id}>
                {testimonial.author} - {testimonial.company}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedTestimonial && (
        <BaseEditor<TestimonialContent>
          title={`Edit Testimonial: ${selectedTestimonial.author}`}
          isLoading={isLoading}
          isError={isError}
          data={selectedTestimonial}
          onSave={handleSave}
          renderForm={(testimonial, onChange) => (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="content">Testimonial Content</Label>
                <Textarea
                  id="content"
                  value={testimonial.content}
                  onChange={(e) => onChange({ ...testimonial, content: e.target.value })}
                  rows={4}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  value={testimonial.author}
                  onChange={(e) => onChange({ ...testimonial, author: e.target.value })}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="title">Author Title</Label>
                <Input
                  id="title"
                  value={testimonial.title}
                  onChange={(e) => onChange({ ...testimonial, title: e.target.value })}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={testimonial.company}
                  onChange={(e) => onChange({ ...testimonial, company: e.target.value })}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={testimonial.rating}
                  onChange={(e) => onChange({ ...testimonial, rating: Number(e.target.value) })}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  min="1"
                  value={testimonial.order}
                  onChange={(e) => onChange({ ...testimonial, order: Number(e.target.value) })}
                />
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default TestimonialsEditor;
