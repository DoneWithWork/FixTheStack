import { ApiKeyForm } from "@/components/forms/ApiKeyForm";

export default function NewApiKeyPage() {
  return (
    <div className="h-full bg-[#131313] rounded-md text-gray-100 px-8 py-10 ">
      <div className="max-w-6xl mx-auto space-y-8 flex flex-col h-full">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              Create API Keys
            </h1>
            <p className="text-gray-400 mt-1">
              Manage and control access to your FixTheStack devices.
            </p>
          </div>
        </header>
        <div className="flex-1">
          <ApiKeyForm />
        </div>
      </div>
    </div>
  );
}
