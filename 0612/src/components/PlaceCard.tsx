import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Place } from '../data/tokyoPlaces';
import { areaConfig } from '../data/tokyoPlaces';

interface Props {
  place: Place;
  onRemove?: () => void;
  draggableId?: string;
  fromSlot?: string;
}

export function PlaceCard({ place, onRemove, draggableId, fromSlot }: Props) {
  const id = draggableId ?? place.id;
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { placeId: place.id, fromSlot },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 999 : undefined,
    borderRadius: 2,
  };

  const areaColor = areaConfig[place.area]?.color ?? '#888';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative bg-white px-3 py-2.5 border select-none touch-none cursor-grab active:cursor-grabbing ${fromSlot ? 'border-black' : 'border-stone-200'}`}
    >
      <div className="flex items-start gap-1.5">
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-stone-800 leading-tight truncate ${fromSlot ? 'text-[15px]' : 'text-[13px]'}`}>{place.name}</p>
          <p className="text-[11px] mt-0.5 font-medium" style={{ color: areaColor }}>
            {place.area}
          </p>
          {place.note && (
            <p className="text-[10px] text-stone-400 mt-0.5 truncate">{place.note}</p>
          )}
        </div>
        {onRemove && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="text-stone-300 hover:text-stone-500 text-base leading-none flex-shrink-0 transition-colors"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
