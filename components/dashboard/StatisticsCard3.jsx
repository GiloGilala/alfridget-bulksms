import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const data = {
  value: 51352,
  percentage: "+12.5%",
  goal: 1500,
  goalProgress: 1125,
  progressValue: 65,
};

const StatisticsCard3 = ({ className }) => {
  const { value, percentage, goal, goalProgress, progressValue } = data;

  return (
    <Card
      className={cn("p-6 h-[230px] flex flex-col justify-between", className)}
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h6 className="font-semibold">
            <span className="text-base font-medium text-muted-foreground">
              $
            </span>
            {value.toLocaleString()}
          </h6>
          <span className="text-xs font-medium text-emerald-500 px-1 py-0.5 rounded-sm bg-card">
            {percentage}
          </span>
        </div>

        <p className="text-sm text-secondary-foreground">Average Daily Sales</p>
      </div>

      <div className="pt-2 pb-3">
        <div className="text-sm flex items-center justify-between mb-2">
          <p className="font-semibold">{goal - goalProgress} to Goal</p>
          <p className="font-medium text-secondary-foreground">
            {((goalProgress / goal) * 100).toFixed(2)}%
          </p>
        </div>

        <Progress
          value={progressValue}
          className="w-full h-2 bg-icon-muted [&>div]:bg-emerald-500"
        />
      </div>
    </Card>
  );
};

export default StatisticsCard3;
