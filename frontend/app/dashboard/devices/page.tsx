import { auth } from "@/auth";
import { DataTable } from "@/components/tables/data-table";
import { DeviceColumns } from "@/components/tables/devices/devices-column";
import { getCachedDevices } from "@/data";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DevicesPage() {
  return (
    <div>
      <Suspense>
        <Table />
      </Suspense>
    </div>
  );
}
async function Table() {
  const session = await auth();
  if (!session?.user?.id) redirect("/api/auth/signin");
  const userId = session.user.id;
  const devices = await getCachedDevices(userId)();

  return <DataTable columns={DeviceColumns} data={devices} />;
}
