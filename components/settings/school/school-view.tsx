"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { School } from "@prisma/client";

interface SchoolViewProps {
  data: School;
  onEdit: () => void;
}

export function SchoolView({ data, onEdit }: SchoolViewProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={onEdit}>Modifier</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paramètre</TableHead>
            <TableHead>Valeur</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Nom</TableCell>
            <TableCell>{data.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Adresse</TableCell>
            <TableCell>{data.location}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Description</TableCell>
            <TableCell>{data.bio || "-"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Site web</TableCell>
            <TableCell>
              {data.website ? (
                <a
                  href={data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  {data.website}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Réseaux sociaux</TableCell>
            <TableCell>
              <div className="space-y-1">
                {data.facebook && (
                  <a
                    href={data.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    Facebook
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {data.twitter && (
                  <a
                    href={data.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    Twitter
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {data.instagram && (
                  <a
                    href={data.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    Instagram
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {!data.facebook && !data.twitter && !data.instagram && "-"}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}