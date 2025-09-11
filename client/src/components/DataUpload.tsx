import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileUpload } from "@/components/ui/file-upload";
import { QuietGoBrand } from "@/components/QuietGoBrand";
import { 
  CloudUpload, 
  FileText, 
  Image, 
  Database,
  CheckCircle,
  Clock,
  AlertCircle,
  Download
} from "lucide-react";

interface DataUploadProps {
  uploads: any[];
  isLoading: boolean;
}

export function DataUpload({ uploads, isLoading }: DataUploadProps) {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await apiRequest("POST", "/api/upload", formData);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/uploads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/health-logs"] });
      setSelectedFiles([]);
      
      toast({
        title: "Upload Successful",
        description: `${data.uploads.length} file(s) uploaded and are being processed.`,
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Upload Failed",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      uploadMutation.mutate(selectedFiles);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-4 h-4 text-blue-500" />;
      case 'json':
        return <Database className="w-4 h-4 text-green-500" />;
      case 'csv':
        return <FileText className="w-4 h-4 text-orange-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusIcon = (upload: any) => {
    if (upload.processed) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    if (upload.metadata?.error) {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
    return <Clock className="w-4 h-4 text-yellow-500" />;
  };

  const getStatusText = (upload: any) => {
    if (upload.processed) {
      if (upload.metadata?.importCount !== undefined) {
        return `Imported ${upload.metadata.importCount} records`;
      }
      if (upload.metadata?.analysis) {
        return "AI analysis complete";
      }
      return "Processing complete";
    }
    if (upload.metadata?.error) {
      return `Error: ${upload.metadata.error}`;
    }
    return "Processing...";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card data-testid="card-upload-section">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CloudUpload className="w-5 h-5 mr-2 text-primary" />
            Sync Mobile Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Upload Options</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Upload exported data from your <QuietGoBrand size="sm" className="inline" /> mobile app or photos for AI analysis.
                Supported formats: JSON, CSV, JPG, PNG.
              </p>
            </div>

            <FileUpload
              onFileSelect={handleFileSelect}
              accept=".json,.csv,.png,.jpg,.jpeg"
              multiple={true}
              maxSize={10 * 1024 * 1024} // 10MB
              disabled={uploadMutation.isPending}
            />

            {selectedFiles.length > 0 && (
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {selectedFiles.length} file(s) selected
                </p>
                <Button
                  onClick={handleUpload}
                  disabled={uploadMutation.isPending}
                  data-testid="button-upload-files"
                >
                  {uploadMutation.isPending ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <CloudUpload className="w-4 h-4 mr-2" />
                      Upload Files
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload History */}
      <Card data-testid="card-upload-history">
        <CardHeader>
          <CardTitle>Upload History</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : uploads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CloudUpload className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="mb-2">No files uploaded yet</p>
              <p className="text-sm">Upload data from your mobile app to see it here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {uploads.map((upload: any) => (
                <div 
                  key={upload.id} 
                  className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors"
                  data-testid={`upload-item-${upload.id}`}
                >
                  <div className="flex items-center space-x-3">
                    {getFileIcon(upload.type)}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium truncate">
                          {upload.originalName}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {upload.type.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(upload.size)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(upload.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(upload)}
                      <span className="text-xs text-muted-foreground">
                        {getStatusText(upload)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sync Instructions */}
      <Card data-testid="card-sync-instructions">
        <CardHeader>
          <CardTitle>How to Export from Mobile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">From <QuietGoBrand size="sm" className="inline" /> iOS/Android:</h4>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Open <QuietGoBrand size="sm" className="inline" /> mobile app</li>
                <li>Go to Settings → Data Export</li>
                <li>Choose export format (JSON recommended)</li>
                <li>Share or save the exported file</li>
                <li>Upload the file here using the upload area above</li>
              </ol>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Supported Data Types:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-green-500" />
                  <span><strong>JSON:</strong> Complete health logs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-orange-500" />
                  <span><strong>CSV:</strong> Tabular health data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image className="w-4 h-4 text-blue-500" />
                  <span><strong>Images:</strong> Photos for AI analysis</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                <strong>Privacy Note:</strong> Uploaded photos are automatically deleted after AI analysis. 
                Only the analysis results are stored unless you change this setting.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
