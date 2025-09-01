import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardBox from "./DashboardBox";

interface SalesChartProps {
  bookings?: Array<{
    created_at: string;
    totalPrice: number;
    extrasPrice: number;
  }>;
  numDays?: number;
}

function SalesChart({ bookings = [], numDays = 7 }: SalesChartProps) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = {
    totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
    extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };

  return (
    <DashboardBox data-component="sales-chart" data-variant="grid-full">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800">
            Sales from {format(allDates.at(0)!, "MMM dd yyyy")} &mdash;{" "}
            {format(allDates.at(-1)!, "MMM dd yyyy")}
          </h2>
        </div>

        <ResponsiveContainer height={300} width="100%">
          <AreaChart data={data}>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <YAxis
              unit="$"
              tick={{ fontSize: 12, fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <CartesianGrid strokeDasharray="4" />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.background,
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              dataKey="totalSales"
              type="monotone"
              stroke={colors.totalSales.stroke}
              fill={colors.totalSales.fill}
              strokeWidth={2}
              name="Total sales"
              unit="$"
            />
            <Area
              dataKey="extrasSales"
              type="monotone"
              stroke={colors.extrasSales.stroke}
              fill={colors.extrasSales.fill}
              strokeWidth={2}
              name="Extras sales"
              unit="$"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardBox>
  );
}

export default SalesChart;
