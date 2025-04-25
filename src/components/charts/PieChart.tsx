
import { PieChart as RechartsPieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

type PieChartProps = {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  height?: number | string;
};

const PieChart = ({ data, height = 300 }: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => (`${value}`)} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
