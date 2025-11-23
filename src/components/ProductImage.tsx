import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function ProductImage({ src, alt, className, containerClassName }: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  // Garantir que o caminho está correto
  const getImagePath = (path: string | null | undefined): string => {
    if (!path) return "/placeholder.svg";
    
    // Se começar com /src/assets/, corrigir para /assets/
    if (path.startsWith('/src/assets/')) {
      return path.replace('/src/assets/', '/assets/');
    }
    
    // Se já estiver correto, retornar
    if (path.startsWith('/assets/') || path.startsWith('http')) {
      return path;
    }
    
    // Se for um caminho relativo, adicionar /assets/
    return `/assets/${path}`;
  };

  const imagePath = imageError ? "/placeholder.svg" : getImagePath(src);

  return (
    <div className={cn("relative overflow-hidden bg-muted/20", containerClassName)}>
      {imagePath === "/placeholder.svg" && imageError ? (
        <div className="w-full h-full flex items-center justify-center bg-muted/40">
          <span className="text-muted-foreground text-sm">Sem imagem</span>
        </div>
      ) : (
        <img
          src={imagePath}
          alt={alt}
          className={cn("w-full h-full object-cover", className)}
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
