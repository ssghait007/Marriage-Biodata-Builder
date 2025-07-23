import * as yup from 'yup';

// Personal Details Validation Schema
export const personalDetailsSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['Male', 'Female'], 'Please select a valid gender'),

  dateOfBirth: yup
    .string()
    .required('Date of birth is required')
    .test('age', 'Age must be between 18 and 80 years', function(value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age >= 18 && age <= 80;
    }),

  timeOfBirth: yup
    .string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format'),

  placeOfBirth: yup
    .string()
    .required('Place of birth is required')
    .min(2, 'Place of birth must be at least 2 characters')
    .max(100, 'Place of birth must not exceed 100 characters'),

  complexion: yup
    .string()
    .max(30, 'Complexion must not exceed 30 characters'),

  height: yup
    .string()
    .required('Height is required')
    .matches(/^[0-9]+(\.[0-9]+)?\s*(ft|feet|cm|inches?|in)?\s*[0-9]*(\s*(ft|feet|cm|inches?|in))?$/i, 'Please enter a valid height (e.g., 5.6 ft, 170 cm)'),

  gotra: yup
    .string()
    .max(50, 'Gotra/Caste must not exceed 50 characters'),

  occupation: yup
    .string()
    .required('Occupation is required')
    .min(2, 'Occupation must be at least 2 characters')
    .max(100, 'Occupation must not exceed 100 characters'),

  income: yup
    .string()
    .matches(/^[0-9,.\s]*[a-zA-Z]*$/, 'Please enter a valid income format'),

  education: yup
    .string()
    .required('Education is required')
    .min(2, 'Education must be at least 2 characters')
    .max(200, 'Education must not exceed 200 characters'),
});

// Family Details Validation Schema
export const familyDetailsSchema = yup.object({
  fatherName: yup
    .string()
    .required("Father's name is required")
    .min(2, "Father's name must be at least 2 characters")
    .max(50, "Father's name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Father's name can only contain letters and spaces"),

  fatherOccupation: yup
    .string()
    .required("Father's occupation is required")
    .min(2, "Father's occupation must be at least 2 characters")
    .max(100, "Father's occupation must not exceed 100 characters"),

  motherName: yup
    .string()
    .required("Mother's name is required")
    .min(2, "Mother's name must be at least 2 characters")
    .max(50, "Mother's name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Mother's name can only contain letters and spaces"),

  motherOccupation: yup
    .string()
    .required("Mother's occupation is required")
    .min(2, "Mother's occupation must be at least 2 characters")
    .max(100, "Mother's occupation must not exceed 100 characters"),

  siblings: yup
    .string()
    .max(200, 'Siblings information must not exceed 200 characters'),
});

// Contact Details Validation Schema
export const contactDetailsSchema = yup.object({
  contactPerson: yup
    .string()
    .required('Contact person is required')
    .min(2, 'Contact person must be at least 2 characters')
    .max(50, 'Contact person must not exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Contact person can only contain letters and spaces'),

  contactNumber: yup
    .string()
    .required('Contact number is required')
    .matches(/^[\+]?[0-9\s\-\(\)]{10,15}$/, 'Please enter a valid phone number (10-15 digits)'),

  residentialAddress: yup
    .string()
    .required('Residential address is required')
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must not exceed 500 characters'),
});

// Main Validation Schema
export const validationSchema = yup.object({
  personalDetails: personalDetailsSchema,
  familyDetails: familyDetailsSchema,
  contactDetails: contactDetailsSchema,
});

// Default form values
export const defaultFormValues = {
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
};
