import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Code, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-blue-500" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Watty Eventice
              </h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Frontend Developer passionate about creating beautiful, functional, and user-friendly web applications.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/watty-eventice" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com/in/watty-eventice" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com/watty_eventice" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                  Skills
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                  Experience
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a 
                  href="mailto:watty.eventice@example.com" 
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-300"
                >
                  watty.eventice@example.com
                </a>
              </div>
              <div className="text-slate-400 text-sm">
                <p>San Francisco, CA</p>
                <p>Available for freelance projects</p>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Current Status</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-400 text-sm">Available for work</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-slate-400 text-sm">Open to opportunities</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-slate-400 text-sm">Remote friendly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm flex items-center">
            Made with <Heart className="h-4 w-4 text-red-400 mx-1" /> by Watty Eventice © 2024
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/contact" className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-300">
              Contact
            </Link>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-300"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;