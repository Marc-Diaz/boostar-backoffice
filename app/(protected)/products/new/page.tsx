import { Suspense } from "react";
import { FloatingButton } from "@/components/products/FloatInsertButton";
import { ProductForm } from "@/components/products/TestForm"
async function NewFileForm() {
  return (<ProductForm/>);
}

export default function ProductsPage() {
  return (
    <main className="p-8">
      <Suspense fallback={<p className="text-blue-500 animate-pulse">Descargando productos desde Supabase...</p>}>
        <NewFileForm />
      </Suspense>
    </main>
  );
}