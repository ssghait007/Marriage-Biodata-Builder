import React, { useState, useRef, useEffect } from 'react';
import { Edit, PlusCircle, Trash2, Camera, RotateCcw, } from 'lucide-react';
import { FiUpload, FiX, FiDownload, FiPrinter, FiArrowLeft } from 'react-icons/fi';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const BiodataForm = ({ template }) => {

  const stripWrapperTags = (html) => {
    // Remove html, head, body tags
    let cleanedHtml = html.replace(/<\/?(html|head|body)[^>]*>/gi, '');

    // Remove or modify CSS that affects body, background, and page-level styling
    cleanedHtml = cleanedHtml.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, (match) => {
      // Remove body styles, background styles, and page-level CSS
      let cleanedCSS = match
        .replace(/body\s*{[^}]*}/gi, '') // Remove body styles
        .replace(/html\s*{[^}]*}/gi, '') // Remove html styles
        // .replace(/\*\s*{[^}]*}/gi, '') // Remove universal selector styles
        // .replace(/@page[^}]*{[^}]*}/gi, '') // Remove @page styles
        // .replace(/background\s*:[^;]*;/gi, '') // Remove background properties
        // .replace(/background-color\s*:[^;]*;/gi, '') // Remove background-color
        // .replace(/background-image\s*:[^;]*;/gi, '') // Remove background-image
        // .replace(/min-height\s*:\s*100vh[^;]*;/gi, '') // Remove full viewport height
        // .replace(/height\s*:\s*100vh[^;]*;/gi, '') // Remove viewport height
        .replace(/margin\s*:\s*0[^;]*;/gi, '') // Remove margin resets
        .replace(/padding\s*:\s*0[^;]*;/gi, ''); // Remove padding resets

      return cleanedCSS;
    });

    // Remove inline styles that might affect background
    cleanedHtml = cleanedHtml.replace(/style\s*=\s*"[^"]*background[^"]*"/gi, '');
    cleanedHtml = cleanedHtml.replace(/style\s*=\s*"[^"]*min-height[^"]*"/gi, '');

    return cleanedHtml;
  };

  const templateImports = import.meta.glob('../Templates/*.html', { query: '?raw', import: 'default', eager: true });
  const htmlFiles = Object.values(templateImports);

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
  const [_imageFile, setImageFile] = useState(null);
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
    try {
      const downloadBtn = document.querySelector('.download-btn-text');
      if (downloadBtn) {
        downloadBtn.textContent = 'Generating PDF...';
      }

      // Check if template is selected
      if (!template || !htmlFiles[template - 1]) {
        alert('Please select a template first');
        if (downloadBtn) {
          downloadBtn.textContent = 'Download PDF';
        }
        return;
      }

      // Create a temporary container for the template
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.zIndex = '-1000';
      tempContainer.style.background = 'white';
      tempContainer.style.width = '800px';
      tempContainer.style.padding = '20px';
      
      // Inject the template HTML with form data
      tempContainer.innerHTML = injectFormDataIntoTemplate(htmlFiles[template - 1]);
      document.body.appendChild(tempContainer);

      // Add styles to ensure proper rendering
      const style = document.createElement('style');
      style.textContent = `
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          animation: none !important;
          transition: none !important;
        }
      `;
      document.head.appendChild(style);

      // Wait a moment for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate canvas from the template
      const canvas = await html2canvas(tempContainer, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        width: 800,
        height: tempContainer.scrollHeight,
        windowWidth: 800,
        windowHeight: tempContainer.scrollHeight
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      // Calculate dimensions to fit A4
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // If the content is too tall for one page, we might need to scale it down
      const maxHeight = 297; // A4 height in mm
      let finalWidth = imgWidth;
      let finalHeight = imgHeight;
      
      if (imgHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = (canvas.width * finalHeight) / canvas.height;
      }

      // Add the image to PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', (210 - finalWidth) / 2, 0, finalWidth, finalHeight);

      // Set PDF properties
      pdf.setProperties({
        title: 'Marriage Biodata',
        subject: `Biodata for ${formData.personalDetails.name || 'Individual'}`,
        author: 'Biodata Builder',
        creator: 'Marriage Biodata Builder'
      });

      // Generate filename
      const now = new Date();
      const timestamp = now.toISOString().slice(0, 10);
      const userName = formData.personalDetails.name || 'biodata';
      const filename = `${userName.replace(/\s+/g, '_')}_template_${template}_${timestamp}.pdf`;

      // Save the PDF
      pdf.save(filename);

      // Clean up
      document.body.removeChild(tempContainer);
      document.head.removeChild(style);

      if (downloadBtn) {
        downloadBtn.textContent = 'Download PDF';
      }

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');

      const downloadBtn = document.querySelector('.download-btn-text');
      if (downloadBtn) {
        downloadBtn.textContent = 'Download PDF';
      }
    }
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

  // Dynamic function to inject form data into any template HTML
  const injectFormDataIntoTemplate = (html) => {
    // First, strip wrapper tags and body styles using the existing function
    let updatedHtml = stripWrapperTags(html);

    // Create a comprehensive mapping of form data to potential template values
    const dataMapping = {
      // Personal Details
      name: formData.personalDetails.name || 'Your Name',
      dateOfBirth: formData.personalDetails.dateOfBirth || 'DD/MM/YYYY',
      timeOfBirth: formData.personalDetails.timeOfBirth || 'Time',
      placeOfBirth: formData.personalDetails.placeOfBirth || 'Place of Birth',
      complexion: formData.personalDetails.complexion || 'Complexion',
      height: formData.personalDetails.height || 'Height',
      gotra: formData.personalDetails.gotra || 'Gotra/Caste',
      occupation: formData.personalDetails.occupation || 'Occupation',
      income: formData.personalDetails.income || 'Income',
      education: formData.personalDetails.education || 'Education',
      gender: formData.personalDetails.gender || 'Gender',
      
      // Family Details
      fatherName: formData.familyDetails.fatherName || "Father's Name",
      fatherOccupation: formData.familyDetails.fatherOccupation || "Father's Occupation",
      motherName: formData.familyDetails.motherName || "Mother's Name",
      motherOccupation: formData.familyDetails.motherOccupation || "Mother's Occupation",
      siblings: formData.familyDetails.siblings || 'Siblings Info',
      
      // Contact Details
      contactPerson: formData.contactDetails.contactPerson || 'Contact Person',
      contactNumber: formData.contactDetails.contactNumber || 'Contact Number',
      residentialAddress: formData.contactDetails.residentialAddress || 'Address'
    };

    // Define common patterns found in templates with their replacements
    const replacementPatterns = [
      // Names - various formats
      { pattern: /Sanjay Singh/gi, replacement: dataMapping.name },
      { pattern: /Mahima Chaudhari/gi, replacement: dataMapping.name },
      { pattern: /<h1[^>]*class="name"[^>]*>([^<]*)<\/h1>/gi, replacement: `<h1 class="name">${dataMapping.name}</h1>` },
      { pattern: /<span[^>]*class="detail-value"[^>]*>Mahima Chaudhari<\/span>/gi, replacement: `<span class="detail-value">${dataMapping.name}</span>` },
      
      // Date of Birth - various formats
      { pattern: /22\/10\/2000/gi, replacement: dataMapping.dateOfBirth },
      { pattern: /3rd Aug 1993/gi, replacement: dataMapping.dateOfBirth },
      { pattern: /(\d{1,2}\/\d{1,2}\/\d{4})/g, replacement: dataMapping.dateOfBirth },
      
      // Place of Birth
      { pattern: /Bangalore/gi, replacement: dataMapping.placeOfBirth },
      { pattern: /Panipat/gi, replacement: dataMapping.placeOfBirth },
      
      // Height - various formats
      { pattern: /4 Feet 8 Inches/gi, replacement: dataMapping.height },
      { pattern: /5 Feet 6 Inch/gi, replacement: dataMapping.height },
      { pattern: /\d+\s*Feet?\s*\d*\s*Inch(es)?/gi, replacement: dataMapping.height },
      
      // Complexion
      { pattern: /Fair/gi, replacement: dataMapping.complexion },
      
      // Education - various formats
      { pattern: /MBA in Finance/gi, replacement: dataMapping.education },
      { pattern: /Msc\.IT - A\+ Grade/gi, replacement: dataMapping.education },
      
      // Occupation - various formats
      { pattern: /Project Manager/gi, replacement: dataMapping.occupation },
      { pattern: /Software Engineer/gi, replacement: dataMapping.occupation },
      
      // Income
      { pattern: /80,000/gi, replacement: dataMapping.income },
      
      // Gotra/Caste - be careful with Singh as it appears in names too
      { pattern: /Brahmins/gi, replacement: dataMapping.gotra },
      
      // Father's Name - various formats
      { pattern: /Mr\. Pramod Singh/gi, replacement: dataMapping.fatherName },
      { pattern: /Dipakbhai/gi, replacement: dataMapping.fatherName },
      
      // Father's Occupation
      { pattern: /A\.G\.M\. at State Bank of India/gi, replacement: dataMapping.fatherOccupation },
      { pattern: /Business - Retail/gi, replacement: dataMapping.fatherOccupation },
      
      // Mother's Name
      { pattern: /Mrs\. Meena Singh/gi, replacement: dataMapping.motherName },
      { pattern: /Sarladevi/gi, replacement: dataMapping.motherName },
      
      // Mother's Occupation
      { pattern: /House Wife/gi, replacement: dataMapping.motherOccupation },
      { pattern: /Housewife/gi, replacement: dataMapping.motherOccupation },
      
      // Siblings
      { pattern: /2 Sister \| 3 Brother/gi, replacement: dataMapping.siblings },
      
      // Contact Number - various formats
      { pattern: /75678XXXXX/gi, replacement: dataMapping.contactNumber },
      { pattern: /\+91 9098998989/gi, replacement: dataMapping.contactNumber },
      { pattern: /\+?\d{2}\s?\d{10}/g, replacement: dataMapping.contactNumber },
      
      // Address
      { pattern: /Viale Risorgimento 55, 42100 Reggio Emilia/gi, replacement: dataMapping.residentialAddress }
    ];

    // Apply all replacement patterns
    replacementPatterns.forEach(({ pattern, replacement }) => {
      if (replacement && replacement !== pattern.source) {
        updatedHtml = updatedHtml.replace(pattern, replacement);
      }
    });

    // Handle structured data replacements for specific HTML patterns
    // Replace values in info-row structures
    updatedHtml = updatedHtml.replace(
      /<div class="info-row">\s*<span class="label">Date of Birth<\/span>\s*<span class="colon">:<\/span>\s*<span class="value">([^<]*)<\/span>\s*<\/div>/gi,
      `<div class="info-row"><span class="label">Date of Birth</span><span class="colon">:</span><span class="value">${dataMapping.dateOfBirth}</span></div>`
    );

    updatedHtml = updatedHtml.replace(
      /<div class="info-row">\s*<span class="label">Height<\/span>\s*<span class="colon">:<\/span>\s*<span class="value">([^<]*)<\/span>\s*<\/div>/gi,
      `<div class="info-row"><span class="label">Height</span><span class="colon">:</span><span class="value">${dataMapping.height}</span></div>`
    );

    updatedHtml = updatedHtml.replace(
      /<div class="info-row">\s*<span class="label">Address<\/span>\s*<span class="colon">:<\/span>\s*<span class="value">([^<]*)<\/span>\s*<\/div>/gi,
      `<div class="info-row"><span class="label">Address</span><span class="colon">:</span><span class="value">${dataMapping.residentialAddress}</span></div>`
    );

    // Handle detail-row structures (for template 2 format)
    updatedHtml = updatedHtml.replace(
      /<div class="detail-row">\s*<span class="detail-label">Name<\/span>\s*<span class="detail-value">([^<]*)<\/span>\s*<\/div>/gi,
      `<div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">${dataMapping.name}</span></div>`
    );

    updatedHtml = updatedHtml.replace(
      /<div class="detail-row">\s*<span class="detail-label">Height<\/span>\s*<span class="detail-value">([^<]*)<\/span>\s*<\/div>/gi,
      `<div class="detail-row"><span class="detail-label">Height</span><span class="detail-value">${dataMapping.height}</span></div>`
    );

    updatedHtml = updatedHtml.replace(
      /<div class="detail-row">\s*<span class="detail-label">Education<\/span>\s*<span class="detail-value">([^<]*)<\/span>\s*<\/div>/gi,
      `<div class="detail-row"><span class="detail-label">Education</span><span class="detail-value">${dataMapping.education}</span></div>`
    );

    updatedHtml = updatedHtml.replace(
      /<div class="detail-row">\s*<span class="detail-label">Occupation<\/span>\s*<span class="detail-value">([^<]*)<\/span>\s*<\/div>/gi,
      `<div class="detail-row"><span class="detail-label">Occupation</span><span class="detail-value">${dataMapping.occupation}</span></div>`
    );

    updatedHtml = updatedHtml.replace(
      /<div class="detail-row">\s*<span class="detail-label">Father Name<\/span>\s*<span class="detail-value">([^<]*)<\/span>\s*<\/div>/gi,
      `<div class="detail-row"><span class="detail-label">Father Name</span><span class="detail-value">${dataMapping.fatherName}</span></div>`
    );

    updatedHtml = updatedHtml.replace(
      /<div class="detail-row">\s*<span class="detail-label">Mother Name<\/span>\s*<span class="detail-value">([^<]*)<\/span>\s*<\/div>/gi,
      `<div class="detail-row"><span class="detail-label">Mother Name</span><span class="detail-value">${dataMapping.motherName}</span></div>`
    );

    // Handle additional fields dynamically - inject new fields into template
    
    // Function to create new field HTML based on template structure
    const createFieldHtml = (field, templateType = 'info-row') => {
      if (!field.key || !field.value) return '';
      
      if (templateType === 'detail-row') {
        return `
                        <div class="detail-row">
                            <span class="detail-label">${field.key}</span>
                            <span class="detail-value">${field.value}</span>
                        </div>`;
      } else {
        return `
                        <div class="info-row">
                            <span class="label">${field.key}</span>
                            <span class="colon">:</span>
                            <span class="value">${field.value}</span>
                        </div>`;
      }
    };

    // Detect template type based on structure
    const isDetailRowTemplate = updatedHtml.includes('detail-row') && updatedHtml.includes('detail-label');
    const templateType = isDetailRowTemplate ? 'detail-row' : 'info-row';

    // Add personal details additional fields
    if (formData.personalDetails.additionalFields.length > 0) {
      const personalFieldsHtml = formData.personalDetails.additionalFields
        .filter(field => field.key && field.value)
        .map(field => createFieldHtml(field, templateType))
        .join('');

      if (personalFieldsHtml) {
        // Try to find the end of personal details section and insert before it
        if (templateType === 'detail-row') {
          // For template 2 style - find the end of personal details section
          const personalSectionEndPattern = /(<div class="detail-row">\s*<span class="detail-label">Hobbies<\/span>[\s\S]*?<\/div>)/i;
          if (personalSectionEndPattern.test(updatedHtml)) {
            updatedHtml = updatedHtml.replace(personalSectionEndPattern, `$1${personalFieldsHtml}`);
          } else {
            // Fallback: add after the last personal detail field
            const lastPersonalFieldPattern = /(<div class="detail-row">\s*<span class="detail-label">Monthly Income<\/span>[\s\S]*?<\/div>)/i;
            if (lastPersonalFieldPattern.test(updatedHtml)) {
              updatedHtml = updatedHtml.replace(lastPersonalFieldPattern, `$1${personalFieldsHtml}`);
            } else {
              // Another fallback: add after occupation
              const occupationPattern = /(<div class="detail-row">\s*<span class="detail-label">Occupation<\/span>[\s\S]*?<\/div>)/i;
              if (occupationPattern.test(updatedHtml)) {
                updatedHtml = updatedHtml.replace(occupationPattern, `$1${personalFieldsHtml}`);
              }
            }
          }
        } else {
          // For template 1 style - find the end of first section (before Family Details)
          const familySectionPattern = /(<h2 class="section-title">Family Details<\/h2>)/i;
          if (familySectionPattern.test(updatedHtml)) {
            updatedHtml = updatedHtml.replace(familySectionPattern, `${personalFieldsHtml}
                    </div>
                    
                    <div class="section">
                        $1`);
          } else {
            // Fallback: add after the last info-row in the first section
            const lastInfoRowPattern = /(<div class="info-row">\s*<span class="label">Occupation<\/span>[\s\S]*?<\/div>)/i;
            if (lastInfoRowPattern.test(updatedHtml)) {
              updatedHtml = updatedHtml.replace(lastInfoRowPattern, `$1${personalFieldsHtml}`);
            }
          }
        }
      }
    }

    // Add family details additional fields
    if (formData.familyDetails.additionalFields.length > 0) {
      const familyFieldsHtml = formData.familyDetails.additionalFields
        .filter(field => field.key && field.value)
        .map(field => createFieldHtml(field, templateType))
        .join('');

      if (familyFieldsHtml) {
        if (templateType === 'detail-row') {
          // For template 2 style - add after siblings field
          const siblingsPattern = /(<div class="detail-row">\s*<span class="detail-label">Siblings<\/span>[\s\S]*?<\/div>)/i;
          if (siblingsPattern.test(updatedHtml)) {
            updatedHtml = updatedHtml.replace(siblingsPattern, `$1${familyFieldsHtml}`);
          }
        } else {
          // For template 1 style - find the end of family section
          const contactSectionPattern = /(<h2 class="section-title">Contact Details<\/h2>)/i;
          if (contactSectionPattern.test(updatedHtml)) {
            updatedHtml = updatedHtml.replace(contactSectionPattern, `${familyFieldsHtml}
                    </div>
                    
                    <div class="section">
                        $1`);
          } else {
            // Fallback: add after the last family field
            const lastFamilyFieldPattern = /(<div class="info-row">\s*<span class="label">No\. Of Sister<\/span>[\s\S]*?<\/div>)/i;
            if (lastFamilyFieldPattern.test(updatedHtml)) {
              updatedHtml = updatedHtml.replace(lastFamilyFieldPattern, `$1${familyFieldsHtml}`);
            }
          }
        }
      }
    }

    // Add contact details additional fields
    if (formData.contactDetails.additionalFields.length > 0) {
      const contactFieldsHtml = formData.contactDetails.additionalFields
        .filter(field => field.key && field.value)
        .map(field => createFieldHtml(field, templateType))
        .join('');

      if (contactFieldsHtml) {
        if (templateType === 'detail-row') {
          // For template 2 style - add after email field or last contact field
          const emailPattern = /(<div class="detail-row">\s*<span class="detail-label">Email<\/span>[\s\S]*?<\/div>)/i;
          if (emailPattern.test(updatedHtml)) {
            updatedHtml = updatedHtml.replace(emailPattern, `$1${contactFieldsHtml}`);
          } else {
            // Fallback: add after mobile number
            const mobilePattern = /(<div class="detail-row">\s*<span class="detail-label">Mobile Number<\/span>[\s\S]*?<\/div>)/i;
            if (mobilePattern.test(updatedHtml)) {
              updatedHtml = updatedHtml.replace(mobilePattern, `$1${contactFieldsHtml}`);
            }
          }
        } else {
          // For template 1 style - add after the last contact field
          const lastContactFieldPattern = /(<div class="info-row">\s*<span class="label">Address<\/span>[\s\S]*?<\/div>)/i;
          if (lastContactFieldPattern.test(updatedHtml)) {
            updatedHtml = updatedHtml.replace(lastContactFieldPattern, `$1${contactFieldsHtml}`);
          } else {
            // Fallback: add after phone number
            const phonePattern = /(<div class="info-row">\s*<span class="label">Phone no\.<\/span>[\s\S]*?<\/div>)/i;
            if (phonePattern.test(updatedHtml)) {
              updatedHtml = updatedHtml.replace(phonePattern, `$1${contactFieldsHtml}`);
            }
          }
        }
      }
    }

    // Also handle existing field replacement for backward compatibility
    formData.personalDetails.additionalFields.forEach(field => {
      if (field.key && field.value) {
        // Try to find and replace any matching labels in the template
        const labelPattern = new RegExp(`<span class="(label|detail-label)">${field.key}</span>\\s*<span class="colon">:</span>\\s*<span class="(value|detail-value)">([^<]*)</span>`, 'gi');
        updatedHtml = updatedHtml.replace(labelPattern, `<span class="$1">${field.key}</span><span class="colon">:</span><span class="$2">${field.value}</span>`);
      }
    });

    formData.familyDetails.additionalFields.forEach(field => {
      if (field.key && field.value) {
        const labelPattern = new RegExp(`<span class="(label|detail-label)">${field.key}</span>\\s*<span class="colon">:</span>\\s*<span class="(value|detail-value)">([^<]*)</span>`, 'gi');
        updatedHtml = updatedHtml.replace(labelPattern, `<span class="$1">${field.key}</span><span class="colon">:</span><span class="$2">${field.value}</span>`);
      }
    });

    formData.contactDetails.additionalFields.forEach(field => {
      if (field.key && field.value) {
        const labelPattern = new RegExp(`<span class="(label|detail-label)">${field.key}</span>\\s*<span class="colon">:</span>\\s*<span class="(value|detail-value)">([^<]*)</span>`, 'gi');
        updatedHtml = updatedHtml.replace(labelPattern, `<span class="$1">${field.key}</span><span class="colon">:</span><span class="$2">${field.value}</span>`);
      }
    });

    // Handle photo injection for different template structures
    if (preview) {
      // For photo-container structure (template 1)
      const photoContainerRegex = /<div class="photo-container">\s*<!--[^>]*-->\s*<\/div>/;
      updatedHtml = updatedHtml.replace(photoContainerRegex,
        `<div class="photo-container">
          <img src="${preview}" alt="Profile Photo" class="photo">
        </div>`);

      // For profile-photo structure (template 2)
      const profilePhotoRegex = /<div class="profile-photo">\s*<img[^>]*>\s*<\/div>/;
      updatedHtml = updatedHtml.replace(profilePhotoRegex,
        `<div class="profile-photo">
          <img src="${preview}" alt="Profile Photo" class="photo">
        </div>`);

      // Replace any existing img tags with photo class
      updatedHtml = updatedHtml.replace(/<img[^>]*class="[^"]*photo[^"]*"[^>]*>/gi,
        `<img src="${preview}" alt="Profile Photo" class="photo">`);

      // Replace any img tags in profile-photo containers
      updatedHtml = updatedHtml.replace(/<img[^>]*src="[^"]*"[^>]*alt="Profile Photo"[^>]*>/gi,
        `<img src="${preview}" alt="Profile Photo">`);
    } else {
      // If no photo, show placeholder for photo-container
      const photoContainerRegex = /<div class="photo-container">\s*<!--[^>]*-->\s*<\/div>/;
      updatedHtml = updatedHtml.replace(photoContainerRegex,
        `<div class="photo-container">
          <div class="photo" style="display: flex; align-items: center; justify-content: center; background-color: #f0f0f0; color: #666;">
            <span>Photo</span>
          </div>
        </div>`);
    }

    return updatedHtml;
  };

  const _exportRef = useRef();

  const _exportAsImage = async (el, imageFileName) => {
    const style = document.createElement('style');
    style.id = 'download-animation-override';
    style.textContent = `
      @keyframes none {
        to { opacity: 1; }
      }
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        animation: none !important;
        transition: none !important;
      }
    `;

    try {
      // Create a temporary container for the template
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.zIndex = '-1000';
      tempContainer.style.background = 'transparent';
      
      // Clone the template content
      const templateContent = el.querySelector('div').cloneNode(true);
      tempContainer.appendChild(templateContent);
      document.body.appendChild(tempContainer);

      // Apply styles and remove background
      document.head.appendChild(style);
      document.body.style.background = 'transparent';

      // Configure html2canvas to have transparent background and only capture the template
      const canvas = await html2canvas(templateContent, {
        useCORS: true,
        scale: 4,
        backgroundColor: null, // Make background transparent
        logging: false,
      });

      // Create a temporary canvas to ensure transparency
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // Fill with transparent background
      tempCtx.fillStyle = 'transparent';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      // Draw the original canvas
      tempCtx.drawImage(canvas, 0, 0);

      // Convert to image with transparent background
      const image = tempCanvas.toDataURL("image/png");
      downloadImage(image, imageFileName);
    } finally {
      // Clean up
      document.getElementById('download-animation-override')?.remove();
      document.body.style.background = '';
      const tempContainer = document.querySelector('div[style*="left: -9999px"]');
      if (tempContainer) {
        document.body.removeChild(tempContainer);
      }
    }
  };

  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;
    fakeLink.href = blob;
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
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
                  onClick={downloadPdf}
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
                      __html: injectFormDataIntoTemplate(htmlFiles[template - 1]),
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

              </div>
            ) : (
              <div className="lg:col-span-1 flex justify-center sticky top-24 h-fit">
                {htmlFiles[template - 1] && (
                  <div className="w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-lg">
                    <div>
                      <div
                        className="scale-[0.45] origin-top-left w-[820px] h-[1200px] pointer-events-none"
                        dangerouslySetInnerHTML={{
                          __html: injectFormDataIntoTemplate(htmlFiles[template - 1]),
                        }}
                      />
                    </div>
                    {/* <button onClick={updateName} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                      Toggle Name
                    </button> */}
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
    </div >
  );
};

export default BiodataForm;
