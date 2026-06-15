import { useState, useRef } from 'react';
import type { Place, Area } from '../data/tokyoPlaces';
import { areas, areaConfig } from '../data/tokyoPlaces';
import { PlaceCard } from './PlaceCard';
import { AddPlaceModal } from './AddPlaceModal';

interface Props {
  allPlaces: Place[];
  scheduledIds: Set<string>;
  onAddCustom: (place: Place) => void;
  onRemoveCustom: (id: string) => void;
  onDeletePlace: (id: string) => void;
}

export function PlacePanel({ allPlaces, scheduledIds, onAddCustom, onRemoveCustom, onDeletePlace }: Props) {
  const [selectedArea, setSelectedArea] = useState<Area | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [confirmPlace, setConfirmPlace] = useState<Place | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLongPress = (place: Place) => {
    timerRef.current = setTimeout(() => setConfirmPlace(place), 600);
  };

  const cancelLongPress = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };

  const handleDelete = () => {
    if (!confirmPlace) return;
    onDeletePlace(confirmPlace.id);
    setConfirmPlace(null);
  };

  const visible = allPlaces.filter((p) => !scheduledIds.has(p.id));
  const filtered = selectedArea === 'all'
    ? visible
    : visible.filter((p) => p.area === selectedArea);

  return (
    <>
      <div className="bg-[#F5F4F0] border-b border-black">
        {/* 헤더 */}
        <div
          className="flex items-center justify-between px-4 pt-3 pb-2 cursor-pointer"
          onClick={() => setCollapsed((v) => !v)}
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold tracking-widest text-stone-400">places</span>
            <span className="text-[11px] text-stone-300">{filtered.length}</span>
            <span className="text-[10px] text-stone-300">{collapsed ? '▾' : '▴'}</span>
          </div>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
            className="text-[11px] font-semibold tracking-wide border border-stone-300 text-stone-500 px-3 py-1.5 hover:border-stone-400 transition-colors"
            style={{ borderRadius: 2 }}
          >
            +
          </button>
        </div>

        {/* 지역 필터 */}
        {!collapsed && (
          <div className="flex gap-1.5 px-4 pb-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedArea('all')}
              className="flex-shrink-0 text-[11px] px-3 py-1.5 font-semibold tracking-wide transition-all border"
              style={{
                borderRadius: 2,
                background: selectedArea === 'all' ? '#292524' : 'transparent',
                color: selectedArea === 'all' ? '#fff' : '#78716c',
                borderColor: selectedArea === 'all' ? '#292524' : '#e7e5e4',
              }}
            >
              전체
            </button>
            {areas.map((area) => {
              const cfg = areaConfig[area];
              const active = selectedArea === area;
              return (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className="flex-shrink-0 text-[11px] px-3 py-1.5 font-semibold tracking-wide transition-all border"
                  style={{
                    borderRadius: 2,
                    background: active ? cfg.color : 'transparent',
                    color: active ? '#fff' : '#78716c',
                    borderColor: active ? cfg.color : '#e7e5e4',
                  }}
                >
                  {cfg.label}
                </button>
              );
            })}
          </div>
        )}

        {/* 카드 목록 */}
        {!collapsed && (
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
            {filtered.map((place) => (
              <div
                key={place.id}
                className="flex-shrink-0 w-40"
                onTouchStart={() => startLongPress(place)}
                onTouchEnd={cancelLongPress}
                onTouchMove={cancelLongPress}
                onMouseDown={() => startLongPress(place)}
                onMouseUp={cancelLongPress}
                onMouseLeave={cancelLongPress}
              >
                <PlaceCard
                  place={place}
                  onRemove={place.isCustom ? () => onRemoveCustom(place.id) : undefined}
                />
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-[11px] text-stone-400 py-2">
                {visible.length === 0 ? '모든 장소가 일정에 추가됐어요' : '해당 지역 장소가 없어요'}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 삭제 확인 다이얼로그 */}
      {confirmPlace && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ animation: 'fadeIn 0.15s ease' }}
          onClick={() => setConfirmPlace(null)}
        >
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />
          <div
            className="relative bg-white mx-6 w-full max-w-xs px-6 py-6"
            style={{ borderRadius: 2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[16px] font-bold text-stone-800 mb-1 truncate">{confirmPlace.name}</p>
            <p className="text-[12px] text-stone-400 mb-6">목록에서 삭제할까요?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmPlace(null)}
                className="flex-1 py-3 border border-stone-200 text-stone-500 text-sm font-semibold"
                style={{ borderRadius: 2 }}
              >
                아니요
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-stone-800 text-white text-sm font-semibold"
                style={{ borderRadius: 2 }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <AddPlaceModal
          onAdd={onAddCustom}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
