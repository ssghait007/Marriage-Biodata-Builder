import React from 'react';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  Star,
  Users,
  Shield,
  Award,
  ArrowUp,
  Sparkles
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-10 right-1/3 w-20 h-20 border border-white rounded-full"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-red-500 rounded-full blur opacity-25"></div>
                <div className="relative bg-gradient-to-r from-pink-500 to-red-600 p-3 rounded-full shadow-lg">
                  <Heart className="w-8 h-8 text-white" fill="white" />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                  MarriageBiodata
                </h2>
                <div className="flex items-center">
                  <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full">
                    App
                  </span>
                  <Sparkles className="w-3 h-3 text-yellow-400 ml-1" />
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Create beautiful, professional marriage biodata with our easy-to-use platform. 
              Trusted by thousands of families worldwide for their matrimonial needs.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-pink-400">50K+</div>
                <div className="text-xs text-gray-400">Happy Users</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-yellow-400">100K+</div>
                <div className="text-xs text-gray-400">Biodatas Created</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, color: 'hover:text-blue-400', bg: 'hover:bg-blue-400/20' },
                { icon: Instagram, color: 'hover:text-pink-400', bg: 'hover:bg-pink-400/20' },
                { icon: Twitter, color: 'hover:text-blue-300', bg: 'hover:bg-blue-300/20' },
                { icon: Linkedin, color: 'hover:text-blue-500', bg: 'hover:bg-blue-500/20' },
                { icon: Youtube, color: 'hover:text-red-400', bg: 'hover:bg-red-400/20' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`p-2 rounded-full bg-white/10 ${social.color} ${social.bg} transition-all duration-300 hover:scale-110`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-pink-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                'Create Biodata',
                'Browse Templates',
                'WhatsApp Groups',
                'Success Stories',
                'Premium Plans',
                'Mobile App'
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                'How to Create Biodata',
                'Marriage Tips',
                'Privacy Policy',
                'Terms of Service',
                'Help Center',
                'Contact Support'
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-yellow-400" />
              Get in Touch
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center p-3 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
                <Mail className="w-5 h-5 text-yellow-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white">support@marriagebiodata.com</div>
                </div>
              </div>
              
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-4 rounded-lg backdrop-blur-sm border border-white/10">
              <h4 className="font-semibold mb-2 flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                Newsletter
              </h4>
              <p className="text-sm text-gray-300 mb-3">Get marriage tips & updates</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-400"
                />
                <button className="bg-gradient-to-r from-pink-500 to-red-500 px-4 py-2 rounded-r-lg hover:from-pink-600 hover:to-red-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center justify-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
            <Shield className="w-8 h-8 text-green-400 mr-3" />
            <div>
              <div className="font-semibold">100% Secure</div>
              <div className="text-sm text-gray-400">Your data is protected</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
            <Award className="w-8 h-8 text-yellow-400 mr-3" />
            <div>
              <div className="font-semibold">Premium Quality</div>
              <div className="text-sm text-gray-400">Professional templates</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
            <Users className="w-8 h-8 text-blue-400 mr-3" />
            <div>
              <div className="font-semibold">24/7 Support</div>
              <div className="text-sm text-gray-400">Always here to help</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 MarriageBiodata.App. All rights reserved.
              </p>
              <div className="flex space-x-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" />
              <span className="text-sm text-gray-400">in India</span>
              
              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                className="ml-4 p-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Heart className="absolute top-20 left-1/4 w-4 h-4 text-pink-300 opacity-20 animate-bounce" />
        <Heart className="absolute top-40 right-1/3 w-3 h-3 text-red-300 opacity-30 animate-bounce delay-1000" />
        <Heart className="absolute bottom-32 left-1/3 w-5 h-5 text-pink-400 opacity-15 animate-bounce delay-500" />
      </div>
    </footer>
  );
};

export default Footer;