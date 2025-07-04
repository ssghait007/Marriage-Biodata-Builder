import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MarriageBiodataGallery = ({ selectedTemplate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPhone, setIsPhone] = useState(window.innerWidth < 768);
  const [viewingTemplate, setViewingTemplate] = useState(null);

  // Dynamically load all template images from the TemplatesImage directory
  const [templateImages, setTemplateImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to dynamically import all images from TemplatesImage directory
  const loadTemplateImages = async () => {
    setIsLoading(true);
    try {
      // Use Vite's import.meta.glob to dynamically import all images
      const imageModules = import.meta.glob('/src/assets/TemplatesImage/*.{png,jpg,jpeg,gif,webp}', { eager: true });
      
      const imagePaths = Object.keys(imageModules).map(path => {
        // For Vite, we need to get the default export which contains the processed image URL
        return imageModules[path].default || path;
      }).sort(); // Sort to maintain consistent order
      
      setTemplateImages(imagePaths);
    } catch (error) {
      console.error('Error loading template images:', error);
      // Fallback to manual list if dynamic loading fails
      setTemplateImages([
        '/src/assets/TemplatesImage/template.png',
        '/src/assets/TemplatesImage/template (copy).png',
        '/src/assets/TemplatesImage/template (another copy).png'
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamically generate template configurations based on loaded images
  const generateTemplateConfigs = (imageCount) => {
    const templateNames = [
      'Classic Elegance', 'Royal Heritage', 'Modern Grace', 'Golden Tradition', 
      'Sacred Union', 'Divine Matrimony', 'Elegant Harmony', 'Traditional Bliss',
      'Contemporary Style', 'Graceful Design', 'Premium Format', 'Luxury Template',
      'Sophisticated Layout', 'Artistic Design', 'Professional Format', 'Stylish Template',
      'Beautiful Design', 'Elegant Format', 'Modern Layout', 'Classic Style'
    ];
    
    const colorSchemes = ['blue', 'purple', 'green', 'amber', 'rose', 'indigo', 'teal', 'orange'];
    const descriptions = [
      'Traditional design with elegant borders',
      'Regal design with ornate decorations', 
      'Contemporary layout with clean lines',
      'Warm theme with traditional elements',
      'Traditional design with religious symbols',
      'Divine design with spiritual elements',
      'Harmonious layout with elegant styling',
      'Blissful design with traditional touch',
      'Contemporary style with modern appeal',
      'Graceful design with artistic elements'
    ];

    return Array.from({ length: imageCount }, (_, index) => ({
      id: index + 1,
      title: templateNames[index % templateNames.length],
      colorScheme: colorSchemes[index % colorSchemes.length],
      description: descriptions[index % descriptions.length]
    }));
  };

  // Generate dynamic template configurations
  const templates = generateTemplateConfigs(templateImages.length);

  // Total number of slides to show (adjust based on how many templates fit on screen)
  const totalSlides = Math.max(1, templateImages.length - 2);

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Load template images when component mounts
    loadTemplateImages();

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleTemplateSelect = (templateNumber) => {
    // Find the selected template from our templates array
    const selectedTemplateData = templates.find(template => template.id === templateNumber);
    
    if (selectedTemplateData && selectedTemplate) {
      // Call the selectedTemplate function passed from App.jsx
      selectedTemplate(templateNumber);
      
      // Scroll to the form section
      const createSection = document.getElementById('create');
      if (createSection) {
        createSection.scrollIntoView({ behavior: 'smooth' });
      }
      
      console.log(`Template ${templateNumber} selected:`, selectedTemplateData);
    }
  };

  const handleViewTemplate = (templateIndex) => {
    setViewingTemplate({
      index: templateIndex,
      imageSrc: templateImages[templateIndex],
      title: templates[templateIndex]?.title || `Template ${templateIndex + 1}`,
      description: templates[templateIndex]?.description || 'Template preview'
    });
  };

  const closeTemplateView = () => {
    setViewingTemplate(null);
  };

  return (
    <div id="templates" className="py-10 bg-gradient-to-b from-white to-gray-50">
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

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white text-xl">Loading Templates...</p>
              </div>
            </div>
          ) : (
            <>
          {/* Templates Grid */}
          {isPhone ? (
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-4 px-4">
                {templateImages.map((imageSrc, idx) => (
                  <div 
                    key={idx}
                    className="flex-shrink-0 w-64 h-96 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105 relative group"
                  >
                    <img
                      src={imageSrc}
                      alt={`Template ${idx + 1}`}
                      className="w-full h-full "
                    />
                    {/* Template Action Buttons - Mobile */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                      <button 
                        onClick={() => handleViewTemplate(idx)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
                      >
                        View Template
                      </button>
                      <button 
                        onClick={() => handleTemplateSelect(idx + 1)}
                        className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
                      >
                        Select Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          ) : (
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black p-3 rounded-full transition-all duration-300 shadow-lg"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={nextSlide}
                className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black p-3 rounded-full transition-all duration-300 shadow-lg"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out gap-6"
                  style={{ transform: `translateX(-${currentSlide * 25}%)` }}
                >
                  {templateImages.map((imageSrc, i) => (
                    <div key={i} className="flex-shrink-0 w-80 h-130">
                      <div className="w-full h-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105 border border-gray-200 relative group">
                        <img
                          src={imageSrc}
                          alt={`Template ${i + 1}`}
                          className="w-90 h-130 "
                        />
                        {/* Template Action Buttons - Desktop */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                          <button 
                            onClick={() => handleViewTemplate(i)}
                            className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
                          >
                            View Template
                          </button>
                          <button 
                            onClick={() => handleTemplateSelect(i + 1)}
                            className="cursor-pointer bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
                          >
                            Select Template
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              {/* Dots Indicator */}
              <div className="flex justify-center space-x-3 mt-8">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white shadow-lg' : 'bg-white/30'
                      }`}
                  />
                ))}
              </div>
            </div>
          )}



          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Create Your Perfect Biodata?</h2>
            <p className="text-pink-200 text-lg mb-8 max-w-2xl mx-auto">
              Choose from our premium templates and create a professional marriage biodata in minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#create" className="cursor-pointer bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-pink-500/25 hover:scale-105">
                Start Creating Now
              </a>
              <a href="#templates" className="cursor-pointer border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
                View All Templates
              </a>
            </div>
          </div>
            </>
          )}
        </div>

        {/* Template View Modal */}
        {viewingTemplate && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-x-auto">
            <div className="relative max-w-5xl max-h-[95vh] w-full">
              {/* Close Button */}
              <button
                onClick={closeTemplateView}
                className="cursor-pointer absolute top-4 right-4 z-10 bg-black/40 hover:bg-white/80 text-black text-5xl font-bold w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              >
                ×
              </button>
              
              {/* Full Size Template Image */}
              <div className="flex justify-center items-center h-full ">
                <img
                  src={viewingTemplate.imageSrc}
                  alt={viewingTemplate.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarriageBiodataGallery;
