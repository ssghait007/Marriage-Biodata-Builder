import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';

const FamilyDetailsForm = () => {
  const { register, getValues, setValue, watch } = useFormContext();
  const additionalFields = watch('familyDetails.additionalFields') || [];

  const addNewField = () => {
    const currentFields = getValues('familyDetails.additionalFields') || [];
    setValue('familyDetails.additionalFields', [...currentFields, { key: '', value: '' }]);
  };

  const removeField = (index) => {
    const currentFields = getValues('familyDetails.additionalFields') || [];
    setValue(
      'familyDetails.additionalFields',
      currentFields.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="form-section" id="family-details">
      <div className="form-section-title">
        <Edit size={20} className="mr-2" />
        <span>Family Details</span>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fathersName" className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
          <input
            type="text"
            id="fathersName"
            {...register('familyDetails.fathersName')}
            className="input-field"
            placeholder="Enter Father's Name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="fathersOccupation" className="block text-sm font-medium text-gray-700 mb-1">Father's Occupation</label>
          <input
            type="text"
            id="fathersOccupation"
            {...register('familyDetails.fathersOccupation')}
            className="input-field"
            placeholder="Enter Father's Occupation"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="mothersName" className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
          <input
            type="text"
            id="mothersName"
            {...register('familyDetails.mothersName')}
            className="input-field"
            placeholder="Enter Mother's Name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="mothersOccupation" className="block text-sm font-medium text-gray-700 mb-1">Mother's Occupation</label>
          <input
            type="text"
            id="mothersOccupation"
            {...register('familyDetails.mothersOccupation')}
            className="input-field"
            placeholder="Enter Mother's Occupation"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="siblings" className="block text-sm font-medium text-gray-700 mb-1">Brother / Sister</label>
          <input
            type="text"
            id="siblings"
            {...register('familyDetails.siblings')}
            className="input-field"
            placeholder="Enter Brother / Sister"
          />
        </div>
      </div>

      {additionalFields.map((field, index) => (
        <div className="form-row" key={index}>
          <div className="form-group">
            <input
              type="text"
              {...register(`familyDetails.additionalFields.${index}.key`)}
              className="input-field"
              placeholder="Field Name"
            />
          </div>
          
          <div className="form-group relative">
            <input
              type="text"
              {...register(`familyDetails.additionalFields.${index}.value`)}
              className="input-field"
              placeholder="Field Value"
            />
            <button
              type="button"
              onClick={() => removeField(index)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addNewField}
        className="add-field-btn mt-2"
      >
        <PlusCircle size={16} className="mr-1" /> Add New Field
      </button>
    </div>
  );
};

export default FamilyDetailsForm;