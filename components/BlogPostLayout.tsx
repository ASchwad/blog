import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { TableOfContents } from "./TableOfContents";

interface BlogPostLayoutProps {
  title: string;
  description: string;
  image?: string;
  date: string;
  tags?: string[];
  children: React.ReactNode;
}

export function BlogPostLayout({
  title,
  description,
  image,
  date,
  tags = [],
  children,
}: BlogPostLayoutProps) {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://schwad.dev";
  const canonicalUrl = `${siteUrl}${router.asPath}`;
  const ogImage = image ? `${siteUrl}${image}` : `${siteUrl}/og-default.png`;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="article:published_time" content={new Date(date).toISOString()} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <article>
        <TableOfContents />
        <Link
          href="/blog"
          className="block text-sm text-muted-foreground hover:text-primary transition-colors no-underline"
        >
          &larr; Back to Blog posts
        </Link>

        <h1 className="text-4xl font-bold mb-3" style={{ marginTop: "2rem" }}>
          {title}
        </h1>

        <div className="blog-meta">
          <time dateTime={date}>{formattedDate}</time>
          {tags.length > 0 && (
            <>
              <span>•</span>
              <div className="blog-tags">
                {tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="prose dark:prose-invert">{children}</div>
      </article>
    </>
  );
}
