
import * as z from "zod"

export const productSchema = z.object({
  id_producto: z.number(),
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  id_marca: z.coerce.number().min(1, "Selecciona una marca"),
  id_estilo: z.coerce.number().min(1, "Selecciona un estilo"),
  precio: z.coerce.number().min(0.01, "El precio debe ser mayor a 0"),
  precio_oferta: z.coerce.number().min(0).optional().nullable(),
  modelo: z.string().min(1, "El modelo es obligatorio"),
  

  nuevas_imagenes: z
    .custom<FileList>()
    .transform((file) => file?.length > 0 ? Array.from(file) : [])
    .optional(),
    
  imagenes_actuales: z.array(z.string()).optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>