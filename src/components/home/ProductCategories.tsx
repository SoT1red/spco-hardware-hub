
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProductCategories = () => {
  const categories = [
    {
      id: "ball-bearings",
      name: "Ball Bearings",
      description: "Precision engineered ball bearings for reduced friction and smooth operation.",
      image: "https://images.unsplash.com/photo-1626252652871-1ad083beca5a?q=80&w=2070&auto=format&fit=crop",
      link: "/products/ball-bearings"
    },
    {
      id: "roller-bearings",
      name: "Roller Bearings",
      description: "Heavy-duty roller bearings designed for superior load capacity and durability.",
      image: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?q=80&w=2070&auto=format&fit=crop",
      link: "/products/roller-bearings"
    },
    {
      id: "lubricants",
      name: "Lubricants",
      description: "High-performance lubricants that extend component life and reduce maintenance.",
      image: "https://images.unsplash.com/photo-1635372722656-389f87a941db?q=80&w=1974&auto=format&fit=crop",
      link: "/products/lubricants"
    },
    {
      id: "seals",
      name: "Seals",
      description: "Industrial seals that prevent contamination and retain lubricant in critical systems.",
      image: "https://images.unsplash.com/photo-1521582738928-ba26c0ab41d6?q=80&w=2070&auto=format&fit=crop",
      link: "/products/seals"
    },
    {
      id: "tools",
      name: "Tools",
      description: "Specialized tools for proper installation and maintenance of bearings and related components.",
      image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2070&auto=format&fit=crop",
      link: "/products/tools"
    }
  ];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Product Range</h2>
          <p className="section-subtitle mx-auto">
            Explore our comprehensive range of high-quality hardware components designed for various industrial applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-stagger">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl border border-neutral-100 transition-custom card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-spco-700 mb-2">
                  {category.name}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {category.description}
                </p>
                <Link 
                  to={category.link}
                  className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium transition-custom group"
                >
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/products" className="btn-primary">
            View All Products
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
