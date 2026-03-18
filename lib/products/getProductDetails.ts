"use server"

import { createClient } from "@/lib/supabase/server"

export async function getProductDetails(productId: number) {
  const supabase = await createClient()

  // 1. Fetch Product
  const { data: producto, error: prodError } = await supabase
    .from("Producto")
    .select("*")
    .eq("id_producto", productId)
    .single()

  if (prodError) throw prodError

  // 2. Fetch Multimedia
  const { data: multimedia, error: multiError } = await supabase
    .from("Multimedia")
    .select("*")
    .eq("id_producto", productId)

  if (multiError) throw multiError

  // 3. Fetch Marcas
  const { data: marcas, error: marcasError } = await supabase
    .from("Marca")
    .select("id_marca, nombre")

  // Fallback if Marca table is different or empty
  if (marcasError) {
     console.error("Error fetching Marcas:", marcasError.message)
  }

  // 4. Fetch Estilos
  const { data: estilos, error: estilosError } = await supabase
    .from("Estilos")
    .select("id_estilo, nombre")

  if (estilosError) {
    console.error("Error fetching Estilos:", estilosError.message)
  }

  return {
    producto,
    multimedia: multimedia || [],
    marcas: marcas || [],
    estilos: estilos || [],
  }
}
