import type { Location } from "@/lib/types";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import LocationItem from "./location-item";

const LOCATIONS: Location[] = [];

export default function LocationList() {
  const [locations, setLocations] = useState<Location[]>(LOCATIONS);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const out: typeof locations = [];
    for (let i = 0; i <= 50; ++i) {
      out.push({
        name: `Building ${i + 1}`,
        abbr: `bldg-${i + 1}`,
        id: i + 1,
      });
    }
    setLocations(out);
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLocations((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="max-w-2xl mx-auto grid gap-2 my-10">
      <h2 className="text-2xl font-bold mb-4">Buildings</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={locations}
          strategy={verticalListSortingStrategy}
        >
          {locations.map((loc) => (
            <LocationItem
              key={loc.id}
              name={loc.name}
              abbr={loc.abbr}
              id={loc.id}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
