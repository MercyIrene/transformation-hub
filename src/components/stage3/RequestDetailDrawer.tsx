import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceRequest } from "@/data/transformationOffice";

interface RequestDetailDrawerProps {
  request: ServiceRequest | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestDetailDrawer({ request, isOpen, onClose }: RequestDetailDrawerProps) {
  if (!request) return null;

  const getStatusColor = (status: string) => {
    const colors = {
      "new": "bg-blue-100 text-blue-700",
      "assigned": "bg-purple-100 text-purple-700",
      "in-progress": "bg-yellow-100 text-yellow-700",
      "pending-review": "bg-orange-100 text-orange-700",
      "completed": "bg-green-100 text-green-700",
      "on-hold": "bg-gray-100 text-gray-700",
      "cancelled": "bg-red-100 text-red-700"
    };
    return colors[status as keyof typeof colors] || colors["new"];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      "critical": "bg-red-100 text-red-700 border-red-200",
      "high": "bg-orange-100 text-orange-700 border-orange-200",
      "medium": "bg-blue-100 text-blue-700 border-blue-200",
      "low": "bg-gray-100 text-gray-700 border-gray-200"
    };
    return colors[priority as keyof typeof colors] || colors["medium"];
  };

  const getTypeLabel = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-2/3 lg:w-1/2 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <Badge className={getStatusColor(request.status)}>
                  {request.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </Badge>
                <Badge variant="outline" className={getPriorityColor(request.priority)}>
                  {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {getTypeLabel(request.type)}
                </Badge>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 truncate">{request.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{request.requestNumber}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-4 flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-sm text-gray-700">{request.description}</p>
              </div>

              {/* Requester Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Requester Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="text-sm font-medium text-gray-900">{request.requester.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-sm font-medium text-gray-900">{request.requester.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Department:</span>
                    <span className="text-sm font-medium text-gray-900">{request.requester.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Organization:</span>
                    <span className="text-sm font-medium text-gray-900">{request.requester.organization}</span>
                  </div>
                </div>
              </div>

              {/* Assignment */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Assignment</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Assigned To:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {request.assignedTo || 'Unassigned'}
                    </span>
                  </div>
                  {request.assignedTeam && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Team:</span>
                      <span className="text-sm font-medium text-gray-900">{request.assignedTeam}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dates & Timeline */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Timeline</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Created:</span>
                    <span className="text-sm font-medium text-gray-900">{formatDate(request.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Updated:</span>
                    <span className="text-sm font-medium text-gray-900">{formatDate(request.updatedAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Due Date:</span>
                    <span className="text-sm font-medium text-gray-900">{formatDate(request.dueDate)}</span>
                  </div>
                  {request.completedAt && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Completed:</span>
                      <span className="text-sm font-medium text-gray-900">{formatDate(request.completedAt)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Effort */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Effort</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Estimated Hours:</span>
                    <span className="text-sm font-medium text-gray-900">{request.estimatedHours}h</span>
                  </div>
                  {request.actualHours && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Actual Hours:</span>
                      <span className="text-sm font-medium text-gray-900">{request.actualHours}h</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {request.tags && request.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {request.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Assets */}
              {request.relatedAssets && request.relatedAssets.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Related Assets</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {request.relatedAssets.map((asset, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          • {asset}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Notes */}
              {request.notes && request.notes.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Activity Notes</h3>
                  <div className="space-y-3">
                    {request.notes.map((note, index) => (
                      <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                        <p className="text-sm text-gray-700">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLA Status */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">SLA Status</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <Badge className={
                    request.slaStatus === "on-track" ? "bg-green-100 text-green-700" :
                    request.slaStatus === "at-risk" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }>
                    {request.slaStatus.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Badge>
                </div>
              </div>

              {/* Customer Satisfaction */}
              {request.customerSatisfaction && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Customer Satisfaction</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{request.customerSatisfaction}</span>
                      <span className="text-sm text-gray-600">/ 5</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex gap-3">
              <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                Update Status
              </Button>
              <Button variant="outline" className="flex-1">
                Assign
              </Button>
              <Button variant="outline" className="flex-1">
                Add Note
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
