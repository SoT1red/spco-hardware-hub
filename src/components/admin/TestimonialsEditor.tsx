
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useTestimonials } from "@/hooks/useContent";
import { TestimonialContent } from "@/types/cms";
import { Loader2, Plus, Trash, MoveUp, MoveDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TestimonialsEditor = () => {
  const { toast } = useToast();
  const { data: testimonials, isLoading, refetch } = useTestimonials();
  
  const [formData, setFormData] = useState<Partial<TestimonialContent>>({
    content: "",
    author: "",
    title: "",
    company: "",
    rating: 5,
    order: 0,
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setFormData({
      content: "",
      author: "",
      title: "",
      company: "",
      rating: 5,
      order: testimonials?.length || 0,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "rating" ? parseInt(value, 10) : value 
    }));
  };

  const handleEdit = (testimonial: TestimonialContent) => {
    setFormData({
      content: testimonial.content,
      author: testimonial.author,
      title: testimonial.title,
      company: testimonial.company,
      rating: testimonial.rating,
      order: testimonial.order,
    });
    setIsEditing(true);
    setEditingId(testimonial.id);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Testimonial deleted successfully",
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Error deleting testimonial",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const currentItem = testimonials?.find(t => t.id === id);
    if (!currentItem || !testimonials) return;
    
    const currentIndex = testimonials.findIndex(t => t.id === id);
    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (swapIndex < 0 || swapIndex >= testimonials.length) return;
    
    const swapItem = testimonials[swapIndex];
    
    try {
      // Update the current item's order
      await supabase
        .from('testimonials')
        .update({ order: swapItem.order })
        .eq('id', currentItem.id);
        
      // Update the swap item's order
      await supabase
        .from('testimonials')
        .update({ order: currentItem.order })
        .eq('id', swapItem.id);
      
      toast({
        title: "Testimonials reordered successfully",
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Error reordering testimonials",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      
      if (isEditing && editingId) {
        // Update existing testimonial
        const { error } = await supabase
          .from('testimonials')
          .update({ 
            ...formData, 
            updated_at: new Date().toISOString() 
          })
          .eq('id', editingId);
          
        if (error) throw error;
        
        toast({
          title: "Testimonial updated successfully",
        });
      } else {
        // Add new testimonial
        const { error } = await supabase
          .from('testimonials')
          .insert({ 
            ...formData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (error) throw error;
        
        toast({
          title: "Testimonial added successfully",
        });
      }
      
      resetForm();
      refetch();
    } catch (error: any) {
      toast({
        title: "Error saving testimonial",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Testimonials Editor</h2>
          <p className="text-neutral-600">Manage customer testimonials that appear on the homepage.</p>
        </div>
        <Button 
          onClick={resetForm} 
          className="bg-spco-600 hover:bg-spco-700"
          disabled={isSaving}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Testimonial
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Testimonial Form */}
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Testimonial" : "Add New Testimonial"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Testimonial Content</label>
                <Textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Enter the testimonial text"
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Author Name</label>
                  <Input
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Ex: John Smith"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Job Title</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ex: Operations Director"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Ex: Acme Corp"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="bg-spco-600 hover:bg-spco-700"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    isEditing ? "Update Testimonial" : "Add Testimonial"
                  )}
                </Button>
                
                {isEditing && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm} 
                    className="ml-2"
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Testimonials List */}
        <div>
          <h3 className="text-lg font-medium mb-3">Current Testimonials</h3>
          
          {testimonials && testimonials.length > 0 ? (
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="relative">
                  <CardContent className="pt-6">
                    <div className="flex justify-between">
                      <div className="flex-1 pr-6">
                        <p className="italic mb-2">"{testimonial.content}"</p>
                        <div className="flex items-center mt-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-neutral-300 fill-neutral-300"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <p className="ml-3 font-medium">
                            {testimonial.author}, {testimonial.title}
                          </p>
                        </div>
                        <p className="text-sm text-neutral-600">
                          {testimonial.company}
                        </p>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(testimonial)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(testimonial.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={() => handleReorder(testimonial.id, 'up')}
                        disabled={testimonial.order === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={() => handleReorder(testimonial.id, 'down')}
                        disabled={testimonial.order === (testimonials.length - 1)}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500 p-4 bg-neutral-50 rounded-md">
              No testimonials found. Add your first testimonial using the form.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsEditor;
