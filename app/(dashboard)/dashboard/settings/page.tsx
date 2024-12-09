"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heading } from "@/components/ui/heading";
import { EducationLevels } from "@/components/settings/education-levels";
import { AcademicYears } from "@/components/settings/academic-years";
import { SchoolSettings } from "@/components/settings/school";
import { Subjects } from "@/components/settings/subjects";


export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Heading
        title="Paramètres"
        description="Gérez les paramètres de votre établissement"
      />
      <Tabs defaultValue="school" className="space-y-4">
        <TabsList>
          <TabsTrigger value="school">Établissement</TabsTrigger>
          <TabsTrigger value="education-levels">Niveaux d&apos;éducation</TabsTrigger>
          <TabsTrigger value="academic-years">Années académiques</TabsTrigger>
          <TabsTrigger value="subjects">Matières</TabsTrigger>
        </TabsList>
        <TabsContent value="school" className="space-y-4">
          <SchoolSettings />
        </TabsContent>
        <TabsContent value="education-levels" className="space-y-4">
          <EducationLevels />
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