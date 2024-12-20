import React from "react";
import Navbar from "./_components/navbar";
import { Toaster } from "sonner";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Toaster />
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
