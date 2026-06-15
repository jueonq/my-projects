import { useDroppable } from '@dnd-kit/core';
import type { Place } from '../data/tokyoPlaces';
import type { DayKey } from '../store/useScheduleStore';
import { PlaceCard } from './PlaceCard';

const START_HOUR = 6;
const END_HOUR = 24;

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = START_HOUR; h < END_HOUR; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

interface SlotProps {
  time: string;
  day: DayKey;
  places: Place[];
  onRemove: (placeId: string) => void;
}

function TimeSlotRow({ time, day, places, onRemove }: SlotProps) {
  const id = `slot:${day}:${time}`;
  const { setNodeRef, isOver } = useDroppable({ id, data: { time, day } });

  const isHour = time.endsWith(':00');
  const isFirst = time === '06:00';
  const hasCards = places.length > 0;

  return (
    <div className="flex">
      {/* 시간 레이블 */}
      <div className={`w-14 flex-shrink-0 flex items-start justify-end pr-3 ${hasCards || isHour ? 'pt-2' : ''}`}>
        {isHour ? (
          <span className="text-[10px] font-medium tracking-wide" style={{ color: '#292524' }}>{time}</span>
        ) : null}
      </div>

      {/* 구분선 */}
      <div className="w-px flex-shrink-0 self-stretch" style={{ background: '#292524' }} />

      {/* 드롭존 */}
      <div
        ref={setNodeRef}
        className={`flex-1 px-2 flex flex-col gap-2 transition-colors ${
          isOver ? 'bg-stone-50' : ''
        }`}
        style={{
          paddingTop: hasCards ? 8 : (isOver ? 8 : 0),
          paddingBottom: hasCards ? 8 : (isOver ? 8 : 0),
          minHeight: isOver ? 48 : (hasCards ? undefined : 0),
          ...(isHour && !isFirst ? {
            backgroundImage: 'repeating-linear-gradient(to right, #292524 0px, #292524 6px, transparent 6px, transparent 10px)',
            backgroundSize: '100% 1px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top',
          } : {}),
        }}
      >
        {places.map((place) => (
          <PlaceCard
            key={`${place.id}-${time}`}
            place={place}
            draggableId={`scheduled:${day}:${time}:${place.id}`}
            fromSlot={time}
            onRemove={() => onRemove(place.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface Props {
  day: DayKey;
  schedule: Record<string, string[]>;
  allPlaces: Place[];
  onRemove: (time: string, placeId: string) => void;
}

export function ScheduleGrid({ day, schedule, allPlaces, onRemove }: Props) {
  const placeMap = Object.fromEntries(allPlaces.map((p) => [p.id, p]));

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {TIME_SLOTS.map((time) => {
        const ids = schedule[time] || [];
        const slotPlaces = ids.map((id) => placeMap[id]).filter(Boolean) as Place[];
        return (
          <TimeSlotRow
            key={time}
            time={time}
            day={day}
            places={slotPlaces}
            onRemove={(placeId) => onRemove(time, placeId)}
          />
        );
      })}
      {/* 하단 여백 */}
      <div className="h-12" />
    </div>
  );
}
