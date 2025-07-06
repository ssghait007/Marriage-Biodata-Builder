import React from 'react';
import { Menu, X, Heart, Sparkles, DollarSign } from 'lucide-react';
import { templateManager } from '../utils/dynamicTemplateManager';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = React.useState(false);
  const [templateCode, setTemplateCode] = React.useState('');

  const handleSaveTemplate = async () => {
    if (!templateCode.trim()) return;

    try {
      // Use the dynamic template manager to save the template
       await templateManager.saveTemplate(templateCode);
      
      // if (result.success) {
      //   alert(result.message);
      //   setTemplateCode('');
      //   setIsDonateModalOpen(false);
      // } else {
      //   throw new Error(result.error);
      // }
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Error saving template. Please try again.');
    }
  };

  return (
    <header className="bg-gradient-to-r from-rose-50 via-white to-pink-50 shadow-lg backdrop-blur-sm sticky top-0 z-50 border-b border-rose-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-gradient-to-r from-rose-500 to-pink-600 p-2 rounded-full shadow-lg">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
            </div>
            <div className="ml-3">
              <h1  className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent font-serif tracking-tight">
                MarriageBiodata
              </h1>
              <div className="flex items-center -mt-1">
                <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full font-medium shadow-sm">
                  App
                </span>
                <Sparkles className="w-3 h-3 text-yellow-500 ml-1 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { href: '#home', label: 'Home', icon: '🏠' },
              { href: '#templates', label: 'Templates', icon: '📋' },
              { href: '#create', label: 'Create Biodata', icon: '✨' }
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="relative group px-4 py-2 rounded-xl text-gray-700 hover:text-rose-600 transition-all duration-300 hover:bg-rose-50"
              >
                <span className="flex items-center space-x-2 font-medium">
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
              </a>
            ))}
            
            {/* Donate Button */}
            <div className="ml-4">
              <button 
                onClick={() => setIsDonateModalOpen(true)}
                className="relative group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mr-3"
              >
                <span className="cursor-pointer relative z-10 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Donate</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* CTA Button */}
            <div>
              <button className="relative group bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <a href="#create" className="relative z-10">Get Started</a>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all duration-300 hover:scale-105"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative">
              {isMenuOpen ? (
                <X size={24} className="transform rotate-180 transition-transform duration-300" />
              ) : (
                <Menu size={24} className="transition-transform duration-300" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mt-6 py-4 border-t border-rose-100">
            <nav className="flex flex-col space-y-2">
              {[
                { href: '#home', label: 'Home', icon: '🏠', desc: 'Welcome page' },
                { href: '#templates', label: 'Templates', icon: '📋', desc: 'Beautiful designs' },
                { href: '#create', label: 'Create Biodata', icon: '✨', desc: 'Start creating' }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-300 hover:shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-4 w-full">
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                        {item.label}
                      </div>
                      <div className="text-sm text-gray-500 group-hover:text-rose-400 transition-colors">
                        {item.desc}
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-rose-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </a>
              ))}
              
              {/* Mobile Donate Button */}
              <div className="pt-4 border-t border-rose-100 mt-4">
                <button 
                  onClick={() => setIsDonateModalOpen(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] mb-3"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Donate Template</span>
                  </span>
                </button>
              </div>

              {/* Mobile CTA */}
              <div>
                <button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <span className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Get Started Now</span>
                  </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-2 right-10 w-2 h-2 bg-rose-300 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-32 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-4 left-1/4 w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Donate Modal */}
      {isDonateModalOpen && (
        <div className="flex inset-0 bg-opacity-60 items-center justify-center z-[9999] p-4 ">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[100vh] overflow-hidden transform transition-all duration-300 scale-100 animate-in fade-in-0 ">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <span>Donate Template</span>
                </h2>
                <button
                  onClick={() => setIsDonateModalOpen(false)}
                  className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Share your beautiful biodata template with the community
              </p>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Enter HTML Template Code:</span>
                </label>
                <div className="relative">
                  <textarea
                    value={templateCode}
                    onChange={(e) => setTemplateCode(e.target.value)}
                    placeholder="Paste your HTML template code here..."
                    className="w-full h-72 p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none font-mono text-sm transition-all duration-200 shadow-inner bg-gray-50 hover:bg-white"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {templateCode.length} characters
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setIsDonateModalOpen(false);
                    setTemplateCode('');
                  }}
                  className=" cursor-pointer px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTemplate}
                  disabled={!templateCode.trim()}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
                >
                  <span className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Donate Template</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
