import {
  GraduationCap,
  Users,
  Settings,
  Calendar,
  LayoutDashboard,
  LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
  items?: NavItem[];
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
};

export const APP_ROUTES: Record<string, NavItem> = {
  DASHBOARD: {
    label: "Tableau de bord",
    icon: LayoutDashboard,
    href: "/dashboard",
    breadcrumbs: [],
  },
  SETTINGS: {
    label: "Paramètres",
    icon: Settings,
    href: "/dashboard/settings",
    breadcrumbs: [
      {
        href: "/dashboard",
        label: "Tableau de bord",
      },
    ],
  },
};

export const SCHOOL_ADMIN_ROUTES = [APP_ROUTES.DASHBOARD, APP_ROUTES.SETTINGS];
