import { SideNav, NavItem } from "./SideNav";

const posts: NavItem[] = [
  {
    year: "2026",
    name: "Claude Code: My Setup and Learnings",
    id: "claude-code-setup",
    href: "/blog/claude-code-setup",
  },
];

export function BlogNav() {
  return <SideNav items={posts} />;
}
