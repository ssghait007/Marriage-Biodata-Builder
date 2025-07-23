import React from 'react';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import ErrorMessage from '../common/ErrorMessage';

const ContactDetailsSection = ({
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
        <span>Contact Details</span>
      </div>

      {/* Contact Person Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
          <input
            type="text"
            value={formData.contactDetails.contactPerson}
            onChange={(e) => handleInputChange('contactDetails', 'contactPerson', e.target.value)}
            placeholder="Enter Contact Person"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.contactDetails?.contactPerson
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.contactDetails?.contactPerson} />
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

      {/* Contact Number Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
          <input
            type="tel"
            value={formData.contactDetails.contactNumber}
            onChange={(e) => handleInputChange('contactDetails', 'contactNumber', e.target.value)}
            placeholder="Enter Contact Number"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.contactDetails?.contactNumber
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.contactDetails?.contactNumber} />
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

      {/* Residential Address Field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address *</label>
          <textarea
            value={formData.contactDetails.residentialAddress}
            onChange={(e) => handleInputChange('contactDetails', 'residentialAddress', e.target.value)}
            placeholder="Enter Residential Address"
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.contactDetails?.residentialAddress
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-red-500'
            }`}
          />
          <ErrorMessage error={errors.contactDetails?.residentialAddress} />
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
  );
};

export default ContactDetailsSection;
