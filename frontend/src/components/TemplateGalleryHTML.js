// HTML-based Template Gallery
class TemplateGalleryHTML {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.templateGenerator = new BiodataTemplateHTML();
    this.currentSlide = 0;
    this.isPhone = window.innerWidth < 768;
    this.selectedTemplateCallback = options.onTemplateSelect || null;
    
    this.templates = [
      { colorScheme: 'amber', title: 'Traditional Gold', username: 'Devanshu Patil' },
      { colorScheme: 'blue', title: 'Ocean Blue', username: 'Devanshu Patil' },
      { colorScheme: 'green', title: 'Forest Green', username: 'Devanshu Patil' },
      { colorScheme: 'purple', title: 'Royal Purple', username: 'Devanshu Patil' },
      { colorScheme: 'rose', title: 'Rose Pink', username: 'Devanshu Patil' },
      { colorScheme: 'teal', title: 'Teal Elegance', username: 'Devanshu Patil' },
      { colorScheme: 'orange', title: 'Sunset Orange', username: 'Devanshu Patil' },
      { colorScheme: 'indigo', title: 'Deep Indigo', username: 'Devanshu Patil' },
      { colorScheme: 'red', title: 'Classic Red', username: 'Devanshu Patil' },
      { colorScheme: 'emerald', title: 'Emerald Green', username: 'Devanshu Patil' },
    ];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    // Resize listener
    window.addEventListener('resize', () => {
      this.isPhone = window.innerWidth < 768;
      this.render();
    });
  }

  handleTemplateSelect(template) {
    if (this.selectedTemplateCallback) {
      this.selectedTemplateCallback(template);
    }
    
    // Scroll to create section if it exists
    const createSection = document.getElementById('create');
    if (createSection) {
      createSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % Math.max(1, this.templates.length - 2);
    this.updateSlider();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + Math.max(1, this.templates.length - 2)) % Math.max(1, this.templates.length - 2);
    this.updateSlider();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  }

  updateSlider() {
    const slider = this.container.querySelector('.template-slider');
    if (slider) {
      const translateX = this.isPhone ? -this.currentSlide * 20 : -this.currentSlide * 25;
      slider.style.transform = `translateX(${translateX}%)`;
    }

    // Update dots
    const dots = this.container.querySelectorAll('.dot-indicator');
    dots.forEach((dot, index) => {
      if (index === this.currentSlide) {
        dot.classList.add('bg-white', 'shadow-lg');
        dot.classList.remove('bg-white/30');
      } else {
        dot.classList.remove('bg-white', 'shadow-lg');
        dot.classList.add('bg-white/30');
      }
    });
  }

  generateMobileGallery() {
    const templatesHTML = this.templates.map((template, index) => 
      this.templateGenerator.generateTemplate(
        template.colorScheme, 
        template.title, 
        template.username, 
        index, 
        true
      )
    ).join('');

    return `
      <div class="overflow-x-auto pb-4">
        <div class="flex transition-transform duration-500 ease-in-out template-slider">
          ${templatesHTML}
        </div>
      </div>
    `;
  }

  generateDesktopGallery() {
    const templatesHTML = this.templates.map((template, index) => 
      this.templateGenerator.generateTemplate(
        template.colorScheme, 
        template.title, 
        template.username, 
        index, 
        false
      )
    ).join('');

    const dotsHTML = Array.from({ length: Math.max(1, this.templates.length - 2) })
      .map((_, index) => `
        <button class="w-3 h-3 rounded-full transition-all duration-300 dot-indicator ${
          index === this.currentSlide ? 'bg-white shadow-lg' : 'bg-white/30'
        }" data-slide="${index}"></button>
      `).join('');

    return `
      <div class="relative">
        <!-- Navigation Buttons -->
        <button class="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black p-3 rounded-full transition-all duration-300 shadow-lg prev-btn">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <button class="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black p-3 rounded-full transition-all duration-300 shadow-lg next-btn">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <div class="overflow-hidden">
          <div class="flex transition-transform duration-500 ease-in-out template-slider">
            ${templatesHTML}
          </div>
        </div>

        <!-- Dots Indicator -->
        <div class="flex justify-center space-x-3 mt-8">
          ${dotsHTML}
        </div>
      </div>
    `;
  }

  render() {
    if (!this.container) return;

    const galleryHTML = this.isPhone ? this.generateMobileGallery() : this.generateDesktopGallery();

    this.container.innerHTML = `
      <div id="templates" class="py-10 bg-gradient-to-b from-white to-gray-50">
        <div class="min-h-screen bg-gradient-to-br from-purple-900 via-red-900 to-pink-800">
          <!-- Hero Section -->
          <div class="text-center py-16 px-4">
            <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Marriage Biodata Template Gallery
            </h1>
            <p class="text-xl text-pink-200 max-w-3xl mx-auto leading-relaxed">
              Create beautiful, professional marriage biodata with our premium templates.
              Choose from our collection of elegantly designed formats.
            </p>
          </div>

          <!-- Gallery Section -->
          <div class="container mx-auto px-4 pb-16">
            ${galleryHTML}

            <!-- CTA Section -->
            <div class="text-center mt-16">
              <h2 class="text-3xl font-bold text-white mb-4">Ready to Create Your Perfect Biodata?</h2>
              <p class="text-pink-200 text-lg mb-8 max-w-2xl mx-auto">
                Choose from our premium templates and create a professional marriage biodata in minutes
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#create" class="cursor-pointer bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-pink-500/25 hover:scale-105">
                  Start Creating Now
                </a>
                <a href="#templates" class="cursor-pointer border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
                  View All Templates
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    // Navigation buttons
    const prevBtn = this.container.querySelector('.prev-btn');
    const nextBtn = this.container.querySelector('.next-btn');
    
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

    // Dots navigation
    const dots = this.container.querySelectorAll('.dot-indicator');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Template selection
    const templateCards = this.container.querySelectorAll('.template-card');
    const selectButtons = this.container.querySelectorAll('.template-select-btn');

    templateCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (this.isPhone) {
          this.handleTemplateSelect(this.templates[index]);
        }
      });
    });

    selectButtons.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleTemplateSelect(this.templates[index]);
      });
    });
  }
}

// Export for use in other files
if (typeof window !== 'undefined') {
  window.TemplateGalleryHTML = TemplateGalleryHTML;
}
