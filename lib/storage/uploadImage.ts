import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "imagenes";

export const uploadMultipleImages = async (files: File[]) => {
  return Promise.all(files.map(file => uploadImage(file)));
};

export const uploadImage = async (file: File) => {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, { upsert: true });

  if (error) throw error;
  return data as UploadResponse;
};

interface UploadResponse {
  path: string;
  id: string;
  fullPath: string;
}