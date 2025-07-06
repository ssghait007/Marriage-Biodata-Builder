// Dynamic Template Manager for handling template file creation
class DynamicTemplateManager {
  constructor() {
    this.baseFileName = 'temp_';
    this.currentCounter = this.getInitialCounter();
  }


  // Get initial counter value dynamically based on existing files
  getInitialCounter() {
    // Check localStorage for the last used counter
    const savedCounter = localStorage.getItem('templateCounter');
    
    if (savedCounter) {
      const counterValue = parseInt(savedCounter, 10);
      // Use the saved counter value
      return counterValue;
    }
    
    // If no saved counter, start from 7 (default starting point)
    // The system will automatically increment from here
    return 7;
  }

  // Generate next template filename
  getNextTemplateName() {
    const fileName = `${this.baseFileName}${this.currentCounter}.html`;
    return fileName;
  }

  // Increment counter and save to localStorage
  incrementCounter() {
    this.currentCounter++;
    localStorage.setItem('templateCounter', this.currentCounter.toString());
  }

  // Save template with dynamic naming to Templates folder
  async saveTemplate(htmlContent) {
    const URL = import.meta.env.VITE_BACKEND_URL;
    
    // Get the current counter value and increment for next use
    const currentFileNumber = this.currentCounter;
    const fileName = `${this.baseFileName}${currentFileNumber}.html`;
    
    console.log(`Attempting to save template as: ${fileName} (counter: ${currentFileNumber})`);

    try {
      // Make API call to save template file
      const response = await fetch(`${URL}/api/save-template`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: fileName,
          content: htmlContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Only increment counter after successful save
        this.incrementCounter();
        console.log(`Template saved successfully. Next counter will be: ${this.currentCounter}`);
        
        return {
          success: true,
          fileName: fileName,
          message: `Template saved successfully as ${fileName} in Templates folder!`
        };
      } else {
        throw new Error(result.message || 'Failed to save template');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      
      return {
        success: false,
        error: error.message,
        message: 'Error saving template. Please try again.'
      };
    }
  }

  // Get current counter value
  getCurrentCounter() {
    return this.currentCounter;
  }

  // Reset counter (for testing purposes)
  resetCounter(newValue = 7) {
    this.currentCounter = newValue;
    localStorage.setItem('templateCounter', newValue.toString());
  }
}

// Export singleton instance
export const templateManager = new DynamicTemplateManager();
export default DynamicTemplateManager;
