"use client";

import { Device } from "@/db/types/drizzle-relations";
import { ColumnDef } from "@tanstack/react-table";

export const DeviceColumns: ColumnDef<Device>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "lastSeen",
    header: "Last Seen",
  },
];
