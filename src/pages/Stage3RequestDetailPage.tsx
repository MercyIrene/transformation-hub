import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Building2, 
  Mail, 
  Calendar,
  Tag,
  FileText,
  Sparkles,
  Send,
  Pause,
  XCircle,
  MessageSquare,
  Key
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ServiceRequest, RequestStatus } from "@/data/transformationOffice";
import { mockRequests } from "@/data/transformationOffice";
import { DocWriterModal, BuildFulfillmentModal, SupportFulfillmentModal } from "@/components/stage3";
import type { BuildFulfillmentData } from "@/components/stage3/BuildFulfillmentModal";
import type { SupportUpdate } from "@/components/stage3/SupportFulfillmentModal";
import { useToast } from "@/hooks/use-toast";

export default function Stage3RequestDetailPage() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [isDocWriterOpen, setIsDocWriterOpen] = useState(false);
  const [isBuildFulfillmentOpen, setIsBuildFulfillmentOpen] = useState(false);
  const [isSupportFulfillmentOpen, setIsSupportFulfillmentOpen] = useState(false);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    // Find the request by ID
    const foundRequest = mockRequests.find(r => r.id === requestId);
    if (foundRequest) {
      setRequest(foundRequest);
    } else {
      // Request not found, redirect back
      navigate('/stage3');
    }
  }, [requestId, navigate]);

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading request...</p>
        </div>
      </div>
    );
  }

  const isTemplate = request.type === "dtmp-templates";
  const isSpec = request.type === "solution-specs";
  const isBuild = request.type === "solution-build";
  const isSupport = request.type === "support-services";
  const canUseDocWriter = (isTemplate || isSpec) && 
    (request.status === "assigned" || request.status === "in-progress" || request.status === "new");
  const canProvideBuildAccess = isBuild && 
    (request.status === "assigned" || request.status === "in-progress" || request.status === "new");
  const canAddSupportUpdate = isSupport && 
    (request.status === "assigned" || request.status === "in-progress" || request.status === "on-hold");

  const handleStatusUpdate = (newStatus: RequestStatus, actionNote: string) => {
    const updatedRequest: ServiceRequest = {
      ...request,
      status: newStatus,
      updatedAt: new Date().toISOString(),
      notes: [
        ...request.notes,
        `${actionNote} - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`
      ]
    };

    if (newStatus === 'completed') {
      updatedRequest.completedAt = new Date().toISOString();
    }

    setRequest(updatedRequest);
    
    toast({
      title: "Request Updated",
      description: actionNote,
      duration: 3000,
    });
  };

  const handleDocWriterComplete = (generatedDoc: string) => {
    // Update request status to pending-review after document generation
    const updatedRequest: ServiceRequest = {
      ...request,
      status: 'pending-review',
      updatedAt: new Date().toISOString(),
      generatedDocument: generatedDoc, // Store the generated document
      notes: [
        ...request.notes,
        `Document generated using AI DocWriter (${generatedDoc.split('\n').length} lines) - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`,
        `Submitted for approval - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`
      ]
    };

    setRequest(updatedRequest);
    
    toast({
      title: "Document Generated & Submitted",
      description: "Document has been generated and sent to approver. Status updated to Pending Review.",
      duration: 4000,
    });
  };

  const handleBuildFulfillmentComplete = (fulfillmentData: BuildFulfillmentData) => {
    // Update request with build access details and change status to pending-review
    const updatedRequest: ServiceRequest = {
      ...request,
      status: 'pending-review',
      updatedAt: new Date().toISOString(),
      buildAccess: {
        accessUrl: fulfillmentData.accessUrl,
        username: fulfillmentData.username,
        password: fulfillmentData.password,
        additionalCredentials: fulfillmentData.additionalCredentials,
        setupInstructions: fulfillmentData.setupInstructions,
        attachments: fulfillmentData.attachments
      },
      notes: [
        ...request.notes,
        `Build access provided - URL: ${fulfillmentData.accessUrl} - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`,
        `Submitted for security approval - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`
      ]
    };

    setRequest(updatedRequest);
    setIsBuildFulfillmentOpen(false);
    
    toast({
      title: "Build Access Provided",
      description: "Build access details have been provided and submitted for security approval.",
      duration: 4000,
    });
  };

  const handleSupportUpdate = (update: SupportUpdate) => {
    const updatedRequest: ServiceRequest = {
      ...request,
      updatedAt: new Date().toISOString(),
      supportUpdates: [
        ...(request.supportUpdates || []),
        update
      ],
      notes: [
        ...request.notes,
        `Support update: ${update.type.replace('-', ' ')} - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`
      ],
      status: update.type === 'resolved' ? 'completed' : 
              update.type === 'waiting-user' ? 'on-hold' : 
              request.status
    };

    if (update.type === 'resolved') {
      updatedRequest.completedAt = new Date().toISOString();
    }

    setRequest(updatedRequest);
    setIsSupportFulfillmentOpen(false);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedRequest: ServiceRequest = {
        ...request,
        updatedAt: new Date().toISOString(),
        notes: [
          ...request.notes,
          `${newNote.trim()} - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`
        ]
      };
      setRequest(updatedRequest);
      setNewNote("");
      
      toast({
        title: "Note Added",
        description: "Your note has been added to the request.",
        duration: 3000,
      });
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/stage3')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Requests
            </Button>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{request.title}</h1>
              <p className="text-sm text-gray-500">{request.requestNumber}</p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              {canUseDocWriter && (
                <Button
                  className="bg-orange-600 hover:bg-orange-700 gap-2"
                  onClick={() => setIsDocWriterOpen(true)}
                >
                  <Sparkles className="w-4 h-4" />
                  Generate with AI DocWriter
                </Button>
              )}

              {canProvideBuildAccess && (
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  onClick={() => setIsBuildFulfillmentOpen(true)}
                >
                  <Key className="w-4 h-4" />
                  Provide Build Access
                </Button>
              )}

              {canAddSupportUpdate && (
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
                  onClick={() => setIsSupportFulfillmentOpen(true)}
                >
                  <MessageSquare className="w-4 h-4" />
                  Add Support Update
                </Button>
              )}
              
              {request.status === 'pending-review' && (
                <>
                  <Button
                    className="bg-green-600 hover:bg-green-700 gap-2"
                    onClick={() => handleStatusUpdate('completed', `${isTemplate ? 'Template' : isSpec ? 'Specification' : 'Build access'} approved and delivered`)}
                  >
                    <Send className="w-4 h-4" />
                    Approve & Deliver
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleStatusUpdate('in-progress', 'Revisions requested')}
                  >
                    Request Revisions
                  </Button>
                </>
              )}

              {request.status === 'in-progress' && !canUseDocWriter && !canProvideBuildAccess && !canAddSupportUpdate && (
                <Button
                  className="bg-orange-600 hover:bg-orange-700 gap-2"
                  onClick={() => handleStatusUpdate('pending-review', 'Submitted for review')}
                >
                  <Send className="w-4 h-4" />
                  Submit for Review
                </Button>
              )}

              {request.status !== 'completed' && request.status !== 'cancelled' && request.status !== 'on-hold' && (
                <Button
                  variant="outline"
                  onClick={() => handleStatusUpdate('on-hold', 'Request put on hold')}
                >
                  <Pause className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{request.description}</p>
            </div>

            {/* Type-Specific Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {isTemplate && 'Template Details'}
                {isSpec && 'Specification Details'}
                {request.type === 'solution-build' && 'Build Details'}
                {request.type === 'support-services' && 'Support Details'}
              </h2>
              <div className="space-y-3">
                {(isTemplate || isSpec) && (
                  <>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Generation Method:</span>
                      <span className="text-sm font-medium text-gray-900">DTMP AI DocWriter</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Output Format:</span>
                      <span className="text-sm font-medium text-gray-900">Markdown / PDF</span>
                    </div>
                    {isSpec && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Includes:</span>
                        <span className="text-sm font-medium text-gray-900">Architecture, Tech Stack, Compliance</span>
                      </div>
                    )}
                  </>
                )}
                {request.type === 'solution-build' && (
                  <>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Fulfillment Method:</span>
                      <span className="text-sm font-medium text-gray-900">Provides Build Access</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Environment:</span>
                      <span className="text-sm font-medium text-gray-900">Pre-configured & Ready</span>
                    </div>
                  </>
                )}
                {request.type === 'support-services' && (
                  <>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Service Type:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {request.priority === 'critical' ? 'Emergency Support' : 'Expert Consultation'}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Response Time:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {request.priority === 'critical' ? '< 2 hours' : '< 24 hours'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Generated Document */}
            {request.generatedDocument && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Generated Document
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const blob = new Blob([request.generatedDocument!], { type: "text/markdown" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${request.requestNumber}-document.md`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                    >
                      Download
                    </Button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                  <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono">
                    {request.generatedDocument}
                  </pre>
                </div>
              </div>
            )}

            {/* Build Access Details */}
            {request.buildAccess && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Build Access Details
                  </h2>
                </div>
                <div className="space-y-4">
                  {/* Access URL */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium mb-1">Access URL</p>
                    <a 
                      href={request.buildAccess.accessUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-700 hover:underline break-all"
                    >
                      {request.buildAccess.accessUrl}
                    </a>
                  </div>

                  {/* Credentials */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs text-gray-600 font-medium mb-1">Username</p>
                      <p className="text-sm text-gray-900 font-mono">{request.buildAccess.username}</p>
                    </div>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs text-gray-600 font-medium mb-1">Password</p>
                      <p className="text-sm text-gray-900 font-mono">{request.buildAccess.password}</p>
                    </div>
                  </div>

                  {/* Additional Credentials */}
                  {request.buildAccess.additionalCredentials && (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs text-gray-600 font-medium mb-2">Additional Credentials</p>
                      <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono">
                        {request.buildAccess.additionalCredentials}
                      </pre>
                    </div>
                  )}

                  {/* Setup Instructions */}
                  {request.buildAccess.setupInstructions && (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs text-gray-600 font-medium mb-2">Setup Instructions</p>
                      <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                        {request.buildAccess.setupInstructions}
                      </pre>
                    </div>
                  )}

                  {/* Attachments */}
                  {request.buildAccess.attachments && request.buildAccess.attachments.length > 0 && (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-xs text-gray-600 font-medium mb-2">Attachments</p>
                      <ul className="space-y-1">
                        {request.buildAccess.attachments.map((attachment, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                            <FileText className="w-3 h-3" />
                            {attachment}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Support Updates */}
            {request.supportUpdates && request.supportUpdates.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Support Session Log
                  </h2>
                  <Badge className="bg-purple-100 text-purple-700">
                    {request.supportUpdates.length} {request.supportUpdates.length === 1 ? 'Update' : 'Updates'}
                  </Badge>
                </div>
                <div className="space-y-4">
                  {request.supportUpdates.map((update, index) => {
                    const getUpdateStyle = (type: string) => {
                      const styles = {
                        "diagnosis": { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600", label: "Diagnosis" },
                        "action-taken": { bg: "bg-orange-50", border: "border-orange-200", icon: "text-orange-600", label: "Action Taken" },
                        "waiting-user": { bg: "bg-yellow-50", border: "border-yellow-200", icon: "text-yellow-600", label: "Waiting for User" },
                        "resolved": { bg: "bg-green-50", border: "border-green-200", icon: "text-green-600", label: "Resolved" },
                        "escalated": { bg: "bg-red-50", border: "border-red-200", icon: "text-red-600", label: "Escalated" }
                      };
                      return styles[type as keyof typeof styles] || styles["action-taken"];
                    };
                    
                    const style = getUpdateStyle(update.type);
                    
                    return (
                      <div key={index} className={`p-4 rounded-lg border ${style.border} ${style.bg}`}>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline" className={`${style.icon} border-current`}>
                            {style.label}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(update.timestamp).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{update.message}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Activity Notes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h2>
              <div className="space-y-3">
                {request.notes.map((note, index) => (
                  <div key={index} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{note}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Note */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Note
                </label>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add a note to this request..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={2}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    className="self-end"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar Info */}
          <div className="space-y-6">
            {/* Requester Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Requester
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Name</p>
                  <p className="text-sm font-medium text-gray-900">{request.requester.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    {request.requester.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Department</p>
                  <p className="text-sm text-gray-700">{request.requester.department}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Organization</p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Building2 className="w-3 h-3" />
                    {request.requester.organization}
                  </p>
                </div>
              </div>
            </div>

            {/* Assignment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Assignment</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Assigned To</p>
                  <p className="text-sm font-medium text-gray-900">
                    {request.assignedTo || 'Unassigned'}
                  </p>
                </div>
                {request.assignedTeam && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Team</p>
                    <p className="text-sm text-gray-700">{request.assignedTeam}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Timeline
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Created</p>
                  <p className="text-sm text-gray-700">{formatDate(request.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                  <p className="text-sm text-gray-700">{formatDate(request.updatedAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Due Date</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(request.dueDate)}</p>
                </div>
                {request.completedAt && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Completed</p>
                    <p className="text-sm text-green-700">{formatDate(request.completedAt)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Effort */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Effort
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Estimated Hours</p>
                  <p className="text-sm font-medium text-gray-900">{request.estimatedHours}h</p>
                </div>
                {request.actualHours && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Actual Hours</p>
                    <p className="text-sm text-gray-700">{request.actualHours}h</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {request.tags && request.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {request.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* SLA Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">SLA Status</h2>
              <Badge className={
                request.slaStatus === "on-track" ? "bg-green-100 text-green-700" :
                request.slaStatus === "at-risk" ? "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-700"
              }>
                {request.slaStatus.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </Badge>
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

      {/* Build Fulfillment Modal */}
      <BuildFulfillmentModal
        request={request}
        isOpen={isBuildFulfillmentOpen}
        onClose={() => setIsBuildFulfillmentOpen(false)}
        onComplete={handleBuildFulfillmentComplete}
      />

      {/* Support Fulfillment Modal */}
      <SupportFulfillmentModal
        request={request}
        isOpen={isSupportFulfillmentOpen}
        onClose={() => setIsSupportFulfillmentOpen(false)}
        onAddUpdate={handleSupportUpdate}
      />
    </div>
  );
}
