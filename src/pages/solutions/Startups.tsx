
const Startups = () => {
  return (
    <main
      className="max-w-4xl mx-auto px-6 py-8 text-white text-center
                 flex flex-col justify-center items-center
                 min-h-[calc(100vh-64px)]"
      style={{ paddingTop: "64px" }}
    >
      <h1 className="text-4xl font-bold mb-6 text-indigo-400">Startups Solutions</h1>

      <section className="mb-8 text-gray-300 text-lg leading-relaxed max-w-2xl">
        <p>
          Our startup-focused solutions are designed to accelerate your growth with AI-powered insights,
          easy-to-use dashboards, and real-time feedback integration, enabling you to make smarter decisions
          and scale quickly.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2 text-left w-full max-w-3xl">
        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-500 transition-shadow">
          <h2 className="text-2xl font-semibold mb-3">Rapid Market Insights</h2>
          <p>
            Gain instant access to AI-driven market analytics to identify trends and customer needs faster.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-500 transition-shadow">
          <h2 className="text-2xl font-semibold mb-3">Flexible Dashboards</h2>
          <p>
            Customize your dashboards to monitor your key startup metrics and pivot quickly based on data.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-500 transition-shadow">
          <h2 className="text-2xl font-semibold mb-3">Integrated User Feedback</h2>
          <p>
            Collect and analyze early user feedback to improve product-market fit and enhance customer satisfaction.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-500 transition-shadow">
          <h2 className="text-2xl font-semibold mb-3">Scalable AI Tools</h2>
          <p>
            Use AI-powered tools designed to grow with your startup, providing automation and insights as you expand.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Startups;
