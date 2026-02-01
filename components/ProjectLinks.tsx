import { Github, ExternalLink, FileText, Youtube, Play, BookOpen } from "lucide-react";

interface ProjectLink {
  type: "code" | "app" | "blog" | "paper" | "video" | "demo";
  href: string;
  label?: string;
}

interface ProjectLinksProps {
  links: ProjectLink[];
}

const iconMap = {
  code: Github,
  app: ExternalLink,
  blog: BookOpen,
  paper: FileText,
  video: Youtube,
  demo: Play,
};

const defaultLabels = {
  code: "Code",
  app: "App",
  blog: "Blog",
  paper: "Paper",
  video: "Video",
  demo: "Demo",
};

export function ProjectLinks({ links }: ProjectLinksProps) {
  return (
    <div className="project-links">
      {links.map((link, index) => {
        const Icon = iconMap[link.type];
        const label = link.label || defaultLabels[link.type];
        return (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <Icon size={14} />
            <span>{label}</span>
          </a>
        );
      })}
    </div>
  );
}
