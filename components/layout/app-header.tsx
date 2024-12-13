"use client";

import { BreadcrumbLink } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  children?: React.ReactNode;
}

export function PageHeader({ title, breadcrumbs, children }: PageHeaderProps) {
  return (
    <header className="border-b pb-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <div key={item.label} className="flex items-center">
                    {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
                    {item.href && !isLast ? (
                      <BreadcrumbLink
                        href={item.href}
                        className="hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <span
                        className={cn(isLast && "text-foreground font-medium")}
                      >
                        {item.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
