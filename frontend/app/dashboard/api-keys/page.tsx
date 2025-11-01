import ApiKeys from "@/components/ApiKeys";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function ApiKeysPage() {
  return (
    <div className="h-full bg-[#131313] rounded-md text-gray-100 px-8 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">API Keys</h1>
            <p className="text-gray-400 mt-1">
              Manage and control access to your FixTheStack devices.
            </p>
          </div>
          <Button
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold"
            size={"lg"}
            asChild
          >
            <Link href={"/dashboard/api-keys/new"}>
              <Plus className="h-4 w-4 mr-2" />
              New Key
            </Link>
          </Button>
        </header>

        <Suspense>
          <ApiKeys />
        </Suspense>
      </div>
    </div>
  );
}
