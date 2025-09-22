import { FaCamera, IoChatbox, RiPlantFill, FaLeaf } from "../components/icons";
import { Sprout } from "lucide-react";

function Camera() {
  return (
    <div className="h-screen bg-green-50 flex flex-col">
      {/* Header */}
      <div className="fixed left-0 right-0 top-0 z-50 flex justify-between bg-green-600 text-white py-4 items-center px-4 font-semibold text-lg">
        <h1>Crop Analysis</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 mt-20 mb-16 px-4 overflow-y-scroll scroll-smooth space-y-6 pb-4">
        {/* Upload Crop Photo Section */}
        <div className="flex flex-col items-center bg-white shadow-lg rounded-md p-6 text-center">
          <div className="p-6 rounded-full bg-green-600 mb-4">
            <FaCamera className="text-white text-2xl" />
          </div>
          <h2 className="text-lg font-semibold mb-1">Upload Crop Photo</h2>
          <p className="text-sm text-gray-700 mb-6">
            Take a clear photo of your crop for instant AI analysis
          </p>
          <div className="w-full space-y-3">
            <button className="flex items-center justify-center w-full bg-green-600 text-white py-2 px-4 rounded shadow">
              <FaCamera className="mr-2" />
              Take Photo / Upload
            </button>
            <button className="flex items-center justify-center w-full border border-green-600 text-green-700 py-2 px-4 rounded">
              <IoChatbox className="mr-2" />
              Ask Question Instead
            </button>
          </div>
        </div>

        {/* Photo Tips Section */}
        <div className="bg-white p-4 rounded-md shadow text-gray-800 text-base font-medium">
          <p className="mb-2">
            📷 <span className="font-semibold">Photo Tips</span>
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Take photo in good lighting</li>
            <li>Focus on affected area if any</li>
            <li>Include leaves and stems</li>
            <li>Avoid blurry images</li>
          </ul>
        </div>

        {/* Crop Selection Section */}
        <div className="bg-green-200 shadow-lg bg-opacity-5 p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Or Select Your Crop
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center bg-white rounded-md p-4 shadow-md">
              <div className="bg-orange-200 p-2 rounded-md ">
                <Sprout className="text-orange-500" />
              </div>
              <p className="text-sm font-medium">Rice</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-md p-4 shadow-md">
              <div className="bg-green-200 p-3 rounded-md ">
                <RiPlantFill className="text-green-500" />
              </div>
              <p className="text-sm font-medium">Coconut</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-md p-4 shadow-md">
              <div className="bg-green-200 p-3 rounded-md ">
                <FaLeaf className="text-green-500" />
              </div>
              <p className="text-sm font-medium">Pepper</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-md p-4 shadow-md">
              <div className="bg-orange-200 p-3 rounded-md ">
                <RiPlantFill className="text-orange-500 " />
              </div>
              <p className="text-sm font-medium">Bananna</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-md p-4 shadow-md">
              <div className="bg-violet-200 p-2 rounded-md ">
                <Sprout className="text-violet-500" />
              </div>
              <p className="text-sm font-medium">Cardamom</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-md p-4 shadow-md">
              <div className="bg-gray-200 p-3 rounded-md ">
                <RiPlantFill className="text-gray-500" />
              </div>
              <p className="text-sm font-medium">Rubber</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navbar (already implemented elsewhere) */}
      {/* Just make sure your navbar uses: `fixed bottom-0 left-0 right-0 z-50` */}
    </div>
  );
}

export default Camera;
