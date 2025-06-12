// HTML Template Generator for Biodata Templates
class BiodataTemplateHTML {
  constructor() {
    this.colors = {
      amber: {
        gradient: 'from-amber-50 via-yellow-50 to-orange-100',
        border: 'border-amber-400 shadow-amber-200',
        ornament: 'text-amber-500',
        heading: 'text-amber-700',
        subheading: 'text-amber-800',
        accent: 'bg-gradient-to-r from-amber-400 to-yellow-500',
        lightBg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
        lightBorder: 'border-amber-300',
        contactHeading: 'text-amber-900',
        button: 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg'
      },
      blue: {
        gradient: 'from-blue-50 via-sky-50 to-indigo-100',
        border: 'border-blue-400 shadow-blue-200',
        ornament: 'text-blue-500',
        heading: 'text-blue-700',
        subheading: 'text-blue-800',
        accent: 'bg-gradient-to-r from-blue-400 to-sky-500',
        lightBg: 'bg-gradient-to-br from-blue-50 to-sky-50',
        lightBorder: 'border-blue-300',
        contactHeading: 'text-blue-900',
        button: 'bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 shadow-lg'
      },
      green: {
        gradient: 'from-green-50 via-emerald-50 to-teal-100',
        border: 'border-green-400 shadow-green-200',
        ornament: 'text-green-500',
        heading: 'text-green-700',
        subheading: 'text-green-800',
        accent: 'bg-gradient-to-r from-green-400 to-emerald-500',
        lightBg: 'bg-gradient-to-br from-green-50 to-emerald-50',
        lightBorder: 'border-green-300',
        contactHeading: 'text-green-900',
        button: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg'
      },
      purple: {
        gradient: 'from-purple-50 via-violet-50 to-indigo-100',
        border: 'border-purple-400 shadow-purple-200',
        ornament: 'text-purple-500',
        heading: 'text-purple-700',
        subheading: 'text-purple-800',
        accent: 'bg-gradient-to-r from-purple-400 to-violet-500',
        lightBg: 'bg-gradient-to-br from-purple-50 to-violet-50',
        lightBorder: 'border-purple-300',
        contactHeading: 'text-purple-900',
        button: 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg'
      },
      rose: {
        gradient: 'from-rose-50 via-pink-50 to-red-100',
        border: 'border-rose-400 shadow-rose-200',
        ornament: 'text-rose-500',
        heading: 'text-rose-700',
        subheading: 'text-rose-800',
        accent: 'bg-gradient-to-r from-rose-400 to-pink-500',
        lightBg: 'bg-gradient-to-br from-rose-50 to-pink-50',
        lightBorder: 'border-rose-300',
        contactHeading: 'text-rose-900',
        button: 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg'
      },
      teal: {
        gradient: 'from-teal-50 via-cyan-50 to-blue-100',
        border: 'border-teal-400 shadow-teal-200',
        ornament: 'text-teal-500',
        heading: 'text-teal-700',
        subheading: 'text-teal-800',
        accent: 'bg-gradient-to-r from-teal-400 to-cyan-500',
        lightBg: 'bg-gradient-to-br from-teal-50 to-cyan-50',
        lightBorder: 'border-teal-300',
        contactHeading: 'text-teal-900',
        button: 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg'
      },
      orange: {
        gradient: 'from-orange-50 via-amber-50 to-red-100',
        border: 'border-orange-400 shadow-orange-200',
        ornament: 'text-orange-500',
        heading: 'text-orange-700',
        subheading: 'text-orange-800',
        accent: 'bg-gradient-to-r from-orange-400 to-red-500',
        lightBg: 'bg-gradient-to-br from-orange-50 to-amber-50',
        lightBorder: 'border-orange-300',
        contactHeading: 'text-orange-900',
        button: 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg'
      },
      indigo: {
        gradient: 'from-indigo-50 via-purple-50 to-blue-100',
        border: 'border-indigo-400 shadow-indigo-200',
        ornament: 'text-indigo-500',
        heading: 'text-indigo-700',
        subheading: 'text-indigo-800',
        accent: 'bg-gradient-to-r from-indigo-400 to-purple-500',
        lightBg: 'bg-gradient-to-br from-indigo-50 to-purple-50',
        lightBorder: 'border-indigo-300',
        contactHeading: 'text-indigo-900',
        button: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg'
      },
      red: {
        gradient: 'from-red-50 via-rose-50 to-pink-100',
        border: 'border-red-400 shadow-red-200',
        ornament: 'text-red-500',
        heading: 'text-red-700',
        subheading: 'text-red-800',
        accent: 'bg-gradient-to-r from-red-400 to-rose-500',
        lightBg: 'bg-gradient-to-br from-red-50 to-rose-50',
        lightBorder: 'border-red-300',
        contactHeading: 'text-red-900',
        button: 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg'
      },
      emerald: {
        gradient: 'from-emerald-50 via-green-50 to-teal-100',
        border: 'border-emerald-400 shadow-emerald-200',
        ornament: 'text-emerald-500',
        heading: 'text-emerald-700',
        subheading: 'text-emerald-800',
        accent: 'bg-gradient-to-r from-emerald-400 to-teal-500',
        lightBg: 'bg-gradient-to-br from-emerald-50 to-green-50',
        lightBorder: 'border-emerald-300',
        contactHeading: 'text-emerald-900',
        button: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg'
      }
    };
  }

