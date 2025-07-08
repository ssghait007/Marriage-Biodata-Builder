import React, { useState, useRef, useEffect } from 'react';
import { Edit, PlusCircle, Trash2, Camera, RotateCcw, } from 'lucide-react';
import { FiUpload, FiX, FiDownload, FiPrinter, FiArrowLeft } from 'react-icons/fi';
// import jsPDF from 'jspdf';

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

  // const formRef = useRef(null);

  // const downloadPdf = async () => {
  //   try {
  //     const downloadBtn = document.querySelector('.download-btn-text');
  //     if (downloadBtn) {
  //       downloadBtn.textContent = 'Generating PDF...';
  //     }

  //     const pdf = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'mm',
  //       format: 'a4',
  //       compress: true
  //     });

  //     const colorMap = {
  //       amber: [245, 158, 11],
  //       blue: [59, 130, 246],
  //       green: [16, 185, 129],
  //       purple: [139, 92, 246],
  //       rose: [244, 63, 94],
  //       teal: [20, 184, 166],
  //       orange: [249, 115, 22],
  //       indigo: [99, 102, 241],
  //       red: [239, 68, 68],
  //       emerald: [16, 185, 129]
  //     };

  //     const primaryColor = colorMap[template?.colorScheme] || colorMap.blue;

  //     pdf.setFillColor(248, 250, 252);
  //     pdf.rect(0, 0, 210, 297, 'F');

  //     pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  //     pdf.setLineWidth(2);
  //     pdf.rect(15, 15, 180, 250);

  //     pdf.setLineWidth(0.5);
  //     pdf.rect(20, 20, 170, 240);

  //     pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);

  //     pdf.ellipse(105, 25, 15, 3, 'F');
  //     pdf.ellipse(105, 25, 12, 2, 'F');

  //     pdf.ellipse(105, 255, 15, 3, 'F');
  //     pdf.ellipse(105, 255, 12, 2, 'F');

  //     const cornerSize = 8;
  //     pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  //     pdf.setLineWidth(1);
  //     pdf.line(25, 25, 25 + cornerSize, 25);
  //     pdf.line(25, 25, 25, 25 + cornerSize);
  //     pdf.circle(25 + 2, 25 + 2, 1, 'F');

  //     pdf.line(185, 25, 185 - cornerSize, 25);
  //     pdf.line(185, 25, 185, 25 + cornerSize);
  //     pdf.circle(185 - 2, 25 + 2, 1, 'F');

  //     pdf.line(25, 255, 25 + cornerSize, 255);
  //     pdf.line(25, 255, 25, 255 - cornerSize);
  //     pdf.circle(25 + 2, 255 - 2, 1, 'F');

  //     pdf.line(185, 255, 185 - cornerSize, 255);
  //     pdf.line(185, 255, 185, 255 - cornerSize);
  //     pdf.circle(185 - 2, 255 - 2, 1, 'F');

  //     pdf.setFontSize(16);
  //     pdf.setFont('helvetica', 'bold');
  //     pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  //     const title = '|| MARRIAGE BIODATA ||';
  //     const titleWidth = pdf.getTextWidth(title);
  //     pdf.text(title, (210 - titleWidth) / 2, 45);

  //     pdf.setLineWidth(1);
  //     pdf.line(80, 50, 130, 50);

  //     let yPos = 65;

  //     // Photo section with border (left side)
  //     pdf.setDrawColor(200, 200, 200);
  //     pdf.setFillColor(245, 245, 245);
  //     pdf.setLineWidth(1);
  //     pdf.rect(30, yPos, 45, 55, 'FD');

  //     // Add image if available
  //     if (preview) {
  //       try {
  //         // Add the image to PDF
  //         pdf.addImage(preview, 'JPEG', 30, yPos, 45, 55);
  //       } catch (error) {
  //         console.warn('Could not add image to PDF:', error);
  //         // Fallback to placeholder text if image fails
  //         pdf.setFontSize(10);
  //         pdf.setTextColor(150, 150, 150);
  //         pdf.text('Photo', 48, yPos + 30);
  //       }
  //     } else {
  //       // Photo placeholder text
  //       pdf.setFontSize(10);
  //       pdf.setTextColor(150, 150, 150);
  //       pdf.text('Photo', 48, yPos + 30);
  //     }

  //     let detailsYPos = yPos;
  //     const detailsXPos = 85;

  //     pdf.setFontSize(12);
  //     pdf.setFont('helvetica', 'bold');
  //     pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  //     pdf.text('PERSONAL', detailsXPos, detailsYPos);

  //     pdf.setLineWidth(0.5);
  //     pdf.line(detailsXPos, detailsYPos + 2, 180, detailsYPos + 2);

  //     pdf.setFontSize(9);
  //     pdf.setFont('helvetica', 'normal');
  //     pdf.setTextColor(0, 0, 0);

  //     const personalItems = [
  //       { label: 'Name:', value: formData.personalDetails.name || '' },
  //       { label: 'DOB:', value: formData.personalDetails.dateOfBirth || '' },
  //       { label: 'Age:', value: formData.personalDetails.age || '' },
  //       { label: 'Height:', value: formData.personalDetails.height || '' },
  //       { label: 'Complexion:', value: formData.personalDetails.complexion || '' }
  //     ];

  //     personalItems.forEach((item, index) => {
  //       pdf.setFont('helvetica', 'bold');
  //       pdf.text(item.label, detailsXPos, detailsYPos + 8 + (index * 6));
  //       pdf.setFont('helvetica', 'normal');
  //       pdf.text(item.value, detailsXPos + pdf.getTextWidth(item.label) + 2, detailsYPos + 8 + (index * 6));
  //     });

  //     formData.personalDetails.additionalFields.forEach((field, index) => {
  //       pdf.setFont('helvetica', 'bold');
  //       pdf.text(`${field.key}:`, detailsXPos, detailsYPos + 8 + ((index + personalItems.length) * 6));
  //       pdf.setFont('helvetica', 'normal');
  //       pdf.text(field.value, detailsXPos + pdf.getTextWidth(`${field.key}:`) + 2, detailsYPos + 8 + ((index + personalItems.length) * 6));
  //     });

  //     detailsYPos += 40;

  //     pdf.setFontSize(12);
  //     pdf.setFont('helvetica', 'bold');
  //     pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  //     pdf.text('PROFESSIONAL', detailsXPos, detailsYPos);

  //     pdf.setLineWidth(0.5);
  //     pdf.line(detailsXPos, detailsYPos + 2, 180, detailsYPos + 2);

  //     const professionalItems = [
  //       { label: 'Education:', value: formData.personalDetails.education || '' },
  //       { label: 'Profession:', value: formData.personalDetails.occupation || '' },
  //       { label: 'Income:', value: formData.personalDetails.income || '' }
  //     ];

  //     pdf.setFontSize(9);
  //     professionalItems.forEach((item, index) => {
  //       pdf.setFont('helvetica', 'bold');
  //       pdf.text(item.label, detailsXPos, detailsYPos + 8 + (index * 6));
  //       pdf.setFont('helvetica', 'normal');
  //       pdf.setTextColor(0, 0, 0);
  //       pdf.text(item.value, detailsXPos + pdf.getTextWidth(item.label) + 2, detailsYPos + 8 + (index * 6));
  //     });

  //     formData.personalDetails.additionalFields.forEach((field, index) => {
  //       pdf.setFont('helvetica', 'bold');
  //       pdf.text(`${field.key}:`, detailsXPos, detailsYPos + 8 + ((index + professionalItems.length) * 6));
  //       pdf.setFont('helvetica', 'normal');
  //       pdf.text(field.value, detailsXPos + pdf.getTextWidth(`${field.key}:`) + 2, detailsYPos + 8 + ((index + professionalItems.length) * 6));
  //     });

  //     detailsYPos += 30;

  //     pdf.setFontSize(12);
  //     pdf.setFont('helvetica', 'bold');
  //     pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  //     pdf.text('FAMILY', detailsXPos, detailsYPos);

  //     pdf.setLineWidth(0.5);
  //     pdf.line(detailsXPos, detailsYPos + 2, 180, detailsYPos + 2);

  //     const familyItems = [
  //       { label: 'Father:', value: formData.familyDetails.fatherName || '' },
  //       { label: 'Mother:', value: formData.familyDetails.motherName || '' },
  //       { label: 'Siblings:', value: formData.familyDetails.siblings || '' }
  //     ];

  //     pdf.setFontSize(9);
  //     familyItems.forEach((item, index) => {
  //       pdf.setFont('helvetica', 'bold');
  //       pdf.text(item.label, detailsXPos, detailsYPos + 8 + (index * 6));
  //       pdf.setFont('helvetica', 'normal');
  //       pdf.setTextColor(0, 0, 0);
  //       pdf.text(item.value, detailsXPos + pdf.getTextWidth(item.label) + 2, detailsYPos + 8 + (index * 6));
  //     });

  //     formData.familyDetails.additionalFields.forEach((field, index) => {
  //       pdf.setFont('helvetica', 'bold');
  //       pdf.text(`${field.key}:`, detailsXPos, detailsYPos + 8 + ((index + familyItems.length) * 6));
  //       pdf.setFont('helvetica', 'normal');
  //       pdf.text(field.value, detailsXPos + pdf.getTextWidth(`${field.key}:`) + 2, detailsYPos + 8 + ((index + familyItems.length) * 6));
  //     });

  //     detailsYPos += 30;

  //     pdf.setFontSize(12);
  //     pdf.setFont('helvetica', 'bold');
  //     pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  //     pdf.text('CONTACT', detailsXPos, detailsYPos);

  //     pdf.setLineWidth(0.5);
  //     pdf.line(detailsXPos, detailsYPos + 2, 180, detailsYPos + 2);

  //     const contactItems = [
  //       { label: 'Mobile:', value: formData.contactDetails.contactNumber || '' },
  //       { label: 'Address:', value: formData.contactDetails.residentialAddress || '' }
  //     ];

  //     pdf.setFontSize(9);
  //     contactItems.forEach((item, index) => {
  //       pdf.setFont('helvetica', 'bold');
  //       pdf.text(item.label, detailsXPos, detailsYPos + 8 + (index * 6));
  //       pdf.setFont('helvetica', 'normal');
  //       pdf.setTextColor(0, 0, 0);

  //       if (item.label === 'Address:' && item.value.length > 35) {
  //         const lines = pdf.splitTextToSize(item.value, 90);
  //         lines.forEach((line, lineIndex) => {
  //           pdf.text(line, detailsXPos + pdf.getTextWidth(item.label) + 2, detailsYPos + 8 + (index * 6) + (lineIndex * 4));
  //         });
  //       } else {
  //         pdf.text(item.value, detailsXPos + pdf.getTextWidth(item.label) + 2, detailsYPos + 8 + (index * 6));
  //       }
  //     });

  //     formData.contactDetails.additionalFields.forEach((field, index) => {
  //       pdf.setFont('helvetica', 'bold');
  //       pdf.text(`${field.key}:`, detailsXPos, detailsYPos + 8 + ((index + contactItems.length) * 6));
  //       pdf.setFont('helvetica', 'normal');
  //       pdf.text(field.value, detailsXPos + pdf.getTextWidth(`${field.key}:`) + 2, detailsYPos + 8 + ((index + contactItems.length) * 6));
  //     });

  //     pdf.setProperties({
  //       title: 'Marriage Biodata',
  //       subject: `Biodata for ${formData.personalDetails.name || 'Individual'}`,
  //       author: 'Biodata Builder',
  //       creator: 'Marriage Biodata Builder'
  //     });

  //     const now = new Date();
  //     const timestamp = now.toISOString().slice(0, 10);
  //     const userName = formData.personalDetails.name || 'biodata';
  //     const filename = `${userName.replace(/\s+/g, '_')}_biodata_${timestamp}.pdf`;

  //     pdf.save(filename);

  //     if (downloadBtn) {
  //       downloadBtn.textContent = 'Download PDF';
  //     }

  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //     alert('Error generating PDF. Please try again.');

  //     const downloadBtn = document.querySelector('.download-btn-text');
  //     if (downloadBtn) {
  //       downloadBtn.textContent = 'Download PDF';
  //     }
  //   }
  // };

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

    // Handle additional fields dynamically
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
        <div>
          {isPhone ? (
            <div className="fixed z-50 inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm">

            </div>

          ) : (

            <div className="fixed z-50 inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm">
              <div className="lg:col-span-1 flex justify-center sticky top-24 h-fit">
                {htmlFiles[template - 1] && (
                  <div className="w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-lg">
                    <div>
                      <div
                        className="scale-[0.45] origin-top-left w-[820px] h-auto pointer-events-none"
                        dangerouslySetInnerHTML={{
                          __html: injectFormDataIntoTemplate(htmlFiles[template - 1]),
                        }}
                      />
                    </div>

                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      )
      }

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
