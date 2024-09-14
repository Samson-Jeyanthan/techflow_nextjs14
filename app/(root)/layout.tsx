import React from "react";
import { LeftSidebar, Navbar } from "@/components/shared";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-light-850_dark-100 relative flex min-h-screen w-full flex-col">
      <Navbar />
      <section className="flex min-h-screen w-full">
        <LeftSidebar />
        {children}
        RightSidebar
      </section>
      <Toaster />
    </main>
  );
};

export default Layout;
