function EmergencyModel({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40 overflow-y-auto scroll-smooth">
      <div className="w-full max-w-md bg-white rounded-t-2xl shadow-lg p-4 animate-slideUp">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Emergency Contacts
          </h2>
          <button className="text-gray-500 text-lg font-bold" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Contact Card */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-3">
          <h3 className="font-semibold text-gray-800">
            Seed Certification Office
          </h3>
          <p className="text-green-600 text-sm">Agriculture Department</p>
          <p className="text-gray-600 text-sm">Kerala State</p>
          <p className="text-gray-500 text-xs">
            Specialization: Quality seeds, certification
          </p>
          <p className="text-gray-700 text-sm">+91 9876543215</p>

          <div className="flex gap-3 mt-3">
            <a
              href="tel:+919876543215"
              className="flex-1 bg-green-600 text-white py-2 rounded-lg text-center"
            >
              📞 Call
            </a>
            <a
              href="sms:+919876543215"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-center"
            >
              ✉ SMS
            </a>
          </div>
        </div>

        {/* Office Hours */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-medium text-gray-800">🕒 Office Hours</p>
          <p className="text-sm text-gray-600">
            Monday - Friday: 9:00 AM - 5:00 PM <br />
            Saturday: 9:00 AM - 1:00 PM <br />
            Sunday: Emergency calls only
          </p>
        </div>
      </div>
    </div>
  );
}
export default EmergencyModel;
