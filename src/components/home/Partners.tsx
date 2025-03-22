
const Partners = () => {
  const partners = [
    {
      name: "SKF",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d4/SKF-Logo.svg"
    },
    {
      name: "FAG",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Schaeffler_logo.svg"
    },
    {
      name: "NSK",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/dd/NSK_company_logo.svg"
    },
    {
      name: "NTN",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/NTN_logo.svg"
    },
    {
      name: "Timken",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/71/Timken-Logo.svg"
    },
    {
      name: "KOYO",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/JTEKT_logo.svg"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="section-title">Our Partner Brands</h2>
          <p className="section-subtitle mx-auto">
            We partner with the world's leading manufacturers to bring you the highest quality hardware components.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-neutral-100 shadow-sm hover:shadow-md transition-custom flex items-center justify-center h-28"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-12 max-w-[120px] object-contain opacity-80 hover:opacity-100 transition-custom"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
