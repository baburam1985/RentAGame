import React from "react";

type ImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
};

export default function Image({ src, alt, className }: ImageProps) {
  return React.createElement("img", { src, alt, className });
}
