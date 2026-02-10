import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import AvatarIcon from "boring-avatars";
import PageTitle from "@/components/ui/page-title";
import useStore from "@/store/useStore";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
function Projects() {
  const projects = useStore((state) => state.projects);
  const users = useStore((state) => state.users);
  return (
    <>
      <PageTitle>Projects</PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="p-4 py-8 xs:py-4 border rounded-xl relative">
            <CardHeader className="mb-2 p-0">
              <span className="text-sm text-muted-foreground absolute top-3 right-3">
                {project.startDate}
              </span>
              <CardTitle className="text-lg font-bold">
                {project.title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mb-8">
                {project.description}
              </CardDescription>
              <AvatarGroup>
                {project.teamMembers.map((memberId) => {
                  const member = users.find((user) => user.id === memberId);
                  if (!member) return null;
                  return (
                    <Tooltip key={member.id}>
                      <TooltipTrigger>
                        <Avatar className="hover:z-10 size-10 cursor-pointer">
                          {member.avatar ? (
                            <>
                              <AvatarImage
                                src={member.avatar}
                                alt={member.name}
                              />
                              <AvatarFallback>
                                {member.name.split(" ")[0][0] +
                                  member.name.split(" ")[1][0]}
                              </AvatarFallback>
                            </>
                          ) : (
                            <AvatarIcon
                              name={member.name}
                              variant="beam"
                              className="aspect-square size-full"
                            />
                          )}
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{member.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </AvatarGroup>
            </CardHeader>
            <CardContent className="flex sm:justify-end flex-wrap gap-2 p-0 py-6 border-y">
              {project.technologies.map((tech, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-[#eee] text-gray-800 text-xs sm:text-sm px-2 rounded-sm">
                  {tech}
                </Badge>
              ))}
            </CardContent>
            <CardFooter className="p-0 flex items-center justify-between">
              <Progress
                value={project.progress}
                className={`w-3/5 sm:w-2/5 ${project.progress === 100 ? "[&>.progress-indicator]:bg-blue-500" : project.progress >= 50 ? "[&>.progress-indicator]:bg-green-500" : "[&>.progress-indicator]:bg-red-500"}`}
              />
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <span className="font-semibold text-[120%]">
                  {project.currency}
                </span>
                {project.budget}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Projects;
