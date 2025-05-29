

const CustomDashboards = () => {
  return (
    <main
      className="flex flex-col justify-center items-center min-h-screen pt-20 px-6 text-white"
      style={{ maxWidth: "1120px", margin: "0 auto" }}
    >
      <h1 className="text-4xl font-bold mb-4 text-indigo-400 text-center">Custom Dashboards</h1>
      <p className="text-gray-300 max-w-3xl mb-8 leading-relaxed text-center">
        Build and personalize your dashboards to visualize the data that matters most to your business.
        Use drag-and-drop widgets, customizable charts, and real-time updates to stay on top of your metrics.
      </p>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {/* Example dashboard cards */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-600 transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Sales Overview</h2>
          <p className="text-gray-400">
            Track your sales performance with charts and KPIs updated in real time.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-600 transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">User Engagement</h2>
          <p className="text-gray-400">
            Monitor user activity, session durations, and retention metrics across platforms.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-600 transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">System Health</h2>
          <p className="text-gray-400">
            Keep an eye on your infrastructure uptime, server load, and error rates.
          </p>
        </div>
      </section>
    </main>
  );
};

export default CustomDashboards;
