"use client";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
} from "recharts";
import moment from "moment";
import { LevelMeasurement } from "@/lib/level";

const darkModeGraphTextColor = "#DBEAFE";
const lightModeGraphTextColor = "#0EA5E9";

interface GraphProps {
  levelData: LevelMeasurement[];
  darkModeEnabled: boolean;
}

const Graph = ({ levelData, darkModeEnabled }: GraphProps) => {
  const domain = [
    levelData[0].measuredAt.getTime(),
    levelData[levelData.length - 1].measuredAt.getTime(),
  ];
  return (
    <ResponsiveContainer minWidth={300} minHeight={600}>
      <AreaChart
        id={"level"}
        width={900}
        height={600}
        data={levelData}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          xAxisId="0"
          type="number"
          domain={domain}
          scale="time"
          tickFormatter={(v, i) => moment(v).format("MMM Do YY")}
          dataKey="measuredAt"
          // tick={{stroke: darkModeEnabled ? "#DBEAFE" : "#DBEAFE"}}
        />
        <YAxis
          type="number"
          domain={[900, 950]}
          // tick={{stroke: darkModeEnabled ? "#DBEAFE" : "#DBEAFE"}}
        />
        <Tooltip
          formatter={(value, name, props) => [`${value} ft.`, "Level"]}
          labelFormatter={(value, props) =>
            moment(value).format("MMM Do YY h:mm:ss a")
          }
          contentStyle={{
            color: darkModeEnabled
              ? darkModeGraphTextColor
              : lightModeGraphTextColor,
            background: darkModeEnabled ? "#1F2937" : "#DBEAFE",
          }}
        />
        <ReferenceLine
          y={915}
          label="Full Pool"
          stroke="blue"
          strokeDasharray="3 3"
        />
        <ReferenceLine
          y={935.47}
          label="Record High (Apr 27, 2011)"
          stroke="orange"
          strokeDasharray="3 3"
        />
        <ReferenceLine
          y={947}
          label="Max Capacity (top of dam)"
          stroke="red"
          strokeDasharray="3 3"
        />

        {/* <Legend /> */}
        <Area
          type="monotone"
          dataKey="level"
          stroke={
            darkModeEnabled ? darkModeGraphTextColor : lightModeGraphTextColor
          }
          name="level"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Graph;
