import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageTitle from "@/components/ui/page-title";
import useStore from "@/store/useStore";
import { Check, Info, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
function Plans() {
  const plans = useStore((state) => state.plans);
  return (
    <>
      <PageTitle>Plans</PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4">
        {plans.map((plan) => {
          return (
            <Card
              key={plan.id}
              className="p-4 py-8 xs:py-4 rounded-[0px] border relative">
              <CardHeader
                className={`px-4 py-6 text-white flex flex-col items-center border-3 border-white outline-3  ${plan.name == "Free" ? "bg-green-500 outline-green-500" : plan.name == "Basic" ? "bg-blue-500 outline-blue-500" : "bg-yellow-500 outline-yellow-500"}`}>
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <div className="text-[2.5rem] font-medium relative">
                  <span className="text-[60%] absolute top-0 -left-4">
                    {plan.currency}
                  </span>
                  {plan.price.toFixed(2)}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ul>
                  {plan.features.map((feature, i) => {
                    return (
                      <li
                        key={i}
                        className="flex items-center justify-between border-b py-4">
                        <span className="flex items-center gap-2 text-sm sm:text-[1rem]">
                          {feature.availability ? (
                            <Check className="text-green-500 size-5" />
                          ) : (
                            <X className="text-red-500 size-5" />
                          )}{" "}
                          {feature.name}
                        </span>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="size-5 text-gray-500 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{feature.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
              <CardFooter className="p-0">
                <Button
                  className={`w-full text-xl font-bold h-12 ${plan.name == "Free" ? "bg-green-500" : plan.name == "Basic" ? "bg-blue-500" : "bg-yellow-500"}`}>
                  Join
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default Plans;
