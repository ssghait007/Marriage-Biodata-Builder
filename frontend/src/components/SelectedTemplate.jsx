import React from 'react';
import { X, Download, Printer, ArrowLeft } from 'lucide-react';

const SelectedTemplate = ({ template, onCancel, onDownload, onPrint }) => {

  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-lg font-medium">No template selected</p>
          <p className="text-sm text-gray-400 mt-1">Choose a template from the gallery above</p>
        </div>
      </div>
    );
  }

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
      button: 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700',
      buttonSecondary: 'border-amber-500 text-amber-600 hover:bg-amber-50',
      buttonDanger: 'border-red-500 text-red-600 hover:bg-red-50'
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
      button: 'bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700',
      buttonSecondary: 'border-blue-500 text-blue-600 hover:bg-blue-50',
      buttonDanger: 'border-red-500 text-red-600 hover:bg-red-50'
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
      button: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
      buttonSecondary: 'border-green-500 text-green-600 hover:bg-green-50',
      buttonDanger: 'border-red-500 text-red-600 hover:bg-red-50'
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
      button: 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700',
      buttonSecondary: 'border-purple-500 text-purple-600 hover:bg-purple-50',
      buttonDanger: 'border-red-500 text-red-600 hover:bg-red-50'
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
      button: 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700',
      buttonSecondary: 'border-rose-500 text-rose-600 hover:bg-rose-50',
      buttonDanger: 'border-red-500 text-red-600 hover:bg-red-50'
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
      button: 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700',
      buttonSecondary: 'border-teal-500 text-teal-600 hover:bg-teal-50',
      buttonDanger: 'border-red-500 text-red-600 hover:bg-red-50'
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
      button: 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700',
      buttonSecondary: 'border-orange-500 text-orange-600 hover:bg-orange-50',
      buttonDanger: 'border-red-500 text-red-600 hover:bg-red-50'
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
      button: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700',
      buttonSecondary: 'border-indigo-500 text-indigo-600 hover:bg-indigo-50',
      buttonDanger: 'border-red-500 text-red-600 hover:bg-red-50'
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
      button: 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700',
      buttonSecondary: 'border-red-500 text-red-600 hover:bg-red-50',
      buttonDanger: 'border-red-500 text-red-600 hover:bg-red-50'
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
      button: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700',
      buttonSecondary: 'border-emerald-500 text-emerald-600 hover:bg-emerald-50',
      buttonDanger: 'border-red-500 text-red-600 hover:bg-red-50'
    }
  };

  const theme = colors[template.colorScheme] || colors.blue;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Your Selected Template
        </h2>
        <p className="text-lg text-gray-600">
          {template.title} - Preview your biodata and take action
        </p>
      </div>

      {/* Template Preview Container */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-8">
        {/* Template Preview */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-2xl">
            <div className={`relative w-full bg-gradient-to-br ${theme.gradient} p-6 shadow-xl rounded-lg`}>
              {/* Main container with ornate border */}
              <div className={`relative bg-white border-2 ${theme.border} min-h-[600px] rounded transition-all duration-300`}>
                
                {/* Corner ornaments - Top Left */}
                <div className="absolute top-0 left-0 w-8 h-8">
                  <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                    <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
                    <circle cx="25" cy="25" r="2" />
                    <circle cx="15" cy="15" r="1.5" />
                  </svg>
                </div>

                {/* Corner ornaments - Top Right */}
                <div className="absolute top-0 right-0 w-8 h-8 transform rotate-90">
                  <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                    <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
                    <circle cx="25" cy="25" r="2" />
                    <circle cx="15" cy="15" r="1.5" />
                  </svg>
                </div>

                {/* Corner ornaments - Bottom Right */}
                <div className="absolute bottom-0 right-0 w-8 h-8 transform rotate-180">
                  <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                    <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
                    <circle cx="25" cy="25" r="2" />
                    <circle cx="15" cy="15" r="1.5" />
                  </svg>
                </div>

                {/* Corner ornaments - Bottom Left */}
                <div className="absolute bottom-0 left-0 w-8 h-8 transform -rotate-90">
                  <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                    <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
                    <circle cx="25" cy="25" r="2" />
                    <circle cx="15" cy="15" r="1.5" />
                  </svg>
                </div>

                {/* Side ornaments - Top */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-6">
                  <svg viewBox="0 0 128 48" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                    <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" />
                    <circle cx="64" cy="20" r="2" />
                  </svg>
                </div>

                {/* Side ornaments - Bottom */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-180 w-16 h-6">
                  <svg viewBox="0 0 128 48" className={`w-full h-full ${theme.ornament} fill-current drop-shadow-sm`}>
                    <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" />
                    <circle cx="64" cy="20" r="2" />
                  </svg>
                </div>

                {/* Inner content area */}
                <div className="absolute inset-6 bg-white p-4">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <h1 className={`text-lg font-bold ${theme.heading} mb-2`}>|| MARRIAGE BIODATA ||</h1>
                    <div className={`w-16 h-0.5 ${theme.accent} mx-auto`}></div>
                  </div>

                  {/* Main Content */}
                  <div className="flex gap-4">
                    {/* Photo Section */}
                    <div className="w-1/3">
                      <div className={`bg-gradient-to-br from-gray-50 to-gray-100 border ${theme.lightBorder} h-40 flex items-center justify-center mb-3 rounded-lg shadow-inner relative overflow-hidden`}>
                        <div className="text-center text-gray-500 relative z-10">
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center shadow-sm border border-gray-300">
                            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium">Photo</p>
                        </div>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="w-2/3 space-y-3 text-sm">
                      {/* Personal Information */}
                      <div>
                        <h2 className={`text-base font-bold ${theme.subheading} mb-2 border-b ${theme.lightBorder} pb-1`}>PERSONAL</h2>
                        <div className="grid grid-cols-1 gap-y-1">
                          <div><strong>Name:</strong> Priya Sharma</div>
                          <div><strong>DOB:</strong> 15th March, 1995</div>
                          <div><strong>Age:</strong> 28 Years</div>
                          <div><strong>Height:</strong> 5'4"</div>
                          <div><strong>Complexion:</strong> Fair</div>
                        </div>
                      </div>

                      {/* Educational & Professional */}
                      <div>
                        <h3 className={`font-semibold ${theme.subheading} mb-2 border-b ${theme.lightBorder} pb-1`}>PROFESSIONAL</h3>
                        <div className="grid grid-cols-1 gap-y-1">
                          <div><strong>Education:</strong> MBA Finance</div>
                          <div><strong>Profession:</strong> Financial Analyst</div>
                          <div><strong>Income:</strong> ₹8-10 Lakhs</div>
                        </div>
                      </div>

                      {/* Family Information */}
                      <div>
                        <h3 className={`font-semibold ${theme.subheading} mb-2 border-b ${theme.lightBorder} pb-1`}>FAMILY</h3>
                        <div className="grid grid-cols-1 gap-y-1">
                          <div><strong>Father:</strong> Mr. Rajesh Sharma</div>
                          <div><strong>Mother:</strong> Mrs. Sunita Sharma</div>
                          <div><strong>Siblings:</strong> 1 Brother</div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div>
                        <h3 className={`font-semibold ${theme.subheading} mb-2 border-b ${theme.lightBorder} pb-1`}>CONTACT</h3>
                        <div className="grid grid-cols-1 gap-y-1">
                          <div><strong>Mobile:</strong> +91 98765</div>
                          <div><strong>Address:</strong> Delhi</div>
                        </div>
                      </div>

                      {/* Other Details */}
                      <div>
                        <h3 className={`font-semibold ${theme.subheading} mb-2 border-b ${theme.lightBorder} pb-1`}>OTHER</h3>
                        <div className="grid grid-cols-1 gap-y-1">
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
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Cancel Button */}
          <button
            onClick={onCancel}
            className={`group flex items-center gap-3 px-8 py-4 border-2 ${theme.buttonDanger} rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 transform`}
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Gallery</span>
          </button>

          {/* Download Button */}
          <button
            onClick={onDownload}
            className={`group flex items-center gap-3 px-8 py-4 ${theme.button} text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform`}
          >
            <Download className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
            <span>Download PDF</span>
          </button>

          {/* Print Button */}
          <button
            onClick={onPrint}
            className={`group flex items-center gap-3 px-8 py-4 border-2 ${theme.buttonSecondary} rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 transform`}
          >
            <Printer className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span>Print Biodata</span>
          </button>
        </div>
      </div>

      {/* Additional Information */}
      <div className="text-center text-gray-600">
        <p className="text-sm">
          Your biodata is ready! You can download it as PDF or print it directly.
        </p>
        <p className="text-xs mt-2 text-gray-500">
          Make sure to review all information before sharing.
        </p>
      </div>
    </div>
  );
};

export default SelectedTemplate;
