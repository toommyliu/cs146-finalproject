import { Button } from "@/components/ui/button";

export default function App() {
  // Dynamic array of options
  const options = [
    { id: 1, label: "ADM Administration" },
    { id: 2, label: "DC Dining Commons" },
    { id: 3, label: "SCI Science Building" },
    { id: 4, label: "KING MLK Library" },
    { id: 5, label: "SPM Spartan Memorial" },
    { id: 6, label: "ART Art Building" },
    { id: 7, label: "DMH Dudley Moorhead Hall" },
    { id: 8, label: "SPXC Spartan Complex-Center" },
    { id: 9, label: "ASH Associated Students" },
    { id: 10, label: "DH Duncan Hall" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Button>hello world</Button>
        <img src="/campus_map.jpeg" alt="campus map" width={600} height={300} />
      </div>

      {/* Box at the bottom of the main */}
      <div className="bg-gray-100 p-4 mt-8">
        <div className="grid grid-cols-4 gap-4 justify-items-center">
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`option-${option.id}`}
                name="options"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={`option-${option.id}`}
                className="text-sm font-medium text-gray-700"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
