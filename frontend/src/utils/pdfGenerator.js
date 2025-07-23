import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadPdf = async (template, htmlFiles, injectFormDataIntoTemplate, formData) => {
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

export const exportAsImage = async (el, imageFileName) => {
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

export const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;
  fakeLink.href = blob;
  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
};
