import { type NextRequest } from "next/server";
// IMPORTANTE: Ajusta esta ruta según dónde tengas guardada la función updateSession
// Normalmente en el template de Supabase está en utils/supabase/middleware.ts
import { updateSession } from "@/lib/supabase/proxy"; 

export async function proxy(request: NextRequest) {
 
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Ejecuta el middleware en todas las rutas de la app EXCEPTO en:
     * - _next/static (archivos estáticos de JS/CSS)
     * - _next/image (imágenes optimizadas por Next.js)
     * - favicon.ico (el icono de la pestaña)
     * - Cualquier archivo con extensión de imagen (svg, png, jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};