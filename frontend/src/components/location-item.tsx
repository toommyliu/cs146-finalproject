import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Location } from "@/lib/types";

type LocationItemProps = Location;

export default function LocationItem({ name, id }: LocationItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-blue-200 p-4 rounded shadow-md flex justify-between"
    >
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{id}</p>
      </div>
    </div>
  );
}
