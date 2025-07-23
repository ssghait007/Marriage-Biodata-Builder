import React from 'react';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import ErrorMessage from '../common/ErrorMessage';

const FamilyDetailsSection = ({
  formData,
  errors,
  handleInputChange,
  updateAdditionalField,
  removeField,
  addNewField,
  removeSection
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
        <Edit className="w-5 h-5" />
        <span>Family Details</span>
      </div>

      {/* Father's Name Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name *</label>
          <input
            type="text"
            value={formData.familyDetails.fatherName}
            onChange={(e) => handleInputChange('familyDetails', 'fatherName', e.target.value)}
            placeholder="Enter Father's Name"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.familyDetails?.fatherName
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.familyDetails?.fatherName} />
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

      {/* Father's Occupation Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Father's Occupation *</label>
          <input
            type="text"
            value={formData.familyDetails.fatherOccupation}
            onChange={(e) => handleInputChange('familyDetails', 'fatherOccupation', e.target.value)}
            placeholder="Enter Father's Occupation"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.familyDetails?.fatherOccupation
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.familyDetails?.fatherOccupation} />
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

      {/* Mother's Name Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name *</label>
          <input
            type="text"
            value={formData.familyDetails.motherName}
            onChange={(e) => handleInputChange('familyDetails', 'motherName', e.target.value)}
            placeholder="Enter Mother's Name"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.familyDetails?.motherName
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.familyDetails?.motherName} />
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

      {/* Mother's Occupation Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Occupation *</label>
          <input
            type="text"
            value={formData.familyDetails.motherOccupation}
            onChange={(e) => handleInputChange('familyDetails', 'motherOccupation', e.target.value)}
            placeholder="Enter Mother's Occupation"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.familyDetails?.motherOccupation
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.familyDetails?.motherOccupation} />
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

      {/* Siblings Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brother / Sister</label>
          <input
            type="text"
            value={formData.familyDetails.siblings}
            onChange={(e) => handleInputChange('familyDetails', 'siblings', e.target.value)}
            placeholder="Enter Brother / Sister"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.familyDetails?.siblings
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.familyDetails?.siblings} />
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
  );
};

export default FamilyDetailsSection;
