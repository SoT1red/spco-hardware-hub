
import { useTestimonials } from '@/hooks/useContent';
import { TestimonialContent } from '@/types/cms';
import { Star } from 'lucide-react';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialContent }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <StarRating rating={testimonial.rating} />
      <p className="mt-4 text-gray-600 italic">{testimonial.content}</p>
      <div className="mt-4">
        <p className="font-bold">{testimonial.author}</p>
        <p className="text-sm text-gray-500">
          {testimonial.title}, {testimonial.company}
        </p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { data, isLoading, isError } = useTestimonials();
  
  const testimonials = data as TestimonialContent[] || [];

  if (isLoading) {
    return <div className="py-16 text-center">Loading testimonials...</div>;
  }

  if (isError || !testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
