import React from 'react';

const BiodataTemplate = ({ colorScheme, title }) => {
  const colors = {
    amber: {
      gradient: 'from-amber-50 to-stone-100',
      border: 'border-amber-400',
      ornament: 'text-amber-400',
      heading: 'text-amber-600',
      subheading: 'text-amber-700',
      accent: 'bg-amber-400',
      lightBg: 'bg-amber-50',
      lightBorder: 'border-amber-200',
      contactHeading: 'text-amber-800',
      button: 'bg-amber-500 hover:bg-amber-600'
    },
    blue: {
      gradient: 'from-blue-50 to-slate-100',
      border: 'border-blue-400',
      ornament: 'text-blue-400',
      heading: 'text-blue-600',
      subheading: 'text-blue-700',
      accent: 'bg-blue-400',
      lightBg: 'bg-blue-50',
      lightBorder: 'border-blue-200',
      contactHeading: 'text-blue-800',
      button: 'bg-blue-500 hover:bg-blue-600'
    },
    green: {
      gradient: 'from-green-50 to-emerald-100',
      border: 'border-green-400',
      ornament: 'text-green-400',
      heading: 'text-green-600',
      subheading: 'text-green-700',
      accent: 'bg-green-400',
      lightBg: 'bg-green-50',
      lightBorder: 'border-green-200',
      contactHeading: 'text-green-800',
      button: 'bg-green-500 hover:bg-green-600'
    },
    purple: {
      gradient: 'from-purple-50 to-violet-100',
      border: 'border-purple-400',
      ornament: 'text-purple-400',
      heading: 'text-purple-600',
      subheading: 'text-purple-700',
      accent: 'bg-purple-400',
      lightBg: 'bg-purple-50',
      lightBorder: 'border-purple-200',
      contactHeading: 'text-purple-800',
      button: 'bg-purple-500 hover:bg-purple-600'
    },
    rose: {
      gradient: 'from-rose-50 to-pink-100',
      border: 'border-rose-400',
      ornament: 'text-rose-400',
      heading: 'text-rose-600',
      subheading: 'text-rose-700',
      accent: 'bg-rose-400',
      lightBg: 'bg-rose-50',
      lightBorder: 'border-rose-200',
      contactHeading: 'text-rose-800',
      button: 'bg-rose-500 hover:bg-rose-600'
    },
    teal: {
      gradient: 'from-teal-50 to-cyan-100',
      border: 'border-teal-400',
      ornament: 'text-teal-400',
      heading: 'text-teal-600',
      subheading: 'text-teal-700',
      accent: 'bg-teal-400',
      lightBg: 'bg-teal-50',
      lightBorder: 'border-teal-200',
      contactHeading: 'text-teal-800',
      button: 'bg-teal-500 hover:bg-teal-600'
    },
    orange: {
      gradient: 'from-orange-50 to-red-100',
      border: 'border-orange-400',
      ornament: 'text-orange-400',
      heading: 'text-orange-600',
      subheading: 'text-orange-700',
      accent: 'bg-orange-400',
      lightBg: 'bg-orange-50',
      lightBorder: 'border-orange-200',
      contactHeading: 'text-orange-800',
      button: 'bg-orange-500 hover:bg-orange-600'
    },
    indigo: {
      gradient: 'from-indigo-50 to-blue-100',
      border: 'border-indigo-400',
      ornament: 'text-indigo-400',
      heading: 'text-indigo-600',
      subheading: 'text-indigo-700',
      accent: 'bg-indigo-400',
      lightBg: 'bg-indigo-50',
      lightBorder: 'border-indigo-200',
      contactHeading: 'text-indigo-800',
      button: 'bg-indigo-500 hover:bg-indigo-600'
    },
    red: {
      gradient: 'from-red-50 to-rose-100',
      border: 'border-red-400',
      ornament: 'text-red-400',
      heading: 'text-red-600',
      subheading: 'text-red-700',
      accent: 'bg-red-400',
      lightBg: 'bg-red-50',
      lightBorder: 'border-red-200',
      contactHeading: 'text-red-800',
      button: 'bg-red-500 hover:bg-red-600'
    },
    emerald: {
      gradient: 'from-emerald-50 to-teal-100',
      border: 'border-emerald-400',
      ornament: 'text-emerald-400',
      heading: 'text-emerald-600',
      subheading: 'text-emerald-700',
      accent: 'bg-emerald-400',
      lightBg: 'bg-emerald-50',
      lightBorder: 'border-emerald-200',
      contactHeading: 'text-emerald-800',
      button: 'bg-emerald-500 hover:bg-emerald-600'
    }
  };

  const theme = colors[colorScheme];

  const handleSelectTemplate = () => {
    alert(`Selected ${title} template!`);
  };

  return (
    <div className="flex-shrink-0 w-80 mx-2 group">
      <h3 className="text-center font-semibold mb-2 text-gray-700">{title}</h3>
      <div className={`relative w-full bg-gradient-to-br ${theme.gradient} p-4 shadow-xl rounded-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105`}>
        {/* Select Template Button - Only visible on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
          <button
            onClick={handleSelectTemplate}
            className={`${theme.button} text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:shadow-xl`}
          >
            Select Template
          </button>
        </div>

        {/* Main container with ornate border */}
        <div className={`relative bg-white border-2 ${theme.border} h-96 overflow-hidden rounded transition-all duration-300 group-hover:border-opacity-80`}>
          
          {/* Corner ornaments - Top Left */}
          <div className="absolute top-0 left-0 w-8 h-8">
            <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current`}>
              <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
              <circle cx="25" cy="25" r="2" />
              <circle cx="15" cy="15" r="1.5" />
            </svg>
          </div>

          {/* Corner ornaments - Top Right */}
          <div className="absolute top-0 right-0 w-8 h-8 transform rotate-90">
            <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current`}>
              <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
              <circle cx="25" cy="25" r="2" />
              <circle cx="15" cy="15" r="1.5" />
            </svg>
          </div>

          {/* Corner ornaments - Bottom Right */}
          <div className="absolute bottom-0 right-0 w-8 h-8 transform rotate-180">
            <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current`}>
              <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
              <circle cx="25" cy="25" r="2" />
              <circle cx="15" cy="15" r="1.5" />
            </svg>
          </div>

          {/* Corner ornaments - Bottom Left */}
          <div className="absolute bottom-0 left-0 w-8 h-8 transform -rotate-90">
            <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current`}>
              <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
              <circle cx="25" cy="25" r="2" />
              <circle cx="15" cy="15" r="1.5" />
            </svg>
          </div>

          {/* Side ornaments - Top */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-6">
            <svg viewBox="0 0 128 48" className={`w-full h-full ${theme.ornament} fill-current`}>
              <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" />
              <circle cx="64" cy="20" r="2" />
            </svg>
          </div>

          {/* Side ornaments - Bottom */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-180 w-16 h-6">
            <svg viewBox="0 0 128 48" className={`w-full h-full ${theme.ornament} fill-current`}>
              <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" />
              <circle cx="64" cy="20" r="2" />
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
            <div className="flex gap-3 h-full">
              {/* Left Column - Photo */}
              <div className="w-1/3">
                <div className={`bg-gray-100 border ${theme.lightBorder} h-20 flex items-center justify-center mb-2`}>
                  <div className="text-center text-gray-500">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-1 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xs">Photo</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className={`${theme.lightBg} p-2 rounded border ${theme.lightBorder}`}>
                  <h3 className={`font-semibold ${theme.contactHeading} mb-1 text-xs`}>CONTACT</h3>
                  <div className="text-xs space-y-0.5">
                    <p><strong>Mobile:</strong> +91 98765</p>
                    <p><strong>Email:</strong> priya@email.com</p>
                    <p><strong>Address:</strong> Delhi</p>
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

                {/* Other Details */}
                <div>
                  <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>OTHER</h3>
                  <div className="grid grid-cols-1 gap-y-0.5">
                    <div><strong>Religion:</strong> Hindu</div>
                    <div><strong>Caste:</strong> Brahmin</div>
                    <div><strong>Mother Tongue:</strong> Hindi</div>
                  </div>
                </div>
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
  );
};

function App() {
  const templates = [
    { colorScheme: 'amber', title: 'Traditional Gold' },
    { colorScheme: 'blue', title: 'Ocean Blue' },
    { colorScheme: 'green', title: 'Forest Green' },
    { colorScheme: 'purple', title: 'Royal Purple' },
    { colorScheme: 'rose', title: 'Rose Pink' },
    { colorScheme: 'teal', title: 'Teal Elegance' },
    { colorScheme: 'orange', title: 'Sunset Orange' },
    { colorScheme: 'indigo', title: 'Deep Indigo' },
    { colorScheme: 'red', title: 'Classic Red' },
    { colorScheme: 'emerald', title: 'Emerald Green' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Marriage Biodata Templates</h1>
          <p className="text-gray-600">Choose from 10 beautiful color variations • Hover to select</p>
        </div>
        
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max px-4">
            {templates.map((template, index) => (
              <BiodataTemplate 
                key={index}
                colorScheme={template.colorScheme}
                title={template.title}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">Scroll horizontally to view all templates • Hover over any template to select</p>
        </div>
      </div>
    </div>
  );
}

export default App;