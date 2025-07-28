
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
    <section id="product-categories" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Product Categories</h2>
          <p className="section-subtitle mx-auto">
            Explore our comprehensive range of high-quality hardware components designed for various industrial applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {categories.map((category) => (
            <Link key={category.id} to={category.link} className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 h-full">
                <div className="h-48 overflow-hidden bg-neutral-100">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold text-spco-700 group-hover:text-spco-800 transition-colors">
                    {category.name}
                  </h3>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-neutral-600 text-sm line-clamp-3">
                    {category.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="text-spco-600 group-hover:text-spco-800 font-medium text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    Explore Category
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* <div className="text-center">
          <Button asChild size="lg">
            <Link to="/products">
              View All Products
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default ProductCategories;
