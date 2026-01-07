import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
function Layout() {
  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
