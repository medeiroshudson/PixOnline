"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
        <div className="flex h-screen">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
