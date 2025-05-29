import React, { useState } from "react";

const UserFeedback = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    feedback: "",
    rating: 0,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Feedback Submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", feedback: "", rating: 0 });
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen pt-20 px-6 text-white max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-indigo-400 text-center">User Feedback</h1>

      {submitted ? (
        <div className="bg-green-700 p-6 rounded-lg text-center w-full">
          <p className="text-lg font-semibold">Thank you for your feedback! 🙌</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition"
          >
            Submit Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-lg shadow-md w-full">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="rating" className="block mb-2 font-medium">Rating</label>
            <select
              id="rating"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={0} disabled>Select rating</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="feedback" className="block mb-2 font-medium">Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={form.feedback}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Share your thoughts..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </main>
  );
};

export default UserFeedback;
