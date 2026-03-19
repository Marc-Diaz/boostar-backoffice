"use client";
import * as React from "react";
import { uploadMultipleImages } from "@/lib/storage/uploadImage";

export const useFileUpload = (onUploadSuccess?: (urls: string[]) => void) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleUpload = async () => {
    if (files.length === 0) return;
    setIsSubmitting(true);
    try {
      const results = await uploadMultipleImages(files);
      // Extraemos las rutas o URLs generadas
      const urls = results.map(res => res.path); 
      
      if (onUploadSuccess) onUploadSuccess(urls);
      
      setFiles([]);
      return urls;
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { files, setFiles, isSubmitting, handleUpload };
};