"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-destructive" />
        <h1 className="mt-4 text-3xl font-bold">Une erreur est survenue</h1>
        <p className="mt-2 text-muted-foreground">
          Désolé, une erreur inattendue s&apos;est produite.
        </p>
        <div className="mt-6 gap-4 flex">
          <Button className="flex-1" onClick={() => reset()}>
            Réessayer
          </Button>
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Actualiser la page
          </Button>
        </div>
      </div>
    </div>
  );
}
