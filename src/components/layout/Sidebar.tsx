import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Settings,
  User,
  FolderOpen,
  BookOpen,
  Users,
  FileText,
  Calendar,
  SearchIcon,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Projects", href: "/projects", icon: FolderOpen },
  { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "Friends", href: "/friends", icon: Users },
  { label: "Files", href: "/files", icon: FileText },
  { label: "Plans", href: "/plans", icon: Calendar },
];

function Sidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <SidebarComponent collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center flex-col gap-2">
          <img
            src="/zero-dash-logo.png"
            alt="Zero Dash Logo"
            className="w-32"
            title="Zero Dash"
          />
          <h1 className="font-semibold text-lg group-data-[state=collapsed]:hidden">
            Zero Dash
          </h1>
          {isMobile && (
            <InputGroup className="mt-3">
              <InputGroupInput
                id="inline-start-input"
                placeholder="Type A Keyword"
              />
              <InputGroupAddon align="inline-start">
                <SearchIcon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}>
                  <NavLink to={item.href} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </SidebarComponent>
  );
}

export default Sidebar;
