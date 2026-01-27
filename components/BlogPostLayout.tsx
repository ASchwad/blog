import Head from "next/head";
import Link from "next/link";

interface BlogPostLayoutProps {
  title: string;
  date: string;
  tags?: string[];
  children: React.ReactNode;
}

export function BlogPostLayout({
  title,
  date,
  tags = [],
  children,
}: BlogPostLayoutProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <Link
          href="/blog"
          className="block text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
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
