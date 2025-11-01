import { auth } from "@/auth";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCachedApiKeys } from "@/data";
import { KeyRound } from "lucide-react";
import { redirect } from "next/navigation";
import { ApiKeyColumns } from "./tables/apikeys/apikeys-column";

export default async function ApiKeys() {
  const session = await auth();
  if (!session?.user?.id) redirect("/api/auth/signin");
  const userId = session.user.id;
  const keys = await getCachedApiKeys(userId)();
  return (
    <div>
      {keys.length === 0 ? (
        <Card className="border border-orange-900/30 bg-[#121212] text-center py-12">
          <CardContent>
            <KeyRound className="mx-auto h-10 w-10 text-orange-500 mb-4" />
            <h2 className="text-lg font-medium text-white">No API Keys Yet</h2>
            <p className="text-gray-400 mt-2">
              Generate an API key to start connecting your IoT devices.
            </p>
            <Button className="mt-6 bg-orange-600 hover:bg-orange-500 text-white">
              Create Key
            </Button>
          </CardContent>
        </Card>
      ) : (
        <DataTable columns={ApiKeyColumns} data={keys} />
      )}
    </div>
  );
}
