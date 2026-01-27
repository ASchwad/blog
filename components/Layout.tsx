import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

const YEAR = new Date().getFullYear();

const navItems = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
      <nav className="mb-12 flex items-center gap-8">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className=""
          />
        </Link>
        <ul className="flex gap-8">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm transition-colors hover:text-foreground ${
                    isActive ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <main className="prose dark:prose-invert max-w-none">{children}</main>

      <footer className="mt-32">
        <small className="flex justify-between text-muted-foreground">
          <span>
            <time>{YEAR}</time> © Alexander Schoenenwald.
          </span>
          <a href="/feed.xml" className="hover:text-foreground transition-colors">
            RSS
          </a>
        </small>
      </footer>
    </div>
  );
}
