import React from 'react';

const Template_2 = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-amber-50 to-stone-100 p-8 shadow-2xl">
      {/* Main container with ornate border */}
      <div className="relative bg-white border-2 border-amber-400 h-[700px] overflow-hidden">
        
        {/* Corner ornaments - Top Left */}
        <div className="absolute top-0 left-0 w-20 h-20">
          <svg viewBox="0 0 80 80" className="w-full h-full text-amber-400 fill-current">
            <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
            <path d="M15 25 Q35 25 35 45 Q35 25 55 25 Q35 25 35 5 Q35 25 15 25 Z" />
            <circle cx="25" cy="25" r="3" />
            <circle cx="15" cy="15" r="2" />
            <circle cx="35" cy="35" r="2" />
            <path d="M45 15 Q65 15 65 35 L75 35 Q65 35 65 25 Q65 5 45 5 Q65 5 65 15 Q55 15 45 15 Z" />
            <g transform="rotate(45 40 40)">
              <rect x="38" y="25" width="4" height="15" rx="1" />
              <rect x="25" y="38" width="15" height="4" rx="1" />
            </g>
          </svg>
        </div>

        {/* Corner ornaments - Top Right */}
        <div className="absolute top-0 right-0 w-20 h-20 transform rotate-90">
          <svg viewBox="0 0 80 80" className="w-full h-full text-amber-400 fill-current">
            <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
            <path d="M15 25 Q35 25 35 45 Q35 25 55 25 Q35 25 35 5 Q35 25 15 25 Z" />
            <circle cx="25" cy="25" r="3" />
            <circle cx="15" cy="15" r="2" />
            <circle cx="35" cy="35" r="2" />
            <path d="M45 15 Q65 15 65 35 L75 35 Q65 35 65 25 Q65 5 45 5 Q65 5 65 15 Q55 15 45 15 Z" />
            <g transform="rotate(45 40 40)">
              <rect x="38" y="25" width="4" height="15" rx="1" />
              <rect x="25" y="38" width="15" height="4" rx="1" />
            </g>
          </svg>
        </div>

        {/* Corner ornaments - Bottom Right */}
        <div className="absolute bottom-0 right-0 w-20 h-20 transform rotate-180">
          <svg viewBox="0 0 80 80" className="w-full h-full text-amber-400 fill-current">
            <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
            <path d="M15 25 Q35 25 35 45 Q35 25 55 25 Q35 25 35 5 Q35 25 15 25 Z" />
            <circle cx="25" cy="25" r="3" />
            <circle cx="15" cy="15" r="2" />
            <circle cx="35" cy="35" r="2" />
            <path d="M45 15 Q65 15 65 35 L75 35 Q65 35 65 25 Q65 5 45 5 Q65 5 65 15 Q55 15 45 15 Z" />
            <g transform="rotate(45 40 40)">
              <rect x="38" y="25" width="4" height="15" rx="1" />
              <rect x="25" y="38" width="15" height="4" rx="1" />
            </g>
          </svg>
        </div>

        {/* Corner ornaments - Bottom Left */}
        <div className="absolute bottom-0 left-0 w-20 h-20 transform rotate-270">
          <svg viewBox="0 0 80 80" className="w-full h-full text-amber-400 fill-current">
            <path d="M5 5 L5 25 Q5 15 15 15 L35 15 Q25 15 25 5 L25 5 Q15 5 5 5 Z" />
            <path d="M15 25 Q35 25 35 45 Q35 25 55 25 Q35 25 35 5 Q35 25 15 25 Z" />
            <circle cx="25" cy="25" r="3" />
            <circle cx="15" cy="15" r="2" />
            <circle cx="35" cy="35" r="2" />
            <path d="M45 15 Q65 15 65 35 L75 35 Q65 35 65 25 Q65 5 45 5 Q65 5 65 15 Q55 15 45 15 Z" />
            <g transform="rotate(45 40 40)">
              <rect x="38" y="25" width="4" height="15" rx="1" />
              <rect x="25" y="38" width="15" height="4" rx="1" />
            </g>
          </svg>
        </div>

        {/* Side ornaments - Top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-12">
          <svg viewBox="0 0 128 48" className="w-full h-full text-amber-400 fill-current">
            <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" />
            <circle cx="32" cy="24" r="2" />
            <circle cx="64" cy="20" r="3" />
            <circle cx="96" cy="24" r="2" />
            <path d="M10 20 Q30 20 30 24 Q30 28 10 28 Q30 28 30 24 Q30 20 10 20 Z" />
            <path d="M118 20 Q98 20 98 24 Q98 28 118 28 Q98 28 98 24 Q98 20 118 20 Z" />
          </svg>
        </div>

        {/* Side ornaments - Bottom */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-180 w-32 h-12">
          <svg viewBox="0 0 128 48" className="w-full h-full text-amber-400 fill-current">
            <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" />
            <circle cx="32" cy="24" r="2" />
            <circle cx="64" cy="20" r="3" />
            <circle cx="96" cy="24" r="2" />
            <path d="M10 20 Q30 20 30 24 Q30 28 10 28 Q30 28 30 24 Q30 20 10 20 Z" />
            <path d="M118 20 Q98 20 98 24 Q98 28 118 28 Q98 28 98 24 Q98 20 118 20 Z" />
          </svg>
        </div>

        {/* Side ornaments - Left */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 w-32 h-12">
          <svg viewBox="0 0 128 48" className="w-full h-full text-amber-400 fill-current">
            <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" />
            <circle cx="32" cy="24" r="2" />
            <circle cx="64" cy="20" r="3" />
            <circle cx="96" cy="24" r="2" />
            <path d="M10 20 Q30 20 30 24 Q30 28 10 28 Q30 28 30 24 Q30 20 10 20 Z" />
            <path d="M118 20 Q98 20 98 24 Q98 28 118 28 Q98 28 98 24 Q98 20 118 20 Z" />
          </svg>
        </div>

        {/* Side ornaments - Right */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 rotate-90 w-32 h-12">
          <svg viewBox="0 0 128 48" className="w-full h-full text-amber-400 fill-current">
            <path d="M20 24 Q40 10 64 24 Q88 10 108 24 Q88 38 64 24 Q40 38 20 24 Z" />
            <circle cx="32" cy="24" r="2" />
            <circle cx="64" cy="20" r="3" />
            <circle cx="96" cy="24" r="2" />
            <path d="M10 20 Q30 20 30 24 Q30 28 10 28 Q30 28 30 24 Q30 20 10 20 Z" />
            <path d="M118 20 Q98 20 98 24 Q98 28 118 28 Q98 28 98 24 Q98 20 118 20 Z" />
          </svg>
        </div>

        {/* Inner content area */}
        <div className="absolute inset-16 bg-white p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-amber-600 mb-2">|| MARRIAGE BIODATA ||</h1>
            <div className="w-24 h-0.5 bg-amber-400 mx-auto"></div>
          </div>

          {/* Main Content */}
          <div className="flex gap-6 h-full">
            {/* Left Column - Photo */}
            <div className="w-1/3">
              <div className="bg-gray-100 border-2 border-amber-200 h-48 flex items-center justify-center mb-4">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm">Photo</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-amber-50 p-3 rounded border border-amber-200">
                <h3 className="font-semibold text-amber-800 mb-2 text-sm">CONTACT DETAILS</h3>
                <div className="text-xs space-y-1">
                  <p><strong>Mobile:</strong> +91 98765 43210</p>
                  <p><strong>Email:</strong> priya.sharma@email.com</p>
                  <p><strong>Address:</strong> 123, Green Park, New Delhi - 110016</p>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="w-2/3 space-y-4 text-sm">
              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-bold text-amber-700 mb-2 border-b border-amber-300 pb-1">PERSONAL INFORMATION</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div><strong>Name:</strong> Priya Sharma</div>
                  <div><strong>Date of Birth:</strong> 15th March, 1995</div>
                  <div><strong>Time of Birth:</strong> 10:30 AM</div>
                  <div><strong>Place of Birth:</strong> New Delhi</div>
                  <div><strong>Age:</strong> 28 Years</div>
                  <div><strong>Height:</strong> 5'4"</div>
                  <div><strong>Weight:</strong> 55 kg</div>
                  <div><strong>Complexion:</strong> Fair</div>
                  <div><strong>Manglik:</strong> No</div>
                  <div><strong>Marital Status:</strong> Single</div>
                </div>
              </div>

              {/* Educational & Professional */}
              <div>
                <h3 className="font-semibold text-amber-700 mb-2 border-b border-amber-300 pb-1">EDUCATIONAL & PROFESSIONAL</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div><strong>Education:</strong> MBA Finance</div>
                  <div><strong>College:</strong> Delhi University</div>
                  <div><strong>Profession:</strong> Financial Analyst</div>
                  <div><strong>Company:</strong> ABC Corporation</div>
                  <div><strong>Annual Income:</strong> ₹8-10 Lakhs</div>
                  <div><strong>Work Location:</strong> Gurgaon</div>
                </div>
              </div>

              {/* Family Information */}
              <div>
                <h3 className="font-semibold text-amber-700 mb-2 border-b border-amber-300 pb-1">FAMILY INFORMATION</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div><strong>Father's Name:</strong> Mr. Rajesh Sharma</div>
                  <div><strong>Father's Occupation:</strong> Business</div>
                  <div><strong>Mother's Name:</strong> Mrs. Sunita Sharma</div>
                  <div><strong>Mother's Occupation:</strong> Homemaker</div>
                  <div><strong>Brother:</strong> 1 (Married)</div>
                  <div><strong>Sister:</strong> None</div>
                </div>
              </div>

              {/* Other Details */}
              <div>
                <h3 className="font-semibold text-amber-700 mb-2 border-b border-amber-300 pb-1">OTHER DETAILS</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div><strong>Religion:</strong> Hindu</div>
                  <div><strong>Caste:</strong> Brahmin</div>
                  <div><strong>Sub-Caste:</strong> Sharma</div>
                  <div><strong>Gotra:</strong> Bharadwaj</div>
                  <div><strong>Mother Tongue:</strong> Hindi</div>
                  <div><strong>Hobbies:</strong> Reading, Music</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-1/4 left-6 w-2 h-2 bg-amber-400 rounded-full opacity-60"></div>
        <div className="absolute top-1/4 right-6 w-2 h-2 bg-amber-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-1/4 left-6 w-2 h-2 bg-amber-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-1/4 right-6 w-2 h-2 bg-amber-400 rounded-full opacity-60"></div>
        
        {/* Center decorative dots */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full"></div>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full"></div>
        <div className="absolute left-12 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-amber-400 rounded-full"></div>
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-amber-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Template_2;