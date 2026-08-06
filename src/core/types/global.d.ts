// src/globals.d.ts
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

// Для side-effect импортов (без присвоения переменной)
declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*/css" {
  const content: Record<string, string>;
  export default content;
}

// Для side-effect импортов (без присвоения переменной)
declare module "*/css" {
  const content: string;
  export default content;
}


declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}
