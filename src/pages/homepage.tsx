const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-32 bg-gradient-to-br from-purple-900 via-black to-black">
        <h1 className="text-5xl font-bold mb-4">Welcome to LEADA Clinic Portal</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Simplify patient flow and improve clinic efficiency with our AI-powered token management system.
        </p>
        <div className="mt-8">
          <a
            href="signup"
            className="inline-block bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl font-semibold text-white shadow-lg"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 sm:px-10 lg:px-32 bg-black border-t border-gray-700">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Choose LEADA?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-purple-500 transition">
            <h3 className="text-xl font-bold mb-3 text-purple-400">Smart Token System</h3>
            <p className="text-gray-400">
              Automatically manage patient tokens in real-time to reduce wait time and increase satisfaction.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-purple-500 transition">
            <h3 className="text-xl font-bold mb-3 text-purple-400">Live Queue Updates</h3>
            <p className="text-gray-400">
              Keep patients and staff informed with real-time queue updates and smart notifications.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-purple-500 transition">
            <h3 className="text-xl font-bold mb-3 text-purple-400">Analytics Dashboard</h3>
            <p className="text-gray-400">
              Track patient flow, visit duration, and more with intuitive charts and insights.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 sm:px-10 lg:px-32 bg-gradient-to-r from-black via-purple-800 to-black text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Clinic?</h2>
        <p className="text-gray-300 mb-6">
          Join LEADA and experience seamless token-based management today.
        </p>
        <a
          href="signup"
          className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl font-semibold text-white shadow-md"
        >
          Create Your Clinic
        </a>
      </div>
    </div>
  );
};

export default HomePage;
