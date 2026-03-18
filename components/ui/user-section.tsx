"use client";

import * as React from "react";
import { LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserSectionProps {
  isCollapsed: boolean;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function UserSection({ isCollapsed, user }: UserSectionProps) {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <div 
      className="mt-auto border-t p-4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={cn(
        "relative flex items-center p-2 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden",
        isHovering ? "bg-destructive/10" : "bg-secondary/40"
      )}>
        
        {/* Avatar / Imagen */}
        <div className="relative h-9 w-9 shrink-0 z-10">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="h-full w-full rounded-full object-cover border border-border" 
            />
          ) : (
            <div className="h-full w-full rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <User size={18} />
            </div>
          )}
        </div>

        {/* Info de Usuario (Nombre/Email) */}
        {!isCollapsed && (
          <div className={cn(
            "ml-3 flex flex-col flex-1 overflow-hidden transition-all duration-300",
            isHovering ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"
          )}>
            <span className="text-sm font-semibold truncate text-foreground">
              {user.name}
            </span>
            <span className="text-[10px] text-muted-foreground truncate uppercase tracking-wider font-medium">
              Admin Plan
            </span>
          </div>
        )}

        {/* Botón de Logout (Overlay que aparece en Hover) */}
        {isHovering && (
          <button 
            onClick={() => console.log("Logout logic here")}
            className={cn(
              "absolute inset-0 z-20 flex items-center justify-center gap-2 text-destructive font-bold text-sm animate-in fade-in slide-in-from-bottom-1 duration-200",
              isCollapsed ? "w-full" : "w-full"
            )}
          >
            <LogOut size={18} strokeWidth={2.5} />
            {!isCollapsed && <span>CERRAR SESIÓN</span>}
          </button>
        )}
      </div>
    </div>
  );
}