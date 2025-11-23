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
  const [imageSrc, setImageSrc] = useState(src || "");

  // Garantir que o caminho está correto
  const getCorrectPath = (path: string | null | undefined): string => {
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

  const handleError = () => {
    if (!imageError) {
      setImageError(true);
      // Tentar caminho alternativo
      const currentSrc = imageSrc;
      if (currentSrc.startsWith('/assets/')) {
        // Se falhou com /assets/, não tem mais fallback
        setImageSrc("/placeholder.svg");
      }
    }
  };

  const finalSrc = getCorrectPath(imageError ? "/placeholder.svg" : imageSrc);

  return (
    <div className={cn("relative overflow-hidden bg-muted/20", containerClassName)}>
      {finalSrc === "/placeholder.svg" ? (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Imagem</span>
        </div>
      ) : (
        <img
          src={finalSrc}
          alt={alt}
          className={className}
          loading="lazy"
          decoding="async"
          onError={handleError}
        />
      )}
    </div>
  );
}
