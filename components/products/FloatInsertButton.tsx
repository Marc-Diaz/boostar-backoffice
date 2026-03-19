import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export function FloatingButton() {
  return (
    <Link href={"products/new"}>
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Añadir nuevo</span>
      </Button>
    </Link>
    
  )
}