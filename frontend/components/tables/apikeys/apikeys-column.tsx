"use client";

import { Badge } from "@/components/ui/badge";
import { ApiKey } from "@/db/types/drizzle-relations";
import { ColumnDef } from "@tanstack/react-table";
import { KeyRound } from "lucide-react";

export const ApiKeyColumns: ColumnDef<ApiKey>[] = [
  {
    accessorKey: "label",
    header: "Label",
    cell: ({ row }) => {
      const label = row.getValue("label") as string;
      const createdAt = row.original.created_at;

      return (
        <div className="flex flex-col">
          <span className="text-white font-medium flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-orange-500" />
            {label}
          </span>
          <span className="text-gray-400 text-xs">
            Created {new Date(createdAt).toDateString() ?? "—"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;

      const variant =
        type === "full_access"
          ? "bg-orange-600/20 text-orange-400 border border-orange-800/40"
          : "bg-gray-700/40 text-gray-300 border border-gray-700/50";

      return (
        <Badge
          className={`capitalize px-3 py-1 rounded-md text-sm font-medium ${variant}`}
        >
          {type.replace("_", " ")}
        </Badge>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = (row.getValue("status") as string) ?? "active";
      const color =
        status === "revoked"
          ? "bg-red-900/30 text-red-400 border border-red-800/40"
          : "bg-green-900/20 text-green-400 border border-green-800/30";

      return (
        <Badge className={`px-3 py-1 rounded-md text-sm font-medium ${color}`}>
          {status}
        </Badge>
      );
    },
  },
];
