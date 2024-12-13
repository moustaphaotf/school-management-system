"use client";

import { ChevronsUpDown, Edit2, User2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "../../ui/skeleton";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data } = useSession();

  const [isHoverUserIcon, setIsHoveringUserIcon] = useState(false);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Link
                onMouseEnter={() => setIsHoveringUserIcon(true)}
                onMouseLeave={() => setIsHoveringUserIcon(false)}
                href={"#"}
              >
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarFallback className="rounded-lg">
                    {isHoverUserIcon ? <Edit2 /> : <User2 />}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {data?.user?.firstName} {data?.user?.lastName}
                </span>
                <span className="truncate text-xs">{data?.user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Link
                  onMouseEnter={() => setIsHoveringUserIcon(true)}
                  onMouseLeave={() => setIsHoveringUserIcon(false)}
                  href={"#"}
                >
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarFallback className="rounded-lg">
                      {isHoverUserIcon ? <Edit2 /> : <User2 />}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {data?.user?.firstName} {data?.user?.lastName}
                  </span>
                  <span className="truncate text-xs">{data?.user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <ConfirmationDialog
                onConfirm={() => signOut()}
                confirmText="Oui, me déconnecter"
                cancelText="Non, conserver ma session"
                triggerText={"Déconnexion"}
                triggerClassName="w-full"
                confirmVariant={"destructive"}
                triggerVariant={"destructive"}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
