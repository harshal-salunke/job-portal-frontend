import { useNavigate } from 'react-router-dom';
import { User, Briefcase } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to TalentConnect</h1>
          <p className="text-xl text-gray-600">Choose your role to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center hover:shadow-2xl transition-shadow">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">I'm a Candidate</h2>
            <p className="text-gray-600 mb-8">
              Create your profile and get discovered by top companies looking for your skills.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/create-candidate-profile')}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Create Profile
              </button>
              <button
                onClick={() => navigate('/candidates')}
                className="w-full px-6 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-semibold"
              >
                Browse Jobs
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-12 text-center hover:shadow-2xl transition-shadow">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">I'm a Recruiter</h2>
            <p className="text-gray-600 mb-8">
              Search and filter talent by skills, experience, and availability. Shortlist and message candidates.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/create-recruiter-profile')}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Create Account
              </button>
              <button
                onClick={() => navigate('/recruiter/dashboard')}
                className="w-full px-6 py-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors font-semibold"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Demo Mode - Login is disabled. Use the buttons above to explore.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
