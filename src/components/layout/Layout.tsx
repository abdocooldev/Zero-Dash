import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <SidebarProvider>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-5 bg-[#f1f5f9]">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
