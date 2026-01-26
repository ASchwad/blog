import { SideNav, NavItem } from "./SideNav";

const posts: NavItem[] = [
  { year: "2021", name: "Markdown Examples", id: "markdown", href: "/blog/markdown" },
  { year: "2021", name: "Next.js Pages", id: "pages", href: "/blog/pages" },
];

export function BlogNav() {
  return <SideNav items={posts} />;
}
