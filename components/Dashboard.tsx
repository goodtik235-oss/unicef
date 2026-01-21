
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { SchoolReport } from '../types';
import { COLORS } from '../constants';

interface DashboardProps {
  reports: SchoolReport[];
}

const Dashboard: React.FC<DashboardProps> = ({ reports }) => {
  // Aggregate data for Bar Chart (Category-wise issues)
  const categoryData = reports.reduce((acc: any, report) => {
    const existing = acc.find((item: any) => item.name === report.category);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: report.category, count: 1 });
    }
    return acc;
  }, []);

  // Aggregate data for Pie Chart (Urgency distribution)
  const urgencyData = reports.reduce((acc: any, report) => {
    const existing = acc.find((item: any) => item.name === report.urgency);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: report.urgency, value: 1 });
    }
    return acc;
  }, []);

  const URGENCY_COLORS: any = {
    'Critical': '#ef4444',
    'High': '#f97316',
    'Medium': '#f59e0b',
    'Low': '#10b981'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Category Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Issue Distribution by Category</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill={COLORS.unicefBlue} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Urgency Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Urgency Levels</h3>
        <div className="h-64 flex flex-col md:flex-row items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={urgencyData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {urgencyData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={URGENCY_COLORS[entry.name] || '#ccc'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
