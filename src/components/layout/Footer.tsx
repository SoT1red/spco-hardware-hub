import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, Linkedin, Facebook, Twitter } from "lucide-react";
import spcoLogoDark from '@/assets/spco-logo-dark.png';
const Footer = () => {
  return <footer className="bg-spco-800 text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src={spcoLogoDark} alt="SPCO Hardware" className="h-8 w-auto" />
            </div>
            <p className="text-neutral-300 text-sm">
              Leading distributor of premium hardware components, providing quality bearings, lubricants and hardware supplies to industries across India.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-spco-700 hover:bg-spco-600 p-2 rounded-full transition-custom">
                <Linkedin size={16} />
              </a>
              <a href="#" className="bg-spco-700 hover:bg-spco-600 p-2 rounded-full transition-custom">
                <Facebook size={16} />
              </a>
              <a href="#" className="bg-spco-700 hover:bg-spco-600 p-2 rounded-full transition-custom">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-neutral-300 hover:text-white transition-custom flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Products
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-neutral-300 hover:text-white transition-custom flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-custom flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-custom flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-display font-medium text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 text-accent-500 mr-3 flex-shrink-0" />
                <span className="text-neutral-300">
                  SPCO Headquarters, Mumbai, Maharashtra, India
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-accent-500 mr-3 flex-shrink-0" />
                <span className="text-neutral-300">+91 22 1234 5678</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-accent-500 mr-3 flex-shrink-0" />
                <span className="text-neutral-300">info@spco-hardware.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          
        </div>

        <div className="border-t border-spco-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              &copy; {new Date().getFullYear()} SPCO Hardware. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-neutral-400 hover:text-white text-sm transition-custom">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-neutral-400 hover:text-white text-sm transition-custom">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;