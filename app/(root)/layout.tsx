import Navbar from "@/components/shared/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-light-800_dark-100 relative flex min-h-screen w-full flex-col">
      <Navbar />
      <section>
        LeftSidebar
        {children}
        RightSidebar
      </section>
      Toaster
    </main>
  );
};

export default Layout;
