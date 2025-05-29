// src/components/InfoSection.tsx
type InfoSectionProps = {
  title: string;
  description: string;
};

const InfoSection = ({ title, description }: InfoSectionProps) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg text-white shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-indigo-400">{title}</h1>
      <p className="text-lg leading-relaxed">{description}</p>
    </div>
  );
};

export default InfoSection;