  generateOrnamentSVG(theme) {
    return `
      <svg viewBox="0 0 80 80" class="w-full h-full ${theme.ornament} fill-current drop-shadow-sm">
        <defs>
          <linearGradient id="ornamentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:currentColor;stop-opacity:1" />
            <stop offset="100%" style="stop-color:currentColor;stop-opacity:0.7" />
          </linearGradient>
        </defs>
        <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" fill="url(#ornamentGradient)" />
        <path d="M10 10 Q20 5 30 10 Q20 15 10 10 Z" fill="currentColor" opacity="0.6" />
        <circle cx="25" cy="25" r="2" fill="currentColor" />
        <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.8" />
        <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5" />
      </svg>
    `;
  }

  generateSideOrnamentSVG(theme) {
    return `
      <svg viewBox="0 0 128 48" class="w-full h-full ${theme.ornament} fill-current drop-shadow-sm">
        <defs>
          <linearGradient id="sideGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:currentColor;stop-opacity:0.3" />
            <stop offset="50%" style="stop-color:currentColor;stop-opacity:1" />
            <stop offset="100%" style="stop-color:currentColor;stop-opacity:0.3" />
          </linearGradient>
        </defs>
        <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" fill="url(#sideGradient)" />
        <path d="M30 24 Q50 16 64 24 Q78 16 98 24 Q78 32 64 24 Q50 32 30 24 Z" fill="currentColor" opacity="0.4" />
        <circle cx="64" cy="20" r="2" fill="currentColor" />
        <circle cx="44" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="84" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="54" cy="18" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="74" cy="18" r="1" fill="currentColor" opacity="0.4" />
      </svg>
    `;
  }

