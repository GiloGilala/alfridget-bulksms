{
  /* <div className="grid grid-cols-12 gap-7">
  <StatisticsCard1 className="col-span-12 lg:col-span-3" />
  <StatisticsCard2 className="col-span-12 lg:col-span-3" />
  <StatisticsCard3 className="col-span-12 lg:col-span-3" />
  <Sales className="col-span-12 lg:col-span-8" />
  <CustomerReview className="col-span-12 lg:col-span-4" />
  <CardCTA className="col-span-12 lg:col-span-8" />
  <CardProgress className="col-span-12 lg:col-span-4" />
  <ReturningRate className="col-span-12 lg:col-span-4" />
  <CustomerTransactions className="col-span-12 lg:col-span-8" />
</div>; */
}

import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  return (
    <div className="w-full  py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-8 items-center lg:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">We&apos;re live!</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                This is the start of something!
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Managing a small business today is already tough. Avoid further
                complications by ditching outdated, tedious trade methods. Our
                goal is to streamline SMB trade, making it easier and faster
                than ever.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button size="lg" className="gap-4" variant="outline">
                Jump on a call <PhoneCall className="w-4 h-4" />
              </Button>
              <Button size="lg" className="gap-4">
                Sign up here <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="bg-muted rounded-md aspect-square">
            <Image
              src="/regel.jpeg"
              alt="regel.png Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
