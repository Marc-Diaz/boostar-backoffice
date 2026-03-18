import { Suspense } from "react";
import { getProductDetails } from "@/lib/products/getProductDetails";


async function DetalleProducto({ id }: { id: string }) {
  const { producto, multimedia, marcas, estilos } = await getProductDetails(Number(id));

  if (!producto) return <p>Producto no encontrado.</p>;

  return (<></>);
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  return (
    <main className="p-8">
      <Suspense fallback={<p className="text-blue-500 animate-pulse">Cargando detalles del producto...</p>}>
        <DetalleProducto id={id} />
      </Suspense>
    </main>
  );
}