/// <reference types="vite/client" />

declare module "*.mdx" {
  import type { ComponentType } from "react";
  const component: ComponentType;
  export default component;

  export const frontmatter: {
    title: string;
    date: string;
    description: string;
    tags: string[];
  };
}
