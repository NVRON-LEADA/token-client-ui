import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-black-950 via-purple-00 to-black-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-purple-500 mb-3">LEADA AI</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Empowering smarter decisions through AI-powered insights and analytics.
          </p>
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Features</h3>
          <ul className="space-y-2 text-sm">
            {["ai-analytics", "dashboards", "feedback", "insights"].map((item, idx) => (
              <li key={idx}>
                <Link
                  to={`/features/${item}`}
                  className="text-gray-300 hover:text-purple-400 transition duration-300 hover:underline"
                >
                  {item.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Solutions</h3>
          <ul className="space-y-2 text-sm">
            {["ecommerce", "saas", "enterprise", "startups"].map((item, idx) => (
              <li key={idx}>
                <Link
                  to={`/solutions/${item}`}
                  className="text-gray-300 hover:text-purple-400 transition duration-300 hover:underline"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Company</h3>
          <ul className="space-y-2 text-sm">
            {["about", "contact", "privacy", "terms"].map((item, idx) => (
              <li key={idx}>
                <Link
                  to={`/${item}`}
                  className="text-gray-300 hover:text-purple-400 transition duration-300 hover:underline"
                >
                  {item === "terms" ? "Terms of Service" : item.replace(/\b\w/g, c => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-gray-400 text-sm border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} <span className="text-purple-500 font-semibold">Leada AI</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
