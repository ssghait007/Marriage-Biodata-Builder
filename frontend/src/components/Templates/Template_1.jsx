import React from 'react';

const Template_1 = () => {
  // Sample data (can be replaced with props)
  const data = {
    name: "Priya Sharma",
    age: 26,
    gender: "Female",
    dob: "22/09/1997",
    religion: "Hindu",
    height: "5'4\"",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl9lL9ZGwPmBXdhQZD6mhGwt9oNWNWiLDhjQ&s",
    fatherName: "Rajesh Sharma",
    motherName: "Meena Sharma",
    siblings: "1 Brother",
    education: "MBA, Delhi University",
    occupation: "Marketing Manager",
    company: "Global Marketing Solutions",
    email: "priya.sharma@example.com",
    phone: "+91 98765 12345"
  };

  return (
    <div className="max-w-1/2 mx-auto my-8 p-1 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg shadow-lg">
      {/* Decorative Border */}
      <div className="relative p-6 bg-white rounded-lg border-2 border-pink-300">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-700 mb-2">Marriage Biodata</h1>
          <div className="h-1 w-24 bg-pink-400 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Photo */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-48 h-60 rounded-lg overflow-hidden border-4 border-pink-200 shadow-md">
              <img 
                src={data.photo} 
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold text-pink-700">{data.name}</h2>
              <p className="text-gray-600">{data.occupation}</p>
              <p className="text-sm text-gray-500">{data.age} years | {data.height}</p>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:w-2/3 space-y-6">
            {/* Personal Details */}
            <Section title="Personal Details">
              <DetailItem label="Date of Birth" value={data.dob} />
              <DetailItem label="Gender" value={data.gender} />
              <DetailItem label="Religion" value={data.religion} />
              <DetailItem label="Height" value={data.height} />
            </Section>

            {/* Family Details */}
            <Section title="Family Details">
              <DetailItem label="Father's Name" value={data.fatherName} />
              <DetailItem label="Mother's Name" value={data.motherName} />
              <DetailItem label="Siblings" value={data.siblings} />
            </Section>

            {/* Education & Career */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Section title="Education">
                <p className="text-gray-700">{data.education}</p>
              </Section>
              <Section title="Career">
                <DetailItem label="Occupation" value={data.occupation} />
                <DetailItem label="Company" value={data.company} />
              </Section>
            </div>

            {/* Contact Details */}
            <Section title="Contact Details">
              <DetailItem label="Email" value={data.email} />
              <DetailItem label="Phone" value={data.phone} />
            </Section>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-2 left-2 right-2 bottom-2 border border-pink-200 rounded pointer-events-none"></div>
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-pink-200 rounded pointer-events-none"></div>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-pink-600 mb-2 border-b border-pink-100 pb-1">{title}</h3>
    <div className="pl-2">
      {children}
    </div>
  </div>
);

// Reusable Detail Item Component
const DetailItem = ({ label, value }) => (
  <div className="mb-2">
    <span className="font-medium text-gray-700">{label}: </span>
    <span className="text-gray-600">{value}</span>
  </div>
);

export default Template_1;
