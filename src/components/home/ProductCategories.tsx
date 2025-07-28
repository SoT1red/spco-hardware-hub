
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

const ProductCategories = () => {
  const categories: Category[] = [
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
    <section className="index-categories">
      <div className="spco-container">
        <div className="spco-section-header">
          <h2 className="spco-section-title">Our Product Categories</h2>
          <p className="spco-section-subtitle">
            Explore our comprehensive range of high-quality hardware components designed for various industrial applications.
          </p>
        </div>

        <div className="index-categories-grid" style={{ marginBottom: '3rem' }}>
          {categories.map((category) => (
            <Link key={category.id} to={category.link} className="index-category-card spco-fade-in">
              <div className="index-category-card-image">
                <img src={category.image} alt={category.name} />
              </div>
              <div className="index-category-card-content">
                <h3 className="index-category-card-title">
                  {category.name}
                </h3>
                <p className="index-category-card-description">
                  {category.description}
                </p>
                <div className="index-category-card-link">
                  Explore Category
                  <ArrowRight style={{ height: '14px', width: '14px' }} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/products" className="spco-btn spco-btn-primary spco-btn-large">
            View All Products
            <ArrowRight style={{ height: '16px', width: '16px' }} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
