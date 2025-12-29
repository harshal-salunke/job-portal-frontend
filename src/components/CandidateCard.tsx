import { Link } from 'react-router-dom';
import { MapPin, Briefcase } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  role: string;
  photo: string;
  skills: string[];
  experience: string;
  availability: string;
}

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
  const availabilityColor =
    candidate.availability === 'Actively Looking' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="aspect-video overflow-hidden bg-gray-200">
        <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{candidate.name}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Briefcase size={16} />
          <span className="font-medium">{candidate.role}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${availabilityColor}`}>
            {candidate.availability}
          </span>
          <span className="text-sm text-gray-600">{candidate.experience}</span>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {candidate.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                {skill}
              </span>
            ))}
            {candidate.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                +{candidate.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        <Link
          to={`/candidate/${candidate.id}`}
          className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default CandidateCard;
