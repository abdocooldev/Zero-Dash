import PageTitle from "@/components/ui/page-title";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useStore from "@/store/useStore";
import { User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AvatarIcon from "boring-avatars";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

function Courses() {
  const courses = useStore((state) => state.courses);
  const users = useStore((state) => state.users);
  return (
    <>
      <PageTitle>Courses</PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {courses.map((course) => {
          const instructor = users.find(
            (user) => user.id == course.instructorId,
          );
          return (
            <Card
              key={course.id}
              className="p-0 pb-4 rounded-xl overflow-hidden gap-4 relative">
              <CardHeader className="p-0 gap-0">
                <img src={course.thumbnail} alt={course.title} />
                {instructor && (
                  <Tooltip>
                    <TooltipTrigger className="absolute top-4 left-4 cursor-pointer">
                      <Avatar className="size-12 xs:size-15 border-white border-2">
                        {instructor.avatar ? (
                          <>
                            <AvatarImage
                              src={instructor.avatar}
                              alt={instructor.name}
                            />
                            <AvatarFallback>
                              {instructor.name.split(" ").length >= 2
                                ? instructor.name.split(" ")[0][0] +
                                  instructor.name.split(" ")[1][0]
                                : instructor.name[0]}
                            </AvatarFallback>
                          </>
                        ) : (
                          <AvatarIcon
                            name={instructor.name}
                            variant="beam"
                            className="aspect-square size-full"
                          />
                        )}
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{instructor.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </CardHeader>
              <CardContent className="px-4 mb-3">
                <CardTitle className="mb-4 text-lg font-bold">
                  {course.title}
                </CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex items-center justify-between mt-auto px-4 border-t relative">
                <Button
                  variant="default"
                  size="sm"
                  className="absolute left-[50%] top-0 -translate-y-1/2 -translate-x-1/2">
                  Course Info
                </Button>
                <span className="text-sm text-muted-foreground flex items-center gap-0.5">
                  <User className="size-4" />
                  {course.students}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-0.5">
                  <span className="font-semibold text-[120%]">
                    {course.currency}
                  </span>
                  {course.price}
                </span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default Courses;
