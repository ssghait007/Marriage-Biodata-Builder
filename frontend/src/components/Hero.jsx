import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Users } from 'lucide-react';
import biodataImage_1 from '../assets/images/_images_examples_eg12.png';
import biodataImage_2 from '../assets/images/_images_examples_eg20.png';
import biodataImage_3 from '../assets/images/_images_examples_eg23.png';


const Hero = () => {

  const [isPhone, setIsPhone] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home" className="py-12 md:py-30 bg-gradient-to-b from-white to-gray-50 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-4xl font-serif font-bold text-rose-900 leading-tight mb-4">
              Create Your Perfect Marriage Biodata Now
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Create beautiful biodata for marriage with just a few clicks! Easy to use, fully customizable, elegantly designed marriage biodata formats
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* <a href="#create" className="btn-primary text-white bg-red-500 flex items-center justify-center px-6 py-3 rounded-md hover:bg-primary-600 transition-all duration-300 shadow-md ">
                Create My Biodata <ArrowRight size={18} className="ml-2" />
              </a> */}
              <a href="#create" className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-pink-500/25 hover:scale-105">
                Start Creating Now
              </a>
              <a href="#templates" className="btn-secondary border border-black flex items-center justify-center px-6 py-3 rounded-full text-lg hover:bg-pink-900 hover:text-white transition-all duration-300 shadow-md ">
                View Popular Templates
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 relative">

            {isPhone ? (
              <div>
                <img src={biodataImage_1} alt="Marriage Biodata Templates" className="w-full h-auto rounded-lg shadow-xl" />
              </div>

            ) : (
              <div className="relative w-full max-w-2xl mx-auto h-[300px] hover:scale-105 transition-all duration-500">

                {/* Template 1 - Back */}
                <div className="absolute top-6 left-10 transform -rotate-10">
                  <img
                    src={biodataImage_2}
                    alt="Marriage Biodata Templates"
                    className="w-[200px] h-auto rounded-lg shadow-xl"
                  />
                </div>

                {/* Template 2 - Middle */}
                <div className="absolute top-6 right-10 transform rotate-10">

                  <img
                    src={biodataImage_1}
                    alt="Marriage Biodata Templates"
                    className="w-[200px] h-auto rounded-lg shadow-xl"
                  />
                </div>

                {/* Template 3 - Front */}
                <div className="absolute top-0 left-50 transform">

                  <img
                    src={biodataImage_3}
                    alt="Marriage Biodata Templates"
                    className="w-[220px] h-auto rounded-lg shadow-xl"
                  />
                </div>

              </div>

            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;