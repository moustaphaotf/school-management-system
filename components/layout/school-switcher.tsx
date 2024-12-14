"use client";

import * as React from "react";
import { Check, ChevronsUpDown, School } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSchool, useSchools, useSwitchSchool } from "@/hooks/api";
import { Skeleton } from "../ui/skeleton";
import { ROLE_LABELS } from "@/lib/constants";

export function SchoolSwitcher() {
  const { isMobile } = useSidebar();

  const {
    data: schoolMembership,
    isLoading: schoolMembershipLoading,
    isError: schoolMembershipError,
  } = useSchools();
  const {
    data: currentSchoolMembership,
    isLoading: currentSchoolMembershipLoading,
    isError: currentSchoolMembershipError,
  } = useSchool();
  const { mutate: switchSchool } = useSwitchSchool();

  if (
    schoolMembershipLoading ||
    schoolMembershipError ||
    currentSchoolMembershipLoading ||
    currentSchoolMembershipError
  ) {
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <School className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentSchoolMembership?.school?.name}
                </span>
                <span className="truncate text-xs">
                  {ROLE_LABELS[currentSchoolMembership?.role!]}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Ecoles
            </DropdownMenuLabel>
            {schoolMembership &&
              schoolMembership?.map((membership, index) => (
                <DropdownMenuItem
                  key={membership.id}
                  onClick={() => switchSchool(membership.school.id)}
                  className="gap-2 p-2"
                  asChild
                >
                  <SidebarMenuButton
                    disabled={
                      membership.school.id ===
                      currentSchoolMembership?.school.id
                    }
                  >
                    {/* <team.logo className="size-4 shrink-0" /> */}
                    {membership.school.name}
                    <DropdownMenuShortcut>
                      {membership.school.id ===
                        currentSchoolMembership?.school.id && (
                        <Check className="size-4" />
                      )}
                    </DropdownMenuShortcut>
                  </SidebarMenuButton>
                </DropdownMenuItem>
              ))}
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
