"use client";
import React from "react";
import { WeightType } from "@/types/workout";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

interface Props {
  weights: WeightType[];
}

const Chart: React.FC<Props> = ({ weights }) => {
  const renderLegendText = (value: string) => {
    if (value === "weight") {
      return "体重";
    } else if (value === "bodyFatPercentage") {
      return "体脂肪率";
    }
    return value;
  };

  return (
    <div className="h-[50svh]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={600}
          height={250}
          data={weights}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7755F3" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7755F3" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#55F3B1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#55F3B1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="measuredAt" />
          <YAxis dataKey="weight" padding={{ bottom: 0 }} />
          <CartesianGrid strokeDasharray="0" vertical={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            className="left-0"
            height={40}
            formatter={renderLegendText}
          />
          <Area
            type="monotone"
            dataKey="weight"
            stroke="#7755F3"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="bodyFatPercentage"
            stroke="#55F3B1"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
