import React from "react";
import Navbar from "./_components/navbar";
import { Toaster } from "sonner";
import ModleProvider from "@/components/providers/model-provider";
import QueryProvider from "@/components/providers/query-provider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <QueryProvider>
        <Toaster />
        <ModleProvider />
        <Navbar />
        {children}
      </QueryProvider>
    </div>
  );
};

export default DashboardLayout;
