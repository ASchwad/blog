import { useEffect, useState } from "react";

export interface NavItem {
  year: string;
  name: string;
  id: string;
  href?: string; // Optional link for navigation to different pages
}

interface SideNavProps {
  items: NavItem[];
}

export function SideNav({ items }: SideNavProps) {
  // Default to first item on initial load
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

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

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    // Handle scroll to bottom - activate last item when at page bottom
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (scrolledToBottom && items.length > 0) {
        setActiveId(items[items.length - 1].id);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  const handleClick = (item: NavItem) => {
    if (item.href) {
      // Navigate to a different page
      window.location.href = item.href;
    } else {
      // Scroll to element on same page
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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
                  <a
                    href={item.href || `#${item.id}`}
                    onClick={(e) => {
                      if (!item.href) {
                        e.preventDefault();
                      }
                      handleClick(item);
                    }}
                    className={activeId === item.id ? "active" : ""}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <style jsx>{`
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
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          margin: 0.25rem 0;
        }
        a {
          color: var(--gray-500);
          text-decoration: none;
          transition: color 0.15s ease;
          display: block;
          padding: 0.125rem 0;
        }
        a:hover {
          color: var(--gray-800);
        }
        a.active {
          color: var(--gray-900);
          font-weight: 500;
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
