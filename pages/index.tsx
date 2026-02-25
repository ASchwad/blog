import Link from "next/link";
import { posts } from "../components/BlogPostList";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ASchwad",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/alexander-schoenenwald/",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Home() {
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4 tracking-tight text-red-500">
          Alexander Schoenenwald
        </h1>
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          Hey, Thanks for stopping by! 👋
          <br />
          <br />
          I'm a generalist software engineer focused on solving data problems.
          For 8+ years, I've been building solutions end-to-end: from customer
          conversations to data pipelines, backends, and frontends.
          <br />
          <br />
          Currently I'm freelancing in the Applied AI space.
        </p>

        {/* Social Links with nice hover effects */}
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-card-foreground no-underline transition-all duration-200 hover:border-[oklch(0.65_0.2_40)] hover:shadow-[0_0_20px_rgba(255,100,50,0.15)]"
            >
              <span className="transition-all duration-200 group-hover:text-[oklch(0.65_0.2_40)] group-hover:scale-110">
                {social.icon}
              </span>
              <span className="text-sm font-medium transition-colors duration-200 group-hover:text-[oklch(0.65_0.2_40)]">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground font-semibold !m-0">
            Recent Posts
          </h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="space-y-1">
          {recentPosts.map((post) => {
            const date = new Date(post.date);
            return (
              <Link
                key={post.href}
                href={post.href}
                className="group block py-3 px-4 -mx-4 rounded-lg transition-all duration-200 hover:bg-secondary no-underline"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                  <time
                    dateTime={date.toISOString()}
                    className="text-sm text-muted-foreground shrink-0"
                  >
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
