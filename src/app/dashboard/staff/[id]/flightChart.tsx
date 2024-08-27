"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", flights: 12 },
  { month: "February", flights: 34 },
  { month: "March", flights: 14 },
  { month: "April", flights: 27 },
  { month: "May", flights: 33 },
  { month: "June", flights: 64 },
  { month: "July", flights: 34 },
];

const chartConfig = {
  flights: {
    label: "Flights",
    color: "#922D79",
  },
} satisfies ChartConfig;

export default function StaffOverviewYearly() {
  return (
    <ChartContainer
      config={chartConfig}
    >
      <AreaChart
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
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="flights"
          type="natural"
          fill="#922D79"
          fillOpacity={0.4}
          stroke="#922D79"
        />
      </AreaChart>
    </ChartContainer>
  );
}
