import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceRequest, RequestStatus } from "@/data/transformationOffice";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DocWriterModal } from "@/components/stage3";

interface RequestDetailDrawerProps {
  request: ServiceRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedRequest: ServiceRequest) => void;
}

export default function RequestDetailDrawer({ request, isOpen, onClose, onUpdate }: RequestDetailDrawerProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDocWriterOpen, setIsDocWriterOpen] = useState(false);
  const { toast } = useToast();

  if (!request) return null;

  const handleStatusUpdate = (newStatus: RequestStatus, actionNote: string) => {
    setIsUpdating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const updatedRequest: ServiceRequest = {
        ...request,
        status: newStatus,
        updatedAt: new Date().toISOString(),
        notes: [
          ...request.notes,
          `${actionNote} - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`
        ]
      };

      // Update completed date if status is completed
      if (newStatus === 'completed') {
        updatedRequest.completedAt = new Date().toISOString();
      }

      onUpdate(updatedRequest);
      setIsUpdating(false);
      
      // Show success toast
      toast({
        title: "Request Updated",
        description: actionNote,
        duration: 3000,
      });
    }, 500);
  };

  const handleStartDocWriter = () => {
    setIsDocWriterOpen(true);
  };

  const handleDocWriterComplete = (generatedDoc: string) => {
    // Update request status to in-progress and add note about document generation
    const updatedRequest: ServiceRequest = {
      ...request,
      status: 'in-progress',
      updatedAt: new Date().toISOString(),
      notes: [
        ...request.notes,
        `Document generated using AI DocWriter (${generatedDoc.split('\n').length} lines) - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`
      ]
    };

    onUpdate(updatedRequest);
    
    toast({
      title: "Document Generated",
      description: "AI DocWriter has successfully generated the document. Status updated to In Progress.",
      duration: 4000,
    });
  };

  const handleAddNote = () => {
    const note = prompt('Enter note:');
    if (note && note.trim()) {
      const updatedRequest: ServiceRequest = {
        ...request,
        updatedAt: new Date().toISOString(),
        notes: [
          ...request.notes,
          `${note.trim()} - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`
        ]
      };
      onUpdate(updatedRequest);
      
      toast({
        title: "Note Added",
        description: "Your note has been added to the request.",
        duration: 3000,
      });
    }
  };

  const handlePutOnHold = () => {
    if (confirm('Are you sure you want to put this request on hold?')) {
      handleStatusUpdate('on-hold', 'Request put on hold');
    }
  };

  const handleCancelRequest = () => {
    if (confirm('Are you sure you want to cancel this request? This action cannot be undone.')) {
      handleStatusUpdate('cancelled', 'Request cancelled');
    }
  };

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

              {/* Type-Specific Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  {request.type === 'dtmp-templates' && 'Template Details'}
                  {request.type === 'solution-specs' && 'Specification Details'}
                  {request.type === 'solution-build' && 'Build Details'}
                  {request.type === 'support-services' && 'Support Details'}
                </h3>
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                  {request.type === 'dtmp-templates' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Generation Method:</span>
                        <span className="text-sm font-medium text-gray-900">DTMP AI DocWriter</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Output Format:</span>
                        <span className="text-sm font-medium text-gray-900">Markdown / PDF</span>
                      </div>
                    </>
                  )}
                  {request.type === 'solution-specs' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Generation Method:</span>
                        <span className="text-sm font-medium text-gray-900">DTMP AI DocWriter</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Includes:</span>
                        <span className="text-sm font-medium text-gray-900">Architecture, Tech Stack, Compliance</span>
                      </div>
                    </>
                  )}
                  {request.type === 'solution-build' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Fulfillment Method:</span>
                        <span className="text-sm font-medium text-gray-900">Provides Build Access</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Environment:</span>
                        <span className="text-sm font-medium text-gray-900">Pre-configured & Ready</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Security Approval:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {request.status === 'pending-review' ? 'Pending' : 
                           request.status === 'completed' ? 'Approved' : 'Not Required Yet'}
                        </span>
                      </div>
                    </>
                  )}
                  {request.type === 'support-services' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Service Type:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {request.priority === 'critical' ? 'Emergency Support' : 'Expert Consultation'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Response Time:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {request.priority === 'critical' ? '< 2 hours' : '< 24 hours'}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

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
            <div className="flex flex-col gap-3">
              {/* Primary Workflow Actions */}
              <div className="flex gap-3">
                {/* DTMP Templates Actions */}
                {request.type === 'dtmp-templates' && (
                  <>
                    {request.status === 'new' && (
                      <Button 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleStatusUpdate('assigned', 'Assigned to team')}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : 'Assign to Team'}
                      </Button>
                    )}
                    {request.status === 'assigned' && (
                      <Button 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={handleStartDocWriter}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : 'Start AI DocWriter'}
                      </Button>
                    )}
                    {request.status === 'in-progress' && (
                      <Button 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleStatusUpdate('pending-review', 'Template submitted for review')}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : 'Submit for Review'}
                      </Button>
                    )}
                    {request.status === 'pending-review' && (
                      <>
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusUpdate('completed', 'Template delivered to requester')}
                          disabled={isUpdating}
                        >
                          {isUpdating ? 'Updating...' : 'Deliver Template'}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleStatusUpdate('in-progress', 'Revisions requested by requester')}
                          disabled={isUpdating}
                        >
                          Request Revisions
                        </Button>
                      </>
                    )}
                  </>
                )}

                {/* Solution Specs Actions */}
                {request.type === 'solution-specs' && (
                  <>
                    {request.status === 'new' && (
                      <Button 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleStatusUpdate('assigned', 'Assigned to solution architecture team')}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : 'Assign to Team'}
                      </Button>
                    )}
                    {request.status === 'assigned' && (
                      <Button 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={handleStartDocWriter}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : 'Start AI DocWriter'}
                      </Button>
                    )}
                    {request.status === 'in-progress' && (
                      <Button 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleStatusUpdate('pending-review', 'Specification submitted for review')}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : 'Submit for Review'}
                      </Button>
                    )}
                    {request.status === 'pending-review' && (
                      <>
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusUpdate('completed', 'Specification delivered to requester')}
                          disabled={isUpdating}
                        >
                          {isUpdating ? 'Updating...' : 'Deliver Specification'}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleStatusUpdate('in-progress', 'Collaborating with requester on refinements')}
                          disabled={isUpdating}
                        >
                          Collaborate with Requester
                        </Button>
                      </>
                    )}
                  </>
                )}

                {/* Solution Build Actions */}
                {request.type === 'solution-build' && (
                  <>
                    {request.status === 'new' && (
                      <Button 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleStatusUpdate('assigned', 'Assigned to solution delivery team')}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : 'Assign to Team'}
                      </Button>
                    )}
                    {request.status === 'assigned' && (
                      <Button 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleStatusUpdate('in-progress', 'Build environment provisioning started')}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : 'Provision Build'}
                      </Button>
                    )}
                    {request.status === 'in-progress' && (
                      <Button 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleStatusUpdate('pending-review', 'Submitted for security approval')}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : 'Request Security Approval'}
                      </Button>
                    )}
                    {request.status === 'pending-review' && (
                      <>
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusUpdate('completed', 'Build access credentials delivered')}
                          disabled={isUpdating}
                        >
                          {isUpdating ? 'Updating...' : 'Deliver Build Access'}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleStatusUpdate('in-progress', 'Configuring additional access permissions')}
                          disabled={isUpdating}
                        >
                          Configure Access
                        </Button>
                      </>
                    )}
                  </>
                )}

                {/* Support Services Actions */}
                {request.type === 'support-services' && (
                  <>
                    {request.status === 'new' && (
                      <Button 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleStatusUpdate('assigned', 'Assigned to technical support team')}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : 'Assign to Team'}
                      </Button>
                    )}
                    {request.status === 'assigned' && (
                      <Button 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleStatusUpdate('in-progress', 'Support session initiated')}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : 'Begin Support Session'}
                      </Button>
                    )}
                    {request.status === 'in-progress' && (
                      <>
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusUpdate('completed', 'Support issue resolved')}
                          disabled={isUpdating}
                        >
                          {isUpdating ? 'Updating...' : 'Mark Resolved'}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleStatusUpdate('on-hold', 'Waiting for user response')}
                          disabled={isUpdating}
                        >
                          Waiting for User
                        </Button>
                      </>
                    )}
                    {request.status === 'on-hold' && (
                      <Button 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleStatusUpdate('in-progress', 'Support session resumed')}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Updating...' : 'Resume Support'}
                      </Button>
                    )}
                  </>
                )}

                {/* Completed/Cancelled States */}
                {(request.status === 'completed' || request.status === 'cancelled') && (
                  <Button variant="outline" className="flex-1" disabled>
                    {request.status === 'completed' ? 'Request Completed' : 'Request Cancelled'}
                  </Button>
                )}
              </div>

              {/* Secondary Actions */}
              {request.status !== 'completed' && request.status !== 'cancelled' && (
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    size="sm"
                    onClick={handleAddNote}
                    disabled={isUpdating}
                  >
                    Add Note
                  </Button>
                  {request.status !== 'on-hold' && (
                    <Button 
                      variant="outline" 
                      className="flex-1" 
                      size="sm"
                      onClick={handlePutOnHold}
                      disabled={isUpdating}
                    >
                      Put On Hold
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="flex-1 text-red-600 hover:text-red-700" 
                    size="sm"
                    onClick={handleCancelRequest}
                    disabled={isUpdating}
                  >
                    Cancel Request
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DocWriter Modal */}
      <DocWriterModal
        request={request}
        isOpen={isDocWriterOpen}
        onClose={() => setIsDocWriterOpen(false)}
        onComplete={handleDocWriterComplete}
      />
    </>
  );
}
