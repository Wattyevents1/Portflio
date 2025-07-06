import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ExternalLink, Github, Star } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.featured);

  const getProjectImage = (project) => {
    // Use a placeholder image service with project-specific seeds
    const seed = project.title.toLowerCase().replace(/\s+/g, '-');
    return `https://picsum.photos/seed/${seed}/600/400`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-slate-300 mt-4">Loading projects...</p>
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
            Featured Projects
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A selection of my recent work showcasing different technologies and problem-solving approaches
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'border-slate-600 text-slate-300 hover:bg-slate-800'
            }
          >
            All Projects
          </Button>
          <Button
            onClick={() => setFilter('featured')}
            variant={filter === 'featured' ? 'default' : 'outline'}
            className={filter === 'featured' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'border-slate-600 text-slate-300 hover:bg-slate-800'
            }
          >
            <Star className="w-4 h-4 mr-2" />
            Featured Only
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group hover:scale-105 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={getProjectImage(project)} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-slate-400 line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.github_url && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                      onClick={() => window.open(project.github_url, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  )}
                  {project.live_url && (
                    <Button 
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.open(project.live_url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-slate-800/30 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4">Interested in working together?</h2>
            <p className="text-slate-300 mb-6">
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full">
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;