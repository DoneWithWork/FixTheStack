import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider className="max-h-screen">
      <AppSidebar />
      <div className="w-full min-h-full  flex flex-col">
        <SidebarTrigger />
        <div className="flex-1 px-10 py-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
