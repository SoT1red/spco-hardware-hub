
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/common/Breadcrumb";
import ContactForm from "@/components/common/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <section className="bg-neutral-50 border-b border-neutral-200">
          <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={[{ label: "Contact" }]} className="mb-4" />
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-spco-800 mb-2">Contact Us</h1>
            <p className="text-neutral-600 max-w-3xl">
              Have questions about our products or services? Our team is here to help. Reach out to us through any of the channels below.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-neutral-50 rounded-lg p-6 shadow-sm border border-neutral-100 h-full">
                  <h2 className="text-xl font-display font-semibold text-spco-800 mb-6">
                    Contact Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-spco-50 p-2 rounded-full mr-4">
                        <MapPin className="h-5 w-5 text-spco-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-spco-700 mb-1">Address</h3>
                        <p className="text-neutral-600">
                          SPCO Headquarters<br />
                          123 Industrial Avenue<br />
                          Andheri East, Mumbai 400093<br />
                          Maharashtra, India
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-spco-50 p-2 rounded-full mr-4">
                        <Phone className="h-5 w-5 text-spco-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-spco-700 mb-1">Phone</h3>
                        <p className="text-neutral-600">
                          Main: +91 22 1234 5678<br />
                          Sales: +91 22 8765 4321<br />
                          Technical Support: +91 22 2468 1357
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-spco-50 p-2 rounded-full mr-4">
                        <Mail className="h-5 w-5 text-spco-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-spco-700 mb-1">Email</h3>
                        <p className="text-neutral-600">
                          General Inquiries: info@spco-hardware.com<br />
                          Sales: sales@spco-hardware.com<br />
                          Technical Support: support@spco-hardware.com
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-spco-50 p-2 rounded-full mr-4">
                        <Clock className="h-5 w-5 text-spco-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-spco-700 mb-1">Business Hours</h3>
                        <p className="text-neutral-600">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 9:00 AM - 1:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-neutral-200">
                    <h3 className="font-medium text-spco-700 mb-3">
                      Connect with Us
                    </h3>
                    <div className="flex space-x-3">
                      <a href="#" className="bg-spco-100 hover:bg-spco-200 p-2 rounded-full transition-custom">
                        <svg className="h-5 w-5 text-spco-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-spco-100 hover:bg-spco-200 p-2 rounded-full transition-custom">
                        <svg className="h-5 w-5 text-spco-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="bg-spco-100 hover:bg-spco-200 p-2 rounded-full transition-custom">
                        <svg className="h-5 w-5 text-spco-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-spco-100 hover:bg-spco-200 p-2 rounded-full transition-custom">
                        <svg className="h-5 w-5 text-spco-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-100">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="section-title">Our Location</h2>
              <p className="section-subtitle mx-auto">
                Visit our headquarters in Mumbai, India.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60341.901161563734!2d72.84900694863279!3d19.108911599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c839e76fe01b%3A0x1466c6b5bd609eb9!2sAndheri%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1714231123292!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Industry Specialists */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="section-title">Industry Specialists</h2>
              <p className="section-subtitle mx-auto">
                Connect directly with our experts specialized in your industry.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Automotive', 'Manufacturing', 'Heavy Machinery'].map((industry, index) => (
                <div key={index} className="bg-neutral-50 rounded-lg p-6 shadow-sm border border-neutral-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-spco-100 p-3 rounded-full">
                      <svg className="h-6 w-6 text-spco-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-spco-700">{industry} Specialist</h3>
                      <p className="text-sm text-neutral-600">Technical Expert</p>
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 mb-4">
                    Specialized in providing solutions for {industry.toLowerCase()} applications with over 10 years of industry experience.
                  </p>
                  
                  <div className="flex flex-col space-y-2">
                    <a href={`tel:+91221234${5678 + index}`} className="inline-flex items-center text-spco-600 hover:text-spco-700 transition-custom">
                      <Phone className="h-4 w-4 mr-2" />
                      +91 22 1234 {5678 + index}
                    </a>
                    <a href={`mailto:${industry.toLowerCase()}@spco-hardware.com`} className="inline-flex items-center text-spco-600 hover:text-spco-700 transition-custom">
                      <Mail className="h-4 w-4 mr-2" />
                      {industry.toLowerCase()}@spco-hardware.com
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-subtitle mx-auto">
                  Find quick answers to common questions about our products and services.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    question: "What is the standard delivery time for orders?",
                    answer: "Standard delivery time for in-stock items is 3-5 business days across major cities in India. For remote locations, delivery may take 5-7 business days. Express delivery options are also available upon request."
                  },
                  {
                    question: "Do you provide technical support for product selection?",
                    answer: "Yes, our team of technical experts is available to help you select the right products for your specific applications. They can provide detailed specifications, compatibility information, and application advice."
                  },
                  {
                    question: "What payment methods do you accept?",
                    answer: "We accept various payment methods including bank transfers, credit/debit cards, and digital payment platforms. For regular business customers, we also offer credit terms upon approval."
                  },
                  {
                    question: "Can I request product samples before placing a bulk order?",
                    answer: "Yes, we can provide product samples for evaluation before large orders. Please contact our sales team with your specific requirements to arrange for samples."
                  },
                  {
                    question: "Do you offer customized solutions for specific applications?",
                    answer: "Absolutely. We work closely with customers to understand their unique requirements and can recommend or source specialized products to meet specific application needs."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer p-6">
                        <h3 className="text-lg font-medium text-spco-700">{faq.question}</h3>
                        <span className="transition-transform duration-300 group-open:rotate-180">
                          <svg className="h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <div className="px-6 pb-6 pt-0 text-neutral-600">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-neutral-600 mb-4">
                  Don't see your question here? Reach out to us directly.
                </p>
                <a href="mailto:info@spco-hardware.com" className="btn-primary">
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
