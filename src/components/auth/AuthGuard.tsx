"use client";

import { useAuth } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isInitialized, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isInitialized, isLoading, router]);

  if (!isInitialized || isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const { user, isInitialized, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isInitialized, isLoading, router]);

  if (!isInitialized || isLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
