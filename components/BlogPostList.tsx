import Link from "next/link";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  tags: string[];
  href: string;
}

const posts: BlogPost[] = [
  {
    title: "Claude Code: My Setup and Learnings",
    description: "A walkthrough of my Claude Code configuration and workflow",
    date: "2026/1/26",
    tags: ["AI", "tooling"],
    href: "/blog/claude-code-setup",
  },
];

export function BlogPostList() {
  return (
    <div className="blog-post-list">
      {posts.map((post) => {
        const date = new Date(post.date);
        return (
          <Link key={post.href} href={post.href} className="post-item-link">
            <div className="post-item">
              <h3>{post.title}</h3>
              <time dateTime={date.toISOString()}>
                {date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
              <p className="post-description">{post.description}</p>
              <div className="post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="post-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        );
      })}
      <style jsx global>{`
        .blog-post-list {
          margin-top: 1rem;
        }
        .post-item-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .post-item {
          position: relative;
          padding: 1rem;
          border-radius: 0.5rem;
          transition: background-color 0.15s ease;
          cursor: pointer;
        }
        .post-item:hover {
          background-color: var(--nextra-bg-secondary, #f3f4f6);
        }
        :root.dark .post-item:hover {
          background-color: var(--nextra-bg-secondary, #27272a);
        }
        .post-item h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.25rem;
        }
        .post-item time {
          font-size: 0.875rem;
          color: var(--gray-600);
          display: block;
          margin-bottom: 1rem;
        }
        :root.dark .post-item time {
          color: var(--gray-400);
        }
        .post-description {
          margin: 0 0 1rem 0;
          color: var(--gray-600);
        }
        :root.dark .post-description {
          color: var(--gray-400);
        }
        .post-tags {
          display: flex;
          gap: 0.5rem;
        }
        .post-tag {
          font-size: 0.75rem;
          padding: 0.125rem 0.5rem;
          border-radius: 0.25rem;
          background-color: var(--gray-200, #e5e7eb);
          color: var(--gray-600);
        }
        :root.dark .post-tag {
          background-color: var(--gray-700, #374151);
          color: var(--gray-300);
        }
      `}</style>
    </div>
  );
}
