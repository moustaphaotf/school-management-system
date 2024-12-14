"use client";

import { useSchools, useSwitchSchool } from "@/hooks/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, MapPin } from "lucide-react";
import { SchoolForm } from "@/components/schools/school-form";
import { useRouter } from "next/navigation";

export default function SchoolsPage() {
  const router = useRouter();
  const { data: memberships, isLoading, isError } = useSchools();
  const { mutate: switchSchool, isPending: isSwitching } = useSwitchSchool();

  const handleSchoolSwitch = (schoolId: string) => {
    switchSchool(schoolId, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  if (isLoading || isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isLoading && !memberships) {
    return null;
  }

  if (memberships?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text">
          <div className="mt-12 grid gap-5 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              Enregistrez Votre Ecole
            </h1>
            <SchoolForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Sélectionnez une école
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Choisissez l&apos;école à laquelle vous souhaitez accéder
          </p>
        </div>

        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-2 lg:max-w-none">
          {memberships?.map((membership) => (
            <Card key={membership.id} className="flex flex-col p-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {membership.school.name}
                </h3>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {membership.school.location}
                </div>
                {membership.school.bio && (
                  <p className="mt-3 text-gray-500">{membership.school.bio}</p>
                )}
              </div>
              <div className="mt-6">
                <Button
                  onClick={() => handleSchoolSwitch(membership.school.id)}
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
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
