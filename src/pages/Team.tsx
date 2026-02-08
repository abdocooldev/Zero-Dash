import PageTitle from "@/components/ui/page-title";
import AvatarIcon from "boring-avatars";
import {
  Avatar as Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import useStore from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
function Team() {
  const users = useStore((state) => state.users);
  return (
    <>
      <PageTitle>Team</PageTitle>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        {users.map((user) => (
          <Card key={user.id} className="mx-auto w-full relative">
            <CardHeader className="absolute top-2 left-2 flex gap-1.5 container px-0">
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full">
                <a href={`tel:${user.phone}`}>
                  <Phone />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full">
                <a href={`mailto:${user.email}`}>
                  <Mail />
                </a>
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center gap-2">
              {user.avatar ? (
                <Avatar className="size-25">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                    className="object-cover object-center"
                  />
                  <AvatarFallback>
                    {user.name.split(" ")[0][0] + user.name.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <AvatarIcon
                  className="size-25"
                  name={user.name}
                  variant="beam"
                />
              )}
              <h2 className="mt-2 text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.jobTitle}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-4 pt-4!">
              <span className="text-xs text-muted-foreground">
                Joined: {user.joinDate}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="xs"
                  className="bg-blue-500 text-white">
                  Profile
                </Button>
                <Button
                  variant="default"
                  size="xs"
                  className="bg-red-500 text-white">
                  Remove
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Team;
