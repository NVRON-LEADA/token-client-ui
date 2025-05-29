
const faqs = [
  {
    question: "How do I create an account?",
    answer: "Click the Sign Up button on the top right and fill in your details to register.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Go to the Login page and click on 'Forgot Password'. Follow the instructions sent to your email.",
  },
  {
    question: "Where can I find the API documentation?",
    answer: "You can find it in the Documentation section under Resources or visit our docs site directly.",
  },
];

const HelpCenter = () => {
  return (
    <section className="max-w-5xl mx-auto px-8 py-16 text-white">
      <h1 className="text-5xl font-extrabold mb-12 text-indigo-500 text-center">Help Center</h1>
      <p className="text-center max-w-3xl mx-auto mb-16 text-gray-300 text-lg leading-relaxed">
        Need assistance? Browse through our frequently asked questions or contact our support team.
      </p>

      <div className="space-y-8">
        {faqs.map(({ question, answer }, idx) => (
          <div
            key={idx}
            className="bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-indigo-600 transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-indigo-400 mb-3">{question}</h2>
            <p className="text-gray-400 leading-relaxed">{answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-gray-700 pt-12 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-indigo-400">Contact Support</h2>
        <p className="text-gray-300 mb-3">
          If you can't find the answer you're looking for, please reach out to our support team.
        </p>
        <p className="text-indigo-400 font-medium">Email: support@leadaai.com</p>
        <p className="text-indigo-400 font-medium">Phone: +1 (555) 123-4567</p>
      </div>
    </section>
  );
};

export default HelpCenter;
