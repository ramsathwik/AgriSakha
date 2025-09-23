import MsgCard from "../../components/MessageCard";
function All() {
  const messages = [
    {
      title: "Market Price Update",
      tag: "Urgent",
      tagColor: "red",
      content:
        "Rice prices increased by ₹200 per quintal in local markets. Good time to plan selling.",
      time: "6 hours ago",
    },
    {
      title: "Weather Alert",
      tag: "Warning",
      tagColor: "yellow",
      content:
        "Heavy rainfall expected tomorrow in your region. Take precautions to protect crops.",
      time: "2 hours ago",
    },
    {
      title: "Government Scheme",
      tag: "Info",
      tagColor: "blue",
      content:
        "New subsidy announced for drip irrigation systems. Apply before 30th September.",
      time: "1 day ago",
    },
    {
      title: "Pest Alert",
      tag: "Critical",
      tagColor: "orange",
      content:
        "Locust infestation reported in nearby districts. Monitor fields closely.",
      time: "4 hours ago",
    },
    {
      title: "Community Event",
      tag: "Notice",
      tagColor: "green",
      content:
        "Farmers' workshop on sustainable practices scheduled for next week in Guntur.",
      time: "3 days ago",
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
export default All;
