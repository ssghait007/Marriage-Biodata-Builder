import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const BiodataPreview = () => {
  const { control } = useFormContext();
  const formData = useWatch({ control });

  // Check if we have enough data to show the preview
  const hasPersonalDetails = formData?.personalDetails?.name;
  
  return (
    <div className="sticky top-24">
      <h3 className="text-xl font-playfair font-semibold mb-4 text-primary-500">Biodata Preview</h3>
      
      {!hasPersonalDetails ? (
        <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-500">
          <p>Fill in the form to see your biodata preview</p>
        </div>
      ) : (
        <div className="biodata-preview rounded-lg overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-accent-500 text-white p-4 text-center">
            <h3 className="font-playfair text-xl font-bold">Personal Details</h3>
          </div>
          
          {/* Content */}
          <div className="p-6 text-white space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-secondary-300">Name:</div>
              <div>{formData.personalDetails?.name || '-'}</div>
              
              <div className="text-secondary-300">Gender:</div>
              <div>{formData.personalDetails?.gender || '-'}</div>
              
              <div className="text-secondary-300">Date of Birth:</div>
              <div>{formData.personalDetails?.dateOfBirth || '-'}</div>
              
              <div className="text-secondary-300">Place of Birth:</div>
              <div>{formData.personalDetails?.placeOfBirth || '-'}</div>
              
              <div className="text-secondary-300">Complexion:</div>
              <div>{formData.personalDetails?.complexion || '-'}</div>
              
              <div className="text-secondary-300">Height:</div>
              <div>{formData.personalDetails?.height || '-'}</div>
              
              <div className="text-secondary-300">Gotra/Caste:</div>
              <div>{formData.personalDetails?.gotra || '-'}</div>
              
              <div className="text-secondary-300">Occupation:</div>
              <div>{formData.personalDetails?.occupation || '-'}</div>
              
              <div className="text-secondary-300">Education:</div>
              <div>{formData.personalDetails?.education || '-'}</div>
            </div>
            
            {/* Family Details Section */}
            {formData.familyDetails?.fathersName && (
              <>
                <div className="border-t border-accent-400 pt-4 mt-4">
                  <h4 className="font-playfair text-lg font-semibold mb-3 text-secondary-300">Family Details</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-secondary-300">Father's Name:</div>
                    <div>{formData.familyDetails?.fathersName || '-'}</div>
                    
                    <div className="text-secondary-300">Father's Occupation:</div>
                    <div>{formData.familyDetails?.fathersOccupation || '-'}</div>
                    
                    <div className="text-secondary-300">Mother's Name:</div>
                    <div>{formData.familyDetails?.mothersName || '-'}</div>
                    
                    <div className="text-secondary-300">Mother's Occupation:</div>
                    <div>{formData.familyDetails?.mothersOccupation || '-'}</div>
                    
                    <div className="text-secondary-300">Siblings:</div>
                    <div>{formData.familyDetails?.siblings || '-'}</div>
                  </div>
                </div>
              </>
            )}
            
            {/* Contact Details Section */}
            {formData.contactDetails?.contactPerson && (
              <>
                <div className="border-t border-accent-400 pt-4 mt-4">
                  <h4 className="font-playfair text-lg font-semibold mb-3 text-secondary-300">Contact Details</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-secondary-300">Contact Person:</div>
                    <div>{formData.contactDetails?.contactPerson || '-'}</div>
                    
                    <div className="text-secondary-300">Contact Number:</div>
                    <div>{formData.contactDetails?.contactNumber || '-'}</div>
                    
                    <div className="text-secondary-300">Address:</div>
                    <div>{formData.contactDetails?.residentialAddress || '-'}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BiodataPreview;