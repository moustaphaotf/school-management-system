"use client";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";
import { FileQuestion } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-center">
        <FileQuestion className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold">Page non trouvée</h1>
        <p className="mt-2 text-muted-foreground">
          Désolé, la page que vous recherchez n&apos;existe pas.
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