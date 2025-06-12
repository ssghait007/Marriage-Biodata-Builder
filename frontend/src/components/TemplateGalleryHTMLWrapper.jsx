import React, { useEffect, useRef } from 'react';

const TemplateGalleryHTMLWrapper = ({ selectedTemplate }) => {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    // Load the HTML template scripts dynamically
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeGallery = async () => {
      try {
        // Load the template generator first
        await loadScript('/src/components/BiodataTemplateHTML.js');
        // Then load the gallery
        await loadScript('/src/components/TemplateGalleryHTML.js');
        
        // Initialize the gallery
        if (window.TemplateGalleryHTML && containerRef.current) {
          galleryRef.current = new window.TemplateGalleryHTML(containerRef.current.id, {
            onTemplateSelect: (template) => {
              console.log('Selected template:', template);
              if (selectedTemplate) {
                selectedTemplate(template);
              }
            }
          });
        }
      } catch (error) {
        console.error('Failed to load HTML template gallery:', error);
      }
    };

    initializeGallery();

    // Cleanup
    return () => {
      if (galleryRef.current) {
        // Clean up event listeners if needed
        window.removeEventListener('resize', galleryRef.current.handleResize);
      }
    };
  }, [selectedTemplate]);

  return (
    <div 
      ref={containerRef} 
      id="html-template-gallery" 
      className="w-full"
    />
  );
};

export default TemplateGalleryHTMLWrapper;
