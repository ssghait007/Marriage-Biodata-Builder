import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

const BiodataTemplate = ({ colorScheme, title, Username, handleSelectTemplate }) => {

  const colors = {
    amber: {
      gradient: 'from-amber-50 via-yellow-50 to-orange-100',
      border: 'border-amber-400 shadow-amber-200',
      ornament: 'text-amber-500',
      heading: 'text-amber-700',
      subheading: 'text-amber-800',
      accent: 'bg-gradient-to-r from-amber-400 to-yellow-500',
      lightBg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
      lightBorder: 'border-amber-300',
      contactHeading: 'text-amber-900',
      button: 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg'
    },
    blue: {
      gradient: 'from-blue-50 via-sky-50 to-indigo-100',
      border: 'border-blue-400 shadow-blue-200',
      ornament: 'text-blue-500',
      heading: 'text-blue-700',
      subheading: 'text-blue-800',
      accent: 'bg-gradient-to-r from-blue-400 to-sky-500',
      lightBg: 'bg-gradient-to-br from-blue-50 to-sky-50',
      lightBorder: 'border-blue-300',
      contactHeading: 'text-blue-900',
      button: 'bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 shadow-lg'
    },
    green: {
      gradient: 'from-green-50 via-emerald-50 to-teal-100',
      border: 'border-green-400 shadow-green-200',
      ornament: 'text-green-500',
      heading: 'text-green-700',
      subheading: 'text-green-800',
      accent: 'bg-gradient-to-r from-green-400 to-emerald-500',
      lightBg: 'bg-gradient-to-br from-green-50 to-emerald-50',
      lightBorder: 'border-green-300',
      contactHeading: 'text-green-900',
      button: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg'
    },
    purple: {
      gradient: 'from-purple-50 via-violet-50 to-indigo-100',
      border: 'border-purple-400 shadow-purple-200',
      ornament: 'text-purple-500',
      heading: 'text-purple-700',
      subheading: 'text-purple-800',
      accent: 'bg-gradient-to-r from-purple-400 to-violet-500',
      lightBg: 'bg-gradient-to-br from-purple-50 to-violet-50',
      lightBorder: 'border-purple-300',
      contactHeading: 'text-purple-900',
      button: 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg'
    },
    rose: {
      gradient: 'from-rose-50 via-pink-50 to-red-100',
      border: 'border-rose-400 shadow-rose-200',
      ornament: 'text-rose-500',
      heading: 'text-rose-700',
      subheading: 'text-rose-800',
      accent: 'bg-gradient-to-r from-rose-400 to-pink-500',
      lightBg: 'bg-gradient-to-br from-rose-50 to-pink-50',
      lightBorder: 'border-rose-300',
      contactHeading: 'text-rose-900',
      button: 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg'
    },
    teal: {
      gradient: 'from-teal-50 via-cyan-50 to-blue-100',
      border: 'border-teal-400 shadow-teal-200',
      ornament: 'text-teal-500',
      heading: 'text-teal-700',
      subheading: 'text-teal-800',
      accent: 'bg-gradient-to-r from-teal-400 to-cyan-500',
      lightBg: 'bg-gradient-to-br from-teal-50 to-cyan-50',
      lightBorder: 'border-teal-300',
      contactHeading: 'text-teal-900',
      button: 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg'
    },
    orange: {
      gradient: 'from-orange-50 via-amber-50 to-red-100',
      border: 'border-orange-400 shadow-orange-200',
      ornament: 'text-orange-500',
      heading: 'text-orange-700',
      subheading: 'text-orange-800',
      accent: 'bg-gradient-to-r from-orange-400 to-red-500',
      lightBg: 'bg-gradient-to-br from-orange-50 to-amber-50',
      lightBorder: 'border-orange-300',
      contactHeading: 'text-orange-900',
      button: 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg'
    },
    indigo: {
      gradient: 'from-indigo-50 via-purple-50 to-blue-100',
      border: 'border-indigo-400 shadow-indigo-200',
      ornament: 'text-indigo-500',
      heading: 'text-indigo-700',
      subheading: 'text-indigo-800',
      accent: 'bg-gradient-to-r from-indigo-400 to-purple-500',
      lightBg: 'bg-gradient-to-br from-indigo-50 to-purple-50',
      lightBorder: 'border-indigo-300',
      contactHeading: 'text-indigo-900',
      button: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg'
    },
    red: {
      gradient: 'from-red-50 via-rose-50 to-pink-100',
      border: 'border-red-400 shadow-red-200',
      ornament: 'text-red-500',
      heading: 'text-red-700',
      subheading: 'text-red-800',
      accent: 'bg-gradient-to-r from-red-400 to-rose-500',
      lightBg: 'bg-gradient-to-br from-red-50 to-rose-50',
      lightBorder: 'border-red-300',
      contactHeading: 'text-red-900',
      button: 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg'
    },
    emerald: {
      gradient: 'from-emerald-50 via-green-50 to-teal-100',
      border: 'border-emerald-400 shadow-emerald-200',
      ornament: 'text-emerald-500',
      heading: 'text-emerald-700',
      subheading: 'text-emerald-800',
      accent: 'bg-gradient-to-r from-emerald-400 to-teal-500',
      lightBg: 'bg-gradient-to-br from-emerald-50 to-green-50',
      lightBorder: 'border-emerald-300',
      contactHeading: 'text-emerald-900',
      button: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg'
    }
  };

  const theme = colors[colorScheme];

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
    <div className="flex-shrink-0 w-full sm:w-96 md:w-80 lg:w-96 mx-2 group">

      {isPhone ? (
        <div
          onClick={() => handleSelectTemplate(theme)}
          className="flex-shrink-0 w-80 mx-2 group">
          <h3 className="text-center font-semibold mb-2 text-white">{title}</h3>
          <div className={`relative w-full bg-gradient-to-br ${theme.gradient} p-4 shadow-xl rounded-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105`}>
            {/* Main container with ornate border */}
            <div className={`relative bg-white border-2 ${theme.border} min-h-[500px] rounded transition-all duration-300 group-hover:border-opacity-80`}>

              {/* Corner ornaments - Top Left */}
              <div className="absolute top-0 left-0 w-8 h-8">
                <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                  <defs>
                    <linearGradient id="ornamentGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0.7}} />
                    </linearGradient>
                  </defs>
                  <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" fill="url(#ornamentGradient1)" />
                  <path d="M10 10 Q20 5 30 10 Q20 15 10 10 Z" fill="currentColor" opacity="0.6" />
                  <circle cx="25" cy="25" r="2" fill="currentColor" />
                  <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.8" />
                  <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5" />
                </svg>
              </div>

              {/* Corner ornaments - Top Right */}
              <div className="absolute top-0 right-0 w-8 h-8 transform rotate-90">
                <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                  <defs>
                    <linearGradient id="ornamentGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0.7}} />
                    </linearGradient>
                  </defs>
                  <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" fill="url(#ornamentGradient2)" />
                  <path d="M10 10 Q20 5 30 10 Q20 15 10 10 Z" fill="currentColor" opacity="0.6" />
                  <circle cx="25" cy="25" r="2" fill="currentColor" />
                  <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.8" />
                  <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5" />
                </svg>
              </div>

              {/* Corner ornaments - Bottom Right */}
              <div className="absolute bottom-0 right-0 w-8 h-8 transform rotate-180">
                <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                  <defs>
                    <linearGradient id="ornamentGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0.7}} />
                    </linearGradient>
                  </defs>
                  <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" fill="url(#ornamentGradient3)" />
                  <path d="M10 10 Q20 5 30 10 Q20 15 10 10 Z" fill="currentColor" opacity="0.6" />
                  <circle cx="25" cy="25" r="2" fill="currentColor" />
                  <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.8" />
                  <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5" />
                </svg>
              </div>

              {/* Corner ornaments - Bottom Left */}
              <div className="absolute bottom-0 left-0 w-8 h-8 transform -rotate-90">
                <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                  <defs>
                    <linearGradient id="ornamentGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0.7}} />
                    </linearGradient>
                  </defs>
                  <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" fill="url(#ornamentGradient4)" />
                  <path d="M10 10 Q20 5 30 10 Q20 15 10 10 Z" fill="currentColor" opacity="0.6" />
                  <circle cx="25" cy="25" r="2" fill="currentColor" />
                  <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.8" />
                  <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5" />
                </svg>
              </div>

              {/* Side ornaments - Top */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-6">
                <svg viewBox="0 0 128 48" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                  <defs>
                    <linearGradient id="sideGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 0.3}} />
                      <stop offset="50%" style={{stopColor: 'currentColor', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0.3}} />
                    </linearGradient>
                  </defs>
                  <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" fill="url(#sideGradient1)" />
                  <path d="M30 24 Q50 16 64 24 Q78 16 98 24 Q78 32 64 24 Q50 32 30 24 Z" fill="currentColor" opacity="0.4" />
                  <circle cx="64" cy="20" r="2" fill="currentColor" />
                  <circle cx="44" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
                  <circle cx="84" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
                  <circle cx="54" cy="18" r="1" fill="currentColor" opacity="0.4" />
                  <circle cx="74" cy="18" r="1" fill="currentColor" opacity="0.4" />
                </svg>
              </div>

              {/* Side ornaments - Bottom */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-180 w-16 h-6">
                <svg viewBox="0 0 128 48" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                  <defs>
                    <linearGradient id="sideGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 0.3}} />
                      <stop offset="50%" style={{stopColor: 'currentColor', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0.3}} />
                    </linearGradient>
                  </defs>
                  <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" fill="url(#sideGradient2)" />
                  <path d="M30 24 Q50 16 64 24 Q78 16 98 24 Q78 32 64 24 Q50 32 30 24 Z" fill="currentColor" opacity="0.4" />
                  <circle cx="64" cy="20" r="2" fill="currentColor" />
                  <circle cx="44" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
                  <circle cx="84" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
                  <circle cx="54" cy="18" r="1" fill="currentColor" opacity="0.4" />
                  <circle cx="74" cy="18" r="1" fill="currentColor" opacity="0.4" />
                </svg>
              </div>

              {/* Inner content area */}
              <div className="absolute inset-6 bg-white p-3">
                {/* Header */}
                <div className="text-center mb-3">
                  <h1 className={`text-sm font-bold ${theme.heading} mb-1`}>|| MARRIAGE BIODATA ||</h1>
                  <div className={`w-12 h-0.5 ${theme.accent} mx-auto`}></div>
                </div>

                {/* Main Content */}
                <div className="flex gap-3">
                  {/* Left Column - Photo */}
                  <div className="w-1/3">
                    <div className={`bg-gradient-to-br from-gray-50 to-gray-100 border ${theme.lightBorder} h-32 flex items-center justify-center mb-2 rounded-lg shadow-inner relative overflow-hidden`}>
                      {/* Decorative pattern background */}
                      <div className="absolute inset-0 opacity-5">
                        <svg width="100%" height="100%" viewBox="0 0 40 40" className={theme.ornament}>
                          <defs>
                            <pattern id="photoPatternMobile" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3"/>
                              <circle cx="5" cy="5" r="0.5" fill="currentColor" opacity="0.2"/>
                              <circle cx="15" cy="15" r="0.5" fill="currentColor" opacity="0.2"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#photoPatternMobile)"/>
                        </svg>
                      </div>
                      <div className="text-center text-gray-500 relative z-10">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-1 flex items-center justify-center shadow-sm border border-gray-300">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-xs font-medium">Photo</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="w-2/3 space-y-2 text-xs">
                    {/* Personal Information */}
                    <div>
                      <h2 className={`text-sm font-bold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>PERSONAL</h2>
                      <div className="grid grid-cols-1 gap-y-0.5">
                        <div><strong>Name:</strong> Priya Sharma</div>
                        <div><strong>DOB:</strong> 15th March, 1995</div>
                        <div><strong>Age:</strong> 28 Years</div>
                        <div><strong>Height:</strong> 5'4"</div>
                        <div><strong>Complexion:</strong> Fair</div>
                      </div>
                    </div>

                    {/* Educational & Professional */}
                    <div>
                      <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>PROFESSIONAL</h3>
                      <div className="grid grid-cols-1 gap-y-0.5">
                        <div><strong>Education:</strong> MBA Finance</div>
                        <div><strong>Profession:</strong> Financial Analyst</div>
                        <div><strong>Income:</strong> ₹8-10 Lakhs</div>
                      </div>
                    </div>

                    {/* Family Information */}
                    <div>
                      <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>FAMILY</h3>
                      <div className="grid grid-cols-1 gap-y-0.5">
                        <div><strong>Father:</strong> Mr. Rajesh Sharma</div>
                        <div><strong>Mother:</strong> Mrs. Sunita Sharma</div>
                        <div><strong>Siblings:</strong> 1 Brother</div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>CONTACT</h3>
                      <div className="grid grid-cols-1 gap-y-0.5">
                        <div><strong>Mobile:</strong> +91 98765</div>
                        <div><strong>Address:</strong> Delhi</div>
                      </div>
                    </div>

                    {/* Other Details */}
                    {/* <div>
                      <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>OTHER</h3>
                      <div className="grid grid-cols-1 gap-y-0.5">
                        <div><strong>Religion:</strong> Hindu</div>
                        <div><strong>Caste:</strong> Brahmin</div>
                        <div><strong>Mother Tongue:</strong> Hindi</div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Decorative dots */}
              <div className={`absolute top-3 left-3 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
              <div className={`absolute top-3 right-3 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
              <div className={`absolute bottom-3 left-3 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
              <div className={`absolute bottom-3 right-3 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-center font-semibold mb-2 text-white text-sm sm:text-base">{title}</h3>
          <div className={`relative w-full bg-gradient-to-br ${theme.gradient} p-2 sm:p-4 shadow-xl rounded-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105`}>
            {/* Select Template Button - Only visible on hover */}
            <div className="absolute inset-2 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
              <button
                onClick={() => handleSelectTemplate(theme)}
                className={`${theme.button} cursor-pointer text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:shadow-xl text-sm sm:text-base`}
              >
                Select Template
              </button>
            </div>

            {/* Main container with ornate border */}
            <div className={`relative bg-white border-2 ${theme.border} min-h-80 sm:min-h-[500px] rounded transition-all duration-300 group-hover:border-opacity-80`}>

              {/* Corner ornaments - Top Left */}
              <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8">
                <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                  <defs>
                    <linearGradient id="ornamentGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0.7}} />
                    </linearGradient>
                  </defs>
                  <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" fill="url(#ornamentGradient5)" />
                  <path d="M10 10 Q20 5 30 10 Q20 15 10 10 Z" fill="currentColor" opacity="0.6" />
                  <circle cx="25" cy="25" r="2" fill="currentColor" />
                  <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.8" />
                  <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5" />
                </svg>
              </div>

              {/* Corner ornaments - Top Right */}
              <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 transform rotate-90">
                <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                  <defs>
                    <linearGradient id="ornamentGradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0.7}} />
                    </linearGradient>
                  </defs>
                  <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" fill="url(#ornamentGradient6)" />
                  <path d="M10 10 Q20 5 30 10 Q20 15 10 10 Z" fill="currentColor" opacity="0.6" />
                  <circle cx="25" cy="25" r="2" fill="currentColor" />
                  <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.8" />
                  <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5" />
                </svg>
              </div>

              {/* Corner ornaments - Bottom Right */}
              <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 transform rotate-180">
                <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                  <defs>
                    <linearGradient id="ornamentGradient7" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0.7}} />
                    </linearGradient>
                  </defs>
                  <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" fill="url(#ornamentGradient7)" />
                  <path d="M10 10 Q20 5 30 10 Q20 15 10 10 Z" fill="currentColor" opacity="0.6" />
                  <circle cx="25" cy="25" r="2" fill="currentColor" />
                  <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.8" />
                  <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5" />
                </svg>
              </div>

              {/* Corner ornaments - Bottom Left */}
              <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 transform -rotate-90">
                <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                  <defs>
                    <linearGradient id="ornamentGradient8" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0.7}} />
                    </linearGradient>
                  </defs>
                  <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" fill="url(#ornamentGradient8)" />
                  <path d="M10 10 Q20 5 30 10 Q20 15 10 10 Z" fill="currentColor" opacity="0.6" />
                  <circle cx="25" cy="25" r="2" fill="currentColor" />
                  <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.8" />
                  <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5" />
                </svg>
              </div>

              {/* Side ornaments - Top */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-4 sm:w-16 sm:h-6">
                <svg viewBox="0 0 128 48" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                  <defs>
                    <linearGradient id="sideGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 0.3}} />
                      <stop offset="50%" style={{stopColor: 'currentColor', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0.3}} />
                    </linearGradient>
                  </defs>
                  <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" fill="url(#sideGradient3)" />
                  <path d="M30 24 Q50 16 64 24 Q78 16 98 24 Q78 32 64 24 Q50 32 30 24 Z" fill="currentColor" opacity="0.4" />
                  <circle cx="64" cy="20" r="2" fill="currentColor" />
                  <circle cx="44" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
                  <circle cx="84" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
                  <circle cx="54" cy="18" r="1" fill="currentColor" opacity="0.4" />
                  <circle cx="74" cy="18" r="1" fill="currentColor" opacity="0.4" />
                </svg>
              </div>

              {/* Side ornaments - Bottom */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-180 w-12 h-4 sm:w-16 sm:h-6">
                <svg viewBox="0 0 128 48" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                  <defs>
                    <linearGradient id="sideGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 0.3}} />
                      <stop offset="50%" style={{stopColor: 'currentColor', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0.3}} />
                    </linearGradient>
                  </defs>
                  <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" fill="url(#sideGradient4)" />
                  <path d="M30 24 Q50 16 64 24 Q78 16 98 24 Q78 32 64 24 Q50 32 30 24 Z" fill="currentColor" opacity="0.4" />
                  <circle cx="64" cy="20" r="2" fill="currentColor" />
                  <circle cx="44" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
                  <circle cx="84" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
                  <circle cx="54" cy="18" r="1" fill="currentColor" opacity="0.4" />
                  <circle cx="74" cy="18" r="1" fill="currentColor" opacity="0.4" />
                </svg>
              </div>

              {/* Inner content area */}
              <div className="absolute inset-4 sm:inset-6 bg-white p-2 sm:p-3">
                {/* Header */}
                <div className="text-center mb-2 sm:mb-3">
                  <h1 className={`text-xs sm:text-sm font-bold ${theme.heading} mb-1`}>|| MARRIAGE BIODATA ||</h1>
                  <div className={`w-8 sm:w-12 h-0.5 ${theme.accent} mx-auto`}></div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {/* Photo Section */}
                  <div className="w-full sm:w-1/3">
                    <div className={`bg-gradient-to-br from-gray-50 to-gray-100 border ${theme.lightBorder} h-24 sm:h-32 flex items-center justify-center mb-2 rounded-lg shadow-inner relative overflow-hidden`}>
                      {/* Decorative pattern background */}
                      <div className="absolute inset-0 opacity-5">
                        <svg width="100%" height="100%" viewBox="0 0 40 40" className={theme.ornament}>
                          <defs>
                            <pattern id="photoPatternDesktop" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3"/>
                              <circle cx="5" cy="5" r="0.5" fill="currentColor" opacity="0.2"/>
                              <circle cx="15" cy="15" r="0.5" fill="currentColor" opacity="0.2"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#photoPatternDesktop)"/>
                        </svg>
                      </div>
                      <div className="text-center text-gray-500 relative z-10">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-1 flex items-center justify-center shadow-sm border border-gray-300">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-xs font-medium">Photo</p>
                      </div>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="w-full sm:w-2/3 space-y-1.5 sm:space-y-2 text-xs">
                    {/* Personal Information */}
                    <div>
                      <h2 className={`text-xs sm:text-sm font-bold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>PERSONAL</h2>
                      <div className="grid grid-cols-1 gap-y-0.5">
                        <div><strong>Name:</strong> {Username}</div>
                        <div><strong>DOB:</strong> 15th March, 1995</div>
                        <div><strong>Age:</strong> 28 Years</div>
                        <div><strong>Height:</strong> 5'4"</div>
                        <div><strong>Complexion:</strong> Fair</div>
                      </div>
                    </div>

                    {/* Educational & Professional */}
                    <div>
                      <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5 text-xs`}>PROFESSIONAL</h3>
                      <div className="grid grid-cols-1 gap-y-0.5">
                        <div><strong>Education:</strong> MBA Finance</div>
                        <div><strong>Profession:</strong> Financial Analyst</div>
                        <div><strong>Income:</strong> ₹8-10 Lakhs</div>
                      </div>
                    </div>

                    {/* Family Information */}
                    <div>
                      <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5 text-xs`}>FAMILY</h3>
                      <div className="grid grid-cols-1 gap-y-0.5">
                        <div><strong>Father:</strong> Mr. Rajesh Sharma</div>
                        <div><strong>Mother:</strong> Mrs. Sunita Sharma</div>
                        <div><strong>Siblings:</strong> 1 Brother</div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5 text-xs`}>CONTACT</h3>
                      <div className="grid grid-cols-1 gap-y-0.5">
                        <div><strong>Mobile:</strong> 9876543210</div>
                        <div><strong>Address:</strong> 123, Main Street, City</div>
                      </div>
                    </div>

                    {/* Other Details */}
                    {/* <div>
                      <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5 text-xs`}>OTHER</h3>
                      <div className="grid grid-cols-1 gap-y-0.5">
                        <div><strong>Religion:</strong> Hindu</div>
                        <div><strong>Caste:</strong> Brahmin</div>
                        <div><strong>Mother Tongue:</strong> Hindi</div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Decorative dots */}
              <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
              <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
              <div className={`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
              <div className={`absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


const MarriageBiodataGallery = ({ selectedTemplate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
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


  const templates = [
    { colorScheme: 'amber', title: 'Traditional Gold', image: '/api/placeholder/300/400', Username: 'Devanshu Patil' },
    { colorScheme: 'blue', title: 'Ocean Blue', image: '/api/placeholder/300/400', Username: 'Devanshu Patil' },
    { colorScheme: 'green', title: 'Forest Green', image: '/api/placeholder/300/400', Username: 'Devanshu Patil' },
    { colorScheme: 'purple', title: 'Royal Purple', image: '/api/placeholder/300/400', Username: 'Devanshu Patil' },
    { colorScheme: 'rose', title: 'Rose Pink', image: '/api/placeholder/300/400', Username: 'Devanshu Patil' },
    { colorScheme: 'teal', title: 'Teal Elegance', image: '/api/placeholder/300/400', Username: 'Devanshu Patil' },
    { colorScheme: 'orange', title: 'Sunset Orange', image: '/api/placeholder/300/400', name: 'Devanshu Patil' },
    { colorScheme: 'indigo', title: 'Deep Indigo', image: '/api/placeholder/300/400' },
    { colorScheme: 'red', title: 'Classic Red', image: '/api/placeholder/300/400' },
    { colorScheme: 'emerald', title: 'Emerald Green', image: '/api/placeholder/300/400' },
  ];

  const handleTemplateSelect = (template) => {
    selectedTemplate(template);
    window.scrollTo({ top: document.getElementById('create').offsetTop, behavior: 'smooth' });
  };



  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, templates.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, templates.length - 2)) % Math.max(1, templates.length - 2));
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


          {/* Templates Grid */}
          {isPhone ? (
            <div className="overflow-x-auto pb-4">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 20}%)` }}
              >                  {templates.map((template, index) => (
                <BiodataTemplate
                  key={index}
                  colorScheme={template.colorScheme}
                  title={template.title}
                  Username={template.Username}
                  handleSelectTemplate={() => handleTemplateSelect(template)}
                />
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
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 25}%)` }}
                >
                  {templates.map((template, index) => (

                    <div key={index}>
                      <BiodataTemplate
                        key={index}
                        colorScheme={template.colorScheme}
                        title={template.title}
                        Username={template.Username}
                        handleSelectTemplate={() => handleTemplateSelect(template)}
                      />

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
        </div>
      </div>
    </div>
  );
};

export default MarriageBiodataGallery;
