"use client"
import Image from "next/image"
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import {
    Button
} from "@/components/ui/button"
import { X } from "lucide-react"
import { Product } from "@/lib/models/product";
import Link from "next/link"


export function ProductItem({ product }: { product: Product }) {
    return (
        <>
            <ItemGroup className="gap-4">

                <Item variant="outline" asChild role="listitem">
                    <Link href={`/products/${product.id}`}>
                        <ItemMedia variant="image">
                            <Image
                                src={product.coverImage}
                                alt={product.name}
                                width={32}
                                height={32}
                                className="object-cover grayscale"
                            />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle className="line-clamp-1">
                                {product.name} -{" "}
                                <span className="text-muted-foreground">{product.name}</span>
                            </ItemTitle>
                            <ItemDescription>{product.price}€</ItemDescription>
                        </ItemContent>
                        <ItemContent className="flex-none text-center">
                            <Button variant="ghost" size="icon">
                                <X className="h-4 w-4" />
                            </Button>
                        </ItemContent>
                    </Link>
                </Item>
            </ItemGroup>
        </>
    )
}
