import React, { useState, useRef, useEffect } from 'react';
import { Edit, PlusCircle, Trash2, Camera, RotateCcw, } from 'lucide-react';
import { FiUpload, FiX, FiDownload, FiPrinter, FiArrowLeft } from 'react-icons/fi';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro'

const BiodataForm = ({ template }) => {
  const [formData, setFormData] = useState({
    personalDetails: {
      name: '',
      gender: '',
      dateOfBirth: '',
      timeOfBirth: '',
      placeOfBirth: '',
      complexion: '',
      height: '',
      gotra: '',
      occupation: '',
      income: '',
      education: '',
      additionalFields: []
    },
    familyDetails: {
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      siblings: '',
      additionalFields: []
    },
    contactDetails: {
      contactPerson: '',
      contactNumber: '',
      residentialAddress: '',
      additionalFields: []
    }
  });
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showFullscreenPreview, setShowFullscreenPreview] = useState(false);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };



  const addNewField = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        additionalFields: [...prev[section].additionalFields, { key: '', value: '' }]
      }
    }));
  };

  const formRef = useRef(null);

  const downloadPdf = async () => {
    // 1️⃣  Turn the HTML into a canvas
    const canvas = await html2canvas(formRef.current, { scale: 2 }); // scale=2 → sharper text
    // 2️⃣  Convert canvas → image
    const imgData = canvas.toDataURL('image/png');
    // 3️⃣  Pump image into jsPDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;          // keep aspect ratio
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('biodata.pdf');                                         // 🎉 done
  };

  const removeField = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        additionalFields: prev[section].additionalFields.filter((_, i) => i !== index)
      }
    }));
  };

  const updateAdditionalField = (section, index, key, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        additionalFields: prev[section].additionalFields.map((field, i) =>
          i === index ? { ...field, [key]: value } : field
        )
      }
    }));
  };

  const removeSection = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        additionalFields: []
      }
    }));
  };

  const resetForm = () => {
    setFormData({
      personalDetails: {
        name: '',
        gender: '',
        dateOfBirth: '',
        timeOfBirth: '',
        placeOfBirth: '',
        complexion: '',
        height: '',
        gotra: '',
        occupation: '',
        income: '',
        education: '',
        additionalFields: []
      },
      familyDetails: {
        fatherName: '',
        fatherOccupation: '',
        motherName: '',
        motherOccupation: '',
        siblings: '',
        additionalFields: []
      },
      contactDetails: {
        contactPerson: '',
        contactNumber: '',
        residentialAddress: '',
        additionalFields: []
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFullscreenPreview(true);
    window.scrollTo(0, 0);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

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

  let theme;
  if (template) {
    theme = colors[template.colorScheme];
  }


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
    <div id="create" className='py-10 md:py-15 bg-gradient-to-b from-gray-50 to-gray-100'>

      {showFullscreenPreview && (
        <div>
          {isPhone ? (
            <div className="fixed z-50 inset-0 backdrop-blur-sm ">
              {template && (
                <div className="min-h-screen flex flex-col ">
                  <div className="p-0 flex justify-between items-center sticky">
                    <button
                      onClick={() => setShowFullscreenPreview(false)}
                      className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors p-2 rounded-full"
                      aria-label="Close preview"
                    >
                      <FiX className="w-6 h-6 text-black" />
                    </button>
                    <div className="flex space-x-4">
                      <button
                        onClick={downloadPdf}
                        className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors p-2 rounded-full"
                        aria-label="Download"
                      >
                        <FiDownload className="w-6 h-6" />
                      </button>
                      <button
                        className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors p-2 rounded-full"
                        aria-label="Print"
                      >
                        <FiPrinter className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div
                    ref={formRef}
                    id="biodata-preview"
                    className="lg:col-span-1 flex justify-center sticky "
                    style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                  >
                    <div className="w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-lg">
                      <div className={`relative bg-gradient-to-br ${theme.gradient} p-3 sm:p-4 shadow-xl rounded-lg`}>
                        {/* Main container with ornate border */}
                        <div className={`relative bg-white border-2 ${theme.border} h-fit rounded overflow-hidden`}>
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
                          <div className="bg-white p-3 m-6">
                            {/* Header */}
                            <div className="text-center mb-3">
                              <h1 className={`text-sm font-bold ${theme.heading} mb-1`}>|| MARRIAGE BIODATA ||</h1>
                              <div className={`w-12 h-0.5 ${theme.accent} mx-auto`}></div>
                            </div>

                            {/* Main Content */}
                            <div className="flex gap-3 h-full">
                              {/* Left Column - Photo */}
                              <div className="w-1/2 sm:w-1/2 md:w-1/2">
                                <div className={`bg-gray-50 border ${theme.lightBorder} h-40 sm:h-40 flex items-center justify-center rounded`}>
                                  {preview ? (
                                    <img
                                      src={preview}
                                      alt="Profile"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="text-center">
                                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                      <p className="text-xs text-gray-500">Photo</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Right Column - Details */}
                              <div className="w-2/3 space-y-2 text-xs">
                                {/* Personal Information */}
                                <div>
                                  <h2 className={`text-sm font-bold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>PERSONAL</h2>
                                  <div className="grid grid-cols-1 gap-y-0.5 break-words">
                                    <div><strong>Name:</strong> {formData.personalDetails.name}</div>
                                    <div><strong>DOB:</strong> {formData.personalDetails.dateOfBirth}</div>
                                    <div><strong>Age:</strong> {formData.personalDetails.age}</div>
                                    <div><strong>Height:</strong> {formData.personalDetails.height}</div>
                                    <div><strong>Complexion:</strong> {formData.personalDetails.complexion}</div>
                                    <div><strong>Gotra:</strong> {formData.personalDetails.gotra}</div>
                                  </div>
                                </div>

                                {/* Educational & Professional */}
                                <div>
                                  <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>PROFESSIONAL</h3>
                                  <div className="grid grid-cols-1 gap-y-0.5 break-words">
                                    <div><strong>Education:</strong> {formData.personalDetails.education}</div>
                                    <div><strong>Profession:</strong> {formData.personalDetails.occupation}</div>
                                    <div><strong>Income:</strong> {formData.personalDetails.income}</div>
                                  </div>
                                </div>

                                {/* Family Information */}
                                <div>
                                  <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>FAMILY</h3>
                                  <div className="grid grid-cols-1 gap-y-0.5 break-words">
                                    <div><strong>Father:</strong> {formData.familyDetails.fatherName}</div>
                                    <div><strong>Mother:</strong> {formData.familyDetails.motherName}</div>
                                    <div><strong>Siblings:</strong> {formData.familyDetails.siblings}</div>
                                  </div>
                                </div>

                                {/* Contact Information */}
                                <div>
                                  <h3 className={`font-semibold ${theme.subheading} mb-1`}>CONTACT</h3>
                                  <div className={`border-b ${theme.lightBorder} pb-0.5 break-words`}></div>
                                  <div className="grid grid-cols-1 gap-y-0.5 break-words">
                                    <div><strong>Mobile:</strong> {formData.contactDetails.mobile}</div>
                                    <div><strong>Address:</strong> {formData.contactDetails.residentialAddress}</div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>

                          {/* Decorative dots */}
                          <div className={`absolute top-2 left-2 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
                          <div className={`absolute top-2 right-2 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
                          <div className={`absolute bottom-2 left-2 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
                          <div className={`absolute bottom-2 right-2 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

          ) : (

            <div className="fixed z-50 inset-0 backdrop-blur-sm ">
              <div className="min-h-screen flex flex-col ">
                <div className=" p-4 flex justify-between items-center sticky z-10">
                  <button
                    onClick={() => setShowFullscreenPreview(false)}
                    className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors p-2 rounded-full"
                    aria-label="Close preview"
                  >
                    <FiX className="w-6 h-6 text-black" />
                  </button>
                  <div className="flex space-x-4">
                    <button
                      onClick={downloadPdf}
                      className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors p-2 rounded-full"
                      aria-label="Download"
                    >
                      <FiDownload className="w-6 h-6" />
                    </button>
                    <button
                      className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors p-2 rounded-full"
                      aria-label="Print"
                    >
                      <FiPrinter className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center overflow-y-auto py-4">
                  <div className={`bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-90`}>
                    {template && (
                      <div
                        ref={formRef}
                        id="biodata-preview"
                        className="w-[130mm] min-h-[145mm] bg-white shadow-lg z-10"
                        style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                      >
                        <div className={`w-full h-full p-4 bg-gradient-to-br ${theme.gradient}`}>
                          <div className={`relative w-full min-h-[calc(145mm-2rem)] bg-white border-2 ${theme.border} rounded-lg`}>
                            {/* Corner decorations */}
                            {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((position, i) => (
                              <div key={i} className={`absolute ${position} w-6 h-6 sm:w-8 sm:h-8`}>
                                <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current`}>
                                  <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
                                  <circle cx="25" cy="25" r="2" />
                                  <circle cx="15" cy="15" r="1.5" />
                                </svg>
                              </div>
                            ))}

                            {/* Top and bottom center decorations */}
                            {['top-0', 'bottom-0 rotate-180'].map((position, i) => (
                              <div key={i} className={`absolute ${position} left-1/2 transform -translate-x-1/2 w-16 h-6`}>
                                <svg viewBox="0 0 128 48" className={`w-full h-full ${theme.ornament} fill-current`}>
                                  <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" />
                                  <circle cx="64" cy="20" r="2" />
                                </svg>
                              </div>
                            ))}

                            {/* Content */}
                            <div className="p-3 sm:p-4">
                              {/* Header */}
                              <div className="text-center mb-3">
                                <h1 className={`text-xs sm:text-sm font-bold ${theme.heading} mb-1`}>
                                  || MARRIAGE BIODATA ||
                                </h1>
                                <div className={`w-12 h-0.5 ${theme.accent} mx-auto`}></div>
                              </div>

                              {/* Main Content */}
                              <div className="flex flex-col sm:flex-row gap-3">
                                {/* Photo Section */}
                                <div className="w-full sm:w-1/3">
                                  <div className={`bg-gray-50 border ${theme.lightBorder} h-28 sm:h-32 flex items-center justify-center rounded`}>
                                    {preview ? (
                                      <img
                                        src={preview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="text-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                          </svg>
                                        </div>
                                        <p className="text-xs text-gray-500">Photo</p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Details Section */}
                                <div className="w-full sm:w-2/3 space-y-2 text-xs">
                                  {[
                                    {
                                      title: 'PERSONAL',
                                      items: [
                                        { label: 'Name', value: formData.personalDetails.name },
                                        { label: 'DOB', value: formData.personalDetails.dateOfBirth },
                                        { label: 'Height', value: formData.personalDetails.height },
                                        { label: 'Complexion', value: formData.personalDetails.complexion },
                                        { label: 'Gotra', value: formData.personalDetails.gotra }
                                      ]
                                    },
                                    {
                                      title: 'PROFESSIONAL',
                                      items: [
                                        { label: 'Education', value: formData.personalDetails.education },
                                        { label: 'Profession', value: formData.personalDetails.occupation },
                                        { label: 'Income', value: formData.personalDetails.income }
                                      ]
                                    },
                                    {
                                      title: 'FAMILY',
                                      items: [
                                        { label: 'Father', value: formData.familyDetails.fatherName },
                                        { label: 'Mother', value: formData.familyDetails.motherName },
                                        { label: 'Siblings', value: formData.familyDetails.siblings }
                                      ]
                                    },
                                    {
                                      title: 'CONTACT',
                                      items: [
                                        { label: 'Mobile', value: formData.contactDetails.contactNumber },
                                        { label: 'Email', value: '' },
                                        { label: 'Address', value: formData.contactDetails.residentialAddress }
                                      ]
                                    }
                                  ].map((section, idx) => (
                                    <div key={idx} className="break-words">
                                      <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>
                                        {section.title}
                                      </h3>
                                      <div className="space-y-1">
                                        {section.items.map((item, i) => (
                                          <div key={i} className="break-words">
                                            <strong className="whitespace-nowrap">{item.label}:</strong> {item.value || '...'}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Decorative dots */}
                            {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((position, i) => (
                              <div
                                key={i}
                                className={`absolute ${position} w-1 h-1 ${theme.accent} rounded-full opacity-60`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto px-4 py-12 items-center justify-center flex flex-co">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-rose-900 leading-tight mb-4 text-center">Create Your Bio data Now</h1>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Language Selector */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 p-2 border rounded-lg bg-gray-50 w-fit">
                    <span className="text-sm font-medium">Change Biodata Language</span>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="bg-transparent border-none outline-none text-sm"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                    </select>
                    <span className="text-blue-600">🌐</span>
                  </div>
                </div>

                {/* Upload Image */}
                <div className="mb-6 text-center">
                  <div className="w-30 h-30 mx-auto border-2 border-gray-300 border-dashed rounded-full flex items-center justify-center bg-gray-50 cursor-pointer hover:border-red-500 ">
                    {preview ? (
                      <img
                        className="w-30 h-30 cursor-pointer rounded-full"
                        src={preview}
                        alt=""
                        onClick={() => fileInputRef.current?.click()}
                      />
                    ) : (
                      <Camera className="w-10 h-10" onClick={() => fileInputRef.current?.click()} />
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleFileChange(e)}
                      accept="image/*"
                      className="sr-only"
                    />
                  </div>
                  {preview ? (
                    <p className="text-sm text-gray-600 mt-2">Change Image</p>
                  ) : (
                    <p className="text-sm text-gray-600 mt-2">Upload Image</p>
                  )}
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Personal Details */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
                      <Edit className="w-5 h-5" />
                      <span>Personal Details</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={formData.personalDetails.name}
                          onChange={(e) => handleInputChange('personalDetails', 'name', e.target.value)}
                          placeholder="Enter Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                          value={formData.personalDetails.gender}
                          onChange={(e) => handleInputChange('personalDetails', 'gender', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
                        <input
                          type="date"
                          value={formData.personalDetails.dateOfBirth}
                          onChange={(e) => handleInputChange('personalDetails', 'dateOfBirth', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time Of Birth</label>
                        <input
                          type="time"
                          value={formData.personalDetails.timeOfBirth}
                          onChange={(e) => handleInputChange('personalDetails', 'timeOfBirth', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Place Of Birth</label>
                        <input
                          type="text"
                          value={formData.personalDetails.placeOfBirth}
                          onChange={(e) => handleInputChange('personalDetails', 'placeOfBirth', e.target.value)}
                          placeholder="Enter Place Of Birth"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Complexion</label>
                        <input
                          type="text"
                          value={formData.personalDetails.complexion}
                          onChange={(e) => handleInputChange('personalDetails', 'complexion', e.target.value)}
                          placeholder="Enter Complexion"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                        <input
                          type="text"
                          value={formData.personalDetails.height}
                          onChange={(e) => handleInputChange('personalDetails', 'height', e.target.value)}
                          placeholder="Enter Height"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gotra/Caste</label>
                        <input
                          type="text"
                          value={formData.personalDetails.gotra}
                          onChange={(e) => handleInputChange('personalDetails', 'gotra', e.target.value)}
                          placeholder="Enter Gotra/Caste"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                        <input
                          type="text"
                          value={formData.personalDetails.occupation}
                          onChange={(e) => handleInputChange('personalDetails', 'occupation', e.target.value)}
                          placeholder="Enter Occupation"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Income</label>
                        <input
                          type="text"
                          value={formData.personalDetails.income}
                          onChange={(e) => handleInputChange('personalDetails', 'income', e.target.value)}
                          placeholder="Enter Income"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                        <input
                          type="text"
                          value={formData.personalDetails.education}
                          onChange={(e) => handleInputChange('personalDetails', 'education', e.target.value)}
                          placeholder="Enter Education"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Additional Personal Details Fields */}
                    {formData.personalDetails.additionalFields.map((field, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={field.key}
                            onChange={(e) => updateAdditionalField('personalDetails', index, 'key', e.target.value)}
                            placeholder="Field Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => updateAdditionalField('personalDetails', index, 'value', e.target.value)}
                            placeholder="Field Value"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                            ↕
                          </button>
                          <button
                            type="button"
                            onClick={() => removeField('personalDetails', index)}
                            className="cursor-pointer p-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addNewField('personalDetails')}
                      className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add New Field
                    </button>
                  </div>

                  {/* Family Details */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
                      <Edit className="w-5 h-5" />
                      <span>Family Details</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                        <input
                          type="text"
                          value={formData.familyDetails.fatherName}
                          onChange={(e) => handleInputChange('familyDetails', 'fatherName', e.target.value)}
                          placeholder="Enter Father's Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Father's Occupation</label>
                        <input
                          type="text"
                          value={formData.familyDetails.fatherOccupation}
                          onChange={(e) => handleInputChange('familyDetails', 'fatherOccupation', e.target.value)}
                          placeholder="Enter Father's Occupation"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                        <input
                          type="text"
                          value={formData.familyDetails.motherName}
                          onChange={(e) => handleInputChange('familyDetails', 'motherName', e.target.value)}
                          placeholder="Enter Mother's Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Occupation</label>
                        <input
                          type="text"
                          value={formData.familyDetails.motherOccupation}
                          onChange={(e) => handleInputChange('familyDetails', 'motherOccupation', e.target.value)}
                          placeholder="Enter Mother's Occupation"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Brother / Sister</label>
                        <input
                          type="text"
                          value={formData.familyDetails.siblings}
                          onChange={(e) => handleInputChange('familyDetails', 'siblings', e.target.value)}
                          placeholder="Enter Brother / Sister"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="cursor-pointer p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Additional Family Details Fields */}
                    {formData.familyDetails.additionalFields.map((field, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={field.key}
                            onChange={(e) => updateAdditionalField('familyDetails', index, 'key', e.target.value)}
                            placeholder="Field Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => updateAdditionalField('familyDetails', index, 'value', e.target.value)}
                            placeholder="Field Value"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                            ↕
                          </button>
                          <button
                            type="button"
                            onClick={() => removeField('familyDetails', index)}
                            className="cursor-pointer p-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => addNewField('familyDetails')}
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Add New Field
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection('familyDetails')}
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove Section
                      </button>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
                      <Edit className="w-5 h-5" />
                      <span>Contact Details</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                        <input
                          type="text"
                          value={formData.contactDetails.contactPerson}
                          onChange={(e) => handleInputChange('contactDetails', 'contactPerson', e.target.value)}
                          placeholder="Enter Contact Person"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="cursor-pointer w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                        <input
                          type="tel"
                          value={formData.contactDetails.contactNumber}
                          onChange={(e) => handleInputChange('contactDetails', 'contactNumber', e.target.value)}
                          placeholder="Enter Contact Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="cursor-pointer w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address</label>
                        <textarea
                          value={formData.contactDetails.residentialAddress}
                          onChange={(e) => handleInputChange('contactDetails', 'residentialAddress', e.target.value)}
                          placeholder="Enter Residential Address"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                          ↕
                        </button>
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="cursor-pointer w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Additional Contact Details Fields */}
                    {formData.contactDetails.additionalFields.map((field, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={field.key}
                            onChange={(e) => updateAdditionalField('contactDetails', index, 'key', e.target.value)}
                            placeholder="Field Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => updateAdditionalField('contactDetails', index, 'value', e.target.value)}
                            placeholder="Field Value"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                            ↕
                          </button>
                          <button
                            type="button"
                            onClick={() => removeField('contactDetails', index)}
                            className="p-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="cursor-pointer w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => addNewField('contactDetails')}
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Add New Field
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection('contactDetails')}
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove Section
                      </button>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => addNewField('personalDetails')}
                      className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded-md"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Section
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset Form
                    </button>
                  </div>

                  {/* Terms and Conditions */}
                  {/* <div className="mb-6">
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                      <input type="checkbox" id="terms" className="mt-1" />
                      <label htmlFor="terms" className="text-sm text-red-700">
                        Create my free account on our matrimony website <strong>www.Shadi.Today</strong> and Share Profile in Shadi.Today Whatsapp Matrimonial Groups
                      </label>
                    </div>
                  </div> */}

                  {/* Submit Button */}

                  {
                    template ? (
                      <button
                        type="submit"
                        className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 flex items-center justify-center gap-2"
                      >
                        Create Bio Data
                      </button>
                    ) : (
                      <a
                        href="#templates"
                        className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 flex items-center justify-center gap-2"
                      >
                        Choose Template ✨
                      </a>
                    )
                  }
                </form>

                {/* Footer */}
                {/* <div className="mt-6 text-center text-sm text-gray-500">
                  By proceeding, you agree to our{' '}
                  <a href="#" className="text-red-600 hover:underline">Refund Policy</a>,{' '}
                  <a href="#" className="text-red-600 hover:underline">Terms</a>, and{' '}
                  <a href="#" className="text-red-600 hover:underline">Privacy Policy</a>
                </div> */}
              </div>
            </div>

            {/* Preview Section */}

            {isPhone ? (
              <div>
                {template && (
                  <div className="lg:col-span-1 flex justify-center sticky top-24">
                    <div className="w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-lg">
                      <h3 className={`text-center font-semibold mb-3 ${theme.heading} text-sm sm:text-base`}>{template.title}</h3>
                      <div className={`relative bg-gradient-to-br ${theme.gradient} p-3 sm:p-4 shadow-xl rounded-lg`}>
                        {/* Main container with ornate border */}
                        <div className={`relative bg-white border-2 ${theme.border} h-fit rounded overflow-hidden`}>
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
                          <div className="bg-white p-3 m-6">
                            {/* Header */}
                            <div className="text-center mb-3">
                              <h1 className={`text-sm font-bold ${theme.heading} mb-1`}>|| MARRIAGE BIODATA ||</h1>
                              <div className={`w-12 h-0.5 ${theme.accent} mx-auto`}></div>
                            </div>

                            {/* Main Content */}
                            <div className="flex gap-3 h-full">
                              {/* Left Column - Photo */}
                              <div className="w-1/2 sm:w-1/2 md:w-1/2">
                                <div className={`bg-gray-50 border ${theme.lightBorder} h-40 sm:h-40 flex items-center justify-center rounded`}>
                                  {preview ? (
                                    <img
                                      src={preview}
                                      alt="Profile"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="text-center">
                                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                      <p className="text-xs text-gray-500">Photo</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Right Column - Details */}
                              <div className="w-2/3 space-y-2 text-xs">
                                {/* Personal Information */}
                                <div>
                                  <h2 className={`text-sm font-bold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>PERSONAL</h2>
                                  <div className="grid grid-cols-1 gap-y-0.5 break-words">
                                    <div><strong>Name:</strong> {formData.personalDetails.name}</div>
                                    <div><strong>DOB:</strong> {formData.personalDetails.dateOfBirth}</div>
                                    <div><strong>Age:</strong> {formData.personalDetails.age}</div>
                                    <div><strong>Height:</strong> {formData.personalDetails.height}</div>
                                    <div><strong>Complexion:</strong> {formData.personalDetails.complexion}</div>
                                    <div><strong>Gotra:</strong> {formData.personalDetails.gotra}</div>
                                  </div>
                                </div>

                                {/* Educational & Professional */}
                                <div>
                                  <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>PROFESSIONAL</h3>
                                  <div className="grid grid-cols-1 gap-y-0.5 break-words">
                                    <div><strong>Education:</strong> {formData.personalDetails.education}</div>
                                    <div><strong>Profession:</strong> {formData.personalDetails.occupation}</div>
                                    <div><strong>Income:</strong> {formData.personalDetails.income}</div>
                                  </div>
                                </div>

                                {/* Family Information */}
                                <div>
                                  <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>FAMILY</h3>
                                  <div className="grid grid-cols-1 gap-y-0.5 break-words">
                                    <div><strong>Father:</strong> {formData.familyDetails.fatherName}</div>
                                    <div><strong>Mother:</strong> {formData.familyDetails.motherName}</div>
                                    <div><strong>Siblings:</strong> {formData.familyDetails.siblings}</div>
                                  </div>
                                </div>

                                {/* Contact Information */}
                                <div>
                                  <h3 className={`font-semibold ${theme.subheading} mb-1`}>CONTACT</h3>
                                  <div className={`border-b ${theme.lightBorder} pb-0.5 break-words`}></div>
                                  <div className="grid grid-cols-1 gap-y-0.5 break-words">
                                    <div><strong>Mobile:</strong> {formData.contactDetails.mobile}</div>
                                    <div><strong>Address:</strong> {formData.contactDetails.residentialAddress}</div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>

                          {/* Decorative dots */}
                          <div className={`absolute top-2 left-2 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
                          <div className={`absolute top-2 right-2 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
                          <div className={`absolute bottom-2 left-2 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
                          <div className={`absolute bottom-2 right-2 w-1 h-1 ${theme.accent} rounded-full opacity-60`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {template && (
                  <div className="lg:col-span-1 flex justify-center sticky top-24 h-fit">
                    <div className="w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-lg">
                      <h3 className={`text-center font-semibold mb-3 ${theme.heading} text-sm sm:text-base`}>
                        {template.title}
                      </h3>
                      <div className={`relative bg-gradient-to-br ${theme.gradient} p-3 sm:p-4 shadow-xl rounded-lg`}>
                        {/* Main container */}
                        <div className={`relative bg-white border-2 ${theme.border} rounded overflow-hidden`}>

                          {/* Corner decorations */}
                          {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((position, i) => (
                            <div key={i} className={`absolute ${position} w-6 h-6 sm:w-8 sm:h-8`}>
                              <svg viewBox="0 0 80 80" className={`w-full h-full ${theme.ornament} fill-current`}>
                                <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
                                <circle cx="25" cy="25" r="2" />
                                <circle cx="15" cy="15" r="1.5" />
                              </svg>
                            </div>
                          ))}

                          {/* Top and bottom center decorations */}
                          {['top-0', 'bottom-0 rotate-180'].map((position, i) => (
                            <div key={i} className={`absolute ${position} left-1/2 transform -translate-x-1/2 w-16 h-6`}>
                              <svg viewBox="0 0 128 48" className={`w-full h-full ${theme.ornament} fill-current`}>
                                <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" />
                                <circle cx="64" cy="20" r="2" />
                              </svg>
                            </div>
                          ))}

                          {/* Content */}
                          <div className="p-3 sm:p-4">
                            {/* Header */}
                            <div className="text-center mb-3">
                              <h1 className={`text-xs sm:text-sm font-bold ${theme.heading} mb-1`}>
                                || MARRIAGE BIODATA ||
                              </h1>
                              <div className={`w-12 h-0.5 ${theme.accent} mx-auto`}></div>
                            </div>

                            {/* Main Content */}
                            <div className="flex flex-col sm:flex-row gap-3">
                              {/* Photo Section */}
                              <div className="w-full sm:w-1/3">
                                <div className={`bg-gray-50 border ${theme.lightBorder} h-28 sm:h-32 flex items-center justify-center rounded`}>
                                  {preview ? (
                                    <img
                                      src={preview}
                                      alt="Profile"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="text-center">
                                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                      <p className="text-xs text-gray-500">Photo</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Details Section */}
                              <div className="w-full sm:w-2/3 space-y-2 text-xs">
                                {[
                                  {
                                    title: 'PERSONAL',
                                    items: [
                                      { label: 'Name', value: formData.personalDetails.name },
                                      { label: 'DOB', value: formData.personalDetails.dateOfBirth },
                                      { label: 'Height', value: formData.personalDetails.height },
                                      { label: 'Complexion', value: formData.personalDetails.complexion },
                                      { label: 'Gotra', value: formData.personalDetails.gotra }
                                    ]
                                  },
                                  {
                                    title: 'PROFESSIONAL',
                                    items: [
                                      { label: 'Education', value: formData.personalDetails.education },
                                      { label: 'Profession', value: formData.personalDetails.occupation },
                                      { label: 'Income', value: formData.personalDetails.income }
                                    ]
                                  },
                                  {
                                    title: 'FAMILY',
                                    items: [
                                      { label: 'Father', value: formData.familyDetails.fatherName },
                                      { label: 'Mother', value: formData.familyDetails.motherName },
                                      { label: 'Siblings', value: formData.familyDetails.siblings }
                                    ]
                                  },
                                  {
                                    title: 'CONTACT',
                                    items: [
                                      { label: 'Mobile', value: formData.contactDetails.contactNumber },
                                      { label: 'Email', value: '' },
                                      { label: 'Address', value: formData.contactDetails.residentialAddress }
                                    ]
                                  }
                                ].map((section, idx) => (
                                  <div key={idx} className="break-words">
                                    <h3 className={`font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5`}>
                                      {section.title}
                                    </h3>
                                    <div className="space-y-1">
                                      {section.items.map((item, i) => (
                                        <div key={i} className="break-words">
                                          <strong className="whitespace-nowrap">{item.label}:</strong> {item.value || '...'}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Decorative dots */}
                          {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((position, i) => (
                            <div
                              key={i}
                              className={`absolute ${position} w-1 h-1 ${theme.accent} rounded-full opacity-60`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!template && (
              <div className="lg:col-span-1 flex justify-center">
                <div className="flex-shrink-0 w-full sm:w-80 md:w-72 lg:w-80 mx-2 group">
                  <a href="#templates" onClick={() => window.scrollTo({ top: document.getElementById('templates').offsetTop, behavior: 'smooth' })}
                    className={`flex items-center justify-center p-2 rounded border font-semibold border-gray-400 hover:bg-gray-100 transition-colors`}>Select Template</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataForm;