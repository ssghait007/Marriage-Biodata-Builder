const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');

const saveTemplate = async (fileName, content) => {
    let browser;
    try {
        // Save HTML template
        const dirPath = path.join(__dirname, '../../frontend/src/Templates');
        await fs.mkdir(dirPath, { recursive: true });
        const filePath = path.join(dirPath, fileName);
        await fs.writeFile(filePath, content, 'utf8');

        // Generate PNG image
        const imageFileName = fileName.replace('.html', '.png');
        const imageDirPath = path.join(__dirname, '../../frontend/src/assets/TemplatesImage');
        await fs.mkdir(imageDirPath, { recursive: true });
        const imagePath = path.join(imageDirPath, imageFileName);

        // Launch puppeteer with better configuration
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor',
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--no-first-run',
                '--disable-default-apps'
            ]
        });

        const page = await browser.newPage();
        
        // Set a larger viewport to capture the full template
        await page.setViewport({ 
            width: 1000, 
            height: 1400, 
            deviceScaleFactor: 2
        });

        // Strip wrapper tags but keep the content structure
        const stripWrapperTags = (html) => html.replace(/<\/?(html|head|body)[^>]*>/gi, '');
        const strippedContent = stripWrapperTags(content);

        // Create complete HTML preserving the original styles
        const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                
                body {
                    font-family: 'Georgia', serif;
                    background: #f0f0f0;
                    padding: 20px;
                    margin: 0;
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                }
                
                .capture-container {
                    background: white;
                    border: 2px solid #8B4513;
                    border-radius: 10px;
                    padding: 0;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    max-width: 600px;
                    width: 100%;
                    position: relative;
                }
                
                /* Preserve all the original template styles */
                .capture-container * {
                    font-family: 'Georgia', serif !important;
                }
                
                /* Make sure images are visible */
                .capture-container img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                }
                
                /* Ensure proper text rendering */
                .capture-container {
                    color: #333;
                    line-height: 1.4;
                }
                
                /* Grid layout fixes */
                .capture-container .grid-template-columns {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 20px;
                }
                
                /* Profile section styling */
                .capture-container .profile-image {
                    text-align: center;
                    margin-bottom: 20px;
                }
                
                .capture-container .profile-image img {
                    width: 120px;
                    height: 120px;
                    border: 3px solid #8B4513;
                    border-radius: 5px;
                }
                
                /* Section headers */
                .capture-container h1, .capture-container h2, .capture-container h3 {
                    color: #333;
                    margin-bottom: 10px;
                    text-align: center;
                }
                
                /* Detail rows */
                .capture-container .detail-row {
                    display: flex;
                    margin-bottom: 10px;
                    padding: 5px 0;
                    border-bottom: 1px solid #eee;
                }
                
                .capture-container .detail-row:last-child {
                    border-bottom: none;
                }
            </style>
        </head>
        <body>
            <div class="capture-container">
                ${strippedContent}
            </div>
        </body>
        </html>`;

        console.log('Setting page content...');
        await page.setContent(fullHtml, { 
            waitUntil: ['networkidle0', 'domcontentloaded'],
            timeout: 30000
        });

        // Wait for all images and content to load
        await page.waitForFunction(() => {
            const images = document.querySelectorAll('img');
            return Array.from(images).every(img => img.complete);
        }, { timeout: 10000 }).catch(() => {
            console.log('Images may not have loaded completely, continuing...');
        });

        // Additional wait for content to stabilize
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Get the container element
        const containerElement = await page.$('.capture-container');
        if (!containerElement) {
            throw new Error('Capture container not found');
        }

        // Get the bounding box of the container
        const boundingBox = await containerElement.boundingBox();
       

        // Take screenshot of just the container
        const screenshot = await containerElement.screenshot({
            type: 'png',
            omitBackground: false
        });

        // Save the screenshot
        await fs.writeFile(imagePath, screenshot);
        

        await browser.close();

        return {
            success: true,
            message: `Template ${fileName} and image ${imageFileName} saved successfully`,
            fileName: fileName,
            imageFileName: imageFileName,
            path: filePath,
            imagePath: imagePath,
            dimensions: boundingBox
        };

    } catch (error) {
        console.error('Error saving template:', error);
        if (browser) {
            await browser.close();
        }
        return { success: false, error: 'Error saving template: ' + error.message };
    }
};

// Simpler fallback method
const saveTemplateSimple = async (fileName, content) => {
    let browser;
    try {
        // Save HTML template
        const dirPath = path.join(__dirname, '../../frontend/src/Templates');
        await fs.mkdir(dirPath, { recursive: true });
        const filePath = path.join(dirPath, fileName);
        await fs.writeFile(filePath, content, 'utf8');

        // Generate PNG image
        const imageFileName = fileName.replace('.html', '.png');
        const imageDirPath = path.join(__dirname, '../../frontend/src/assets/TemplatesImage');
        await fs.mkdir(imageDirPath, { recursive: true });
        const imagePath = path.join(imageDirPath, imageFileName);

        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 800, height: 1200, deviceScaleFactor: 1 });

        // Use the content as-is with minimal wrapper
        const simpleHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { 
                    margin: 20px; 
                    font-family: Georgia, serif; 
                    background: white;
                    padding: 20px;
                }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>`;

        await page.setContent(simpleHtml, { waitUntil: 'networkidle0' });
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Take full page screenshot
        const screenshot = await page.screenshot({
            type: 'png',
            fullPage: true
        });

        await fs.writeFile(imagePath, screenshot);
        await browser.close();

        return {
            success: true,
            message: `Template ${fileName} and image ${imageFileName} saved successfully (simple method)`,
            fileName: fileName,
            imageFileName: imageFileName,
            path: filePath,
            imagePath: imagePath
        };

    } catch (error) {
        console.error('Error saving template (simple method):', error);
        if (browser) {
            await browser.close();
        }
        return { success: false, error: 'Error saving template: ' + error.message };
    }
};

module.exports = {
    saveTemplate,
    saveTemplateSimple
};