import React from 'react';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import ErrorMessage from '../common/ErrorMessage';

const PersonalDetailsSection = ({
  formData,
  errors,
  handleInputChange,
  updateAdditionalField,
  removeField,
  addNewField
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
        <Edit className="w-5 h-5" />
        <span>Personal Details</span>
      </div>

      {/* Name Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            value={formData.personalDetails.name}
            onChange={(e) => handleInputChange('personalDetails', 'name', e.target.value)}
            placeholder="Enter Name"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.personalDetails?.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.personalDetails?.name} />
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

      {/* Gender Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
          <select
            value={formData.personalDetails.gender}
            onChange={(e) => handleInputChange('personalDetails', 'gender', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.personalDetails?.gender
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <ErrorMessage error={errors.personalDetails?.gender} />
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

      {/* Date of Birth Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth *</label>
          <input
            type="date"
            value={formData.personalDetails.dateOfBirth}
            onChange={(e) => handleInputChange('personalDetails', 'dateOfBirth', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.personalDetails?.dateOfBirth
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.personalDetails?.dateOfBirth} />
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

      {/* Time of Birth Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Of Birth</label>
          <input
            type="time"
            value={formData.personalDetails.timeOfBirth}
            onChange={(e) => handleInputChange('personalDetails', 'timeOfBirth', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.personalDetails?.timeOfBirth
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.personalDetails?.timeOfBirth} />
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

      {/* Place of Birth Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Place Of Birth *</label>
          <input
            type="text"
            value={formData.personalDetails.placeOfBirth}
            onChange={(e) => handleInputChange('personalDetails', 'placeOfBirth', e.target.value)}
            placeholder="Enter Place Of Birth"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.personalDetails?.placeOfBirth
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.personalDetails?.placeOfBirth} />
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

      {/* Complexion Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Complexion</label>
          <input
            type="text"
            value={formData.personalDetails.complexion}
            onChange={(e) => handleInputChange('personalDetails', 'complexion', e.target.value)}
            placeholder="Enter Complexion"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.personalDetails?.complexion
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.personalDetails?.complexion} />
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

      {/* Height Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height *</label>
          <input
            type="text"
            value={formData.personalDetails.height}
            onChange={(e) => handleInputChange('personalDetails', 'height', e.target.value)}
            placeholder="Enter Height (e.g., 5.6 ft, 170 cm)"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.personalDetails?.height
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.personalDetails?.height} />
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

      {/* Gotra/Caste Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gotra/Caste</label>
          <input
            type="text"
            value={formData.personalDetails.gotra}
            onChange={(e) => handleInputChange('personalDetails', 'gotra', e.target.value)}
            placeholder="Enter Gotra/Caste"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.personalDetails?.gotra
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.personalDetails?.gotra} />
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

      {/* Occupation Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Occupation *</label>
          <input
            type="text"
            value={formData.personalDetails.occupation}
            onChange={(e) => handleInputChange('personalDetails', 'occupation', e.target.value)}
            placeholder="Enter Occupation"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.personalDetails?.occupation
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.personalDetails?.occupation} />
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

      {/* Income Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Income</label>
          <input
            type="text"
            value={formData.personalDetails.income}
            onChange={(e) => handleInputChange('personalDetails', 'income', e.target.value)}
            placeholder="Enter Income"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.personalDetails?.income
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.personalDetails?.income} />
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

      {/* Education Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Education *</label>
          <input
            type="text"
            value={formData.personalDetails.education}
            onChange={(e) => handleInputChange('personalDetails', 'education', e.target.value)}
            placeholder="Enter Education"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.personalDetails?.education
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.personalDetails?.education} />
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
  );
};

export default PersonalDetailsSection;
