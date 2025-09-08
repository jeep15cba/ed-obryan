"use client";

const locationData = [
  { name: "Melbourne", flag: "🇦🇺", color: "bg-blue-500" },
  { name: "Perth", flag: "🇦🇺", color: "bg-green-500" },
  { name: "Berlin", flag: "🇩🇪", color: "bg-purple-500" },
  { name: "Lyon", flag: "🇫🇷", color: "bg-yellow-500" },
  { name: "Paris", flag: "🇫🇷", color: "bg-red-500" },
  { name: "London", flag: "🇬🇧", color: "bg-cyan-500" },
  { name: "Davos", flag: "🇨🇭", color: "bg-lime-500" }
];

export default function FellowshipLocationButtons() {
  const handleLocationClick = (locationName: string) => {
    const event = new CustomEvent('fellowshipLocationClick', { 
      detail: { locationName } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Quick Access to Fellowship Locations
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {locationData.map((location) => (
          <button
            key={location.name}
            className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-center group"
            onClick={() => handleLocationClick(location.name)}
          >
            <div className={`w-4 h-4 rounded-full ${location.color} mx-auto mb-2`}></div>
            <div className="text-2xl mb-1">{location.flag}</div>
            <div className="text-xs font-medium text-gray-700 group-hover:text-blue-600">
              {location.name}
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 text-center mt-4">
        Click any location button to view fellowship details, or interact directly with the globe above.
      </p>
    </div>
  );
}