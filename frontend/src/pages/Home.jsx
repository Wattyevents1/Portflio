import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { ArrowRight, Github, Linkedin, Mail, Code2, Rocket, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold">
                  <span className="block">Hi, I'm</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                    Watty Eventice
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 font-light">
                  Frontend Developer
                </p>
                <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                  I craft exceptional digital experiences through innovative frontend development. 
                  Passionate about creating interactive, user-friendly interfaces that bring ideas to life 
                  with modern technologies and creative problem-solving.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/projects">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                    View My Work
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:border-blue-400 hover:text-blue-400">
                    Get In Touch
                  </Button>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex space-x-6">
                <a href="https://github.com/watty-eventice" target="_blank" rel="noopener noreferrer" 
                   className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:scale-110 group">
                  <Github className="h-6 w-6 text-slate-400 group-hover:text-white" />
                </a>
                <a href="https://linkedin.com/in/watty-eventice" target="_blank" rel="noopener noreferrer" 
                   className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:scale-110 group">
                  <Linkedin className="h-6 w-6 text-slate-400 group-hover:text-blue-400" />
                </a>
                <a href="mailto:watty.eventice@example.com" 
                   className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:scale-110 group">
                  <Mail className="h-6 w-6 text-slate-400 group-hover:text-red-400" />
                </a>
              </div>
            </div>

            {/* Right Column - Visual Content */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                {/* Main Image */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1576272531110-2a342fe22342" 
                    alt="Frontend Developer Workspace" 
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20"></div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl animate-float">
                  <div className="flex items-center space-x-3">
                    <Code2 className="h-8 w-8 text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Clean Code</p>
                      <p className="text-xs text-slate-400">Always</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl animate-float delay-1000">
                  <div className="flex items-center space-x-3">
                    <Rocket className="h-8 w-8 text-purple-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Fast Performance</p>
                      <p className="text-xs text-slate-400">Optimized</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 -right-8 bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl animate-float delay-500">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-8 w-8 text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Modern Tech</p>
                      <p className="text-xs text-slate-400">Latest</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-600 rounded-full animate-pulse mt-2"></div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-slate-300">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">3+</div>
              <div className="text-slate-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">15+</div>
              <div className="text-slate-300">Technologies Mastered</div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float.delay-500 {
          animation-delay: 0.5s;
        }
        .animate-float.delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Home;