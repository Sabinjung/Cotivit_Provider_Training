import React from "react";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';


const SimplePieChart = ({ data }) => {
  return (
    <PieChart width={600} height={200}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={index} fill={index === data.length-1 ? "#8884d8": "#82ca9d"}  />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
  );
};

export default SimplePieChart;
