const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// PDF Generation Function (following reference pattern)
const generatePDF = async (htmlContent, options = {}) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport for proper rendering
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 1
    });

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfOptions = {
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      },
      ...options
    };

    const pdfBuffer = await page.pdf(pdfOptions);
    return pdfBuffer;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const generatePdfController = async (req, res) => {
  try {
    const { htmlContent } = req.body;

    if (!htmlContent) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    // Generate PDF using the reference pattern
    const pdfBuffer = await generatePDF(htmlContent);

    // Create filename with timestamp
    const pdfFilename = `biodata-${Date.now()}.pdf`;

    // Ensure pdfs directory exists
    // const pdfsDir = path.join(__dirname, '../pdfs');
    // try {
    //   await fs.mkdir(pdfsDir, { recursive: true });
    // } catch (err) {
    //   // Directory might already exist
    // }

    // // Save PDF to backend (local copy)
    // const filepath = path.join(pdfsDir, pdfFilename);
    // await fs.writeFile(filepath, pdfBuffer);

    // Validate PDF buffer before sending
    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('Generated PDF buffer is empty');
    }

    // Check if buffer starts with PDF signature
    const pdfSignature = pdfBuffer.slice(0, 4).toString('ascii');
    if (pdfSignature !== '%PDF') {
      console.warn('Warning: PDF buffer does not start with %PDF signature');
    }

    // Send PDF to frontend
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${pdfFilename}"`,
      'Content-Length': pdfBuffer.length,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });

    // Use res.end() for binary data to avoid any encoding issues
    res.end(pdfBuffer, 'binary');

    console.log(`PDF size: ${pdfBuffer.length} bytes`);
    console.log(`PDF signature: ${pdfSignature}`);

  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};

module.exports = { generatePdfController };
