import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MessageCircle, Heart, ChevronDown } from 'lucide-react';
import candidates from '../data/candidates.json';

const RecruiterDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [shortlisted, setShortlisted] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('name');

  const allRoles = Array.from(new Set(candidates.map((c) => c.role))).sort();

  const filteredCandidates = useMemo(() => {
    let result = candidates.filter((candidate) => {
      const matchesSearch =
        searchQuery === '' ||
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = selectedRole === '' || candidate.role === selectedRole;

      const matchesAvailability =
        selectedAvailability === '' || candidate.availability === selectedAvailability;

      return matchesSearch && matchesRole && matchesAvailability;
    });

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'role') {
      result.sort((a, b) => a.role.localeCompare(b.role));
    } else if (sortBy === 'experience') {
      result.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
    }

    return result;
  }, [searchQuery, selectedRole, selectedAvailability, sortBy]);

  const toggleShortlist = (id: number) => {
    setShortlisted((prev) => (prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Recruiter Dashboard</h1>
          <p className="text-gray-600">Find and manage top talent for your team</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative col-span-1 md:col-span-2">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Availability</option>
                <option value="Actively Looking">Actively Looking</option>
                <option value="Open to Opportunities">Open to Opportunities</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter size={16} />
              <span>
                {filteredCandidates.length} candidates
                {shortlisted.length > 0 && ` • ${shortlisted.length} shortlisted`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="role">Role</option>
                <option value="experience">Experience</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Candidate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Experience</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Skills</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Availability</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      to={`/candidate/${candidate.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {candidate.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{candidate.role}</td>
                  <td className="px-6 py-4 text-gray-700">{candidate.experience}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                          +{candidate.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        candidate.availability === 'Actively Looking'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {candidate.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        title="Message"
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <MessageCircle size={18} />
                      </button>
                      <button
                        onClick={() => toggleShortlist(candidate.id)}
                        title={shortlisted.includes(candidate.id) ? 'Remove from shortlist' : 'Shortlist'}
                        className={`p-2 rounded-lg transition-colors ${
                          shortlisted.includes(candidate.id)
                            ? 'text-red-600 bg-red-100'
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        <Heart size={18} fill={shortlisted.includes(candidate.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCandidates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No candidates found matching your filters.</p>
            </div>
          )}
        </div>

        {shortlisted.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 border-l-4 border-blue-600">
            <p className="font-semibold text-gray-900">{shortlisted.length} candidates shortlisted</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full">
              View Shortlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
