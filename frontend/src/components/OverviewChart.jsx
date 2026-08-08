import React from "react";

const studentData = [110, 160, 250, 300, 350, 470];
const revenueData = [35, 80, 140, 195, 300, 450];

const OverviewChart = () => {
  const max = 500;
  const width = 700;
  const height = 280;

  const points = (data) =>
    data
      .map((value, index) => {
        const x = 40 + (index * (width - 80)) / (data.length - 1);
        const y = height - 30 - (value / max) * (height - 70);
        return `${x},${y}`;
      })
      .join(" ");

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Overview</h2>
          <p className="mt-1 text-xs text-slate-500">
            Students and revenue growth
          </p>
        </div>

        <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-violet-400">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="mb-3 flex items-center justify-center gap-6 text-xs">
        <span className="flex items-center gap-2 text-slate-500">
          <span className="h-2 w-6 rounded-full bg-violet-500" />
          Students
        </span>

        <span className="flex items-center gap-2 text-slate-500">
          <span className="h-2 w-6 rounded-full bg-emerald-500" />
          Revenue
        </span>
      </div>

      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[280px] w-full"
          preserveAspectRatio="none"
        >
          {[0, 100, 200, 300, 400, 500].map((value) => {
            const y = height - 30 - (value / max) * (height - 70);

            return (
              <g key={value}>
                <line
                  x1="40"
                  y1={y}
                  x2={width - 30}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 5"
                />
                <text
                  x="5"
                  y={y + 4}
                  fontSize="11"
                  fill="#94a3b8"
                >
                  {value}
                </text>
              </g>
            );
          })}

          <polyline
            points={points(studentData)}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <polyline
            points={points(revenueData)}
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {studentData.map((_, index) => {
            const x = 40 + (index * (width - 80)) / (studentData.length - 1);

            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={height - 30 - (studentData[index] / max) * (height - 70)}
                  r="4"
                  fill="#8b5cf6"
                />
                <circle
                  cx={x}
                  cy={height - 30 - (revenueData[index] / max) * (height - 70)}
                  r="4"
                  fill="#10b981"
                />
              </g>
            );
          })}

          {["1 May", "7 May", "14 May", "21 May", "28 May", "31 May"].map(
            (label, index) => {
              const x = 40 + (index * (width - 80)) / 5;

              return (
                <text
                  key={label}
                  x={x}
                  y={height - 5}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#94a3b8"
                >
                  {label}
                </text>
              );
            }
          )}
        </svg>
      </div>
    </section>
  );
};

export default OverviewChart;
