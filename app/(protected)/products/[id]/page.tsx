import ProductoForm from "@/components/products/ProductForm";
import { Suspense } from "react";

async function DetalleProducto({ promise }: { promise: Promise<{ id: string }> }) {
  const { id } = await promise; 
  
  return <ProductoForm/>;
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  return (
    <main className="p-8">
      <Suspense fallback={<p className="text-blue-500 animate-pulse">Cargando detalles del producto...</p>}>
        <DetalleProducto promise={params}/>
      </Suspense>
    </main>
  );
}