  generateMobileTemplate(colorScheme, title, username, templateId) {
    const theme = this.colors[colorScheme];
    
    return `
      <div class="flex-shrink-0 w-80 mx-2 group" data-template-id="${templateId}">
        <h3 class="text-center font-semibold mb-2 text-white">${title}</h3>
        <div class="relative w-full bg-gradient-to-br ${theme.gradient} p-4 shadow-xl rounded-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 cursor-pointer template-card">
          <!-- Main container with ornate border -->
          <div class="relative bg-white border-2 ${theme.border} min-h-[500px] rounded transition-all duration-300 group-hover:border-opacity-80">

            <!-- Corner ornaments - Top Left -->
            <div class="absolute top-0 left-0 w-8 h-8">
              ${this.generateOrnamentSVG(theme)}
            </div>

            <!-- Corner ornaments - Top Right -->
            <div class="absolute top-0 right-0 w-8 h-8 transform rotate-90">
              ${this.generateOrnamentSVG(theme)}
            </div>

            <!-- Corner ornaments - Bottom Right -->
            <div class="absolute bottom-0 right-0 w-8 h-8 transform rotate-180">
              ${this.generateOrnamentSVG(theme)}
            </div>

            <!-- Corner ornaments - Bottom Left -->
            <div class="absolute bottom-0 left-0 w-8 h-8 transform -rotate-90">
              ${this.generateOrnamentSVG(theme)}
            </div>

            <!-- Side ornaments - Top -->
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-6">
              ${this.generateSideOrnamentSVG(theme)}
            </div>

            <!-- Side ornaments - Bottom -->
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-180 w-16 h-6">
              ${this.generateSideOrnamentSVG(theme)}
            </div>

            <!-- Inner content area -->
            <div class="absolute inset-6 bg-white p-3">
              <!-- Header -->
              <div class="text-center mb-3">
                <h1 class="text-sm font-bold ${theme.heading} mb-1">|| MARRIAGE BIODATA ||</h1>
                <div class="w-12 h-0.5 ${theme.accent} mx-auto"></div>
              </div>

              <!-- Main Content -->
              <div class="flex gap-3">
                <!-- Left Column - Photo -->
                <div class="w-1/3">
                  <div class="bg-gradient-to-br from-gray-50 to-gray-100 border ${theme.lightBorder} h-32 flex items-center justify-center mb-2 rounded-lg shadow-inner relative overflow-hidden">
                    <!-- Decorative pattern background -->
                    <div class="absolute inset-0 opacity-5">
                      <svg width="100%" height="100%" viewBox="0 0 40 40" class="${theme.ornament}">
                        <defs>
                          <pattern id="photoPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3"/>
                            <circle cx="5" cy="5" r="0.5" fill="currentColor" opacity="0.2"/>
                            <circle cx="15" cy="15" r="0.5" fill="currentColor" opacity="0.2"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#photoPattern)"/>
                      </svg>
                    </div>
                    <div class="text-center text-gray-500 relative z-10">
                      <div class="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-1 flex items-center justify-center shadow-sm border border-gray-300">
                        <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <p class="text-xs font-medium">Photo</p>
                    </div>
                  </div>
                </div>

                <!-- Right Column - Details -->
                <div class="w-2/3 space-y-2 text-xs">
                  <!-- Personal Information -->
                  <div>
                    <h2 class="text-sm font-bold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5">PERSONAL</h2>
                    <div class="grid grid-cols-1 gap-y-0.5">
                      <div><strong>Name:</strong> ${username || 'Priya Sharma'}</div>
                      <div><strong>DOB:</strong> 15th March, 1995</div>
                      <div><strong>Age:</strong> 28 Years</div>
                      <div><strong>Height:</strong> 5'4"</div>
                      <div><strong>Complexion:</strong> Fair</div>
                    </div>
                  </div>

                  <!-- Educational & Professional -->
                  <div>
                    <h3 class="font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5">PROFESSIONAL</h3>
                    <div class="grid grid-cols-1 gap-y-0.5">
                      <div><strong>Education:</strong> MBA Finance</div>
                      <div><strong>Profession:</strong> Financial Analyst</div>
                      <div><strong>Income:</strong> ₹8-10 Lakhs</div>
                    </div>
                  </div>

                  <!-- Family Information -->
                  <div>
                    <h3 class="font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5">FAMILY</h3>
                    <div class="grid grid-cols-1 gap-y-0.5">
                      <div><strong>Father:</strong> Mr. Rajesh Sharma</div>
                      <div><strong>Mother:</strong> Mrs. Sunita Sharma</div>
                      <div><strong>Siblings:</strong> 1 Brother</div>
                    </div>
                  </div>

                  <!-- Contact Information -->
                  <div>
                    <h3 class="font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5">CONTACT</h3>
                    <div class="grid grid-cols-1 gap-y-0.5">
                      <div><strong>Mobile:</strong> +91 98765</div>
                      <div><strong>Address:</strong> Delhi</div>
                    </div>
                  </div>

                  <!-- Other Details -->
                  <div>
                    <h3 class="font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5">OTHER</h3>
                    <div class="grid grid-cols-1 gap-y-0.5">
                      <div><strong>Religion:</strong> Hindu</div>
                      <div><strong>Caste:</strong> Brahmin</div>
                      <div><strong>Mother Tongue:</strong> Hindi</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Decorative dots -->
            <div class="absolute top-3 left-3 w-1 h-1 ${theme.accent} rounded-full opacity-60"></div>
            <div class="absolute top-3 right-3 w-1 h-1 ${theme.accent} rounded-full opacity-60"></div>
            <div class="absolute bottom-3 left-3 w-1 h-1 ${theme.accent} rounded-full opacity-60"></div>
            <div class="absolute bottom-3 right-3 w-1 h-1 ${theme.accent} rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    `;
  }

