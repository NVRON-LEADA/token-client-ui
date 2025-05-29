import { useState, useEffect } from "react";
import axios from "axios";

const plans = [
  {
    name: "Free",
    price: "₹0",
    features: ["20 Tokens", "Basic Queue Access"],
    tokens: 20,
  },
  {
    name: "Gold",
    price: "₹499/month",
    features: ["Unlimited Tokens", "Priority Queue Access", "Standard Support"],
    tokens: "Unlimited",
  },
  {
    name: "Platinum",
    price: "₹999/month",
    features: ["Unlimited Tokens", "Advanced Analytics", "Priority Support"],
    tokens: "Unlimited",
  },
];

export default function SubscriptionPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubscribe = async (plan: string) => {
    setLoadingPlan(plan);
    setMessage("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setMessage("Please login to subscribe.");
        setLoadingPlan(null);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/subscribe",
        { plan },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || "Subscribed successfully!");
    } catch (err: any) {
      console.error(err);
      const errMsg =
        err.response?.data?.message || "Subscription failed. Please try again.";
      setMessage(errMsg);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-950 via-black to-purple-900 text-gray-100 pt-24 pb-24 font-sans min-h-screen overflow-hidden">
      {/* Purple glowing pulse */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-700 opacity-30 rounded-full blur-3xl animate-pulse top-20 left-1/2 -translate-x-1/2"></div>
      </div>

      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-orange-300 to-purple-500 drop-shadow-md select-none">
          Choose Your Plan
        </h1>

        {message && (
          <div className="mb-8 text-center text-lg text-green-400 font-semibold animate-fade-in">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-black/60 border border-white/30 backdrop-blur-md shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.05] transition-transform duration-300 p-8 flex flex-col w-full max-w-xs"
            >
              <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-md">
                {plan.name}
              </h2>

              <p className="text-2xl font-extrabold text-white mb-6 drop-shadow-sm">
                {plan.price}
              </p>

              <ul className="list-disc list-inside mb-8 space-y-3 text-sm text-gray-200 flex-grow">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="hover:text-purple-200 transition-colors"
                  >
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.name)}
                disabled={loadingPlan === plan.name}
                className={`w-full py-3 rounded-xl shadow font-bold transition-colors duration-200 focus:outline-none focus:ring-4 ${
                  loadingPlan === plan.name
                    ? "bg-purple-200 text-gray-500 cursor-not-allowed"
                    : "bg-purple-400 text-black hover:bg-purple-600 focus:ring-purple-300"
                }`}
              >
                {loadingPlan === plan.name ? "Processing..." : "Subscribe"}
              </button>

              {loadingPlan === plan.name && (
                <p className="text-sm text-purple-300 text-center mt-3 animate-pulse">
                  Processing your subscription...
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-14 text-center text-sm text-gray-400 italic select-none">
          * No hidden fees. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
