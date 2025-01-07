import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data
const chartData = [
  { month: "January", sms: 1000, email: 500, whatsapp: 2000 },
  { month: "February", sms: 1200, email: 600, whatsapp: 200 },
  { month: "March", sms: 500, email: 700, whatsapp: 600 },
  { month: "April", sms: 100, email: 800, whatsapp: 3500 },
  { month: "May", sms: 2000, email: 900, whatsapp: 4000 },
  { month: "June", sms: 200, email: 1000, whatsapp: 4500 },
];

// Chart configuration
const chartConfig = {
  sms: {
    label: "SMS",
    color: "hsl(var(--chart-1))",
  },
  email: {
    label: "Email",
    color: "hsl(var(--chart-2))",
  },
  whatsapp: {
    label: "WhatsApp",
    color: "hsl(var(--chart-3))",
  },
};

export function Chart1() {
  return (
    <Card className="w-full h-[500px]">
      <CardHeader>
        <CardTitle>Communication Channels</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="sms"
              type="monotone"
              stroke="var(--color-sms)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="email"
              type="monotone"
              stroke="var(--color-email)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="whatsapp"
              type="monotone"
              stroke="var(--color-whatsapp)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              WhatsApp traffic up by 25% this month{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total communication traffic for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
