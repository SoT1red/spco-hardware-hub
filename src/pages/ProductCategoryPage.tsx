
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductGrid from "@/components/products/ProductGrid";
import { Product } from "@/components/products/ProductCard";
import { getProductsByCategory } from "@/lib/data";

const ProductCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts or category changes
    window.scrollTo(0, 0);
    setLoading(true);
    
    if (category) {
      const categoryProducts = getProductsByCategory(category);
      if (categoryProducts.length > 0) {
        setProducts(categoryProducts);
      } else {
        // If no products found for category, redirect to main products page
        navigate("/products", { replace: true });
      }
    }
    
    setLoading(false);
  }, [category, navigate]);

  // Format category name for display (e.g., "ball-bearings" -> "Ball Bearings")
  const formatCategoryName = (categorySlug: string) => {
    return categorySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const categoryName = category ? formatCategoryName(category) : "Products";

  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: categoryName }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-neutral-200 rounded mb-4"></div>
            <div className="h-4 w-48 bg-neutral-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="bg-neutral-50 border-b border-neutral-200">
          <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} className="mb-4" />
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-spco-800 mb-2">
              {categoryName}
            </h1>
            <p className="text-neutral-600">
              Explore our range of high-quality {categoryName.toLowerCase()} designed for optimal performance in various industrial applications.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-spco-700 mb-4">
              Available {categoryName}
            </h2>
            <p className="text-neutral-600 max-w-3xl">
              Browse our selection of {categoryName.toLowerCase()} below. Each product is engineered to meet the highest standards of quality and performance.
            </p>
          </div>
          
          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductCategoryPage;
