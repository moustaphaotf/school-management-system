"use client";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccessDenied() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-center">
        <ShieldAlert className="mx-auto h-16 w-16 text-yellow-500" />
        <h1 className="mt-4 text-3xl font-bold">Accès refusé</h1>
        <p className="mt-2 text-gray-600">
          Désolé, vous n&apos;avez pas les permissions nécessaires pour accéder
          à cette page.
        </p>
        <div className="mt-6">
          <Button onClick={() => router.push(APP_ROUTES.DASHBOARD.href)}>
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    </div>
  );
}
