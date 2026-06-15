import { useState } from 'react';
import type { Place, Area, Category } from '../data/tokyoPlaces';
import { areas, categories } from '../data/tokyoPlaces';

interface Props {
  onAdd: (place: Place) => void;
  onClose: () => void;
}

export function AddPlaceModal({ onAdd, onClose }: Props) {
  const [name, setName] = useState('');
  const [area, setArea] = useState<Area>('기타');
  const [category, setCategory] = useState<Category>('음식점');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const place: Place = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      area,
      category,
      subcategory: category,
      rating: 0,
      reviewCount: 0,
      note: note.trim() || undefined,
      tags: [],
      isCustom: true,
    };
    onAdd(place);
    onClose();
  };

  const inputStyle = { borderRadius: 2 };
  const btnStyle = { borderRadius: 2 };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}
      style={{ animation: 'fadeIn 0.22s ease' }}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      <div
        className="relative bg-white w-full max-w-lg p-6 pb-10 border-t border-stone-100"
        style={{ borderRadius: '2px 2px 0 0', animation: 'slideUp 0.28s cubic-bezier(0.32,0.72,0,1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-8 h-0.5 bg-stone-200 rounded-full mx-auto mb-5" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mb-1.5 block">장소명</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="스카이트리 전망대"
              style={inputStyle}
              className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-400 bg-stone-50 text-stone-800 placeholder:text-stone-300"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mb-1.5 block">지역</label>
              <div className="relative">
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value as Area)}
                  style={inputStyle}
                  className="appearance-none w-full border border-stone-200 pl-4 pr-8 py-3 text-sm outline-none focus:border-stone-400 bg-stone-50 text-stone-700"
                >
                  {areas.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mb-1.5 block">분류</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  style={inputStyle}
                  className="appearance-none w-full border border-stone-200 pl-4 pr-8 py-3 text-sm outline-none focus:border-stone-400 bg-stone-50 text-stone-700"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mb-1.5 block">메모 (선택)</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="예약 필수, 월요일 휴무..."
              style={inputStyle}
              className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-400 bg-stone-50 text-stone-800 placeholder:text-stone-300"
            />
          </div>
          <div className="flex gap-2 mt-1">
            <button
              type="button"
              onClick={onClose}
              style={btnStyle}
              className="flex-1 py-3.5 border border-stone-200 text-stone-500 text-sm font-semibold"
            >
              취소
            </button>
            <button
              type="submit"
              style={btnStyle}
              className="flex-1 py-3.5 bg-stone-800 text-white text-sm font-semibold"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
