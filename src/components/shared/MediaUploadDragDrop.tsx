import React, { useCallback, useState } from "react";
import { useFileUpload } from "../../hooks/useFileUpload";

interface MediaUploadDragDropProps {
  onFileSelect: (files: File[], urls?: string[]) => void;
  accept: string;
  placeholder: string;
  disabled?: boolean;
  currentFiles?: string[];
  currentUrls?: string[];
}

export const MediaUploadDragDrop: React.FC<MediaUploadDragDropProps> = ({
  onFileSelect,
  accept,
  placeholder,
  disabled = false,
  currentFiles = [],
  currentUrls = [],
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>(currentUrls || []);
  const { uploadFile, uploading, progress, error } = useFileUpload();

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        const validFiles = files.filter((file) =>
          accept.includes(file.type.split("/")[0])
        );
        if (validFiles.length > 0) {
          await handleFileUpload(validFiles);
        }
      }
    },
    [disabled, accept]
  );

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const validFiles = Array.from(files).filter((file) =>
          accept.includes(file.type.split("/")[0])
        );
        if (validFiles.length > 0) {
          await handleFileUpload(validFiles);
        }
      }
    },
    [accept]
  );

  const handleFileUpload = async (files: File[]) => {
    try {
      const uploadPromises = files.map(async (file) => {
        const path = file.type.startsWith("image/") ? "images" : "videos";
        const url = await uploadFile(file, `patients/${path}`);
        return { file, url };
      });

      const results = await Promise.all(uploadPromises);
      const newUrls = results.map((r) => r.url).filter(Boolean) as string[];
      const newFiles = results.map((r) => r.file);

      if (newUrls.length > 0) {
        setPreviewUrls((prev) => [...prev, ...newUrls]);
        onFileSelect(newFiles, newUrls);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleRemove = useCallback(
    (index: number) => {
      setPreviewUrls((prev) => {
        const newUrls = prev.filter((_, i) => i !== index);
        onFileSelect([], newUrls); // Update parent with remaining files
        return newUrls;
      });
    },
    [onFileSelect]
  );

  const hasFiles = previewUrls.length > 0 || currentFiles.length > 0;

  return (
    <div className="space-y-2">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${
            isDragOver && !disabled
              ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
              : "border-gray-300 dark:border-gray-600"
          }
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:border-primary-400"
          }
        `}
      >
        {hasFiles ? (
          <div className="space-y-4">
            {previewUrls.map((url, index) => {
              const isImageFile =
                url.includes("images") ||
                url.match(/\.(jpg|jpeg|png|gif|webp)$/i);
              return (
                <div key={index} className="relative inline-block">
                  {isImageFile ? (
                    <img
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="max-w-full max-h-48 rounded-lg object-contain mx-auto"
                    />
                  ) : (
                    <video
                      src={url}
                      controls
                      className="max-w-full max-h-48 rounded-lg object-contain mx-auto"
                    />
                  )}
                  {!disabled && (
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              );
            })}
            {currentFiles.map((fileName, index) => (
              <div
                key={`current-${index}`}
                className="flex items-center justify-center space-x-2"
              >
                <div className="text-green-600 dark:text-green-400">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {fileName || "Fichier uploadé"}
                </div>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-gray-500 dark:text-gray-400">
              <svg
                className="mx-auto h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {placeholder}
            </div>
            <input
              type="file"
              accept={accept}
              onChange={handleFileInput}
              disabled={disabled}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        )}
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(progress)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Upload en cours...
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Erreur: {error}
        </p>
      )}
    </div>
  );
};
