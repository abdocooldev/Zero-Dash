import { cn } from "@/lib/utils";

function PageTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "w-fit text-[2rem] font-bold relative leading-normal mb-10",
        "before:content-[''] before:block before:h-0.75 before:w-30 before:bg-white before:absolute before:-bottom-2 before:left-0",
        "after:content-[''] after:block after:h-0.75 after:w-10 after:bg-black after:absolute after:-bottom-2 after:left-0",
        className,
      )}>
      {children}
    </h1>
  );
}

export default PageTitle;
