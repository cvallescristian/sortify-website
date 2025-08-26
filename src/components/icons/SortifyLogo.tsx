import Image from 'next/image';

interface SortifyLogoProps {
  size?: number;
  className?: string;
}

export default function SortifyLogo({ size = 48, className }: SortifyLogoProps) {
  return (
    <Image
      src="https://sotify-website.s3.ap-southeast-2.amazonaws.com/sortify-logo.png"
      alt="Sortify Logo"
      width={size}
      height={size}
      className={className}
    />
  );
}
