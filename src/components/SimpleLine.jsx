import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const SimpleLine = ({data}) => {
  const percentage = 100 - ((4 - 2 - 1) / (4 - 1)) * 100;
  return (
    <LineChart
      width={600}
      height={200}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="#40a9ff" />
          <stop offset={`${percentage}%`} stopColor="#40a9ff" />
          <stop offset={`${percentage}%`} stopColor="#ff4d4f" />
          <stop offset="100%" stopColor="#ff4d4f" />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="value"
        stroke="url(#gradient)"
        fill="#8884d8"
        dot={false}
      />
    </LineChart>
  );
};

export default SimpleLine;
