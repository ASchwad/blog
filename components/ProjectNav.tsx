import { SideNav, NavItem } from "./SideNav";
import { Star } from "lucide-react";

const projects: NavItem[] = [
  { year: "2026", name: "Finale Ligure Trail Map", id: "finale-ligure-trail-map" },
  { year: "2022", name: "Futuro Farming", id: "futuro-farming", icon: <Star size={12} strokeWidth={2.5} className="text-orange-500" /> },
  { year: "2022", name: "Solarkraft", id: "solarkraft" },
  { year: "2022", name: "Route Builder", id: "route-builder" },
  { year: "2021", name: "Data Lineage at BMW", id: "data-lineage", icon: <Star size={12} strokeWidth={2.5} className="text-orange-500" /> },
  { year: "2021", name: "React Native Translation Tooling", id: "react-native-translation-tooling" },
  { year: "2019", name: "Grand Theft Candy", id: "grand-theft-candy" },
];

export function ProjectNav() {
  return <SideNav items={projects} />;
}
