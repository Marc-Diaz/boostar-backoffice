"use client";

import { useState, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Upload, Package, DollarSign, Film, X, ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList, FileUploadTrigger } from "@/components/ui/file-upload";
import { useFileUpload } from "@/hooks/use-file-upload";

const multimediaSchema = z.object({
  tipo_multimedia: z.enum(["imagen", "video", "modelo"]),
  url_multimedia: z.string().min(1, "La URL es requerida"),
});

const productoSchema = z.object({
  nombre: z.string().min(1, "Requerido"),
  id_marca: z.string().min(1, "Selecciona marca"),
  id_estilo: z.string().min(1, "Selecciona estilo"),
  precio: z.string().min(1, "Requerido"),
  img_portada: z.string().min(1, "La portada es obligatoria"), // Ahora validamos que exista la URL
  multimedia: z.array(multimediaSchema),
});

type ProductoFormValues = z.infer<typeof productoSchema>;

export default function ProductoForm({ initialData }: { initialData?: ProductoFormValues }) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ProductoFormValues>({
    resolver: zodResolver(productoSchema),
    defaultValues: initialData || { nombre: "", id_marca: "", precio: "", img_portada: "", multimedia: [] },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: "multimedia" });

  // --- LOGICA DE SUBIDA ---
  
  // Hook para Portada (Máximo 1)
  const portadaUpload = useFileUpload((urls) => {
    form.setValue("img_portada", urls[0], { shouldValidate: true });
  });

  // Hook para Galería
  const galleryUpload = useFileUpload((urls) => {
    urls.forEach(url => append({ tipo_multimedia: "imagen", url_multimedia: url }));
  });

  const onSubmit = async (data: ProductoFormValues) => {
    console.log("Datos listos para enviar a la DB:", data);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
          
          {/* 1. Información Básica */}
          <Card className="shadow-sm">
            <CardContent className="pt-6 space-y-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase">Nombre del Producto</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* 2. Portada (Single File Upload) */}
          <Card className="shadow-sm border-dashed border-2">
            <CardContent className="pt-6">
              <FormLabel className="text-xs font-bold uppercase mb-4 block text-orange-600">Imagen de Portada *</FormLabel>
              
              {form.watch("img_portada") ? (
                <div className="relative w-40 h-40 rounded-lg overflow-hidden border">
                  <img src={form.watch("img_portada")} alt="Portada" className="w-full h-full object-cover" />
                  <Button 
                    variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => form.setValue("img_portada", "")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <FileUpload
                    value={portadaUpload.files}
                    onValueChange={portadaUpload.setFiles}
                    maxFiles={1}
                  >
                    <FileUploadDropzone className="py-4">
                      <ImageIcon className="size-8 text-slate-300 mb-2" />
                      <p className="text-xs text-slate-500">Sube la imagen principal</p>
                    </FileUploadDropzone>
                  </FileUpload>
                  <Button 
                    type="button" size="sm" variant="secondary" className="w-full"
                    disabled={portadaUpload.files.length === 0 || portadaUpload.isSubmitting}
                    onClick={portadaUpload.handleUpload}
                  >
                    {portadaUpload.isSubmitting ? "Subiendo..." : "Confirmar Portada"}
                  </Button>
                </div>
              )}
              <FormMessage>{form.formState.errors.img_portada?.message}</FormMessage>
            </CardContent>
          </Card>

          {/* 3. Galería Multimedia (Multiple File Upload) */}
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <FormLabel className="text-xs font-bold uppercase mb-4 block">Galería Multimedia</FormLabel>
              
              <FileUpload
                value={galleryUpload.files}
                onValueChange={galleryUpload.setFiles}
                multiple
              >
                <FileUploadDropzone className="border-blue-100 bg-blue-50/30">
                  <Upload className="size-6 text-blue-400 mb-2" />
                  <p className="text-xs">Arrastra imágenes para la galería</p>
                </FileUploadDropzone>
                <Button 
                  type="button" size="sm" className="mt-2 w-full bg-blue-600"
                  disabled={galleryUpload.files.length === 0 || galleryUpload.isSubmitting}
                  onClick={galleryUpload.handleUpload}
                >
                  {galleryUpload.isSubmitting ? "Subiendo Galería..." : "Subir archivos a la galería"}
                </Button>
              </FileUpload>

              {/* Lista de archivos ya subidos (desde el form state) */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 p-2 border rounded bg-white">
                    <div className="w-10 h-10 bg-slate-100 rounded shrink-0 overflow-hidden">
                      <img src={field.url_multimedia} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] truncate text-slate-500">{field.url_multimedia}</p>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4 text-slate-400" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Botón Final */}
          <Button 
            type="submit" 
            className={cn("w-full h-12 text-lg", submitted ? "bg-green-600" : "bg-slate-900")}
            disabled={form.formState.isSubmitting}
          >
            {submitted ? "¡Producto Guardado!" : "Finalizar y Guardar Producto"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
