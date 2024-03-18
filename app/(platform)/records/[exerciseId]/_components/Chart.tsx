"use client"

import { Record } from '@/types/workout';
import React from 'react';

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
import CustomTooltip from './CustomTooltip';

interface ChartProps {
  records: Record[];
}

const Chart: React.FC<ChartProps> = ({ records }) => {
  const renderLegendText = (value: string) => {
    if (value === "RM") {
      return "1RM";
    };
    
    return value;
  };
  return (
    <ResponsiveContainer width="100%" height="40%">
        <AreaChart
          width={600}
          height={250}
          data={records}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7755F3" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#7755F3" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="workoutedAt" padding={{ left: 2 }}/>
          <YAxis dataKey="RM"  tickFormatter={value => `${value}kg`}
          padding={{ bottom: 0 }}
          />
          <CartesianGrid strokeDasharray="0" vertical={false}/>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" className="left-0" height={40} formatter={renderLegendText}/>
          <Area
            type="monotone"
            dataKey="RM"
            stroke="#7755F3"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
  );
};

export default Chart;