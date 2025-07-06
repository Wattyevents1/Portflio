import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Calendar, Building } from 'lucide-react';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/experience`);
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experience:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-slate-300 mt-4">Loading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Work Experience
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            My professional journey in frontend development and the impact I've made at each organization
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative flex items-start space-x-8">
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-900 shadow-lg shadow-blue-500/25"></div>
                  {experience.is_current && (
                    <div className="absolute -top-1 -left-1 w-6 h-6 bg-blue-500/30 rounded-full animate-pulse"></div>
                  )}
                </div>

                {/* Experience Card */}
                <Card className="flex-1 bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl text-white mb-1">
                          {experience.title}
                        </CardTitle>
                        <CardDescription className="text-blue-400 font-medium flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          {experience.company}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col md:items-end gap-2">
                        <Badge 
                          variant={experience.is_current ? "default" : "secondary"} 
                          className={experience.is_current 
                            ? "bg-green-600 text-white" 
                            : "bg-slate-700 text-slate-300"
                          }
                        >
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <MapPin className="w-3 h-3" />
                          {experience.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {experience.description.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-slate-300">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-16 bg-slate-800/30 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Key Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
              <div className="text-slate-300 mb-2">Enterprise Applications</div>
              <p className="text-sm text-slate-400">
                Led development of large-scale applications serving thousands of users
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">40%</div>
              <div className="text-slate-300 mb-2">Performance Improvement</div>
              <p className="text-sm text-slate-400">
                Optimized applications for better user experience and faster load times
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">3+</div>
              <div className="text-slate-300 mb-2">Junior Developers Mentored</div>
              <p className="text-sm text-slate-400">
                Guided team members through code reviews and technical challenges
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">10K+</div>
              <div className="text-slate-300 mb-2">Users Served</div>
              <p className="text-sm text-slate-400">
                Built applications used by thousands of active users daily
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;