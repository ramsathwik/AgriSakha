import { PiSirenBold } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import ContactCard from "../../components/ContactCard";

function Contacts() {
  const officers = [
    {
      title: "Agricultural Officer - Kochi",
      department: "Kerala Agriculture Department",
      location: "Kochi District",
      specialization: "Crop diseases, soil management",
      phone: "+91 9876543210",
    },
    {
      title: "Agricultural Officer - Thiruvananthapuram",
      department: "Kerala Agriculture Department",
      location: "Thiruvananthapuram District",
      specialization: "Organic farming, pest control",
      phone: "+91 9123456780",
    },
    {
      title: "Agricultural Officer - Ernakulam",
      department: "Kerala Agriculture Department",
      location: "Ernakulam District",
      specialization: "Soil fertility, irrigation management",
      phone: "+91 9988776655",
    },
    {
      title: "Agricultural Officer - Alappuzha",
      department: "Kerala Agriculture Department",
      location: "Alappuzha District",
      specialization: "Rice cultivation, crop rotation",
      phone: "+91 9871122334",
    },
    {
      title: "Agricultural Officer - Thrissur",
      department: "Kerala Agriculture Department",
      location: "Thrissur District",
      specialization: "Horticulture, pest management",
      phone: "+91 9765432109",
    },
  ];

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-lg font-semibold mb-4">Emergency Contacts</h1>

      <div className="bg-red-100 rounded-lg p-4 flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <PiSirenBold className="text-red-600 w-5 h-5" />
          <span className="text-red-600 font-semibold">Emergency Helpline</span>
        </div>

        {/* Description */}
        <p className="text-red-700 text-sm">
          For urgent agricultural emergencies, call the state helpline:
        </p>

        {/* Button */}
        <button className="mt-2 bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 w-fit hover:bg-red-700 transition">
          <FaPhoneAlt />
          <a href="tel:1551">1551 (Toll Free)</a>
        </button>
      </div>
      {officers.map((officer, index) => (
        <ContactCard key={index} officer={officer} />
      ))}
    </div>
  );
}

export default Contacts;
