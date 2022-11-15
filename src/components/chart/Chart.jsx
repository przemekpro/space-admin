import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];

export default function Chart() {
  return (
    <div className="chart">
      <div className="chart__title">Last 6 months (spending)</div>
      <ResponsiveContainer width="99%">
        <AreaChart
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          className="chart__diagram"
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#239fde" stopOpacity={0.75} />
              <stop offset="95%" stopColor="#239fde" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chart__grid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#239fde"
            fillOpacity={0.5}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};