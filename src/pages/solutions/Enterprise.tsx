
const Enterprise = () => {
  return (
    <main
      className="max-w-4xl mx-auto px-6 py-8 text-white text-center
                 flex flex-col justify-center items-center
                 min-h-[calc(100vh-64px)]"
      style={{ paddingTop: "64px" }}
    >
      <h1 className="text-4xl font-bold mb-6 text-indigo-400">Enterprise Solutions</h1>

      <section className="mb-8 text-gray-300 text-lg leading-relaxed max-w-2xl">
        <p>
          Our Enterprise Solutions are designed to meet the complex needs of large organizations. We
          provide scalable AI-powered analytics, custom dashboards, and comprehensive support to
          help your business unlock data-driven insights and improve decision-making.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2 text-left w-full max-w-3xl">
        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-500 transition-shadow">
          <h2 className="text-2xl font-semibold mb-3">Custom Integrations</h2>
          <p>
            Seamlessly integrate our AI tools with your existing systems and workflows, tailored to
            your enterprise architecture.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-500 transition-shadow">
          <h2 className="text-2xl font-semibold mb-3">Dedicated Support</h2>
          <p>
            Get 24/7 access to our expert support team with personalized onboarding and ongoing
            assistance.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-500 transition-shadow">
          <h2 className="text-2xl font-semibold mb-3">Advanced Security</h2>
          <p>
            Protect your sensitive data with enterprise-grade encryption, compliance, and
            multi-factor authentication.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-indigo-500 transition-shadow">
          <h2 className="text-2xl font-semibold mb-3">Scalable Analytics</h2>
          <p>
            Analyze massive datasets in real-time to gain actionable insights that drive business
            growth.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Enterprise;
