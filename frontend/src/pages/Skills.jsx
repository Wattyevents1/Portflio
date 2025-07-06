import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/skills`);
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'frontend', 'backend', 'tools'];
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getSkillIcon = (skillName) => {
    const icons = {
      'React': '⚛️',
      'JavaScript': '🟨',
      'TypeScript': '🔷',
      'HTML5': '🧡',
      'CSS3': '🎨',
      'Tailwind CSS': '💨',
      'Node.js': '🟢',
      'Express': '🚀',
      'MongoDB': '🍃',
      'Git': '📚',
      'Webpack': '📦',
      'Figma': '🎨'
    };
    return icons[skillName] || '💻';
  };

  const getProgressColor = (proficiency) => {
    if (proficiency >= 8) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (proficiency >= 6) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    if (proficiency >= 4) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    return 'bg-gradient-to-r from-red-500 to-pink-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-slate-300 mt-4">Loading skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Skills & Technologies
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different domains
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <Card key={skill.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getSkillIcon(skill.name)}</span>
                    <div>
                      <CardTitle className="text-lg text-white group-hover:text-blue-400 transition-colors">
                        {skill.name}
                      </CardTitle>
                      <CardDescription className="text-slate-400 capitalize">
                        {skill.category}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                    {skill.proficiency}/10
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Proficiency</span>
                    <span className="text-white font-medium">{skill.proficiency * 10}%</span>
                  </div>
                  <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getProgressColor(skill.proficiency)} transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.proficiency * 10}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 bg-slate-800/30 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">Frontend Focus</div>
              <p className="text-slate-300">
                Specialized in React, JavaScript, and modern CSS frameworks to create responsive, 
                interactive user interfaces.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">Backend Knowledge</div>
              <p className="text-slate-300">
                Solid understanding of Node.js, Express, and database technologies to build 
                full-stack applications.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">Development Tools</div>
              <p className="text-slate-300">
                Proficient with Git, Webpack, and design tools like Figma to streamline 
                development workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;