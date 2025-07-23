import React, { useState, useRef, useEffect } from 'react';
import { Camera, RotateCcw, PlusCircle } from 'lucide-react';
import { FiX, FiDownload, FiPrinter, FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import utilities and components
import { validationSchema, defaultFormValues } from '../utils/validationSchemas';
import { downloadPdf } from '../utils/pdfGenerator';
import { injectFormDataIntoTemplate, loadTemplateFiles } from '../utils/templateProcessor';
import PersonalDetailsSection from './FormSections/PersonalDetailsSection';
import FamilyDetailsSection from './FormSections/FamilyDetailsSection';
import ContactDetailsSection from './FormSections/ContactDetailsSection';

const BiodataForm = ({ template }) => {

  const htmlFiles = loadTemplateFiles();

  // Initialize react-hook-form with validation
  const {

    handleSubmit: handleFormSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    trigger
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultFormValues
  });

  // Watch form data for template preview
  const formData = watch();

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const fileInputRef = useRef(null);
  const [_imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showFullscreenPreview, setShowFullscreenPreview] = useState(false);

  const handleInputChange = (section, field, value) => {
    setValue(`${section}.${field}`, value);
    // Trigger validation for the specific field
    trigger(`${section}.${field}`);
  };



  const addNewField = (section) => {
    const currentFields = formData[section].additionalFields || [];
    setValue(`${section}.additionalFields`, [...currentFields, { key: '', value: '' }]);
  };

  const formRef = useRef(null);

  const handleDownloadPdf = async () => {
    await downloadPdf(template, htmlFiles, (html) => injectFormDataIntoTemplate(html, formData, preview), formData);
  };

  const removeField = (section, index) => {
    const currentFields = formData[section].additionalFields || [];
    const updatedFields = currentFields.filter((_, i) => i !== index);
    setValue(`${section}.additionalFields`, updatedFields);
  };

  const updateAdditionalField = (section, index, key, value) => {
    const currentFields = formData[section].additionalFields || [];
    const updatedFields = currentFields.map((field, i) =>
      i === index ? { ...field, [key]: value } : field
    );
    setValue(`${section}.additionalFields`, updatedFields);
  };

  const removeSection = (section) => {
    setValue(`${section}.additionalFields`, []);
  };

  const resetForm = () => {
    reset();
    setPreview(null);
  };

  const handleSubmit = handleFormSubmit((data) => {
    console.log('Form submitted with data:', data);
    setShowFullscreenPreview(true);
    window.scrollTo(0, 0);
  });

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
        <div className="fixed z-50 inset-0 bg-black/90 backdrop-blur-sm">
          {/* Header with controls */}
          <div className="absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-md border-b border-white/20 p-2 md:p-4 z-10">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={() => setShowFullscreenPreview(false)}
                  className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors text-sm md:text-base"
                >
                  <FiArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Back to Form</span>
                  <span className="sm:hidden">Back</span>
                </button>
                <h2 className="text-white text-sm md:text-lg font-semibold truncate max-w-[150px] md:max-w-none">
                  {isPhone ? 'Preview' : `Biodata Preview - ${formData.personalDetails.name || 'Your Name'}`}
                </h2>
              </div>

              <div className="flex items-center gap-1 md:gap-3">
                {/* Download PDF Button */}
                <button
                  onClick={handleDownloadPdf}
                  className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-xs md:text-sm"
                >
                  <FiDownload className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="download-btn-text hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </button>

                {/* Print Button */}
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs md:text-sm"
                >
                  <FiPrinter className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setShowFullscreenPreview(false)}
                  className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <FiX className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Template Preview Content */}
          <div className="pt-16 md:pt-20 pb-4 md:pb-8 px-2 md:px-4 h-full overflow-auto">
            <div className="flex justify-center items-start min-h-full">
              {htmlFiles[template - 1] && (
                <div className="bg-white rounded-lg shadow-2xl p-2 md:p-8 max-w-4xl w-full">
                  {/* Template Content */}
                  <div
                  ref={formRef}
                    className={`w-full ${isPhone ? 'mobile-template-view' : ''}`}
                    dangerouslySetInnerHTML={{
                      __html: injectFormDataIntoTemplate(htmlFiles[template - 1], formData, preview),
                    }}
                  />

                  {/* Footer with template info */}
                  <div className="mt-4 md:mt-8 pt-3 md:pt-6 border-t border-gray-200 text-center text-xs md:text-sm text-gray-500">
                    <p>Generated with Marriage Biodata Builder</p>
                    <p className="mt-1">Template {template} • Created on {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile optimized styles */}
          <style jsx>{`
            @media (max-width: 768px) {
              .mobile-template-view .biodata-container {
                transform: scale(0.85);
                transform-origin: top center;
                margin: 0 auto;
              }

              .mobile-template-view .content {
                grid-template-columns: 1fr !important;
                gap: 20px !important;
              }

              .mobile-template-view .main-content {
                flex-direction: column !important;
                gap: 20px !important;
              }

              .mobile-template-view .profile-photo {
                order: -1 !important;
                text-align: center !important;
              }

              .mobile-template-view .profile-photo img,
              .mobile-template-view .photo {
                width: 150px !important;
                height: 180px !important;
                margin: 0 auto !important;
              }

              .mobile-template-view .details {
                width: 100% !important;
              }

              .mobile-template-view .section-title {
                font-size: 18px !important;
              }

              .mobile-template-view .name {
                font-size: 24px !important;
              }

              .mobile-template-view .info-row,
              .mobile-template-view .detail-row {
                flex-direction: column !important;
                align-items: flex-start !important;
                margin-bottom: 8px !important;
              }

              .mobile-template-view .label,
              .mobile-template-view .detail-label {
                min-width: auto !important;
                margin-right: 0 !important;
                margin-bottom: 2px !important;
                font-weight: bold !important;
              }

              .mobile-template-view .value,
              .mobile-template-view .detail-value {
                margin-left: 0 !important;
                padding-left: 0 !important;
              }

              .mobile-template-view .colon {
                display: none !important;
              }

              .mobile-template-view .decorative-corner,
              .mobile-template-view .decorative-corners,
              .mobile-template-view .background-pattern {
                display: none !important;
              }

              .mobile-template-view .contact-section {
                margin-top: 20px !important;
                padding: 15px !important;
              }
            }

            @media (max-width: 480px) {
              .mobile-template-view .biodata-container {
                transform: scale(0.75);
                padding: 20px !important;
              }

              .mobile-template-view .profile-photo img,
              .mobile-template-view .photo {
                width: 120px !important;
                height: 150px !important;
              }

              .mobile-template-view .name {
                font-size: 20px !important;
              }

              .mobile-template-view .section-title {
                font-size: 16px !important;
              }
            }
          `}</style>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto px-4 py-12 items-center justify-center flex flex-co">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-rose-900 leading-tight mb-4 text-center">Create Your Bio data Now</h1>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sticky">

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
                  {/* Personal Details Section */}
                  <PersonalDetailsSection
                    formData={formData}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    updateAdditionalField={updateAdditionalField}
                    removeField={removeField}
                    addNewField={addNewField}
                  />

                  {/* Family Details Section */}
                  <FamilyDetailsSection
                    formData={formData}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    updateAdditionalField={updateAdditionalField}
                    removeField={removeField}
                    addNewField={addNewField}
                    removeSection={removeSection}
                  />

                  {/* Contact Details Section */}
                  <ContactDetailsSection
                    formData={formData}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    updateAdditionalField={updateAdditionalField}
                    removeField={removeField}
                    addNewField={addNewField}
                    removeSection={removeSection}
                  />

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
            <div className="lg:col-span-1 flex justify-center sticky top-24 h-fit">
              {htmlFiles[template - 1] && (
                <div className="w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-lg">
                  <div className="relative">
                    {/* Mobile Preview Header */}
                    {isPhone && (
                      <div className="mb-4 text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Template Preview</h3>
                        <p className="text-sm text-gray-600">Template {template}</p>
                      </div>
                    )}

                    <div className="relative overflow-hidden rounded-lg shadow-lg bg-white p-4">
                      <div
                        className={`${
                          isPhone
                            ? 'scale-[0.6] origin-top-left w-[820px] h-[1200px]'
                            : 'scale-[0.45] origin-top-left w-[820px] h-[1200px]'
                        } pointer-events-none`}
                        style={{
                          transformOrigin: 'top left',
                          width: isPhone ? '820px' : '820px',
                          height: isPhone ? '720px' : '640px'
                        }}
                        dangerouslySetInnerHTML={{
                          __html: injectFormDataIntoTemplate(htmlFiles[template - 1], formData, preview),
                        }}
                      />
                    </div>


                  </div>
                </div>
              )}
            </div>

            {!template && (
              <div className="lg:col-span-1 flex justify-center">
                <div className="flex-shrink-0 w-full sm:w-80 md:w-72 lg:w-80 mx-2 group">

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default BiodataForm;
