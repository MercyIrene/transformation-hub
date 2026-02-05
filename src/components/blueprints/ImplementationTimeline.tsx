import { CheckCircle2, AlertTriangle } from "lucide-react";

interface ImplementationPhase {
  phase: string;
  focus: string;
  deliverables: string[];
}

interface ImplementationTimelineProps {
  phases: ImplementationPhase[];
  approach: string;
  prerequisites: string[];
  criticalSuccessFactors: string[];
}

export function ImplementationTimeline({
  phases,
  approach,
  prerequisites,
  criticalSuccessFactors,
}: ImplementationTimelineProps) {
  return (
    <div>
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Implementation Roadmap
      </h2>

      {/* Approach */}
      {approach && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
            Approach
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{approach}</p>
        </div>
      )}

      {/* Prerequisites */}
      {prerequisites.length > 0 && (
        <div className="mb-10 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Prerequisites
            </h3>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {prerequisites.map((prereq, index) => (
              <li key={index} className="text-sm text-gray-700">
                {prereq}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-8" role="list" aria-label="Implementation phases">
        {phases.map((phase, index) => {
          const isLast = index === phases.length - 1;
          return (
            <div
              key={index}
              className="flex gap-6"
              role="listitem"
            >
              {/* Phase Connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-4 h-4 rounded-full bg-blue-600 border-4 border-blue-100"
                  aria-hidden="true"
                />
                {!isLast && (
                  <div
                    className="w-0.5 flex-1 mt-2 bg-blue-200"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Phase Content */}
              <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6">
                {/* Phase Header */}
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    Phase {index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">
                    {phase.phase}
                  </h3>
                </div>

                {/* Focus */}
                <p className="text-sm text-gray-700 mb-4">{phase.focus}</p>

                {/* Deliverables */}
                {phase.deliverables.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      Key Deliverables:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      {phase.deliverables.map((deliverable, i) => (
                        <li key={i} className="text-sm text-gray-700">
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Critical Success Factors */}
      {criticalSuccessFactors.length > 0 && (
        <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-600" aria-hidden="true" />
            <h3 className="text-lg font-bold text-gray-900">
              Critical Success Factors
            </h3>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {criticalSuccessFactors.map((factor, index) => (
              <li key={index} className="text-sm text-gray-700">
                {factor}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
