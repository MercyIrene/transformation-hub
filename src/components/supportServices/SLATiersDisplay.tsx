import { Clock, Target, Bell } from "lucide-react";

interface SLACommitment {
  severity: string;
  definition: string;
  responseTime: string;
  resolutionTarget: string;
  updateFrequency: string;
  escalation: string;
}

interface SLATiersDisplayProps {
  slaCommitments: SLACommitment[];
}

// Severity badge colors
const severityColors: Record<string, string> = {
  "Critical (P1)": "bg-red-100 text-red-700",
  "High (P2)": "bg-orange-100 text-orange-700",
  "Medium (P3)": "bg-yellow-100 text-yellow-700",
  "Low (P4)": "bg-gray-100 text-gray-700",
};

export function SLATiersDisplay({ slaCommitments }: SLATiersDisplayProps) {
  return (
    <div className="sla-tiers-section">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Service Level Agreement (SLA) Commitments
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slaCommitments.map((sla, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            {/* SLA Tier Header */}
            <div className="mb-6">
              <div
                className={`inline-block px-4 py-2 rounded-full font-bold text-sm mb-3 ${
                  severityColors[sla.severity] || "bg-gray-100 text-gray-700"
                }`}
              >
                {sla.severity}
              </div>
              <p className="text-sm text-gray-700">{sla.definition}</p>
            </div>

            {/* SLA Metrics */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">
                    Response Time
                  </p>
                  <p className="text-lg font-bold text-gray-900">{sla.responseTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target size={18} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">
                    Resolution Target
                  </p>
                  <p className="text-lg font-bold text-gray-900">{sla.resolutionTarget}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bell size={18} className="text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">
                    Update Frequency
                  </p>
                  <p className="text-lg font-bold text-gray-900">{sla.updateFrequency}</p>
                </div>
              </div>
            </div>

            {/* SLA Escalation */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded-r">
              <p className="text-xs font-semibold text-blue-700 uppercase mb-1">
                Escalation:
              </p>
              <p className="text-sm text-gray-700">{sla.escalation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
