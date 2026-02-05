import { Briefcase, Calendar, Clock, CheckCircle, FileText, DollarSign } from "lucide-react";

interface EngagementModel {
  model: string;
  duration: string;
  commitment: string;
  structure: string[];
  deliverables: string[];
  pricing: string;
}

interface EngagementModelsComparisonProps {
  engagementModels: EngagementModel[];
}

export function EngagementModelsComparison({
  engagementModels,
}: EngagementModelsComparisonProps) {
  return (
    <div className="engagement-models-section">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Engagement Models</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engagementModels.map((model, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-xl transition-all"
          >
            {/* Model Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <Briefcase size={24} className="text-green-600 flex-shrink-0" />
              <h4 className="text-xl font-bold text-gray-900">{model.model}</h4>
            </div>

            {/* Model Details */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-gray-600 flex-shrink-0" />
                <span className="font-semibold text-gray-700">Duration:</span>
                <span className="text-gray-600">{model.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-gray-600 flex-shrink-0" />
                <span className="font-semibold text-gray-700">Commitment:</span>
                <span className="text-gray-600">{model.commitment}</span>
              </div>
            </div>

            {/* Model Structure */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 uppercase mb-2">
                Structure:
              </p>
              <ul className="space-y-2">
                {model.structure.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Model Deliverables */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 uppercase mb-2">
                Key Deliverables:
              </p>
              <ul className="space-y-2">
                {model.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <FileText size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Model Pricing */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-sm font-semibold text-green-700">
              <DollarSign size={16} className="flex-shrink-0" />
              <span>{model.pricing}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
