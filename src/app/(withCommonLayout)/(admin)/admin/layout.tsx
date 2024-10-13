import React, { ReactNode } from "react";

import AdminSidebar from "@/src/components/Ul/adminDashbord/AdminSidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="mb-20 md:flex w-full gap-12 md:h-screen mx-auto">
      <div className="md:w-2/5 ">
        <AdminSidebar />
      </div>
      <div className="md:w-4/5 md:mt-0 mt-10 md:overflow-y-auto md:max-h-screen">
        {children}
      </div>
    </main>
  );
};

export default Layout;
