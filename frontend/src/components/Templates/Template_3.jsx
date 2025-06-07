import React from 'react';
import { FaUser, FaUsers, FaEnvelope, FaPhone, FaVenusMars, FaBirthdayCake, FaCross, FaGlobe, FaRulerVertical, FaWeight } from 'react-icons/fa';
import { FaUserTie, FaUserGraduate, FaBriefcase, FaHome } from 'react-icons/fa';

const biodata = {
    personalDetails: {
        name: "Priya Sharma",
        age: 26,
        gender: "Female",
        dob: "22/09/1997",
        religion: "Hindu",
        nationality: "Indian",
        height: "5'4\"",
        weight: "58 kg",
        photo: "https://via.placeholder.com/150x180"
    },
    familyDetails: {
        fatherName: "Rajesh Sharma",
        motherName: "Meena Sharma",
        siblings: "1 Brother",
        familyType: "Joint Family"
    },
    educationDetails: {
        degree: "Masters in Business Administration",
        university: "Delhi University"
    },
    careerDetails: {
        occupation: "Marketing Manager",
        company: "Global Marketing Solutions",
        salary: "₹9,50,000 PA"
    },
    contactDetails: {
        email: "priya.sharma@example.com",
        phone: "+91 98765 12345"
    }
};

const Template_3 = () => {
    return (
        <div className="relative p-1 max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-beige-50 rounded-lg shadow-xl overflow-hidden">
            {/* Ornamental Border */}
            <div className="absolute inset-0 border-4 border-purple-800 rounded-lg pointer-events-none" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm58-60c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-56 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm56 60c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm14-94c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm-96 0c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4zM10 26c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4zm92 48c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4zm-8-44c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z\' fill=\'%234a1d96\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                backgroundSize: '50px 50px',
                opacity: 0.8
            }}></div>
            
            <div className="relative bg-white p-6 rounded shadow-inner">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Side - Photo */}
                    <div className="md:w-1/3 flex flex-col items-center">
                        <div className="w-48 h-60 rounded-lg overflow-hidden border-4 border-purple-600 shadow-lg">
                            <img 
                                src={biodata.personalDetails.photo} 
                                alt={biodata.personalDetails.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <div className="text-2xl font-bold text-purple-800">{biodata.personalDetails.name}</div>
                            <div className="text-gray-600">{biodata.careerDetails.occupation}</div>
                            <div className="mt-2 text-sm text-gray-500">
                                {biodata.personalDetails.age} years | {biodata.personalDetails.height}
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side - Details */}
                    <div className="md:w-2/3">
                        <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center md:text-left">
                            Marriage Biodata
                        </h1>
                        
                        {/* Personal Details */}
                        <div className="mb-6">
                            <div className="bg-purple-800 text-white px-4 py-2 rounded-t-lg flex items-center">
                                <FaUser className="mr-2" />
                                <h2 className="text-lg font-semibold">Personal Details</h2>
                            </div>
                            <div className="border border-gray-200 p-4 rounded-b-lg">
                                <DetailItem icon={<FaVenusMars />} label="Gender" value={biodata.personalDetails.gender} />
                                <DetailItem icon={<FaBirthdayCake />} label="Date of Birth" value={biodata.personalDetails.dob} />
                                <DetailItem icon={<FaCross />} label="Religion" value={biodata.personalDetails.religion} />
                                <DetailItem icon={<FaGlobe />} label="Nationality" value={biodata.personalDetails.nationality} />
                                <DetailItem icon={<FaRulerVertical />} label="Height" value={biodata.personalDetails.height} />
                                <DetailItem icon={<FaWeight />} label="Weight" value={biodata.personalDetails.weight} />
                            </div>
                        </div>
                        
                        {/* Family Details */}
                        <div className="mb-6">
                            <div className="bg-purple-800 text-white px-4 py-2 rounded-t-lg flex items-center">
                                <FaUsers className="mr-2" />
                                <h2 className="text-lg font-semibold">Family Details</h2>
                            </div>
                            <div className="border border-gray-200 p-4 rounded-b-lg">
                                <DetailItem icon={<FaUserTie />} label="Father's Name" value={biodata.familyDetails.fatherName} />
                                <DetailItem icon={<FaUserTie />} label="Mother's Name" value={biodata.familyDetails.motherName} />
                                <DetailItem icon={<FaUsers />} label="Siblings" value={biodata.familyDetails.siblings} />
                                <DetailItem icon={<FaHome />} label="Family Type" value={biodata.familyDetails.familyType} />
                            </div>
                        </div>
                        
                        {/* Education & Career */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="bg-purple-800 text-white px-4 py-2 rounded-t-lg flex items-center">
                                    <FaUserGraduate className="mr-2" />
                                    <h2 className="text-lg font-semibold">Education</h2>
                                </div>
                                <div className="border border-gray-200 p-4 rounded-b-lg h-full">
                                    <DetailItem label="Degree" value={biodata.educationDetails.degree} />
                                    <DetailItem label="University" value={biodata.educationDetails.university} />
                                </div>
                            </div>
                            <div>
                                <div className="bg-purple-800 text-white px-4 py-2 rounded-t-lg flex items-center">
                                    <FaBriefcase className="mr-2" />
                                    <h2 className="text-lg font-semibold">Career</h2>
                                </div>
                                <div className="border border-gray-200 p-4 rounded-b-lg h-full">
                                    <DetailItem label="Occupation" value={biodata.careerDetails.occupation} />
                                    <DetailItem label="Company" value={biodata.careerDetails.company} />
                                    <DetailItem label="Annual Income" value={biodata.careerDetails.salary} />
                                </div>
                            </div>
                        </div>
                        
                        {/* Contact Details */}
                        <div className="mt-6">
                            <div className="bg-purple-800 text-white px-4 py-2 rounded-t-lg flex items-center">
                                <FaEnvelope className="mr-2" />
                                <h2 className="text-lg font-semibold">Contact Details</h2>
                            </div>
                            <div className="border border-gray-200 p-4 rounded-b-lg">
                                <DetailItem icon={<FaEnvelope />} label="Email" value={biodata.contactDetails.email} />
                                <DetailItem icon={<FaPhone />} label="Phone" value={biodata.contactDetails.phone} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-start py-1">
        {icon && <span className="text-purple-700 mr-2 mt-1">{icon}</span>}
        <div>
            <span className="font-medium text-gray-700">{label}: </span>
            <span className="text-gray-600">{value}</span>
        </div>
    </div>
);

export default Template_3;
