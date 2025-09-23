import { FaBell } from "../components/icons";
const colorMap = {
  red: "bg-red-200 text-red-700 font-semibold",
  yellow: "bg-yellow-200 text-yellow-700 font-semibold",
  blue: "bg-blue-200 text-blue-700 font-semibold",
  orange: "bg-orange-200 text-orange-700 font-semibold",
  green: "bg-green-200 text-green-700 font-semibold",
};

function MsgCard({ msg: { title, tag, tagColor, content, time } }) {
  const tagClasses = colorMap[tagColor] || "bg-gray-200 text-gray-700";

  return (
    <div className="flex flex-row items-start gap-4 justify-evenly bg-white rounded-xl shadow-lg p-4 mx-2">
      <div>
        <div className="p-4 bg-green-200 rounded-full">
          <FaBell className="text-green-700" />
        </div>
      </div>

      <div>
        <div className="flex gap-3">
          <p className="text-gray-800 font-bold">{title}</p>
          <span className={`px-2 rounded-3xl ${tagClasses}`}>
            <span className="text-xs">{tag}</span>
          </span>
        </div>

        <p className="text-gray-600">{content}</p>
        <p className="text-gray-500 text-xs mt-2">{time}</p>
      </div>
    </div>
  );
}

export default MsgCard;
