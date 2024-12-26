import { LoginForm } from "@/components/auth";
import { APP_ROUTES } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    return redirect(APP_ROUTES.DASHBOARD.href);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <div className="w-full max-w-md p-8 space-y-6 bg-secondary rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Connexion</h1>
          <p className="text-muted-foreground">
            Connectez-vous à votre compte administrateur
          </p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
