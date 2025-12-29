import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CreateRecruiterProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
    location: '',
    description: '',
    website: '',
    contactPerson: ''
  });

  const [currentStep, setCurrentStep] = useState(1);

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'E-commerce',
    'Manufacturing',
    'Retail',
    'Education',
    'Media & Entertainment',
    'Consulting',
    'Logistics',
    'Real Estate',
    'Energy',
    'Other'
  ];

  const companySizes = ['1-50', '51-200', '201-500', '501-1000', '1000-5000', '5000+'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('recruiterProfile', JSON.stringify(formData));
    alert('Recruiter profile created successfully! Redirecting...');
    navigate('/recruiter/dashboard');
  };

  const isStep1Valid = formData.companyName && formData.contactPerson && formData.email && formData.phone;
  const isStep2Valid = formData.industry && formData.companySize && formData.location && formData.description;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-12 text-white text-center">
            <h1 className="text-4xl font-bold mb-2">Create Recruiter Account</h1>
            <p className="text-green-100">Access top talent and build your team</p>
          </div>

          <div className="p-8">
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setCurrentStep(1)}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Company Info
              </button>
              <button
                onClick={() => isStep1Valid && setCurrentStep(2)}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } ${!isStep1Valid ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Details
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Your Company Inc."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Hiring Contact Person</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
                      placeholder="hiring@company.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourcompany.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => isStep1Valid && setCurrentStep(2)}
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold mt-8"
                    disabled={!isStep1Valid}
                  >
                    Continue
                  </button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Industry</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Company Size</label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select company size</option>
                      {companySizes.map((size) => (
                        <option key={size} value={size}>
                          {size} employees
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Headquarters location"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Company Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell us about your company, culture, and what you're hiring for..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                      required
                    />
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">What's next?</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>✓ Access to 1000+ candidate profiles</li>
                      <li>✓ Advanced filtering by skills and experience</li>
                      <li>✓ Direct messaging with candidates</li>
                      <li>✓ Candidate shortlist management</li>
                    </ul>
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
                      Create Account
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

export default CreateRecruiterProfile;
