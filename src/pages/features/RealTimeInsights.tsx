import  { useState, useEffect } from "react";

const RealTimeInsights = () => {
  const [metrics, setMetrics] = useState({
    activeUsers: 120,
    conversions: 25,
    bounceRate: 34,
    avgSessionDuration: 180,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        activeUsers: Math.max(prev.activeUsers + Math.floor(Math.random() * 10 - 5), 0),
        conversions: prev.conversions + Math.floor(Math.random() * 3),
        bounceRate: Math.min(Math.max(prev.bounceRate + (Math.random() * 4 - 2), 20), 60),
        avgSessionDuration: Math.min(Math.max(prev.avgSessionDuration + Math.floor(Math.random() * 20 - 10), 100), 300),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen pt-20 px-6 text-white max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-indigo-400 text-center">Real-Time Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
        <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Active Users</h2>
          <p className="text-4xl font-bold">{metrics.activeUsers}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Conversions</h2>
          <p className="text-4xl font-bold">{metrics.conversions}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Bounce Rate</h2>
          <p className="text-4xl font-bold">{metrics.bounceRate.toFixed(1)}%</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Avg. Session Duration</h2>
          <p className="text-4xl font-bold">
            {Math.floor(metrics.avgSessionDuration / 60)}m {metrics.avgSessionDuration % 60}s
          </p>
        </div>
      </div>
    </main>
  );
};

export default RealTimeInsights;
