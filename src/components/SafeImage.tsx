import { useMemo, useState } from "react";

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | undefined | null;
  fallbackSrc?: string;
};

const SafeImage = ({ src, fallbackSrc = "/placeholder.svg", onError, ...props }: Props) => {
  const initial = useMemo(() => (src && src.trim().length > 0 ? src : fallbackSrc), [src, fallbackSrc]);
  const [currentSrc, setCurrentSrc] = useState<string>(initial);

  return (
    <img
      {...props}
      src={currentSrc}
      onError={(e) => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
        onError?.(e);
      }}
    />
  );
};

export default SafeImage;

