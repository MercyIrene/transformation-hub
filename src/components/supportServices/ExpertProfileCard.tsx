import { Award, Check, Briefcase, BookOpen } from "lucide-react";

interface LeadArchitect {
  name: string;
  title: string;
  credentials: string[];
  experience: string;
  specializations: string[];
  notableProjects?: string[];
  publications?: string[];
}

interface ExpertProfileCardProps {
  leadArchitect: LeadArchitect;
}

export function ExpertProfileCard({ leadArchitect }: ExpertProfileCardProps) {
  // Get initials from name
  const initials = leadArchitect.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="expert-profile-section">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Lead Consultant</h3>
      <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-8">
        {/* Expert Header */}
        <div className="flex items-start gap-6 mb-8 pb-6 border-b border-gray-200">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white text-2xl font-bold flex items-center justify-center flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-gray-900 mb-1">
              {leadArchitect.name}
            </h4>
            <p className="text-lg text-purple-600 font-semibold mb-2">
              {leadArchitect.title}
            </p>
            <p className="text-sm text-gray-600">{leadArchitect.experience}</p>
          </div>
        </div>

        {/* Expert Credentials */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold text-gray-900 mb-3">
            Credentials & Certifications
          </h5>
          <div className="flex flex-wrap gap-2">
            {leadArchitect.credentials.map((cred, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              >
                <Award size={14} />
                {cred}
              </span>
            ))}
          </div>
        </div>

        {/* Expert Specializations */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold text-gray-900 mb-3">
            Areas of Expertise
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {leadArchitect.specializations.map((spec, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <Check size={16} className="text-green-600 flex-shrink-0" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Projects */}
        {leadArchitect.notableProjects && leadArchitect.notableProjects.length > 0 && (
          <div className="mb-6">
            <h5 className="text-lg font-semibold text-gray-900 mb-3">
              Notable Projects
            </h5>
            <ul className="space-y-2">
              {leadArchitect.notableProjects.map((project, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <Briefcase size={14} className="text-blue-600 flex-shrink-0 mt-1" />
                  <span>{project}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Expert Publications */}
        {leadArchitect.publications && leadArchitect.publications.length > 0 && (
          <div>
            <h5 className="text-lg font-semibold text-gray-900 mb-3">
              Publications & Speaking
            </h5>
            <ul className="space-y-2">
              {leadArchitect.publications.map((pub, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <BookOpen size={14} className="text-purple-600 flex-shrink-0 mt-1" />
                  <span>{pub}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
