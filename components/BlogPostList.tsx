import Link from "next/link";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  tags: string[];
  href: string;
  isDraft?: boolean;
}

const publishedPosts: BlogPost[] = [
  {
    title: "Claude Code Power User Tips",
    description:
      "Advanced Claude Code techniques including custom subagents, UI validation with Playwright MCP, skills, hooks, and workflow optimizations.",
    date: "2026/2/14",
    tags: ["AI", "tooling"],
    href: "/blog/claude-code-power-user",
  },
  {
    title: "Getting Started with Claude Code: My Tips and Setup",
    description:
      "Practical tips on Claude Code setup, VS Code extension, CLAUDE.md configuration, planning mode, and workflow best practices from daily usage.",
    date: "2026/1/26",
    tags: ["AI", "tooling"],
    href: "/blog/claude-code-setup",
  },
  {
    title: "From DynamoDB to Timestream",
    description:
      "Advantages of persisting our sensor data in Timestream over DynamoDB",
    date: "2022/10/19",
    tags: ["AWS", "Data", "Sensors"],
    href: "/blog/dynamodb-to-timestream",
  },
  {
    title:
      "Collaborating on translations - from Excel to multi-language React (Native) app",
    description:
      "A workflow to coordinate translations with colleagues via Excel and integrate them into your React app",
    date: "2021/12/30",
    tags: ["React", "React Native", "i18n", "JavaScript"],
    href: "/blog/react-translation-workflow",
  },
  {
    title:
      "Research @BMW - How to collect and visualize data lineage in an AWS-based data lake",
    description:
      "Enhancing transparency within complex data pipelines by collecting data lineage",
    date: "2021/9/27",
    tags: ["AWS", "Big Data", "Spark", "React"],
    href: "/blog/data-lineage-aws",
  },
];

const draftPosts: BlogPost[] = [];

const isDev = process.env.NODE_ENV === "development";
export const posts: BlogPost[] = isDev
  ? [...draftPosts, ...publishedPosts]
  : publishedPosts;

export function BlogPostList() {
  return (
    <div className="blog-post-list">
      {posts.map((post) => {
        const date = new Date(post.date);
        return (
          <Link key={post.href} href={post.href} className="post-item-link">
            <div className="post-item">
              <h3>
                {post.isDraft && <span className="draft-badge">DRAFT</span>}
                {post.title}
              </h3>
              <time dateTime={date.toISOString()}>
                {date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
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
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .post-item-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .post-item {
          position: relative;
          padding: 1.5rem;
          border-radius: 0.5rem;
          transition: background-color 0.15s ease;
          cursor: pointer;
        }
        .post-item:hover {
          background-color: var(--secondary);
        }
        .post-item h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.25rem;
        }
        .post-item time {
          font-size: 0.875rem;
          color: var(--muted-foreground);
          display: block;
          margin-bottom: 0.75rem;
        }
        .post-description {
          margin: 0 0 0.75rem 0;
          color: var(--muted-foreground);
        }
        .post-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .post-tag {
          display: inline-flex;
          padding: 0.125rem 0.5rem;
          background: var(--muted);
          border-radius: 0.25rem;
          font-size: 0.8rem;
        }
        .draft-badge {
          display: inline-flex;
          padding: 0.125rem 0.5rem;
          background: oklch(0.65 0.2 40);
          color: white;
          border-radius: 0.25rem;
          font-size: 0.7rem;
          font-weight: 600;
          margin-right: 0.5rem;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
}
