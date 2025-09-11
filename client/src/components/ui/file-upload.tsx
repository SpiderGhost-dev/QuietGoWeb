import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Upload, X, FileText, Image, Database } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  className?: string;
  disabled?: boolean;
}

export function FileUpload({
  onFileSelect,
  accept = ".json,.csv,.png,.jpg,.jpeg",
  multiple = true,
  maxSize = 10 * 1024 * 1024, // 10MB
  className,
  disabled = false,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        // Could show toast for file too large
        return false;
      }
      return true;
    });

    setSelectedFiles(prev => multiple ? [...prev, ...validFiles] : validFiles);
    onFileSelect(validFiles);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4 text-blue-500" />;
    }
    if (file.type.includes('json')) {
      return <Database className="w-4 h-4 text-green-500" />;
    }
    if (file.type.includes('csv')) {
      return <FileText className="w-4 h-4 text-orange-500" />;
    }
    return <FileText className="w-4 h-4 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card 
        className={cn(
          "border-2 border-dashed transition-colors",
          isDragOver ? "border-primary bg-primary/5" : "border-border",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        data-testid="file-upload-area"
      >
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <Upload className={cn(
            "w-8 h-8 mb-3",
            isDragOver ? "text-primary" : "text-muted-foreground"
          )} />
          <p className="text-sm font-medium mb-2">
            {isDragOver ? "Drop files here" : "Choose files or drag and drop"}
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Supports JSON, CSV, and image files up to {formatFileSize(maxSize)}
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={disabled}
            data-testid="button-select-files"
          >
            Select Files
          </Button>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
        disabled={disabled}
        data-testid="input-file-hidden"
      />

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Selected Files</h4>
          {selectedFiles.map((file, index) => (
            <Card key={`${file.name}-${index}`} className="p-3" data-testid={`selected-file-${index}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  data-testid={`button-remove-file-${index}`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {uploadProgress[file.name] !== undefined && (
                <Progress 
                  value={uploadProgress[file.name]} 
                  className="mt-2" 
                  data-testid={`progress-file-${index}`}
                />
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
