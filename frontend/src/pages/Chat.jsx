import { IoMdCamera } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Chat() {
  let [suggestions, setSuggesions] = useState([]);
  let location = useLocation();
  useEffect(() => {
    setSuggesions(location.state);
  }, [suggestions]);

  return (
    <div className="flex flex-col h-screen bg-green-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 flex justify-between bg-green-600 text-white py-5 px-4 items-center z-50">
        <h1 className="font-bold text-lg">Ai Assistant</h1>
      </div>

      {/* Scrollable Chat Area */}
      <div className="flex-1 pt-20 pb-36 px-3 overflow-y-auto scroll-smooth flex flex-col space-y-2 ">
        {suggestions.map((suggestion, i) => (
          <div
            key={i}
            className="w-fit bg-white px-4 py-2 rounded-full border border-green-200 text-green-700 cursor-pointer shadow-sm hover:bg-green-50 self-start"
          >
            {suggestion}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="fixed left-0 right-0 bottom-14 px-3 py-2 bg-white border-t flex items-center space-x-2 z-10">
        {/* Camera Button */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 flex-shrink-0">
          <IoMdCamera className="text-orange-500 text-lg" />
        </button>

        {/* Input Box */}
        <input
          type="text"
          placeholder="Ask about farming..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-100 outline-none text-sm"
        />

        {/* Send Button */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 flex-shrink-0">
          <IoSend className="text-gray-500 text-lg" />
        </button>
      </div>
    </div>
  );
}

export default Chat;
