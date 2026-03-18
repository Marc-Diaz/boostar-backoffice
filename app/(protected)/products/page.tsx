import { Suspense } from "react";
import { getProducts } from "@/lib/products/getProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductItem } from "@/components/products/ProductItem";
import { FloatingButton } from "@/components/products/FloatInsertButton";

async function ProductList() {
  const productos = await getProducts();
  if (productos.length === 0) return <p>No hay productos.</p>;

  return (
    <>
      {productos.map((producto) => (
        <ProductItem product={producto} key={producto.id}/>
      ))}
    
    </>
  );
}

export default function ProductsPage() {
  return (
    <main className="p-8">
      <Suspense fallback={<p className="text-blue-500 animate-pulse">Descargando productos desde Supabase...</p>}>
        <ProductList />
      </Suspense>
      <FloatingButton/>
    </main>
  );
}