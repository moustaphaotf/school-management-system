"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EducationLevels } from "@/components/education-levels/education-level-settings";
import { AcademicYears } from "@/components/academic-years/academic-year-settings";
import { Subjects } from "@/components/subjects/subject-settings";
import { Classes } from "@/components/classes/class-settings";
import { PageHeader } from "@/components/layout";
import { SchoolSettings } from "@/components/schools/school-settings";

const breadcrumbs = [
  {
    label: "Paramètres",
    href: "/dashboard/settings",
  },
];

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PageHeader title="Paramètres" breadcrumbs={[]} />
      <Tabs defaultValue="school" className="space-y-4">
        <TabsList>
          <TabsTrigger value="school">Établissement</TabsTrigger>
          <TabsTrigger value="academic-years">Années académiques</TabsTrigger>
          <TabsTrigger value="education-levels">
            Niveaux d&apos;études
          </TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="subjects">Matières</TabsTrigger>
        </TabsList>
        <TabsContent value="school" className="space-y-4">
          <SchoolSettings />
        </TabsContent>
        <TabsContent value="education-levels" className="space-y-4">
          <EducationLevels />
        </TabsContent>
        <TabsContent value="classes" className="space-y-4">
          <Classes />
        </TabsContent>
        <TabsContent value="academic-years" className="space-y-4">
          <AcademicYears />
        </TabsContent>
        <TabsContent value="subjects" className="space-y-4">
          <Subjects />
        </TabsContent>
      </Tabs>
    </div>
  );
}
