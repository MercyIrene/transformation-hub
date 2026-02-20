import { useState } from "react";
import { X, MessageSquare, CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ServiceRequest } from "@/data/transformationOffice";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SupportFulfillmentModalProps {
  request: ServiceRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onAddUpdate: (update: SupportUpdate) => void;
}

export interface SupportUpdate {
  type: "diagnosis" | "action-taken" | "waiting-user" | "resolved" | "escalated";
  message: string;
  timestamp: string;
}

export default function SupportFulfillmentModal({ request, isOpen, onClose, onAddUpdate }: SupportFulfillmentModalProps) {
  const [updateType, setUpdateType] = useState<SupportUpdate["type"]>("action-taken");
  const [updateMessage, setUpdateMessage] = useState("");
  const { toast } = useToast();

  if (!request || !isOpen) return null;

  const handleSubmit = () => {
    if (!updateMessage.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide an update message.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const update: SupportUpdate = {
      type: updateType,
      message: updateMessage.trim(),
      timestamp: new Date().toISOString()
    };

    onAddUpdate(update);
    
    // Reset form
    setUpdateMessage("");
    setUpdateType("action-taken");
    
    toast({
      title: "Update Added",
      description: "Support update has been logged.",
      duration: 3000,
    });
  };

  const getUpdateTypeInfo = (type: SupportUpdate["type"]) => {
    const info = {
      "diagnosis": {
        label: "Diagnosis",
        description: "Initial analysis and problem identification",
        icon: AlertCircle,
        color: "text-blue-600"
      },
      "action-taken": {
        label: "Action Taken",
        description: "Steps performed to resolve the issue",
        icon: MessageSquare,
        color: "text-orange-600"
      },
      "waiting-user": {
        label: "Waiting for User",
        description: "Pending user response or action",
        icon: Clock,
        color: "text-yellow-600"
      },
      "resolved": {
        label: "Resolved",
        description: "Issue has been resolved",
        icon: CheckCircle,
        color: "text-green-600"
      },
      "escalated": {
        label: "Escalated",
        description: "Escalated to senior support or specialist",
        icon: AlertCircle,
        color: "text-red-600"
      }
    };
    return info[type];
  };

  const currentTypeInfo = getUpdateTypeInfo(updateType);
  const Icon = currentTypeInfo.icon;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Support Session Update</h2>
                <p className="text-sm text-gray-500">Log support activity and progress</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 min-h-0">
            {/* Request Information */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Request Information</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-600">Request:</span> <span className="font-medium">{request.requestNumber}</span></p>
                <p><span className="text-gray-600">Title:</span> <span className="font-medium">{request.title}</span></p>
                <p><span className="text-gray-600">Requester:</span> <span className="font-medium">{request.requester.name}</span></p>
                <p><span className="text-gray-600">Priority:</span> 
                  <Badge className={
                    request.priority === 'critical' ? 'ml-2 bg-red-100 text-red-700' :
                    request.priority === 'high' ? 'ml-2 bg-orange-100 text-orange-700' :
                    'ml-2 bg-blue-100 text-blue-700'
                  }>
                    {request.priority.toUpperCase()}
                  </Badge>
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Update Type */}
              <div>
                <Label htmlFor="updateType" className="mb-2 block">
                  Update Type <span className="text-red-500">*</span>
                </Label>
                <Select value={updateType} onValueChange={(value) => setUpdateType(value as SupportUpdate["type"])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(["diagnosis", "action-taken", "waiting-user", "resolved", "escalated"] as const).map((type) => {
                      const info = getUpdateTypeInfo(type);
                      const TypeIcon = info.icon;
                      return (
                        <SelectItem key={type} value={type}>
                          <div className="flex items-center gap-2">
                            <TypeIcon className={`w-4 h-4 ${info.color}`} />
                            <div className="flex flex-col">
                              <span className="font-medium">{info.label}</span>
                              <span className="text-xs text-gray-500">{info.description}</span>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Current Type Info */}
              <div className={`p-4 rounded-lg border-l-4 ${
                updateType === 'diagnosis' ? 'bg-blue-50 border-blue-500' :
                updateType === 'action-taken' ? 'bg-orange-50 border-orange-500' :
                updateType === 'waiting-user' ? 'bg-yellow-50 border-yellow-500' :
                updateType === 'resolved' ? 'bg-green-50 border-green-500' :
                'bg-red-50 border-red-500'
              }`}>
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 mt-0.5 ${currentTypeInfo.color}`} />
                  <div>
                    <p className="font-medium text-gray-900">{currentTypeInfo.label}</p>
                    <p className="text-sm text-gray-600 mt-1">{currentTypeInfo.description}</p>
                  </div>
                </div>
              </div>

              {/* Update Message */}
              <div>
                <Label htmlFor="updateMessage" className="mb-2 block">
                  Update Details <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="updateMessage"
                  placeholder={
                    updateType === 'diagnosis' ? 'Describe the problem analysis and findings...' :
                    updateType === 'action-taken' ? 'Describe the actions taken to resolve the issue...' :
                    updateType === 'waiting-user' ? 'Describe what information or action is needed from the user...' :
                    updateType === 'resolved' ? 'Describe how the issue was resolved and any follow-up steps...' :
                    'Describe why the issue is being escalated and to whom...'
                  }
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Provide detailed information about this support update. This will be visible to the requester.
                </p>
              </div>

              {/* Quick Templates */}
              <div>
                <Label className="mb-2 block">Quick Templates</Label>
                <div className="grid grid-cols-2 gap-2">
                  {updateType === 'diagnosis' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUpdateMessage("Initial diagnosis completed. Root cause identified as: ")}
                      >
                        Root Cause Template
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUpdateMessage("Issue reproduced in test environment. Investigating further...")}
                      >
                        Reproduction Template
                      </Button>
                    </>
                  )}
                  {updateType === 'action-taken' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUpdateMessage("Applied fix: \n1. \n2. \n3. \n\nTesting in progress...")}
                      >
                        Fix Applied Template
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUpdateMessage("Configuration updated. Changes deployed to production. Monitoring for stability...")}
                      >
                        Config Update Template
                      </Button>
                    </>
                  )}
                  {updateType === 'waiting-user' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUpdateMessage("Waiting for user to provide: \n- \n- \n\nPlease respond within 24 hours.")}
                      >
                        Info Request Template
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUpdateMessage("Waiting for user to test the fix and confirm resolution.")}
                      >
                        Test Request Template
                      </Button>
                    </>
                  )}
                  {updateType === 'resolved' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUpdateMessage("Issue resolved. Solution: \n\nNo further action required. Please contact us if the issue recurs.")}
                      >
                        Resolution Template
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUpdateMessage("Issue resolved. Implemented workaround: \n\nPermanent fix scheduled for next release.")}
                      >
                        Workaround Template
                      </Button>
                    </>
                  )}
                  {updateType === 'escalated' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUpdateMessage("Escalated to senior support team. Reason: \n\nExpected response time: 2-4 hours.")}
                    >
                      Escalation Template
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleSubmit}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
