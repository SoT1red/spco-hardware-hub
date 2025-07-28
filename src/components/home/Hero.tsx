import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const Hero = () => {
  return <section className="index-hero">
      <div className="spco-container">
        <div className="index-hero-content spco-fade-in-up">
          <div className="index-hero-text">
            <div className="index-hero-badge">
              Premium Hardware Distributor
            </div>
            <h1 className="index-hero-title">
              <span className="block">Where Precision</span>
              <span className="block highlight">Meets Performance</span>
            </h1>
            <p className="index-hero-description">
              SPCO provides premium quality bearings, lubricants, and hardware components that keep your machinery running at peak performance.
            </p>
            
            <div className="index-hero-actions">
              <Link to="/contact" className="spco-btn spco-btn-primary spco-btn-large">
                Enquire Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/products" className="spco-btn spco-btn-outline spco-btn-large">
                Browse Products
              </Link>
            </div>
            
            <div className="index-hero-partners">
              <p className="index-hero-partners-text">Trusted by industry leaders</p>
              <div className="index-hero-partners-logos">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Tata_logo.svg" alt="Tata" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Mahindra_%26_Mahindra-Logo.svg" alt="Mahindra" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Larsen_%26_Toubro_Logo.svg" alt="L&T" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Bharat_Heavy_Electricals_Limited_Logo.svg" alt="BHEL" />
              </div>
            </div>
          </div>
          
          <div className="index-hero-image spco-fade-in">
            <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2670&auto=format&fit=crop" alt="Industrial bearings" />
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;