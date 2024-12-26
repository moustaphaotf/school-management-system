"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import { SubjectClassForm } from "./subject-class-form";
import { useClasses, useSubjects, useSubjectsClasses } from "@/hooks/api";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Dropdown } from "../ui/dropdown";
import { Skeleton } from "../ui/skeleton";
import { useSubjectClassColumns } from "./subject-class-columns";

export function SubjectClassSettings() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [classId, setClassId] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const columns = useSubjectClassColumns();

  const { data, isLoading } = useSubjectsClasses({
    page,
    limit: 10,
    search: debouncedSearch,
    classId,
    subjectId,
  });

  const {
    data: classes,
    isError: classesError,
  } = useClasses();
  const {
    data: subjects,
    isError: subjectsError,
  } = useSubjects();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Matières par classe</CardTitle>
        <CardDescription>
          Gérez les matières enseignées dans chaque classe et leurs coefficients
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <SubjectClassForm
            trigger={<Button>Ajouter une matière à une classe</Button>}
          />
        </div>
        <div className="flex space-x-4">
          <Input
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {!classesError && classes ? (
            <Dropdown
              options={
                classes?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))!
              }
              clearable={true}
              searchable={false}
              onValueChange={(value) => setClassId(value as string)}
              value={classId}
              placeholder="Classes"
            />
          ) : (
            <Skeleton className="w-32 h-8" />
          )}

          {!subjectsError  && subjects ? (
            <Dropdown
              options={
                subjects?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))!
              }
              clearable={true}
              searchable={false}
              onValueChange={(value) => setSubjectId(value as string)}
              value={subjectId}
              placeholder="Matières"
            />
          ) : (
            <Skeleton className="w-32 h-8" />
          )}
        </div>
        <DataTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          pageCount={Math.ceil((data?.total || 0) / 10)}
          pageIndex={page - 1}
          onPageChange={(newPage) => setPage(newPage + 1)}
        />
      </CardContent>
    </Card>
  );
}
