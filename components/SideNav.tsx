import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export interface NavItem {
  year: string;
  name: string;
  id: string;
  href?: string; // Optional link for navigation to different pages
  icon?: React.ReactNode; // Optional icon to display next to the name
  tag?: string; // Optional tag to display after the name
}

interface SideNavProps {
  items: NavItem[];
}

export function SideNav({ items }: SideNavProps) {
  const router = useRouter();

  // Find the active item based on current URL path
  const getActiveIdFromPath = () => {
    const currentPath = router.asPath;
    const matchingItem = items.find((item) => item.href === currentPath);
    return matchingItem?.id || items[0]?.id || "";
  };

  const [activeId, setActiveId] = useState<string>(getActiveIdFromPath());

  // Group items by year
  const itemsByYear = items.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  const years = Object.keys(itemsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  // Derive active year from active item
  const activeYear = items.find((p) => p.id === activeId)?.year || "";

  useEffect(() => {
    // Update active state when route changes
    setActiveId(getActiveIdFromPath());
  }, [router.asPath]);

  useEffect(() => {
    // Only use IntersectionObserver for items without hrefs (same-page navigation)
    const samePageItems = items.filter((item) => !item.href);
    if (samePageItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    samePageItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    // Handle scroll to bottom - activate last item when at page bottom
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (scrolledToBottom && samePageItems.length > 0) {
        setActiveId(samePageItems[samePageItems.length - 1].id);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  const handleAnchorClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="side-nav">
      {years.map((year) => {
        const isYearActive = year === activeYear;
        return (
          <div key={year} className={`side-nav-year ${isYearActive ? "year-active" : ""}`}>
            <span className="side-nav-year-label">{year}</span>
            <ul>
              {itemsByYear[year].map((item) => (
                <li key={item.id}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={activeId === item.id ? "active" : ""}
                    >
                      {item.icon && <span className="side-nav-icon">{item.icon}</span>}
                      {item.name}
                      {item.tag && <span className="side-nav-tag">{item.tag}</span>}
                    </Link>
                  ) : (
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleAnchorClick(e, item)}
                      className={activeId === item.id ? "active" : ""}
                    >
                      {item.icon && <span className="side-nav-icon">{item.icon}</span>}
                      {item.name}
                      {item.tag && <span className="side-nav-tag">{item.tag}</span>}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <style jsx global>{`
        .side-nav {
          position: sticky;
          top: 80px;
          float: left;
          width: 180px;
          margin-left: -200px;
          font-size: 0.85rem;
          padding-right: 1rem;
        }
        .side-nav-year {
          margin-bottom: 1rem;
          opacity: 0.4;
          transition: opacity 0.2s ease;
        }
        .side-nav-year.year-active {
          opacity: 1;
        }
        .side-nav-year-label {
          font-weight: 600;
          color: var(--gray-600);
          display: block;
          margin-bottom: 0.25rem;
          transition: color 0.2s ease;
        }
        .side-nav-year.year-active .side-nav-year-label {
          color: var(--gray-900);
        }
        .side-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .side-nav li {
          margin: 0.25rem 0;
        }
        .side-nav a {
          color: var(--gray-500);
          text-decoration: none;
          transition: color 0.15s ease;
          display: block;
          padding: 0.125rem 0;
          position: relative;
        }
        .side-nav a:hover {
          color: var(--gray-900);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .side-nav a.active {
          color: var(--gray-900);
          font-weight: 500;
        }
        .side-nav-icon {
          position: absolute;
          left: -1rem;
          top: 0.4rem;
        }
        .side-nav-tag {
          display: inline-block;
          margin-left: 0.375rem;
          padding: 0.0625rem 0.375rem;
          font-size: 0.625rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          background: var(--secondary);
          color: var(--muted-foreground);
          border-radius: 0.25rem;
          vertical-align: middle;
        }
        @media (max-width: 1200px) {
          .side-nav {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
