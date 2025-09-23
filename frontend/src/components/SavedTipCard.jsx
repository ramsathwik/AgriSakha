import { IoChatbox, FaBookmark } from "../components/icons";
import { AiFillDelete } from "react-icons/ai";
function SavedTipCard({ card: { title, period, image, tips } }) {
  return (
    <div className="bg-white rounded-md shadow overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <img
          src="/images/monsoon.webp"
          alt="Monsoon Preparation"
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-2 text-white">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm">{period}</p>
        </div>
      </div>

      {/* Tips List */}
      <ul className="p-4 space-y-2 text-gray-800 text-sm">
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>

      {/* Action Buttons */}
      <div className="flex justify-between px-4 pb-4">
        <button className="border border-green-600 text-green-700 px-4 py-2 rounded">
          <div className="flex items-center gap-1">
            <IoChatbox className="text-lg" />
            Read More
          </div>
        </button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded">
          <div className="flex items-center gap-1">
            <AiFillDelete className="text-lg" />
            Delete
          </div>
        </button>
      </div>
    </div>
  );
}

export default SavedTipCard;
