
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  image: string;
  specifications: {
    [key: string]: string | number;
  };
  description: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { id, name, category, image, specifications } = product;

  // Extract key specifications for preview
  const keySpecs = Object.entries(specifications).slice(0, 3);

  return (
    <div className={cn("product-card", className)}>
      <div className="product-card-image">
        <img src={image} alt={name} />
        <div className="product-card-category">
          {category}
        </div>
      </div>
      
      <div className="product-card-content">
        <h3 className="product-card-title">
          {name}
        </h3>
        
        <div style={{ marginBottom: '1rem' }}>
          {keySpecs.map(([key, value]) => (
            <div key={key} className="spco-flex" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              <span style={{ color: 'var(--gray-600)', fontWeight: '500', minWidth: '120px' }}>{key}:</span>
              <span style={{ color: 'var(--tertiary-color)' }}>{value}</span>
            </div>
          ))}
        </div>
        
        <div className="spco-flex-between" style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--gray-200)' }}>
          <Link
            to={`/products/${category.toLowerCase().replace(/\s+/g, '-')}/${id}`}
            className="product-card-link"
          >
            View Details
            <ArrowRight style={{ height: '16px', width: '16px' }} />
          </Link>
          
          <Link
            to={`/contact?product=${encodeURIComponent(name)}`}
            style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--primary-color)', textDecoration: 'none' }}
          >
            Enquire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
