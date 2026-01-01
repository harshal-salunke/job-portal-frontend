import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, Calendar, ArrowLeft, Briefcase, Award } from 'lucide-react';
import SkillBadge from '../components/SkillBadge';
import { useEffect, useState } from 'react';
// import candidates from '../data/candidates.json';

type Candidate = {
  id: string;          // backend id
  name: string;
  role: string;
  availability: string;
  skills: string[];
  location: string;
  photo?: string;
  experience: string;
  about: string;
  projects: { id: string; name: string; description: string; technologies: string[] }[];
};

type RouteParams = {
  id: string;
};

const CandidateProfile = () => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchCandidate = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("candidateToken"); // adjust key if needed

        const res = await fetch(
          `https://job-portal-backend-a496.onrender.com/api/candidates/profile/${id}`,
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || `Request failed with status ${res.status}`);
        }

        setCandidate(data); // if API wraps as {candidate: {...}}, use setCandidate(data.candidate)
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setError(err.message || "Failed to load candidate");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();

    return () => controller.abort();
  }, [id]);


    if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading candidate...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => navigate("/candidates")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Candidates
          </button>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Candidate not found</h2>
          <button
            onClick={() => navigate("/candidates")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Candidates
          </button>
        </div>
      </div>
    );
  }


  const availabilityColor =
    candidate.availability === "Actively Looking"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/candidates')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Candidates
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="aspect-video overflow-hidden bg-gray-300">
            <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{candidate.name}</h1>
                <div className="flex items-center gap-2 text-xl text-gray-600 mb-4">
                  <Briefcase size={24} />
                  <span>{candidate.role}</span>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${availabilityColor}`}>
                {candidate.availability}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                <MessageCircle size={20} />
                Message Candidate
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                <Calendar size={20} />
                Schedule Interview
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Experience</p>
                <p className="text-2xl font-bold text-gray-900">{candidate.experience}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Status</p>
                <p className="text-2xl font-bold text-gray-900">{candidate.availability}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award size={28} />
            About
          </h2>
          <p className="text-gray-700 leading-relaxed">{candidate.about}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {candidate.skills.map((skill) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
          <div className="space-y-6">
            {candidate.projects.map((project) => (
              <div key={project.id} className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                <p className="text-gray-700 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
