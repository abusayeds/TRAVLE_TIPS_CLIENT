import React, { ReactNode } from "react";

import Sideber from "@/src/components/Ul/ProfileSidebar/Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="mb-20 md:flex w-full gap-12 md:h-screen mx-auto">
      <div className="md:w-2/5 ">
        <Sideber />
      </div>
      <div className="md:w-4/5 md:mt-0 mt-10 md:overflow-y-auto md:max-h-screen">
        {children}
      </div>
    </main>
  );
};

export default Layout;
