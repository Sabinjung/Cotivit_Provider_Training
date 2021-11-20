import React from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar,Cell } from "recharts";

const SimpleBar = ({ data }) => {
  return (
    <BarChart
      width={600}
      height={200}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={index} fill={index === data.length-1 ? "#8884d8": "#82ca9d"} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default SimpleBar;
