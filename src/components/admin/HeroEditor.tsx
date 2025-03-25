
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BaseEditor } from './BaseEditor';
import { supabase } from '@/lib/supabase';
import { HeroContent } from '@/types/cms';
import { useHeroContent } from '@/hooks/useContent';

const HeroEditor = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useHeroContent();
  
  const updateHero = async (updatedHero: HeroContent) => {
    const { error } = await supabase
      .from('hero')
      .update({
        title: updatedHero.title,
        subtitle: updatedHero.subtitle,
        button_text: updatedHero.button_text,
        button_link: updatedHero.button_link,
        background_image: updatedHero.background_image
      })
      .eq('id', updatedHero.id);
    
    if (error) throw error;
    
    // Invalidate and refetch
    await queryClient.invalidateQueries({ queryKey: ['hero'] });
  };

  const mutation = useMutation({
    mutationFn: updateHero,
  });

  const handleSave = async (heroData: HeroContent) => {
    await mutation.mutateAsync(heroData);
  };

  return (
    <BaseEditor<HeroContent>
      title="Hero Section"
      isLoading={isLoading}
      isError={isError}
      data={data as HeroContent}
      onSave={handleSave}
      renderForm={(hero, onChange) => (
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={hero.title}
              onChange={(e) => onChange({ ...hero, title: e.target.value })}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={hero.subtitle}
              onChange={(e) => onChange({ ...hero, subtitle: e.target.value })}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="button_text">Button Text</Label>
            <Input
              id="button_text"
              value={hero.button_text}
              onChange={(e) => onChange({ ...hero, button_text: e.target.value })}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="button_link">Button Link</Label>
            <Input
              id="button_link"
              value={hero.button_link}
              onChange={(e) => onChange({ ...hero, button_link: e.target.value })}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="background_image">Background Image URL</Label>
            <Input
              id="background_image"
              value={hero.background_image}
              onChange={(e) => onChange({ ...hero, background_image: e.target.value })}
            />
            {hero.background_image && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <img 
                  src={hero.background_image} 
                  alt="Background preview" 
                  className="w-full max-h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default HeroEditor;
