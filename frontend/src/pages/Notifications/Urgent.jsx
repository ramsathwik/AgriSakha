import MsgCard from "../../components/MessageCard";
function Urgent() {
  const messages = [
    {
      title: "Market Price Update",
      tag: "Urgent",
      tagColor: "red",
      content:
        "Rice prices increased by ₹200 per quintal in local markets. Good time to plan selling.",
      time: "6 hours ago",
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg, index) => (
        <MsgCard key={index} msg={msg} />
      ))}
    </div>
  );
}
export default Urgent;
