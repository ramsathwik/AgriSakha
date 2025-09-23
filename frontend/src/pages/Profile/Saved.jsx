import SavedTipCard from "../../components/SavedTipCard";
function SavedTips() {
  const cards = [
    {
      title: "Monsoon Preparation",
      period: "June - September",
      image: "/images/monsoon.webp",
      tips: [
        "Ensure proper drainage in fields",
        "Apply preventive fungicide spray",
        "Check and repair bunds",
        "Prepare for heavy rainfall",
      ],
    },
    {
      title: "Crop Care",
      period: "Throughout Growing Season",
      image: "/images/cropcare.webp",
      tips: [
        "Use balanced fertilizers based on soil tests",
        "Irrigate at critical growth stages",
        "Mulch to retain soil moisture",
        "Monitor for nutrient deficiencies",
      ],
    },
    {
      title: "Protection",
      period: "During Pest/Disease Season",
      image: "/images/protection.webp",
      tips: [
        "Regularly inspect for pest infestations",
        "Use bio-pesticides where possible",
        "Avoid overuse of chemicals",
        "Rotate pesticides to prevent resistance",
      ],
    },
    {
      title: "Harvest",
      period: "Maturity Stage",
      image: "/images/harvest.webp",
      tips: [
        "Harvest crops at proper maturity",
        "Dry grains properly before storage",
        "Use clean and dry bags for storage",
        "Store in pest-free warehouses",
      ],
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      {cards.map((card, index) => {
        return <SavedTipCard key={index} card={card} />;
      })}
    </div>
  );
}
export default SavedTips;
