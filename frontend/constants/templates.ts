import templateData from "@/assets/templates.json";
import type { Template } from "@/types";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

const VISUALS: Record<string, Pick<Template, "colors" | "accentColor" | "imageUrl">> = {
  trophy: {
    colors: ["#1a1200", "#3d2b00"],
    accentColor: "#facc15",
    imageUrl: `${API_BASE}/template-images/trophy.png`,
  },
  goalkeeper: {
    colors: ["#001a0d", "#003320"],
    accentColor: "#4ade80",
    imageUrl: `${API_BASE}/template-images/goalkeeper.png`,
  },
};

export const TEMPLATES: Template[] = templateData.map((t) => ({
  ...t,
  ...VISUALS[t.id],
})) as Template[];
