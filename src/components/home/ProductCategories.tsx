
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface CategoryWithProducts {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  products: ProductItem[];
}

const ProductCategories = () => {
  const categories: CategoryWithProducts[] = [
    {
      id: "ball-bearings",
      name: "Ball Bearings",
      description: "Precision engineered ball bearings for reduced friction and smooth operation.",
      image: "https://images.unsplash.com/photo-1626252652871-1ad083beca5a?q=80&w=2070&auto=format&fit=crop",
      link: "/products/ball-bearings",
      products: [
        {
          id: "deep-groove-ball-bearing",
          name: "Deep Groove Ball Bearing",
          description: "General purpose bearing for high-speed applications with minimal friction",
          image: "https://images.unsplash.com/photo-1626252652871-1ad083beca5a?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: "angular-contact-ball-bearing",
          name: "Angular Contact Ball Bearing",
          description: "Designed to withstand combined radial and axial loads",
          image: "https://images.unsplash.com/photo-1626252652871-1ad083beca5a?q=80&w=2070&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "roller-bearings",
      name: "Roller Bearings",
      description: "Heavy-duty roller bearings designed for superior load capacity and durability.",
      image: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?q=80&w=2070&auto=format&fit=crop",
      link: "/products/roller-bearings",
      products: [
        {
          id: "cylindrical-roller-bearing",
          name: "Cylindrical Roller Bearing",
          description: "High load capacity for industrial applications",
          image: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: "tapered-roller-bearing",
          name: "Tapered Roller Bearing",
          description: "Ideal for combined loads at moderate speeds",
          image: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?q=80&w=2070&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "lubricants",
      name: "Lubricants",
      description: "High-performance lubricants that extend component life and reduce maintenance.",
      image: "https://images.unsplash.com/photo-1635372722656-389f87a941db?q=80&w=1974&auto=format&fit=crop",
      link: "/products/lubricants",
      products: [
        {
          id: "synthetic-grease",
          name: "Synthetic Grease",
          description: "Premium long-lasting lubrication for extreme conditions",
          image: "https://images.unsplash.com/photo-1635372722656-389f87a941db?q=80&w=1974&auto=format&fit=crop"
        },
        {
          id: "mineral-oil",
          name: "Mineral Oil",
          description: "Standard lubrication for general industrial applications",
          image: "https://images.unsplash.com/photo-1635372722656-389f87a941db?q=80&w=1974&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "seals",
      name: "Seals",
      description: "Industrial seals that prevent contamination and retain lubricant in critical systems.",
      image: "https://images.unsplash.com/photo-1521582738928-ba26c0ab41d6?q=80&w=2070&auto=format&fit=crop",
      link: "/products/seals",
      products: [
        {
          id: "radial-shaft-seal",
          name: "Radial Shaft Seal",
          description: "Prevents lubricant leakage in rotating machinery",
          image: "https://images.unsplash.com/photo-1521582738928-ba26c0ab41d6?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: "v-ring-seal",
          name: "V-Ring Seal",
          description: "Flexible all-rubber seal for shaft protection",
          image: "https://images.unsplash.com/photo-1521582738928-ba26c0ab41d6?q=80&w=2070&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "tools",
      name: "Tools",
      description: "Specialized tools for proper installation and maintenance of bearings and related components.",
      image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2070&auto=format&fit=crop",
      link: "/products/tools",
      products: [
        {
          id: "bearing-puller",
          name: "Bearing Puller",
          description: "Safe removal of bearings without damage",
          image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: "induction-heater",
          name: "Induction Heater",
          description: "Controlled heating for bearing installation",
          image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2070&auto=format&fit=crop"
        }
      ]
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

        <div className="space-y-16">
          {categories.map((category, index) => (
            <div key={index} className="fade-in-stagger">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-display font-semibold text-spco-700">
                    {category.name}
                  </h3>
                  <p className="text-neutral-600 mt-1">
                    {category.description}
                  </p>
                </div>
                <Link 
                  to={category.link}
                  className="text-spco-600 hover:text-spco-700 font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-custom group">
                    <div className="h-48 overflow-hidden bg-neutral-100">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <h4 className="text-lg font-medium text-spco-700">{product.name}</h4>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-neutral-600 text-sm">{product.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between">
                      <Link 
                        to={`/products/${category.id}/${product.id}`}
                        className="text-spco-600 hover:text-spco-800 font-medium text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        View Details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
                
                <Card className="overflow-hidden border border-dashed border-neutral-300 bg-transparent flex items-center justify-center">
                  <CardContent className="text-center py-10">
                    <h4 className="text-lg font-medium text-spco-700 mb-2">More {category.name}</h4>
                    <p className="text-neutral-600 text-sm mb-4">Explore our complete range of {category.name.toLowerCase()}</p>
                    <Button asChild variant="outline">
                      <Link to={category.link}>
                        Browse All {category.name}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link to="/products">
              View All Products
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
