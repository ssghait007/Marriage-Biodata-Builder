import React, { useState, useRef } from 'react';
import { Edit, PlusCircle, Trash2, Camera, RotateCcw } from 'lucide-react';

const BiodataForm = () => {
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
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState(null);

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
    console.log('Form Data:', formData);
    alert('Form submitted! Check console for data.');
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

  return (
    <div id="create" className='py-10 md:py-15 bg-gradient-to-b from-white to-gray-50'>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4">
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
                      <img className="w-30 h-30 cursor-pointer rounded-full" src={preview} alt="" />
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
                  <p className="text-sm text-gray-600 mt-2">Upload Image</p>
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                            className="p-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addNewField('personalDetails')}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                        <button type="button" className="p-2 text-gray-400 hover:text-red-500">
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
                            className="p-2 text-gray-400 hover:text-red-500"
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
                        className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Add New Field
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection('familyDetails')}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-800"
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
                          <Trash2 className="w-4 h-4" />
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
                          <Trash2 className="w-4 h-4" />
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
                          <Trash2 className="w-4 h-4" />
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
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => addNewField('contactDetails')}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Add New Field
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection('contactDetails')}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-800"
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
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded-md"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Section
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset Form
                    </button>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="mb-6">
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                      <input type="checkbox" id="terms" className="mt-1" />
                      <label htmlFor="terms" className="text-sm text-red-700">
                        Create my free account on our matrimony website <strong>www.Shadi.Today</strong> and Share Profile in Shadi.Today Whatsapp Matrimonial Groups
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 flex items-center justify-center gap-2"
                  >
                    Choose Template ✨
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-500">
                  By proceeding, you agree to our{' '}
                  <a href="#" className="text-red-600 hover:underline">Refund Policy</a>,{' '}
                  <a href="#" className="text-red-600 hover:underline">Terms</a>, and{' '}
                  <a href="#" className="text-red-600 hover:underline">Privacy Policy</a>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-red-800 to-red-900 rounded-lg p-6 text-white shadow-lg">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-yellow-300 mb-2">Personal Details</h2>
                  <div className="border-2 border-yellow-300 rounded-lg p-4 bg-green-800 bg-opacity-50">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Name</span>
                        <span>{formData.personalDetails.name || '...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Date Of Birth</span>
                        <span>{formData.personalDetails.dateOfBirth || '...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Time Of Birth</span>
                        <span>{formData.personalDetails.timeOfBirth || '...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Place Of Birth</span>
                        <span>{formData.personalDetails.placeOfBirth || '...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Complexion</span>
                        <span>{formData.personalDetails.complexion || '...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Height</span>
                        <span>{formData.personalDetails.height || '...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Gotra</span>
                        <span>{formData.personalDetails.gotra || '...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Occupation</span>
                        <span>{formData.personalDetails.occupation || '...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Education</span>
                        <span>{formData.personalDetails.education || '...'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 sticky top-24">
                  <h3 className="text-lg font-bold text-yellow-300 mb-3">Family Details</h3>
                  <div className="border border-yellow-300 rounded-lg p-3 bg-green-800 bg-opacity-30">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Father's Name</span>
                        <span>{formData.familyDetails.fatherName || '...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Father's Occupation</span>
                        <span>{formData.familyDetails.fatherOccupation || '...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Mother's Name</span>
                        <span>{formData.familyDetails.motherName || '...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Mother's Occupation</span>
                        <span>{formData.familyDetails.motherOccupation || '...'}</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-300">
                      Use this preview to verify your details and create an impressive matrimonial profile that stands out.
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-yellow-300 mb-3">Contact Details</h3>
                  <div className="border border-yellow-300 rounded-lg p-3 bg-green-800 bg-opacity-30">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Contact Person</span>
                        <span>{formData.contactDetails.contactPerson || '...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Contact Number</span>
                        <span>{formData.contactDetails.contactNumber || '...'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Residential Address</span>
                        <span className="text-right">{formData.contactDetails.residentialAddress || '...'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-yellow-300 rounded-tl-lg opacity-50"></div>
                <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-yellow-300 rounded-tr-lg opacity-50"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-yellow-300 rounded-bl-lg opacity-50"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-yellow-300 rounded-br-lg opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataForm;