import { RiPlantFill } from "../components/icons";
import TipsNav from "../components/TipsNav";

import { Outlet } from "react-router-dom";
function Tips() {
  return (
    <div className="h-screen bg-green-50 flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-green-600 text-white py-4 px-4 font-semibold text-lg">
        <h1>Farming Tips</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 mt-16 mb-16 px-4 overflow-y-scroll space-y-6 pb-4 scroll-smooth">
        {/* General Farming Card */}
        <div className="bg-white rounded-md shadow p-4 flex items-center space-x-4">
          <div className="bg-green-100 p-4 rounded-full">
            <RiPlantFill className="text-green-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-800">
              General Farming
            </h2>
            <p className="text-sm text-gray-600">
              Personalized tips for your crop.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <TipsNav></TipsNav>

        {/* Monsoon Preparation Section */}
        <Outlet />
      </div>

      {/* Your fixed bottom navbar is assumed to be already implemented */}
    </div>
  );
}

export default Tips;
