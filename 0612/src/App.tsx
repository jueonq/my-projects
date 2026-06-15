import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { PlacePanel } from './components/PlacePanel';
import { ScheduleGrid } from './components/ScheduleGrid';
import { useScheduleStore, encodeShareUrl } from './store/useScheduleStore';
import type { DayKey } from './store/useScheduleStore';
import type { Place } from './data/tokyoPlaces';
import { PlaceCard } from './components/PlaceCard';
import './index.css';

const DAY_LABELS: Record<DayKey, string> = {
  day1: '1일차',
  day2: '2일차',
  day3: '3일차',
  day4: '4일차',
};

export default function App() {
  const {
    schedule,
    allPlaces,
    customPlaces,
    currentDay,
    setCurrentDay,
    addToSlot,
    removeFromSlot,
    moveSlot,
    addCustomPlace,
    removeCustomPlace,
    deletePlace,
    getScheduledIds,
  } = useScheduleStore();

  const [activeDragPlace, setActiveDragPlace] = useState<Place | null>(null);
  const [shareToast, setShareToast] = useState(false);

  const handleShare = () => {
    const url = encodeShareUrl(schedule, customPlaces);
    navigator.clipboard.writeText(url).then(() => {
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { placeId } = event.active.data.current as { placeId: string; fromSlot?: string };
    const place = allPlaces.find((p) => p.id === placeId) ?? null;
    setActiveDragPlace(place);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragPlace(null);
    const { over, active } = event;
    if (!over) return;

    const { placeId, fromSlot } = active.data.current as { placeId: string; fromSlot?: string };
    const { time, day } = over.data.current as { time: string; day: DayKey };

    if (fromSlot) {
      if (fromSlot !== time) {
        moveSlot(day, fromSlot, time, placeId);
      }
    } else {
      addToSlot(day, time, placeId);
    }
  };

  const scheduledIds = getScheduledIds(currentDay);
  const daySchedule = schedule[currentDay] || {};

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-svh w-full bg-[#F5F4F0]">
        {/* 헤더 */}
        <header className="bg-[#F5F4F0] px-4 pt-4 pb-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-1">
            <p className="text-xl font-bold tracking-widest leading-none" style={{ color: '#CA4646' }}>tokyo</p>
            <span style={{ color: '#93C5FD', fontSize: 15 }}>♥</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center justify-center w-9 h-9 border border-stone-300 text-stone-500 bg-transparent"
              style={{ borderRadius: 2 }}
              title="링크 공유"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>
            <div className="relative">
              <select
                value={currentDay}
                onChange={(e) => setCurrentDay(e.target.value as DayKey)}
                className="appearance-none text-[13px] font-semibold border border-stone-300 pl-3 pr-8 py-2 bg-transparent outline-none text-stone-700"
                style={{ borderRadius: 2 }}
              >
                {(Object.keys(DAY_LABELS) as DayKey[]).map((day) => (
                  <option key={day} value={day}>{DAY_LABELS[day]}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </header>

        {/* 공유 토스트 */}
        {shareToast && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-stone-800 text-white text-xs font-medium px-4 py-2.5" style={{ borderRadius: 2 }}>
            링크 복사됐어요
          </div>
        )}

        {/* 장소 패널 */}
        <div className="flex-shrink-0">
          <PlacePanel
            allPlaces={allPlaces}
            scheduledIds={scheduledIds}
            onAddCustom={addCustomPlace}
            onRemoveCustom={removeCustomPlace}
            onDeletePlace={deletePlace}
          />
        </div>

        {/* 시간표 */}
        <ScheduleGrid
          day={currentDay}
          schedule={daySchedule}
          allPlaces={allPlaces}
          onRemove={(time, placeId) => removeFromSlot(currentDay, time, placeId)}
        />
      </div>

      <DragOverlay>
        {activeDragPlace && (
          <div className="w-40 rotate-1">
            <PlaceCard place={activeDragPlace} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
