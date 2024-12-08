"use client";

import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

export function LandingNav() {
  const router = useRouter();

  return (
    <nav className="border-b bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">SGS</span>
          </div>
          <Button onClick={() => router.push("/auth/login")}>
            Connexion
          </Button>
        </div>
      </div>
    </nav>
  );
}