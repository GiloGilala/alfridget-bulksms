import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import ActionlessBarChart from "../charts/ActionlessBarChart";

const data = {
  value: 51352,
  percentage: "+12.5%",
  chartData: {
    series: [
      {
        name: "Tasks",
        data: [70, 60, 90, 80, 100, 70, 80],
      },
    ],
    categories: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  },
};

const StatisticsCard2 = ({ className, datas }) => {
  const { value, percentage, chartData } = data;

  return (
    <Card className={cn("h-[230px] flex flex-col justify-between", className)}>
      <div className="p-6 pb-0">
        <div className="flex items-center gap-2 mb-1">
          <h6 className="font-semibold">
            <span className="text-base font-medium text-muted-foreground">
              $
            </span>
            {value}
          </h6>
          <span className="text-xs font-medium text-emerald-500 px-1 py-0.5 rounded-sm bg-card">
            {percentage}
          </span>
        </div>

        <p className="text-sm text-secondary-foreground">Average Daily Sales</p>
      </div>

      <ActionlessBarChart
        height={150}
        colors={["hsl(var(--icon-muted))"]}
        chartSeries={chartData.series}
        chartCategories={chartData.categories}
      />
    </Card>
  );
};

export default StatisticsCard2;
