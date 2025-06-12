# HTML Template Gallery for Marriage Biodata

This directory contains HTML-based versions of the React biodata templates, providing the same styling and functionality using vanilla JavaScript and HTML.

## Files Overview

### 1. `BiodataTemplateHTML.js`
- **Purpose**: Core template generator class that creates HTML strings for biodata templates
- **Features**: 
  - 10 different color schemes (amber, blue, green, purple, rose, teal, orange, indigo, red, emerald)
  - Mobile and desktop responsive layouts
  - Same ornate design as React version
  - Tailwind CSS classes for styling

### 2. `TemplateGalleryHTML.js`
- **Purpose**: Gallery component that manages template display and navigation
- **Features**:
  - Carousel navigation with prev/next buttons
  - Dot indicators for slide navigation
  - Mobile-responsive design
  - Template selection callbacks
  - Smooth transitions and animations

### 3. `TemplateGalleryHTMLWrapper.jsx`
- **Purpose**: React wrapper component to integrate HTML templates into React app
- **Features**:
  - Dynamic script loading
  - React lifecycle management
  - Template selection integration

### 4. `template-gallery-demo.html`
- **Purpose**: Standalone HTML demo page
- **Features**:
  - Complete working example
  - No React dependencies
  - Ready to use in any HTML page

## Usage Options

### Option 1: Standalone HTML (Recommended for pure HTML projects)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biodata Templates</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <!-- Include the scripts -->
    <script src="BiodataTemplateHTML.js"></script>
    <script src="TemplateGalleryHTML.js"></script>
    
    <!-- Container for the gallery -->
    <div id="template-gallery"></div>
    
    <script>
        // Initialize the gallery
        const gallery = new TemplateGalleryHTML('template-gallery', {
            onTemplateSelect: function(template) {
                console.log('Selected:', template);
                // Handle template selection
            }
        });
    </script>
</body>
</html>
```

### Option 2: React Integration

```jsx
import TemplateGalleryHTMLWrapper from './TemplateGalleryHTMLWrapper';

function App() {
    const handleTemplateSelect = (template) => {
        console.log('Selected template:', template);
        // Handle template selection
    };

    return (
        <div>
            <TemplateGalleryHTMLWrapper 
                selectedTemplate={handleTemplateSelect}
            />
        </div>
    );
}
```

### Option 3: Manual Template Generation

```javascript
// Create template generator
const generator = new BiodataTemplateHTML();

// Generate a single template
const templateHTML = generator.generateTemplate(
    'amber',           // colorScheme
    'Traditional Gold', // title
    'John Doe',        // username
    'template-1',      // templateId
    false              // isMobile
);

// Insert into DOM
document.getElementById('container').innerHTML = templateHTML;
```

## Template Configuration

### Available Color Schemes
- `amber` - Traditional Gold
- `blue` - Ocean Blue  
- `green` - Forest Green
- `purple` - Royal Purple
- `rose` - Rose Pink
- `teal` - Teal Elegance
- `orange` - Sunset Orange
- `indigo` - Deep Indigo
- `red` - Classic Red
- `emerald` - Emerald Green

### Template Structure
Each template includes:
- **Header**: Marriage Biodata title with decorative elements
- **Photo Section**: Placeholder for profile photo
- **Contact Information**: Mobile and address details
- **Personal Details**: Name, DOB, age, height, complexion
- **Professional Info**: Education, profession, income
- **Family Details**: Father, mother, siblings
- **Other Information**: Religion, caste, mother tongue
- **Ornate Decorations**: Corner ornaments and decorative dots

## Styling

The templates use Tailwind CSS classes for styling. Key features:
- **Responsive Design**: Adapts to mobile and desktop screens
- **Hover Effects**: Scale and shadow animations on hover
- **Color Themes**: Consistent color schemes across all elements
- **Typography**: Proper font sizes and weights for readability
- **Layout**: Flexbox-based responsive layouts

## Customization

### Adding New Color Schemes
```javascript
// In BiodataTemplateHTML.js, add to the colors object:
newColor: {
    gradient: 'from-newcolor-50 to-newcolor-100',
    border: 'border-newcolor-400',
    ornament: 'text-newcolor-400',
    heading: 'text-newcolor-600',
    subheading: 'text-newcolor-700',
    accent: 'bg-newcolor-400',
    lightBg: 'bg-newcolor-50',
    lightBorder: 'border-newcolor-200',
    contactHeading: 'text-newcolor-800',
    button: 'bg-newcolor-500 hover:bg-newcolor-600'
}
```

### Modifying Template Content
Edit the template generation methods in `BiodataTemplateHTML.js`:
- `generateMobileTemplate()` - Mobile version
- `generateDesktopTemplate()` - Desktop version

### Custom Event Handlers
```javascript
const gallery = new TemplateGalleryHTML('container', {
    onTemplateSelect: (template) => {
        // Custom selection logic
        localStorage.setItem('selectedTemplate', JSON.stringify(template));
        window.location.href = '/create-biodata';
    }
});
```

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Requirements**: ES6+ support, Tailwind CSS

## Performance Considerations

- **Lightweight**: No React overhead for pure HTML usage
- **Fast Rendering**: Direct DOM manipulation
- **Memory Efficient**: Minimal JavaScript footprint
- **SEO Friendly**: Server-side renderable HTML

## Integration with Existing React App

To replace the existing React template gallery with the HTML version:

1. **Import the wrapper component**:
```jsx
import TemplateGalleryHTMLWrapper from './components/TemplateGalleryHTMLWrapper';
```

2. **Replace the existing TemplateGallery component**:
```jsx
// Instead of:
// <MarriageBiodataGallery selectedTemplate={handleTemplateSelect} />

// Use:
<TemplateGalleryHTMLWrapper selectedTemplate={handleTemplateSelect} />
```

3. **Update your App.jsx** to use the HTML version when needed.

## Advantages of HTML Version

1. **No React Dependencies**: Can be used in any web project
2. **Better Performance**: Faster rendering without virtual DOM overhead
3. **Easier Customization**: Direct HTML/CSS manipulation
4. **Universal Compatibility**: Works with any JavaScript framework
5. **Smaller Bundle Size**: No React components to bundle
6. **SEO Optimized**: Pure HTML is more search engine friendly

## Migration Guide

If you want to completely replace the React version:

1. Update your main App component to use `TemplateGalleryHTMLWrapper`
2. Test the functionality to ensure template selection works
3. Remove the old React `TemplateGallery.jsx` component
4. Update any imports that reference the old component

## Demo

Open `frontend/public/template-gallery-demo.html` in your browser to see a working example of the HTML template gallery.
