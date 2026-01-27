import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { BlogImage } from "./components/BlogImage";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use custom BlogImage for smart sizing and lightbox
    img: (props) => (
      <BlogImage src={props.src || ""} alt={props.alt || ""} />
    ),
    // Use Next.js Link for internal links
    a: (props) => {
      const href = props.href || "";
      if (href.startsWith("/") || href.startsWith("#")) {
        return <Link {...props} href={href} />;
      }
      return <a {...props} target="_blank" rel="noopener noreferrer" />;
    },
    ...components,
  };
}
