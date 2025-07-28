
import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import ProductCategories from "@/components/home/ProductCategories";
import Testimonials from "@/components/home/Testimonials";
import QuickContact from "@/components/home/QuickContact";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-index">
      <Header />
      <main className="main-content">
        <Hero />
        <Partners />
        <ProductCategories />
        <Testimonials />
        <QuickContact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
