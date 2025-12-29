import { Link } from 'react-router-dom';
import { CheckCircle, Search, Award, Zap } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Award,
      title: 'Skill-First Profiles',
      description: 'Showcase your expertise and get matched with relevant opportunities'
    },
    {
      icon: Search,
      title: 'Recruiter Search',
      description: 'Recruiters discover talent based on specific skills and experience'
    },
    {
      icon: CheckCircle,
      title: 'Verified Talent',
      description: 'All candidates are verified professionals ready to connect'
    },
    {
      icon: Zap,
      title: 'Faster Hiring',
      description: 'Cut down hiring time with direct access to qualified candidates'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get Discovered. Get Calls. Get Hired.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The skill-first hiring platform connecting exceptional talent with forward-thinking companies.
              Stop endless applications and start getting discovered.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link
                to="/create-candidate-profile"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                I'm a Candidate
              </Link>
              <Link
                to="/create-recruiter-profile"
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
              >
                I'm Hiring
              </Link>
            </div>

            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Team collaboration"
              className="w-full rounded-lg shadow-2xl mb-20"
            />
          </div>
        </div>

        <div className="py-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Why TalentConnect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="py-20 bg-blue-600 rounded-lg text-white text-center mb-20">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Next Great Hire?</h2>
          <p className="text-xl mb-8 opacity-90">Join hundreds of companies discovering exceptional talent</p>
          <Link
            to="/create-recruiter-profile"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
          >
            Start Hiring Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
