
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from '@/lib/supabase';
import { TestimonialContent } from '@/types/cms';
import { useTestimonials } from '@/hooks/useContent';

const TestimonialsEditor = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useTestimonials();
  const [testimonials, setTestimonials] = useState<TestimonialContent[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Update local state when data changes
  React.useEffect(() => {
    if (data) {
      setTestimonials(data as TestimonialContent[]);
    }
  }, [data]);

  const addTestimonial = () => {
    const newTestimonial: Partial<TestimonialContent> = {
      content: 'New testimonial',
      author: 'New Author',
      title: 'Position',
      company: 'Company',
      rating: 5,
      order: testimonials.length
    };
    
    setTestimonials([...testimonials, newTestimonial as TestimonialContent]);
    setActiveIndex(testimonials.length);
  };

  const updateTestimonial = (index: number, field: keyof TestimonialContent, value: any) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
    if (activeIndex === index) {
      setActiveIndex(null);
    } else if (activeIndex !== null && activeIndex > index) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const moveTestimonial = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const updated = [...testimonials];
      const temp = { ...updated[index-1], order: updated[index].order };
      updated[index-1] = { ...updated[index], order: updated[index-1].order };
      updated[index] = temp;
      setTestimonials(updated);
      if (activeIndex === index) setActiveIndex(index - 1);
      else if (activeIndex === index - 1) setActiveIndex(index);
    } else if (direction === 'down' && index < testimonials.length - 1) {
      const updated = [...testimonials];
      const temp = { ...updated[index+1], order: updated[index].order };
      updated[index+1] = { ...updated[index], order: updated[index+1].order };
      updated[index] = temp;
      setTestimonials(updated);
      if (activeIndex === index) setActiveIndex(index + 1);
      else if (activeIndex === index + 1) setActiveIndex(index);
    }
  };

  const saveTestimonials = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    
    try {
      // For existing testimonials, update them
      for (const testimonial of testimonials.filter(t => t.id)) {
        const { error } = await supabase
          .from('testimonials')
          .update({
            content: testimonial.content,
            author: testimonial.author,
            title: testimonial.title,
            company: testimonial.company,
            rating: testimonial.rating,
            order: testimonial.order
          })
          .eq('id', testimonial.id);
        
        if (error) throw error;
      }
      
      // For new testimonials, insert them
      const newTestimonials = testimonials.filter(t => !t.id);
      if (newTestimonials.length > 0) {
        const { error } = await supabase
          .from('testimonials')
          .insert(newTestimonials.map(t => ({
            content: t.content,
            author: t.author,
            title: t.title,
            company: t.company,
            rating: t.rating,
            order: t.order
          })));
        
        if (error) throw error;
      }
      
      // Success
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save testimonials');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading testimonials. Please refresh the page and try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <Button onClick={saveTestimonials} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
      
      {saveSuccess && (
        <Alert>
          <AlertDescription className="text-green-600">
            Testimonials saved successfully!
          </AlertDescription>
        </Alert>
      )}
      
      {saveError && (
        <Alert variant="destructive">
          <AlertDescription>{saveError}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Testimonials List</h3>
            {testimonials.length === 0 ? (
              <p className="text-gray-500 text-sm">No testimonials yet</p>
            ) : (
              <ul className="space-y-2">
                {testimonials.map((testimonial, index) => (
                  <li 
                    key={testimonial.id || `new-${index}`}
                    className={`p-2 rounded cursor-pointer flex justify-between items-center ${activeIndex === index ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="truncate flex-grow">
                      <span className="font-medium">
                        {testimonial.author || 'Unnamed'}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        {testimonial.company}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { 
                          e.stopPropagation();
                          moveTestimonial(index, 'up');
                        }}
                        disabled={index === 0}
                        className="h-7 w-7"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { 
                          e.stopPropagation();
                          moveTestimonial(index, 'down');
                        }}
                        disabled={index === testimonials.length - 1}
                        className="h-7 w-7"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { 
                          e.stopPropagation();
                          removeTestimonial(index);
                        }}
                        className="h-7 w-7 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Button 
              className="w-full mt-4"
              variant="outline"
              onClick={addTestimonial}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {activeIndex !== null && testimonials[activeIndex] ? (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="content">Testimonial Content</Label>
                  <Textarea
                    id="content"
                    rows={4}
                    value={testimonials[activeIndex].content}
                    onChange={(e) => updateTestimonial(activeIndex, 'content', e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="author">Author Name</Label>
                  <Input
                    id="author"
                    value={testimonials[activeIndex].author}
                    onChange={(e) => updateTestimonial(activeIndex, 'author', e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="title">Title/Position</Label>
                  <Input
                    id="title"
                    value={testimonials[activeIndex].title}
                    onChange={(e) => updateTestimonial(activeIndex, 'title', e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={testimonials[activeIndex].company}
                    onChange={(e) => updateTestimonial(activeIndex, 'company', e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={testimonials[activeIndex].rating}
                    onChange={(e) => updateTestimonial(activeIndex, 'rating', Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg p-10 text-center">
              <div>
                <p className="text-gray-500 mb-4">
                  {testimonials.length === 0
                    ? "No testimonials yet. Add your first one!"
                    : "Select a testimonial to edit"}
                </p>
                {testimonials.length === 0 && (
                  <Button 
                    variant="outline"
                    onClick={addTestimonial}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsEditor;
