import React, { useState } from 'react';
import { ShoppingBag, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackCategory?: string;
  fallbackIcon?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackTitle,
  fallbackCategory,
  fallbackIcon,
  onError,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    setIsLoading(false);
    if (onError) onError(e);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError || !src) {
    return (
      <div className={`w-full h-full min-h-[160px] bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden group select-none ${containerClassName}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-50" />
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl" />
        <div className="relative z-10 w-12 h-12 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10 mb-2 group-hover:scale-110 transition-transform">
          {fallbackIcon ? (
            <span className="text-2xl">{fallbackIcon}</span>
          ) : (
            <ShoppingBag className="w-6 h-6 text-amber-400" />
          )}
        </div>
        <div className="relative z-10 text-center max-w-[90%]">
          {fallbackTitle && (
            <p className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-amber-300 transition-colors">
              {fallbackTitle}
            </p>
          )}
          {fallbackCategory && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-400 border border-amber-200 text-[10px] font-black text-slate-950 uppercase tracking-wider shadow-sm">
              {fallbackCategory}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center z-0">
          <Sparkles className="w-5 h-5 text-amber-500/40 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt || fallbackTitle || 'AFRUS Store Product'}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
};
