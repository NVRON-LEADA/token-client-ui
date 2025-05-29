
const SaaS = () => {
  return (
    <main
      className="max-w-4xl mx-auto px-6 py-8 text-white text-center
                 flex flex-col justify-center items-center
                 min-h-[calc(100vh-64px)]"
      style={{ paddingTop: "64px" }}
    >
      <h1 className="text-4xl font-bold mb-6 text-indigo-400">SaaS Solutions</h1>

      <section className="mb-8 text-gray-300 text-lg leading-relaxed max-w-2xl">
        <p>
          Our SaaS Solutions empower software companies with AI-driven analytics, seamless user
          feedback integration, and customizable dashboards. Optimize your product and deliver
          exceptional value to your users.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2 text-left w-full max-w-3xl">
        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-500 transition-shadow">
          <h2 className="text-2xl font-semibold mb-3">User Behavior Analytics</h2>
          <p>
            Track user interactions and engagement metrics in real-time to enhance user experience and retention.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-500 transition-shadow">
          <h2 className="text-2xl font-semibold mb-3">Customizable Dashboards</h2>
          <p>
            Design dashboards tailored to your product’s unique KPIs and monitor your SaaS growth effortlessly.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-500 transition-shadow">
          <h2 className="text-2xl font-semibold mb-3">Integrated Feedback</h2>
          <p>
            Collect and analyze user feedback seamlessly to prioritize feature development and improve satisfaction.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-500 transition-shadow">
          <h2 className="text-2xl font-semibold mb-3">Scalable Infrastructure</h2>
          <p>
            Built to grow with your SaaS product, ensuring performance and security as your user base expands.
          </p>
        </div>
      </section>
    </main>
  );
};

export default SaaS;
