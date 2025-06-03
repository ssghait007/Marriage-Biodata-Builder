import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, User } from 'lucide-react';

const MarriageBiodataGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const templates = [
    {
      id: 1,
      name: "Traditional Maroon",
      image: "/api/placeholder/300/400",
      style: "bg-gradient-to-br from-red-900 to-red-700",
      features: ["Traditional Design", "Gold Accents", "Family Details"]
    },
    {
      id: 2,
      name: "Elegant Yellow",
      image: "/api/placeholder/300/400",
      style: "bg-gradient-to-br from-yellow-400 to-orange-500",
      features: ["Modern Layout", "Clean Typography", "Photo Focus"]
    },
    {
      id: 3,
      name: "Royal Green",
      image: "/api/placeholder/300/400",
      style: "bg-gradient-to-br from-green-800 to-teal-700",
      features: ["Premium Design", "Ornate Borders", "Detailed Info"]
    },
    {
      id: 4,
      name: "Classic Red",
      image: "/api/placeholder/300/400",
      style: "bg-gradient-to-br from-red-800 to-red-900",
      features: ["Traditional Style", "Golden Elements", "Complete Profile"]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, templates.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, templates.length - 2)) % Math.max(1, templates.length - 2));
  };

  return (
    <div id="templates" className="py-10 md:py-15 bg-gradient-to-b from-white to-gray-50">
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-red-900 to-pink-800">
        {/* Hero Section */}
        <div className="text-center py-16 px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Marriage Biodata Template Gallery
          </h1>
          <p className="text-xl text-pink-200 max-w-3xl mx-auto leading-relaxed">
            Create beautiful, professional marriage biodata with our premium templates.
            Choose from our collection of elegantly designed formats.
          </p>
        </div>

        {/* Gallery Section */}
        <div className="container mx-auto px-4 pb-16">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Templates Grid */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 25}%)` }}
              >
                {templates.map((template, index) => (
                  <div key={template.id} className="w-1/4 flex-shrink-0 px-4">
                    <div className="group cursor-pointer">
                      {/* Template Card */}
                      <div className={`${template.style} rounded-2xl p-8 h-96 shadow-2xl transform group-hover:scale-105 transition-all duration-300 relative overflow-hidden`}>
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                          <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white rounded-full"></div>
                          <div className="absolute bottom-4 right-4 w-12 h-12 border border-white rotate-45"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col">
                          {/* Header */}
                          <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                              <User className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-white text-xl font-bold">PRIYANKA SINGHANIA</h3>
                            <div className="w-16 h-0.5 bg-white/50 mx-auto mt-2"></div>
                          </div>

                          {/* Personal Details Section */}
                          <div className="flex-1 text-white text-sm space-y-2">
                            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                              <h4 className="font-semibold text-yellow-200 mb-2">Personal Details</h4>
                              <div className="grid grid-cols-2 gap-1 text-xs">
                                <div>Name:</div><div>Krishna Singhania</div>
                                <div>DOB:</div><div>April 3, 1995</div>
                                <div>Time:</div><div>10:10 AM</div>
                                <div>Place:</div><div>Ahmedabad</div>
                              </div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                              <h4 className="font-semibold text-yellow-200 mb-2">Family Details</h4>
                              <div className="text-xs space-y-1">
                                <div>Father: Devdatt Singhania</div>
                                <div>Mother: Devki Singhania</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Template Info */}
                      <div className="mt-6 text-center">
                        <h3 className="text-white text-xl font-bold mb-2">{template.name}</h3>
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          {template.features.map((feature, idx) => (
                            <span key={idx} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-2 rounded-full transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
                          Use This Template
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-3 mt-8">
              {Array.from({ length: Math.max(1, templates.length - 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white shadow-lg' : 'bg-white/30'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Create Your Perfect Biodata?</h2>
            <p className="text-pink-200 text-lg mb-8 max-w-2xl mx-auto">
              Choose from our premium templates and create a professional marriage biodata in minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cursor-pointer bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-pink-500/25 hover:scale-105">
                Start Creating Now
              </button>
              <button className="cursor-pointer border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
                View All Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarriageBiodataGallery;