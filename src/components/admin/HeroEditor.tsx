
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useHeroContent } from "@/hooks/useContent";
import { HeroContent } from "@/types/cms";
import { Loader2 } from "lucide-react";

const HeroEditor = () => {
  const { toast } = useToast();
  const { data: heroContent, isLoading, refetch } = useHeroContent();
  
  const [formData, setFormData] = useState<Partial<HeroContent>>({
    title: "",
    subtitle: "",
    button_text: "",
    button_link: "",
    background_image: "",
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (heroContent) {
      setFormData({
        title: heroContent.title || "",
        subtitle: heroContent.subtitle || "",
        button_text: heroContent.button_text || "",
        button_link: heroContent.button_link || "",
        background_image: heroContent.background_image || "",
      });
    }
  }, [heroContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Upload image to Supabase Storage
      const fileName = `hero-${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('cms-images')
        .upload(fileName, file);
        
      if (error) throw error;
      
      // Get public URL
      const { data: publicURL } = supabase.storage
        .from('cms-images')
        .getPublicUrl(data.path);
        
      setFormData((prev) => ({ ...prev, background_image: publicURL.publicUrl }));
      
      toast({
        title: "Image uploaded successfully",
        description: "Your image has been uploaded and will be saved when you submit the form",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      
      // Check if hero content exists and update, otherwise insert
      const { data, error } = heroContent 
        ? await supabase
            .from('hero')
            .update({ 
              ...formData, 
              updated_at: new Date().toISOString() 
            })
            .eq('id', heroContent.id)
        : await supabase
            .from('hero')
            .insert({ 
              ...formData,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
      
      if (error) throw error;
      
      toast({
        title: "Hero content saved successfully",
        description: "Your changes have been applied to the website",
      });
      
      // Refresh data
      refetch();
    } catch (error: any) {
      toast({
        title: "Error saving content",
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
      <h2 className="text-xl font-semibold mb-4">Hero Section Editor</h2>
      <p className="text-neutral-600 mb-6">Edit the main hero section content on the homepage.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter hero title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subtitle</label>
          <Textarea
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Enter hero subtitle"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Button Text</label>
            <Input
              name="button_text"
              value={formData.button_text}
              onChange={handleChange}
              placeholder="Ex: Explore Products"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Button Link</label>
            <Input
              name="button_link"
              value={formData.button_link}
              onChange={handleChange}
              placeholder="Ex: /products"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Background Image</label>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <Input
                name="background_image"
                value={formData.background_image}
                onChange={handleChange}
                placeholder="Enter image URL or upload an image"
              />
              
              <div className="mt-2">
                <label className="block text-sm font-medium mb-2">Upload New Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                {isUploading && <p className="text-sm text-neutral-600 mt-1">Uploading...</p>}
              </div>
            </div>
            
            {formData.background_image && (
              <div className="w-24 h-24 border rounded overflow-hidden">
                <img
                  src={formData.background_image}
                  alt="Hero background preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
        
        <Button type="submit" className="bg-spco-600 hover:bg-spco-700" disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </div>
  );
};

export default HeroEditor;
