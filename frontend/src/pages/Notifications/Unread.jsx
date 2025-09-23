import MsgCard from "../../components/MessageCard";
function Unread() {
  const messages = [
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
export default Unread;
