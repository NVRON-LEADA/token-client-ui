import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("https://token-api-0z44.onrender.com/api/clinics/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      setSuccess("Signup successful! You can now login.");
      setLoading(false);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Network error, please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 font-sans">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-zinc-900 p-8 rounded-2xl shadow-lg text-white"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center">Clinic Signup</h2>

        {error && (
          <div className="bg-red-600 px-3 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-600 px-3 py-2 rounded mb-4 text-center">
            {success}
          </div>
        )}

        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded bg-black border border-gray-500 text-white"
          placeholder="Enter your clinic name"
        />

        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded bg-black border border-gray-500 text-white"
          placeholder="Enter your email"
        />

        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-6 px-4 py-2 rounded bg-black border border-gray-500 text-white"
          placeholder="Enter your password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-purple-600 hover:bg-purple-700 font-semibold transition mb-4"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
