import Handlebars from 'handlebars';

export const stripWrapperTags = (html) => {
  // Remove html, head, body tags
  let cleanedHtml = html.replace(/<\/?(html|head|body)[^>]*>/gi, '');

  // Remove or modify CSS that affects body, background, and page-level styling
  cleanedHtml = cleanedHtml.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, (match) => {
    // Remove body styles, background styles, and page-level CSS
    let cleanedCSS = match
      .replace(/body\s*{[^}]*}/gi, '') // Remove body styles
      .replace(/html\s*{[^}]*}/gi, '') // Remove html styles
      .replace(/margin\s*:\s*0[^;]*;/gi, '') // Remove margin resets
      .replace(/padding\s*:\s*0[^;]*;/gi, ''); // Remove padding resets

    return cleanedCSS;
  });

  // Remove inline styles that might affect background
  cleanedHtml = cleanedHtml.replace(/style\s*=\s*"[^"]*background[^"]*"/gi, '');
  cleanedHtml = cleanedHtml.replace(/style\s*=\s*"[^"]*min-height[^"]*"/gi, '');

  return cleanedHtml;
};

export const injectFormDataIntoTemplate = (html, formData, preview) => {
  try {
    // Strip wrapper tags first
    const cleanedHtml = stripWrapperTags(html);

    // Compile the template with Handlebars
    const template = Handlebars.compile(cleanedHtml);

    // Prepare data for template
    const templateData = {
      personalDetails: {
        name: formData.personalDetails.name || 'Your Name',
        gender: formData.personalDetails.gender || 'Gender',
        dateOfBirth: formData.personalDetails.dateOfBirth || 'DD/MM/YYYY',
        timeOfBirth: formData.personalDetails.timeOfBirth || 'Time',
        placeOfBirth: formData.personalDetails.placeOfBirth || 'Place of Birth',
        complexion: formData.personalDetails.complexion || 'Complexion',
        height: formData.personalDetails.height || 'Height',
        gotra: formData.personalDetails.gotra || 'Gotra/Caste',
        occupation: formData.personalDetails.occupation || 'Occupation',
        income: formData.personalDetails.income || 'Income',
        education: formData.personalDetails.education || 'Education',
        additionalFields: formData.personalDetails.additionalFields.filter(field => field.key && field.value)
      },
      familyDetails: {
        fatherName: formData.familyDetails.fatherName || "Father's Name",
        fatherOccupation: formData.familyDetails.fatherOccupation || "Father's Occupation",
        motherName: formData.familyDetails.motherName || "Mother's Name",
        motherOccupation: formData.familyDetails.motherOccupation || "Mother's Occupation",
        siblings: formData.familyDetails.siblings || 'Siblings Info',
        additionalFields: formData.familyDetails.additionalFields.filter(field => field.key && field.value)
      },
      contactDetails: {
        contactPerson: formData.contactDetails.contactPerson || 'Contact Person',
        contactNumber: formData.contactDetails.contactNumber || 'Contact Number',
        residentialAddress: formData.contactDetails.residentialAddress || 'Address',
        additionalFields: formData.contactDetails.additionalFields.filter(field => field.key && field.value)
      },
      photo: preview || null
    };

    // Generate the final HTML
    return template(templateData);

  } catch (error) {
    console.error('Error processing template:', error);
    // Fallback to original HTML if Handlebars fails
    return html;
  }
};

export const loadTemplateFiles = () => {
  const templateImports = import.meta.glob('../Templates/*.html', { query: '?raw', import: 'default', eager: true });
  return Object.values(templateImports);
};
