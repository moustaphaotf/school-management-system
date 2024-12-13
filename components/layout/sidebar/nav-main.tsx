"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/lib/constants/routes";

interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubitems = item.items && item.items.length > 0;
          const isActive =
            pathname === item.href ||
            (hasSubitems &&
              item?.items!.some((subItem) => pathname === subItem.href));

          return (
            <Collapsible
              key={item.label}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <>
                    {hasSubitems && (
                      <CollapsibleTrigger asChild>
                        <Link href={item.href}>
                          <SidebarMenuButton tooltip={item.label}>
                            {item.icon && <item.icon className="w-4 h-4" />}
                            <span>{item.label}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </Link>
                      </CollapsibleTrigger>
                    )}

                    {!hasSubitems && (
                      <Link href={item.href}>
                        <SidebarMenuButton
                          isActive={isActive}
                          tooltip={item.label}
                        >
                          {item.icon && <item.icon className="w-4 h-4" />}
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </Link>
                    )}
                  </>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.label}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.href}>
                            <span>{subItem.label}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
