import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, ArrowLeft } from 'lucide-react';

const CreateCandidateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    about: '',
    skills: [] as string[],
    location: '',
    password: '',
    availability: [] as string[],
  });

  const [skillInput, setSkillInput] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const skillSuggestions = [
    'React',
    'Node.js',
    'Python',
    'JavaScript',
    'TypeScript',
    'PostgreSQL',
    'MongoDB',
    'AWS',
    'Docker',
    'Kubernetes',
    'Vue.js',
    'Angular',
    'Java',
    'C++',
    'Go',
    'Rust',
    'Firebase',
    'GraphQL',
    'REST API',
    'Git'
  ];

  const roles = [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'UI/UX Designer',
    'Data Analyst',
    'DevOps Engineer',
    'Product Manager',
    'Data Scientist',
    'Mobile Developer',
    'QA Engineer'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = (skill: string) => {
    if (!formData.skills.includes(skill) && skill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        'https://job-portal-backend-a496.onrender.com/api/auth/Candidate/register', 
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          role: formData.role,
          experience: formData.experience,
          about: formData.about,
          skills: formData.skills,
          location: formData.location,
          availability: formData.availability,
        }), 
      }
    );
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || `Failed to create profile: ${res.statusText}`);
    }
    const data = await res.json();
    localStorage.setItem('candidateProfile', JSON.stringify(data));
    alert('Profile created successfully! Redirecting...');
    navigate('/candidates');
    } catch (error) {
      console.error('Error creating profile:', error);
      alert(`Error creating profile: ${(error as Error).message}`);
    }
    // localStorage.setItem('candidateProfile', JSON.stringify(formData));
    // alert('Profile created successfully! Redirecting...');
    // navigate('/candidates');
  };

  const isStep1Valid =
  formData.name && formData.email && formData.phone && formData.location && formData.password;

const isStep2Valid =
  formData.role && formData.experience && formData.about && formData.skills.length >= 3;


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-white text-center">
            <h1 className="text-4xl font-bold mb-2">Create Your Profile</h1>
            <p className="text-blue-100">Get discovered by top companies looking for your skills</p>
          </div>

          <div className="p-8">
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setCurrentStep(1)}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Personal Info
              </button>
              <button
                onClick={() => isStep1Valid && setCurrentStep(2)}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } ${!isStep1Valid ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Professional
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="San Francisco, CA"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter a password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => isStep1Valid && setCurrentStep(2)}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-8"
                    disabled={!isStep1Valid}
                  >
                    Continue
                  </button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select your role</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Years of Experience</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select experience level</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-7">5-7 years</option>
                      <option value="7-10">7-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">About You</label>
                    <textarea
                      name="about"
                      value={formData.about}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself, your achievements, and what you're looking for..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Availability</label>
                    <div className="flex flex-wrap gap-2">
                      {['Immediate', 'Open to Opportunities'].map(option => (
                        <button
                          type="button"
                          key={option}
                          onClick={() => {
                            setFormData(prev => {
                              const already = prev.availability.includes(option);
                              return {
                                ...prev,
                                availability: already
                                  ? prev.availability.filter(a => a !== option)
                                  : [...prev.availability, option],
                              };
                            });
                          }}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            formData.availability.includes(option)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Skills</label>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill(skillInput);
                          }
                        }}
                        placeholder="Add a skill and press Enter"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => addSkill(skillInput)}
                        className="px-6 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                      >
                        Add
                      </button>
                    </div>

                    {formData.skills.length > 0 && (
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map((skill) => (
                            <div
                              key={skill}
                              className="px-4 py-2 bg-blue-600 text-white rounded-full flex items-center gap-2"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="hover:bg-blue-700 rounded-full p-1 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {skillSuggestions.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => addSkill(skill)}
                          disabled={formData.skills.includes(skill)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            formData.skills.includes(skill)
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!isStep2Valid}
                      className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create Profile
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCandidateProfile;
