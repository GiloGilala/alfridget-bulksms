import React from "react";
import { cn } from "@/lib/utils";
import { MoreHorizontal, SnowflakeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import LineChart from "@/components/charts/LineChart";

const ReturningRateData = {
  chartSeries: [
    { name: "Returning", data: [20, 150, 75, 150, 300, 400] },
    { name: "New", data: [0, 250, 100, 17, 122, 18] },
  ],
  chartCategories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  visitors: [
    {
      id: 1,
      Icon: SnowflakeIcon,
      title: "Dribbble",
      category: "Community",
      rate: 70,
      visit: 12350,
      chart: {
        series: [{ name: "Tasks", data: [0, 30, 16, 70, 26, 30, 12] }],
      },
    },
    {
      id: 2,
      Icon: SnowflakeIcon,
      title: "Linked In",
      category: "Social Media",
      rate: 60,
      visit: 10275,
      chart: {
        series: [{ name: "Tasks", data: [0, 30, 16, 70, 26, 30, 12] }],
      },
    },
    {
      id: 3,
      Icon: SnowflakeIcon,
      title: "Twitter",
      category: "Social Media",
      rate: 50,
      visit: 20348,
      chart: {
        series: [{ name: "Tasks", data: [0, 30, 16, 70, 26, 30, 12] }],
      },
    },
  ],
};

const ReturningRate = ({ className, ...props }) => {
  return (
    <div
      className={cn("shadow border border-border rounded-2xl", className)}
      {...props}
    >
      <div className="p-6 pb-2 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h6 className="font-semibold">50.56%</h6>
            <span className="text-xs font-medium text-emerald-500 px-1 py-0.5 rounded-sm bg-card">
              +2.5%
            </span>
          </div>
          <p className="text-sm text-secondary-foreground">Returning Rate</p>
        </div>

        <Button variant="secondary" size="icon" className="w-8 h-8">
          <MoreHorizontal className="w-4 h-4 text-icon" />
        </Button>
      </div>

      {/* <div className="pl-1 pr-3 relative mt-10">
        <h6>Visitors:</h6>
        {ReturningRateData.visitors.map((visitor) => (
          <div key={visitor.id}>
            <h6>{visitor.title}</h6>
            <p>Category: {visitor.category}</p>
            <p>Rate: {visitor.rate}%</p>
            <p>Visits: {visitor.visit}</p>
          </div>
        ))}
      </div> */}

      <div className="pl-1 pr-3 relative mt-10">
        <p className="absolute top-1.5 left-6 text-sm font-medium text-secondary-foreground">
          Customers
        </p>

        <LineChart
          height={300}
          legendHorizontalPosition="right"
          colors={["hsl(var(--icon-active))", "hsl(var(--icon-muted))"]}
          gridColor={"hsl(var(--border))"}
          chartCategories={ReturningRateData.chartCategories}
          chartSeries={ReturningRateData.chartSeries}
        />
      </div>
    </div>
  );
};

export default ReturningRate;
