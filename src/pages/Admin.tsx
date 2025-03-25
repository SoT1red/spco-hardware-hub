
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import HeroEditor from "@/components/admin/HeroEditor";
import PartnersEditor from "@/components/admin/PartnersEditor";
import TestimonialsEditor from "@/components/admin/TestimonialsEditor";
import ProductCategoriesEditor from "@/components/admin/ProductCategoriesEditor";
import IndustriesEditor from "@/components/admin/IndustriesEditor";
import ProductsEditor from "@/components/admin/ProductsEditor";
import ContactInfoEditor from "@/components/admin/ContactInfoEditor";
import FAQsEditor from "@/components/admin/FAQsEditor";
import GeneralContentEditor from "@/components/admin/GeneralContentEditor";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const { toast } = useToast();

  // Simple auth check - In a real app, you'd have more robust authentication
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Very simple password check - replace with proper auth in production
    if (password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Logged in successfully",
        description: "Welcome to the CMS admin panel",
      });
    } else {
      toast({
        title: "Invalid password",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-neutral-50">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-spco-600 text-white p-2 rounded-md hover:bg-spco-700"
              >
                Login
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">SPCO Content Management System</h1>
          <p className="text-neutral-600 mb-8">
            Edit website content, images, and text from this admin panel. Changes will be reflected on the live site.
          </p>

          <Tabs defaultValue="hero" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 mb-8">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="partners">Partners</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="productCategories">Product Categories</TabsTrigger>
              <TabsTrigger value="industries">Industries</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="contactInfo">Contact Info</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="general">General Content</TabsTrigger>
            </TabsList>

            <TabsContent value="hero" className="bg-white p-6 rounded-lg shadow">
              <HeroEditor />
            </TabsContent>
            
            <TabsContent value="partners" className="bg-white p-6 rounded-lg shadow">
              <PartnersEditor />
            </TabsContent>
            
            <TabsContent value="testimonials" className="bg-white p-6 rounded-lg shadow">
              <TestimonialsEditor />
            </TabsContent>
            
            <TabsContent value="productCategories" className="bg-white p-6 rounded-lg shadow">
              <ProductCategoriesEditor />
            </TabsContent>
            
            <TabsContent value="industries" className="bg-white p-6 rounded-lg shadow">
              <IndustriesEditor />
            </TabsContent>
            
            <TabsContent value="products" className="bg-white p-6 rounded-lg shadow">
              <ProductsEditor />
            </TabsContent>
            
            <TabsContent value="contactInfo" className="bg-white p-6 rounded-lg shadow">
              <ContactInfoEditor />
            </TabsContent>
            
            <TabsContent value="faqs" className="bg-white p-6 rounded-lg shadow">
              <FAQsEditor />
            </TabsContent>
            
            <TabsContent value="general" className="bg-white p-6 rounded-lg shadow">
              <GeneralContentEditor />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
