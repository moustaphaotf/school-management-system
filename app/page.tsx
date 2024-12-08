"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Calendar, Settings } from "lucide-react";
import { LandingNav } from "@/components/layout/landing-nav";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white">
      <LandingNav />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
              Système de Gestion Scolaire
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Une solution complète pour gérer efficacement votre établissement scolaire. 
              Simplifiez la gestion des étudiants, des classes, des notes et plus encore.
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                onClick={() => router.push("/auth/login")}
                className="px-8"
              >
                Commencer maintenant
              </Button>
            </div>
          </div>

          <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Users}
              title="Gestion des Étudiants"
              description="Gérez facilement les inscriptions, les informations personnelles et le suivi des étudiants."
            />
            <FeatureCard
              icon={Calendar}
              title="Années Académiques"
              description="Organisez et planifiez vos années scolaires avec un système flexible et intuitif."
            />
            <FeatureCard
              icon={Settings}
              title="Configuration Simple"
              description="Personnalisez votre système selon vos besoins avec une interface intuitive."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}