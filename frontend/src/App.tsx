import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { GripVertical, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const LOCATIONS = [
  { id: "ADM", name: "Administration" },
  { id: "ALQ", name: "Alquist Building" },
  { id: "ART", name: "Art Building" },
  { id: "ASH", name: "Associated Students House" },
  { id: "BBC", name: "Boccardo Business Center" },
  { id: "BT", name: "Business Tower" },
  { id: "CDG", name: "AS Childhood Development Center" },
  { id: "CG", name: "AS Community Garden" },
  { id: "CVA", name: "Campus Village A" },
  { id: "CVB", name: "Campus Village B" },
  { id: "CVC", name: "Campus Village C" },
  { id: "CV2", name: "Campus Village 2" },
  { id: "CP", name: "Central Plant" },
  { id: "CL", name: "Clark Hall" },
  { id: "CRC", name: "Career Center" },
  { id: "CYA", name: "Corporation Yard Offices" },
  { id: "CYB", name: "Corporation Yard Trades Building" },
  { id: "DC", name: "Dining Commons" },
  { id: "KING", name: "Dr. Martin Luther King, Jr. Library" },
  { id: "DMH", name: "Dudley Moorhead Hall" },
  { id: "DH", name: "Duncan Hall" },
  { id: "DBH", name: "Dwight Bentel Hall" },
  { id: "ENG", name: "Engineering" },
  { id: "HT", name: "Hammer Theatre Center" },
  { id: "HB", name: "Health Building" },
  { id: "HGH", name: "Hugh Gillis Hall" },
  { id: "IS", name: "Industrial Studies" },
  { id: "IT", name: "Information Technology" },
  { id: "IRC", name: "Instructional Resource Center" },
  { id: "ISB", name: "Interdisciplinary Sciences Building" },
  { id: "IH", name: "International House" },
  { id: "JWH", name: "Joe West Hall" },
  { id: "MH", name: "MacQuarrie Hall" },
  { id: "MUS", name: "Music Building" },
  { id: "PCUEC", name: "Provident Credit Union Event Center" },
  { id: "SCI", name: "Science Building" },
  { id: "SM", name: "Spartan Memorial" },
  { id: "SPXC", name: "Spartan Complex - Center" },
  { id: "SPXE", name: "Spartan Complex - East" },
  { id: "SRAC", name: "Spartan Recreation & Aquatic Center" },
  { id: "SVP", name: "Spartan Village on the Paseo" },
  { id: "SSC", name: "Student Services Center" },
  { id: "SU", name: "Diaz Compean Student Union" },
  { id: "SWC", name: "Student Wellness Center" },
  { id: "SH", name: "Sweeney Hall" },
  { id: "TH", name: "Tower Hall" },
  { id: "UPD", name: "University Police Department" },
  { id: "WC", name: "Welcome Center" },
  { id: "WSQ", name: "Washington Square Hall" },
  { id: "YUH", name: "Yoshihiro Uchida Hall" },
];

type Location = {
  id: string;
  name: string;
};

type LocationWithUniqueId = Location & { uniqueId: string };

export default function App() {
  const [queue, setQueue] = useState<LocationWithUniqueId[]>([]);

  function addToQueue(location: Location) {
    setQueue([
      ...queue,
      { ...location, uniqueId: `${location.id}-${Date.now()}` },
    ]);
  }

  function removeFromQueue(index: number) {
    setQueue(queue.filter((_, i) => i !== index));
  }

  function onDragEnd(result: DropResult<string>) {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (
      source.droppableId === "locations" &&
      destination.droppableId === "priority-queue"
    ) {
      // Add a location to the queue
      const location = LOCATIONS[source.index];
      const newQueue = [
        ...queue.slice(0, destination.index),
        {
          ...location,
          uniqueId: `${location.id}-${Date.now()}`,
        },
        ...queue.slice(destination.index),
      ];
      setQueue(newQueue);
    } else if (
      source.droppableId === "priority-queue" &&
      destination.droppableId === "priority-queue"
    ) {
      // Re-ordering the priority queue
      const newQueue = Array.from(queue);
      const [reorderedItem] = newQueue.splice(source.index, 1);
      newQueue.splice(destination.index, 0, reorderedItem);
      setQueue(newQueue);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container mx-auto mt-4 p-4">
        <h1 className="text-2xl font-bold mb-4">
          SJSU Shortest Single Source Path (SSSP)
        </h1>

        {/* Buildings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Buildings</h2>
          <p className="text-sm text-gray-600 mb-2">
            Drag a building to the priority queue or click the plus to add it.
          </p>

          <Droppable
            droppableId="locations"
            // Prevent dropping from priority queue to buildings
            isDropDisabled={true}
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-wrap gap-4 p-4 border-2 border-dashed border-gray-200 rounded-lg overflow-x-auto max-h-[300px]"
              >
                {LOCATIONS.map((location, index) => (
                  <Draggable
                    key={location.id}
                    draggableId={location.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center justify-between p-3 bg-white border rounded shadow group"
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.5 : 1,
                        }}
                      >
                        <span className="flex items-center text-sm font-medium text-gray-700">
                          {location.name} ({location.id})
                        </span>
                        <button
                          onClick={() => addToQueue(location)}
                          className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          <PlusCircle className="h-6 w-6" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Priority queue */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Priority Queue</h2>
            <Droppable droppableId="priority-queue">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2 min-h-[400px] max-h-[400px] overflow-y-auto border-2 border-dashed border-gray-200 p-4 rounded-lg"
                >
                  {queue.map((item, index) => (
                    <Draggable
                      key={item.uniqueId}
                      draggableId={item.uniqueId}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center justify-between p-2 bg-white border rounded shadow"
                        >
                          <span className="flex items-center">
                            <span
                              {...provided.dragHandleProps}
                              className="mr-2 cursor-move"
                            >
                              <GripVertical
                                className="h-4 w-4 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                            {item.name}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeFromQueue(index)}
                          >
                            <X className="h-4 w-4 text-red-500 hover:text-red-700" />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="flex items-center mt-4 gap-4">
              <Button onClick={() => alert("hello world")}>Start Search</Button>
              <Button onClick={() => setQueue([])}>Reset</Button>
            </div>
          </div>

          {/* Campus map */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Campus Map</h2>
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <Dialog>
                <DialogTrigger>
                  <img
                    src="/campus_map.jpeg"
                    alt="Campus Map"
                    className="w-full cursor-pointer"
                  />
                </DialogTrigger>

                <DialogContent className="max-w-3xl w-full p-4">
                  <DialogTitle className="text-xl font-semibold mb-2">
                    Campus Map
                  </DialogTitle>
                  <img
                    src="/campus_map.jpeg"
                    alt="Campus Map"
                    className="w-full h-full"
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
