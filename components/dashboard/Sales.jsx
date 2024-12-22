import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import BarChart from "../charts/BarChart";

const salesData = {
  chartCategories: ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"],
  chartSeries: [
    {
      name: "Sales",
      data: [28000, 13000, 18000, 22000, 11000, 30000, 20000],
    },
  ],
  chartOptions: {
    height: 320,
    columnRadius: 10,
    columnWidth: "30%",
    colors: ["hsl(var(--icon-muted))", "hsl(var(--primary))"],
  },
};

const Sales = ({ className }) => {
  return (
    <Card className={cn("", className)}>
      <div className="p-6 pb-0 flex items-center justify-between">
        <p className="text-lg font-medium">Sales</p>

        <Button variant="secondary" size="icon" className="w-8 h-8 rounded-md">
          <MoreHorizontal className="w-4 h-4 text-icon" />
        </Button>
      </div>

      <div className="pr-3">
        <BarChart
          height={salesData.chartOptions.height}
          columnRadius={salesData.chartOptions.columnRadius}
          columnWidth={salesData.chartOptions.columnWidth}
          colors={salesData.chartOptions.colors}
          chartCategories={salesData.chartCategories}
          chartSeries={salesData.chartSeries}
        />
      </div>
    </Card>
  );
};

export default Sales;
