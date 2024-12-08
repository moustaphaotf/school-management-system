"use client";

import { UserNav } from "@/components/layout/user-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { useSession } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav
            name={`${session?.user?.firstName} ${session?.user?.lastName}`}
            email={session?.user?.email || ""}
          />
        </div>
      </div>
    </div>
  );
}