  generateDesktopTemplate(colorScheme, title, username, templateId) {
    const theme = this.colors[colorScheme];
    
    return `
      <div class="flex-shrink-0 w-full sm:w-96 md:w-80 lg:w-96 mx-2 group" data-template-id="${templateId}">
        <h3 class="text-center font-semibold mb-2 text-white text-sm sm:text-base">${title}</h3>
        <div class="relative w-full bg-gradient-to-br ${theme.gradient} p-2 sm:p-4 shadow-xl rounded-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
          <!-- Select Template Button - Only visible on hover -->
          <div class="absolute inset-2 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
            <button class="${theme.button} cursor-pointer text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:shadow-xl text-sm sm:text-base template-select-btn">
              Select Template
            </button>
          </div>

          <!-- Main container with ornate border -->
          <div class="relative bg-white border-2 ${theme.border} min-h-80 sm:min-h-[500px] rounded transition-all duration-300 group-hover:border-opacity-80">

            <!-- Corner ornaments - Top Left -->
            <div class="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8">
              ${this.generateOrnamentSVG(theme)}
            </div>

            <!-- Corner ornaments - Top Right -->
            <div class="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 transform rotate-90">
              ${this.generateOrnamentSVG(theme)}
            </div>

            <!-- Corner ornaments - Bottom Right -->
            <div class="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 transform rotate-180">
              ${this.generateOrnamentSVG(theme)}
            </div>

            <!-- Corner ornaments - Bottom Left -->
            <div class="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 transform -rotate-90">
              ${this.generateOrnamentSVG(theme)}
            </div>

            <!-- Side ornaments - Top -->
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-4 sm:w-16 sm:h-6">
              ${this.generateSideOrnamentSVG(theme)}
            </div>

            <!-- Side ornaments - Bottom -->
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-180 w-12 h-4 sm:w-16 sm:h-6">
              ${this.generateSideOrnamentSVG(theme)}
            </div>

            <!-- Inner content area -->
            <div class="absolute inset-4 sm:inset-6 bg-white p-2 sm:p-3">
              <!-- Header -->
              <div class="text-center mb-2 sm:mb-3">
                <h1 class="text-xs sm:text-sm font-bold ${theme.heading} mb-1">|| MARRIAGE BIODATA ||</h1>
                <div class="w-8 sm:w-12 h-0.5 ${theme.accent} mx-auto"></div>
              </div>

              <!-- Main Content -->
              <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <!-- Photo Section -->
                <div class="w-full sm:w-1/3">
                  <div class="bg-gradient-to-br from-gray-50 to-gray-100 border ${theme.lightBorder} h-24 sm:h-32 flex items-center justify-center mb-2 rounded-lg shadow-inner relative overflow-hidden">
                    <!-- Decorative pattern background -->
                    <div class="absolute inset-0 opacity-5">
                      <svg width="100%" height="100%" viewBox="0 0 40 40" class="${theme.ornament}">
                        <defs>
                          <pattern id="photoPatternDesktop" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3"/>
                            <circle cx="5" cy="5" r="0.5" fill="currentColor" opacity="0.2"/>
                            <circle cx="15" cy="15" r="0.5" fill="currentColor" opacity="0.2"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#photoPatternDesktop)"/>
                      </svg>
                    </div>
                    <div class="text-center text-gray-500 relative z-10">
                      <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-1 flex items-center justify-center shadow-sm border border-gray-300">
                        <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <p class="text-xs font-medium">Photo</p>
                    </div>
                  </div>
                </div>

                <!-- Details Section -->
                <div class="w-full sm:w-2/3 space-y-1.5 sm:space-y-2 text-xs">
                  <!-- Personal Information -->
                  <div>
                    <h2 class="text-xs sm:text-sm font-bold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5">PERSONAL</h2>
                    <div class="grid grid-cols-1 gap-y-0.5">
                      <div><strong>Name:</strong> ${username || 'Priya Sharma'}</div>
                      <div><strong>DOB:</strong> 15th March, 1995</div>
                      <div><strong>Age:</strong> 28 Years</div>
                      <div><strong>Height:</strong> 5'4"</div>
                      <div><strong>Complexion:</strong> Fair</div>
                    </div>
                  </div>

                  <!-- Educational & Professional -->
                  <div>
                    <h3 class="font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5 text-xs">PROFESSIONAL</h3>
                    <div class="grid grid-cols-1 gap-y-0.5">
                      <div><strong>Education:</strong> MBA Finance</div>
                      <div><strong>Profession:</strong> Financial Analyst</div>
                      <div><strong>Income:</strong> ₹8-10 Lakhs</div>
                    </div>
                  </div>

                  <!-- Family Information -->
                  <div>
                    <h3 class="font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5 text-xs">FAMILY</h3>
                    <div class="grid grid-cols-1 gap-y-0.5">
                      <div><strong>Father:</strong> Mr. Rajesh Sharma</div>
                      <div><strong>Mother:</strong> Mrs. Sunita Sharma</div>
                      <div><strong>Siblings:</strong> 1 Brother</div>
                    </div>
                  </div>

                  <!-- Contact Information -->
                  <div>
                    <h3 class="font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5 text-xs">CONTACT</h3>
                    <div class="grid grid-cols-1 gap-y-0.5">
                      <div><strong>Mobile:</strong> +91 98765</div>
                      <div><strong>Address:</strong> Delhi</div>
                    </div>
                  </div>

                  <!-- Other Details -->
                  <div>
                    <h3 class="font-semibold ${theme.subheading} mb-1 border-b ${theme.lightBorder} pb-0.5 text-xs">OTHER</h3>
                    <div class="grid grid-cols-1 gap-y-0.5">
                      <div><strong>Religion:</strong> Hindu</div>
                      <div><strong>Caste:</strong> Brahmin</div>
                      <div><strong>Mother Tongue:</strong> Hindi</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Decorative dots -->
            <div class="absolute top-2 sm:top-3 left-2 sm:left-3 w-1 h-1 ${theme.accent} rounded-full opacity-60"></div>
            <div class="absolute top-2 sm:top-3 right-2 sm:right-3 w-1 h-1 ${theme.accent} rounded-full opacity-60"></div>
            <div class="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-1 h-1 ${theme.accent} rounded-full opacity-60"></div>
            <div class="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-1 h-1 ${theme.accent} rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    `;
  }

  generateTemplate(colorScheme, title, username, templateId, isMobile = false) {
    if (isMobile) {
      return this.generateMobileTemplate(colorScheme, title, username, templateId);
    } else {
      return this.generateDesktopTemplate(colorScheme, title, username, templateId);
    }
  }
}

// Export for use in other files
if (typeof window !== 'undefined') {
  window.BiodataTemplateHTML = BiodataTemplateHTML;
}
