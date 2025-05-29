import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Email/password login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://token-api-0z44.onrender.com/api/clinics/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("clinic", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err: any) {
      setError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user.email) {
        setError("Google account has no email");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://token-api-0z44.onrender.com/api/clinics/google-login?email=${encodeURIComponent(user.email)}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Clinic not found for this Google account");
        setLoading(false);
        return;
      }

      localStorage.setItem("clinic", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 font-sans">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-zinc-900 p-8 rounded-2xl shadow-lg text-white"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center">Clinic Login</h2>

        {error && (
          <div className="bg-red-600 px-3 py-2 rounded mb-4 text-center">{error}</div>
        )}

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <hr className="border-gray-700 mb-4" />

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2 rounded bg-red-600 hover:bg-red-700 font-semibold transition flex items-center justify-center"
        >
          {loading ? "Processing..." : "Sign in with Google"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;