"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "July 1st",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 2nd",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 3rd",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 4th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 5th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 6th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 7th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 8th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 9th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 10th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 11th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 12th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 13th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 14th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 15th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 16th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 17th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 18th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 19th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 20th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 21st",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 22nd",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 23rd",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 24th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 25th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 26th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 27th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 28th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 29th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 30th",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "July 31st",
    total: Math.floor(Math.random() * 10),
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <Bar
          dataKey="total"
          fill="#922D79"
          radius={[4, 4, 0, 0]}
          className="fill-[#922D79]"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
