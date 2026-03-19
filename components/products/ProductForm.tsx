"use client";

import { useState, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Upload, ImagePlus, Package, DollarSign, Star, ShoppingCart, Share2, Film, Link } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const multimediaSchema = z.object({
  tipo_multimedia: z.enum(["imagen", "video", "modelo"]),
  url_multimedia: z.string().url({ message: "Debe ser una URL válida" }),
});

const productoSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(200),
  id_marca: z.string().min(1, "Selecciona una marca"),
  id_estilo: z.string().min(1, "Selecciona un estilo"),
  precio: z.string().min(1, "El precio es requerido").refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Precio inválido"),
  precio_oferta: z.string().optional().refine((v) => !v || (!isNaN(Number(v)) && Number(v) >= 0), "Precio de oferta inválido"),
  img_portada: z.string().url({ message: "Debe ser una URL válida" }).or(z.literal("")),
  modelo: z.string().min(1, "El modelo es requerido"),
  multimedia: z.array(multimediaSchema),
});

type ProductoFormValues = z.infer<typeof productoSchema>;

const MARCAS = [{ id: "1", nombre: "Nike" }, { id: "2", nombre: "Adidas" }];
const ESTILOS = [{ id: "1", nombre: "Casual" }, { id: "2", nombre: "Deportivo" }];
const TIPOS_MULTIMEDIA = [
  { value: "imagen", label: "Imagen", icon: "🖼️" },
  { value: "video", label: "Video", icon: "🎬" },
  { value: "modelo", label: "Modelo3D", icon: "🧊" },
];

function SectionHeader({
  icon: Icon,
  title,
  description,
  badge,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  badge?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-orange-100 shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-orange-600" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">{title}</h3>
          {badge && (
            <Badge className="bg-blue-600 text-white hover:bg-blue-700 text-[10px] px-1.5 py-0">
              {badge}
            </Badge>
          )}
        </div>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
    </div>
  );
}

interface ProductoFormProps {
  initialData?: ProductoFormValues;
}

export default function ProductoForm({ initialData }: ProductoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ProductoFormValues>({
    resolver: zodResolver(productoSchema),
    defaultValues: initialData || { 
      nombre: "", 
      id_marca: "", 
      id_estilo: "", 
      precio: "", 
      precio_oferta: "", 
      img_portada: "", 
      modelo: "", 
      multimedia: [] 
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: "multimedia" });

  const onSubmit = useCallback(async (data: ProductoFormValues) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    console.log(initialData ? "Datos actualizados:" : "Datos creados:", data);
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }, [initialData]);

  return (
    <div className="min-h-screen bg-white py-12 px-4 text-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
          
          {/* Información Principal */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <SectionHeader icon={Package} title="Información del Producto" description="Datos básicos de identificación" />
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 text-xs font-bold uppercase">Nombre *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Air Max 90" className="border-slate-300 focus-visible:ring-blue-500/30 focus-visible:border-blue-500" {...field} />
                      </FormControl>
                      <FormMessage className="text-orange-600" />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="id_marca"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 text-xs font-bold uppercase">Marca *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-slate-300">
                              <SelectValue placeholder="Seleccionar..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {MARCAS.map((m) => <SelectItem key={m.id} value={m.id}>{m.nombre}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-orange-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="modelo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 text-xs font-bold uppercase">Modelo *</FormLabel>
                        <FormControl>
                          <Input placeholder="AM90-001" className="border-slate-300 focus-visible:ring-blue-500/30" {...field} />
                        </FormControl>
                        <FormMessage className="text-orange-600" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Precios */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <SectionHeader icon={DollarSign} title="Precios" description="Gestión de costos" />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="precio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 text-xs font-bold uppercase">Precio Base</FormLabel>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                        <FormControl>
                          <Input type="number" className="pl-7 border-slate-300 focus-visible:ring-blue-500/30" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage className="text-orange-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="precio_oferta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-orange-600 text-xs font-bold uppercase">Precio Oferta</FormLabel>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400">$</span>
                        <FormControl>
                          <Input type="number" className="pl-7 border-orange-200 bg-orange-50/30 focus-visible:ring-orange-500/30" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage className="text-orange-600" />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Multimedia List */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <SectionHeader icon={Film} title="Archivos Multimedia" description="Imágenes y videos" />
                <Button 
                  type="button" 
                  onClick={() => append({ tipo_multimedia: "imagen", url_multimedia: "" })}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" /> Añadir
                </Button>
              </div>
              
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 flex gap-3 items-end">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      {/* URL del archivo */}
                      <FormField
                        control={form.control}
                        name={`multimedia.${index}.url_multimedia`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="URL del archivo" className="bg-white border-slate-300" {...field} />
                            </FormControl>
                            <FormMessage className="text-orange-600" />
                          </FormItem>
                        )}
                      />
                      
                      {/* Tipo de archivo usando FormField para compatibilidad con initialData */}
                      <FormField
                        control={form.control}
                        name={`multimedia.${index}.tipo_multimedia`}
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-white border-slate-300">
                                  <SelectValue placeholder="Tipo..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="imagen">Imagen</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="modelo">Modelo 3D</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-orange-600" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-slate-400 hover:text-orange-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-100">
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className={cn(
                "flex-1 text-white transition-all",
                submitted ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
              )}
            >
              {isSubmitting 
                ? "Guardando..." 
                : submitted 
                  ? "✓ Guardado" 
                  : initialData 
                    ? "Guardar Cambios" 
                    : "Crear Producto"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}