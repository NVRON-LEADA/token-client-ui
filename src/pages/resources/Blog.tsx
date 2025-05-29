

const Blog = () => {
  return (
    <section
      className="max-w-5xl mx-auto px-8 py-16 text-white
                 flex flex-col justify-center items-center
                 min-h-[calc(100vh-64px)]"
      style={{ paddingTop: "64px" }}
    >
      <h1 className="text-5xl font-extrabold mb-8 text-indigo-500 text-center">Blog</h1>
      <p className="text-center max-w-3xl mx-auto mb-12 text-gray-300 text-lg leading-relaxed">
        Explore best practices, product updates, AI trends, and industry use cases written by the Leada AI team.
      </p>

      {/* You can add blog post cards or a placeholder here */}
    </section>
  );
};

export default Blog;
