"use server"
import { Product, ProductDTO, mapToProducts } from "../models/product";
import { createClient } from "@/lib/supabase/server";


const CARROUSEL_PAGE_SIZE = 10; 

export async function getProducts(
  refId: number | null = null
): Promise<Product[]> {
  const sortMode = "newest"
  try {

    const supabase = await createClient();

    const { data, error } = await supabase.rpc("get_products", {
      p_sort_mode: sortMode,
      p_ref_id: refId,
      p_page_size: CARROUSEL_PAGE_SIZE,
    });

    if (error) {
      throw error; 
    }
    const rawData = data as ProductDTO[];
    return mapToProducts(data) as Product[];

  } catch (error: any) {
    console.error("ProductRepository: Error fetching feed products:", error.message || error);
        
    return [];
  }
}