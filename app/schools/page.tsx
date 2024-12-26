"use client";

import { useSchools, useSwitchSchool } from "@/hooks/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, MapPin } from "lucide-react";
import { SchoolForm } from "@/components/schools/school-form";
import { useRouter, useSearchParams } from "next/navigation";
import { APP_ROUTES } from "@/lib/constants";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function SwicthSchoolButton({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutateAsync: switchSchool, isPending: isSwitching } =
    useSwitchSchool();
  const handleSchoolSwitch = (schoolId: string) => {
    switchSchool(schoolId).then(() => {
      router.push(searchParams.get("redirect") ?? APP_ROUTES.DASHBOARD.href);
    });
  };
  return (
    <Button
      onClick={() => handleSchoolSwitch(id)}
      className="w-full"
      disabled={isSwitching}
    >
      {isSwitching ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Chargement...
        </>
      ) : (
        "Accéder"
      )}
    </Button>
  );
}

export default function SchoolsPage() {
  const { data: memberships, isLoading, isError } = useSchools();

  if (isLoading || isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isLoading && !memberships) {
    return null;
  }

  if (memberships?.length === 0) {
    return (
      <div className="min-h-screen bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text">
          <div className="mt-12 grid gap-5 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-center">
              Enregistrez Votre Ecole
            </h1>
            <SchoolForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sélectionnez une école</h1>
          <p className="mt-3 text-lg">
            Choisissez l&apos;école à laquelle vous souhaitez accéder
          </p>
        </div>

        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-2 lg:max-w-none">
          {memberships?.map((membership) => (
            <Card key={membership.id} className="flex flex-col p-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  {membership.school.name}
                </h3>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {membership.school.location}
                </div>
                {membership.school.bio && (
                  <p className="mt-3 text-muted-foreground">
                    {membership.school.bio}
                  </p>
                )}
              </div>
              <div className="mt-6">
                <Suspense fallback={<Skeleton className="w-full h-12" />}>
                  <SwicthSchoolButton id={membership.school.id} />
                </Suspense>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
