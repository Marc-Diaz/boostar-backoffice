// @/app/actions/productos.ts
"use server"

import { createClient } from "@/lib/supabase/server" // Tu helper de Supabase
import { productSchema as productSchema } from "@/lib/validation/product"
import { revalidatePath } from "next/cache"

export async function actualizarProducto(formData: FormData) {
  const supabase = await createClient()
  
  // 1. Extraer y Validar
  const rawData = Object.fromEntries(formData.entries())
  const validatedFields = productSchema.safeParse({
    ...rawData,
    id_producto: Number(rawData.id_producto),
    id_marca: Number(rawData.id_marca),
    id_estilo: Number(rawData.id_estilo),
    precio: Number(rawData.precio),
    precio_oferta: rawData.precio_oferta ? Number(rawData.precio_oferta) : null,
  })

  if (!validatedFields.success) return { error: "Datos inválidos" }
  const data = validatedFields.data
  const nuevasImagenes = formData.getAll("nuevas_imagenes") as File[]

  try {
    // 2. Actualizar Tabla Producto
    const { error: prodError } = await supabase
      .from("Producto")
      .update({
        nombre: data.nombre,
        modelo: data.modelo,
        id_marca: data.id_marca,
        id_estilo: data.id_estilo,
        precio: data.precio,
        precio_oferta: data.precio_oferta,
      })
      .eq("id_producto", data.id_producto)

    if (prodError) throw prodError

    // 3. Subir Imágenes y Guardar en Multimedia
    for (const file of nuevasImagenes) {
      if (file.size === 0) continue

      const fileExt = file.name.split('.').pop()
      const fileName = `${data.id_producto}/${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      // Subir al Bucket 'productos_multimedia'
      const { error: uploadError } = await supabase.storage
        .from("productos_multimedia")
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Obtener URL Pública
      const { data: { publicUrl } } = supabase.storage
        .from("productos_multimedia")
        .getPublicUrl(filePath)

      // Insertar en tabla Multimedia
      await supabase
        .from("Multimedia")
        .insert({ id_producto: data.id_producto, url_multimedia: publicUrl })
    }

    revalidatePath(`/productos/${data.id_producto}`)
    return { success: true }

  } catch (error: any) {
    return { error: error.message || "Error al actualizar" }
  }
}