import { SideNav, NavItem } from "./SideNav";

const posts: NavItem[] = [
  {
    year: "2026",
    name: "Claude Code: My Setup and Learnings",
    id: "claude-code-setup",
    href: "/blog/claude-code-setup",
  },
  {
    year: "2022",
    name: "From DynamoDB to Timestream",
    id: "dynamodb-to-timestream",
    href: "/blog/dynamodb-to-timestream",
  },
  {
    year: "2021",
    name: "React Translation Workflow",
    id: "react-translation-workflow",
    href: "/blog/react-translation-workflow",
  },
  {
    year: "2021",
    name: "Data Lineage in AWS",
    id: "data-lineage-aws",
    href: "/blog/data-lineage-aws",
  },
];

export function BlogNav() {
  return <SideNav items={posts} />;
}
