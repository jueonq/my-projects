import { useState, useEffect, useCallback } from 'react';
import type { Place } from '../data/tokyoPlaces';
import { places as defaultPlaces } from '../data/tokyoPlaces';

export type DayKey = 'day1' | 'day2' | 'day3' | 'day4';

export type Schedule = Record<DayKey, Record<string, string[]>>;

const SCHEDULE_KEY = 'tokyo-planner-schedule';
const CUSTOM_PLACES_KEY = 'tokyo-planner-custom-places';
const HIDDEN_PLACES_KEY = 'tokyo-planner-hidden-places';

export function encodeShareUrl(schedule: Schedule, customPlaces: Place[]): string {
  const payload = { s: schedule, c: customPlaces };
  const json = JSON.stringify(payload);
  const encoded = btoa(encodeURIComponent(json));
  const url = new URL(window.location.href);
  url.hash = '';
  url.search = '';
  url.searchParams.set('share', encoded);
  return url.toString();
}

export function decodeShareParam(): { schedule: Schedule; customPlaces: Place[] } | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('share');
    if (!encoded) return null;
    const json = decodeURIComponent(atob(encoded));
    const payload = JSON.parse(json);
    return { schedule: payload.s, customPlaces: payload.c ?? [] };
  } catch {
    return null;
  }
}

function loadSchedule(): Schedule {
  const fromUrl = decodeShareParam();
  if (fromUrl) return fromUrl.schedule;
  try {
    const raw = localStorage.getItem(SCHEDULE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { day1: {}, day2: {}, day3: {}, day4: {} };
}

function loadCustomPlaces(): Place[] {
  const fromUrl = decodeShareParam();
  if (fromUrl) return fromUrl.customPlaces;
  try {
    const raw = localStorage.getItem(CUSTOM_PLACES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function loadHiddenPlaceIds(): Set<string> {
  try {
    const raw = localStorage.getItem(HIDDEN_PLACES_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
}

export function useScheduleStore() {
  const [schedule, setSchedule] = useState<Schedule>(loadSchedule);
  const [customPlaces, setCustomPlaces] = useState<Place[]>(loadCustomPlaces);
  const [hiddenPlaceIds, setHiddenPlaceIds] = useState<Set<string>>(loadHiddenPlaceIds);
  const [currentDay, setCurrentDay] = useState<DayKey>('day1');

  const allPlaces = [...defaultPlaces, ...customPlaces].filter((p) => !hiddenPlaceIds.has(p.id));

  useEffect(() => {
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem(CUSTOM_PLACES_KEY, JSON.stringify(customPlaces));
  }, [customPlaces]);

  useEffect(() => {
    localStorage.setItem(HIDDEN_PLACES_KEY, JSON.stringify([...hiddenPlaceIds]));
  }, [hiddenPlaceIds]);

  const addToSlot = useCallback((day: DayKey, time: string, placeId: string) => {
    setSchedule((prev) => {
      const daySchedule = prev[day] || {};
      const existing = daySchedule[time] || [];
      if (existing.includes(placeId)) return prev;
      return {
        ...prev,
        [day]: { ...daySchedule, [time]: [...existing, placeId] },
      };
    });
  }, []);

  const removeFromSlot = useCallback((day: DayKey, time: string, placeId: string) => {
    setSchedule((prev) => {
      const daySchedule = prev[day] || {};
      const existing = daySchedule[time] || [];
      const updated = existing.filter((id) => id !== placeId);
      const newDay = { ...daySchedule, [time]: updated };
      if (updated.length === 0) delete newDay[time];
      return { ...prev, [day]: newDay };
    });
  }, []);

  const moveSlot = useCallback((day: DayKey, fromTime: string, toTime: string, placeId: string) => {
    setSchedule((prev) => {
      const daySchedule = prev[day] || {};
      const fromSlot = (daySchedule[fromTime] || []).filter((id) => id !== placeId);
      const toSlot = daySchedule[toTime] || [];
      if (toSlot.includes(placeId)) return prev;
      const newDay = { ...daySchedule, [fromTime]: fromSlot, [toTime]: [...toSlot, placeId] };
      if (fromSlot.length === 0) delete newDay[fromTime];
      return { ...prev, [day]: newDay };
    });
  }, []);

  const addCustomPlace = useCallback((place: Place) => {
    setCustomPlaces((prev) => [...prev, place]);
  }, []);

  const removeCustomPlace = useCallback((id: string) => {
    setCustomPlaces((prev) => prev.filter((p) => p.id !== id));
    setSchedule((prev) => {
      const next = { ...prev };
      (Object.keys(next) as DayKey[]).forEach((day) => {
        const daySchedule = { ...next[day] };
        Object.keys(daySchedule).forEach((time) => {
          daySchedule[time] = daySchedule[time].filter((pid) => pid !== id);
          if (daySchedule[time].length === 0) delete daySchedule[time];
        });
        next[day] = daySchedule;
      });
      return next;
    });
  }, []);

  const deletePlace = useCallback((id: string) => {
    // 커스텀 장소면 완전 삭제, 기본 장소면 hidden 처리
    setCustomPlaces((prev) => {
      if (prev.some((p) => p.id === id)) return prev.filter((p) => p.id !== id);
      return prev;
    });
    setHiddenPlaceIds((prev) => new Set([...prev, id]));
    setSchedule((prev) => {
      const next = { ...prev };
      (Object.keys(next) as DayKey[]).forEach((day) => {
        const daySchedule = { ...next[day] };
        Object.keys(daySchedule).forEach((time) => {
          daySchedule[time] = daySchedule[time].filter((pid) => pid !== id);
          if (daySchedule[time].length === 0) delete daySchedule[time];
        });
        next[day] = daySchedule;
      });
      return next;
    });
  }, []);

  const getScheduledIds = useCallback(
    (day: DayKey) => {
      const daySchedule = schedule[day] || {};
      return new Set(Object.values(daySchedule).flat());
    },
    [schedule],
  );

  const clearDay = useCallback((day: DayKey) => {
    setSchedule((prev) => ({ ...prev, [day]: {} }));
  }, []);

  return {
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
    clearDay,
  };
}
