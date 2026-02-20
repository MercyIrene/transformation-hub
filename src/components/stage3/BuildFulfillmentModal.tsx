import { useState } from "react";
import { X, Link as LinkIcon, Key, FileText, Upload, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ServiceRequest } from "@/data/transformationOffice";
import { useToast } from "@/hooks/use-toast";

interface BuildFulfillmentModalProps {
  request: ServiceRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (fulfillmentData: BuildFulfillmentData) => void;
}

export interface BuildFulfillmentData {
  accessUrl: string;
  username: string;
  password: string;
  additionalCredentials: string;
  setupInstructions: string;
  attachments: string[];
}

export default function BuildFulfillmentModal({ request, isOpen, onClose, onComplete }: BuildFulfillmentModalProps) {
  const [accessUrl, setAccessUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [additionalCredentials, setAdditionalCredentials] = useState("");
  const [setupInstructions, setSetupInstructions] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const { toast } = useToast();

  if (!request || !isOpen) return null;

  const handleSubmit = () => {
    // Validate required fields
    if (!accessUrl.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide the access URL.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!username.trim() || !password.trim()) {
      toast({
        title: "Missing Credentials",
        description: "Please provide username and password.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const fulfillmentData: BuildFulfillmentData = {
      accessUrl: accessUrl.trim(),
      username: username.trim(),
      password: password.trim(),
      additionalCredentials: additionalCredentials.trim(),
      setupInstructions: setupInstructions.trim(),
      attachments
    };

    onComplete(fulfillmentData);
    
    // Reset form
    setAccessUrl("");
    setUsername("");
    setPassword("");
    setAdditionalCredentials("");
    setSetupInstructions("");
    setAttachments([]);
  };

  const handleAddAttachment = () => {
    const attachmentName = prompt("Enter attachment name or URL:");
    if (attachmentName && attachmentName.trim()) {
      setAttachments([...attachments, attachmentName.trim()]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

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
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Provide Build Access</h2>
                <p className="text-sm text-gray-500">Solution Build Fulfillment</p>
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
              </div>
            </div>

            <div className="space-y-6">
              {/* Access URL */}
              <div>
                <Label htmlFor="accessUrl" className="flex items-center gap-2 mb-2">
                  <LinkIcon className="w-4 h-4" />
                  Access URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="accessUrl"
                  type="url"
                  placeholder="https://build-environment.example.com"
                  value={accessUrl}
                  onChange={(e) => setAccessUrl(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL where the requester can access the build environment
                </p>
              </div>

              {/* Credentials */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username" className="mb-2 block">
                    Username <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="mb-2 block">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="password"
                    type="text"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Additional Credentials */}
              <div>
                <Label htmlFor="additionalCredentials" className="mb-2 block">
                  Additional Credentials (Optional)
                </Label>
                <Textarea
                  id="additionalCredentials"
                  placeholder="API Keys, SSH keys, tokens, or other credentials..."
                  value={additionalCredentials}
                  onChange={(e) => setAdditionalCredentials(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Any additional credentials needed for access (API keys, tokens, etc.)
                </p>
              </div>

              {/* Setup Instructions */}
              <div>
                <Label htmlFor="setupInstructions" className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4" />
                  Setup Instructions (Optional)
                </Label>
                <Textarea
                  id="setupInstructions"
                  placeholder="1. Navigate to the access URL&#10;2. Login with provided credentials&#10;3. Configure your environment..."
                  value={setupInstructions}
                  onChange={(e) => setSetupInstructions(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Step-by-step instructions for accessing and setting up the build
                </p>
              </div>

              {/* Attachments */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Upload className="w-4 h-4" />
                  Attachments (Optional)
                </Label>
                <div className="space-y-2">
                  {attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="flex-1 text-sm text-gray-700">{attachment}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveAttachment(index)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddAttachment}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Add Attachment
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Configuration files, documentation, or other helpful resources
                </p>
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
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleSubmit}
              >
                <Send className="w-4 h-4 mr-2" />
                Provide Access & Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
