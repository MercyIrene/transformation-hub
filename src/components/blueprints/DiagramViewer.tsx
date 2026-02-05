import { useState } from "react";
import { Layout, Download, Maximize2 } from "lucide-react";

interface DiagramViewerProps {
  diagrams: { name: string; description: string }[];
}

export function DiagramViewer({ diagrams }: DiagramViewerProps) {
  const [activeDiagram, setActiveDiagram] = useState(0);

  if (diagrams.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="aspect-video bg-gray-100 flex items-center justify-center p-8">
          <div className="text-center">
            <Layout className="mx-auto mb-4 text-gray-400" size={64} aria-hidden="true" />
            <p className="text-lg font-semibold text-gray-500">No diagrams available</p>
          </div>
        </div>
      </div>
    );
  }

  const current = diagrams[activeDiagram];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Tabs Bar */}
      <div
        className="flex overflow-x-auto border-b border-gray-300 bg-gray-50"
        role="tablist"
        aria-label="Architecture diagrams"
      >
        {diagrams.map((diagram, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeDiagram === index}
            aria-controls={`diagram-panel-${index}`}
            id={`diagram-tab-${index}`}
            onClick={() => setActiveDiagram(index)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${
              activeDiagram === index
                ? "bg-white border-b-2 border-blue-600 text-blue-600"
                : "text-gray-700 hover:bg-white"
            }`}
          >
            {diagram.name}
          </button>
        ))}
      </div>

      {/* Display Area */}
      <div
        role="tabpanel"
        id={`diagram-panel-${activeDiagram}`}
        aria-labelledby={`diagram-tab-${activeDiagram}`}
        className="aspect-video bg-gray-100 flex items-center justify-center p-8"
      >
        <div className="text-center">
          <Layout className="mx-auto mb-4 text-gray-400" size={64} aria-hidden="true" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{current.name}</h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">{current.description}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 bg-white">
        <button
          className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`Download ${current.name} diagram`}
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          Download
        </button>
        <button
          className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`View ${current.name} diagram in fullscreen`}
        >
          <Maximize2 className="w-4 h-4" aria-hidden="true" />
          View Fullscreen
        </button>
      </div>
    </div>
  );
}
