export interface ProductDTO {
  id_producto: number;
  nombre: string;
  precio: number;
  precio_oferta: number | null;
  img_portada: string;
  num_likes: number;
  marca: string;
  url_logo: string;
  gustado: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice: number | null;
  coverImage: string;
  numLikes: number;
  brand: string;
  brandLogo: string;
  isLiked: boolean;
}

export function mapToProduct(dto: ProductDTO): Product {
  return {
    id: dto.id_producto,
    name: dto.nombre,
    price: dto.precio,
    discountPrice: dto.precio_oferta,
    coverImage: dto.img_portada,
    numLikes: dto.num_likes,
    brand: dto.marca,
    brandLogo: dto.url_logo,
    isLiked: dto.gustado,
  };
}

export function mapToProducts(dtos: ProductDTO[] | null): Product[] {
  if (!dtos) return [];
  return dtos.map(mapToProduct);
}