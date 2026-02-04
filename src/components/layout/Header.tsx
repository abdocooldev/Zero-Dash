import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SearchIcon, BadgeCheckIcon, BellIcon, LogOutIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const notificationExamples = [
  {
    id: 1,
    title: "New project created",
    description: "Your project 'Web Dashboard' has been created successfully",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 2,
    title: "Course completed",
    description: "You have completed the React Advanced course",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 3,
    title: "Friend request accepted",
    description: "John Doe accepted your friend request",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
];

function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function Header() {
  return (
    <header className="flex items-center justify-between gap-2 bg-white p-4 shadow-md">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <InputGroup className="hidden md:flex">
          <InputGroupInput
            id="inline-start-input"
            placeholder="Type A Keyword"
          />
          <InputGroupAddon align="inline-start">
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <img
        src="/zero-dash-logo.png"
        alt="Zero Dash Logo"
        className="w-16 md:hidden ml-4 md:ml-0"
        title="Zero Dash"
      />
      <div className="flex items-center gap-2 md:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full relative">
              <span
                className="bg-primary size-2 rounded-full absolute top-1 right-2"
                aria-hidden="true"
              />
              <BellIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-2 py-1.5">
              <h2 className="font-semibold text-sm">Notifications</h2>
            </div>
            <DropdownMenuSeparator />
            {notificationExamples.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start py-3 px-2 cursor-pointer hover:bg-accent">
                <div className="flex items-start justify-between w-full gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {notification.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground mt-2">
                  {formatDate(notification.date)}
                </span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-xs font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <NavLink to="/profile">
                <DropdownMenuItem>
                  <BadgeCheckIcon />
                  Profile
                </DropdownMenuItem>
              </NavLink>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
