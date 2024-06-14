"use client";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  done: number;
}

const IssueChart = ({ open, inProgress, done }: Props) => {
  const data = [
    { name: "Open", value: open },
    { name: "In Progress", value: inProgress },
    { name: "Done", value: done },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={75}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
