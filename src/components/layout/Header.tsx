import { SidebarTrigger } from "@/components/ui/sidebar";

function Header() {
  return (
    <header className="flex items-center gap-2 bg-white p-4 shadow-md">
      <SidebarTrigger />
      <span className="text-lg font-semibold">Header</span>
    </header>
  );
}

export default Header;
