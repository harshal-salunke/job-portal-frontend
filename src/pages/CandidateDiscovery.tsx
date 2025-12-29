import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import CandidateCard from '../components/CandidateCard';
import candidates from '../data/candidates.json';

const CandidateDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const allSkills = Array.from(new Set(candidates.flatMap((c) => c.skills))).sort();
  const allRoles = Array.from(new Set(candidates.map((c) => c.role))).sort();

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesSearch =
        searchQuery === '' ||
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = selectedRole === '' || candidate.role === selectedRole;

      const matchesAvailability =
        selectedAvailability === '' || candidate.availability === selectedAvailability;

      const matchesSkills =
        selectedSkills.length === 0 || selectedSkills.every((skill) => candidate.skills.includes(skill));

      return matchesSearch && matchesRole && matchesAvailability && matchesSkills;
    });
  }, [searchQuery, selectedRole, selectedAvailability, selectedSkills]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Discover Top Talent</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Roles</option>
                  {allRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Availability</option>
                  <option value="Actively Looking">Actively Looking</option>
                  <option value="Open to Opportunities">Open to Opportunities</option>
                </select>
              </div>

              <div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRole('');
                    setSelectedAvailability('');
                    setSelectedSkills([]);
                  }}
                  className="w-full h-10 mt-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Filter size={16} />
                Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Found {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>

          {filteredCandidates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No candidates found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDiscovery;
