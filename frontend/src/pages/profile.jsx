import { AiFillEdit } from "../components/icons";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  FaBookmark,
  FaClock,
  FaPhone,
  FaCog,
  FaCommentDots,
  FaChevronRight,
} from "react-icons/fa";

function Profile() {
  return (
    <div className="h-screen bg-green-50 flex flex-col">
      {/* Fixed Top Bar */}
      <div className="fixed left-0 right-0 top-0 flex justify-between bg-green-600 text-white py-5 px-4 items-center z-50">
        <h1 className="font-semibold text-lg sm:text-xl">Profile</h1>
        <NavLink to="/notifications">
          <AiFillEdit className="text-xl" />
        </NavLink>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 pt-20 pb-16 px-4 overflow-y-auto space-y-4">
        {/* Profile Info Card */}
        <div className="grid grid-cols-2 bg-white shadow-md p-2 rounded-md">
          <div className="col-span-2 p-2 flex items-center justify-start gap-4">
            <div className="bg-green-400 rounded-full p-6">
              <FaUser className="text-lg text-white" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-gray-800 font-bold text-lg">Raj Kumar</p>
              <p className="text-gray-700 text-xs">Kochi, Kerala</p>
              <p className="text-green-400 text-xs">Member since March 2024</p>
            </div>
          </div>
          <div className="flex flex-col items-start ml-4">
            <p className="text-green-500 font-bold text-lg">2.5 acres</p>
            <p className="text-gray-700 text-xs ml-2">Farm Size</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-green-500 font-bold text-lg">3</p>
            <p className="text-gray-700 text-xs">Crop Types</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {/* Saved Tips */}
          <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <FaBookmark className="text-green-600 text-xl" />
              <div>
                <h2 className="text-gray-800 font-semibold text-base">
                  Saved Tips
                </h2>
                <p className="text-gray-600 text-sm">12 farming tips saved</p>
              </div>
            </div>
            <FaChevronRight className="text-gray-400 text-sm" />
          </div>

          {/* Chat History */}
          <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <FaClock className="text-green-600 text-xl" />
              <div>
                <h2 className="text-gray-800 font-semibold text-base">
                  Chat History
                </h2>
                <p className="text-gray-600 text-sm">View past conversations</p>
              </div>
            </div>
            <FaChevronRight className="text-gray-400 text-sm" />
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <FaPhone className="text-green-600 text-xl" />
              <div>
                <h2 className="text-gray-800 font-semibold text-base">
                  Emergency Contacts
                </h2>
                <p className="text-gray-600 text-sm">Agricultural officers</p>
              </div>
            </div>
            <FaChevronRight className="text-gray-400 text-sm" />
          </div>

          {/* Settings */}
          <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <FaCog className="text-green-600 text-xl" />
              <div>
                <h2 className="text-gray-800 font-semibold text-base">
                  Settings
                </h2>
                <p className="text-gray-600 text-sm">Language, notifications</p>
              </div>
            </div>
            <FaChevronRight className="text-gray-400 text-sm" />
          </div>

          {/* Send Feedback */}
          <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <FaCommentDots className="text-green-600 text-xl" />
              <div>
                <h2 className="text-gray-800 font-semibold text-base">
                  Send Feedback
                </h2>
                <p className="text-gray-600 text-sm">Help us improve</p>
              </div>
            </div>
            <FaChevronRight className="text-gray-400 text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
