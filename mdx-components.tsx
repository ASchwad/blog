import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use Next.js Image for optimized images
    img: (props) => (
      <Image
        {...(props as any)}
        width={800}
        height={450}
        className="next-image"
      />
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
