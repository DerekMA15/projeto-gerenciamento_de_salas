import { useState, useEffect, useCallback } from "react";
import { Room, ScheduleEntry, initialRooms, initialScheduleEntries } from "@/data/scheduleData";

const ROOMS_STORAGE_KEY = "academic-spaces-rooms";
const ENTRIES_STORAGE_KEY = "academic-spaces-entries";

export const useScheduleStorage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [scheduleEntries, setScheduleEntries] = useState<ScheduleEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedRooms = localStorage.getItem(ROOMS_STORAGE_KEY);
    const storedEntries = localStorage.getItem(ENTRIES_STORAGE_KEY);

    if (storedRooms) {
      setRooms(JSON.parse(storedRooms));
    } else {
      setRooms(initialRooms);
      localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(initialRooms));
    }

    if (storedEntries) {
      setScheduleEntries(JSON.parse(storedEntries));
    } else {
      setScheduleEntries(initialScheduleEntries);
      localStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(initialScheduleEntries));
    }

    setIsLoaded(true);
  }, []);

  // Save rooms to localStorage
  const saveRooms = useCallback((newRooms: Room[]) => {
    setRooms(newRooms);
    localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(newRooms));
  }, []);

  // Save entries to localStorage
  const saveEntries = useCallback((newEntries: ScheduleEntry[]) => {
    setScheduleEntries(newEntries);
    localStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(newEntries));
  }, []);

  // CRUD operations for schedule entries
  const addEntry = useCallback((entry: Omit<ScheduleEntry, "id">) => {
    const newEntry: ScheduleEntry = {
      ...entry,
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    const newEntries = [...scheduleEntries, newEntry];
    saveEntries(newEntries);
    return newEntry;
  }, [scheduleEntries, saveEntries]);

  const updateEntry = useCallback((id: string, updates: Partial<ScheduleEntry>) => {
    const newEntries = scheduleEntries.map((entry) =>
      entry.id === id ? { ...entry, ...updates } : entry
    );
    saveEntries(newEntries);
  }, [scheduleEntries, saveEntries]);

  const deleteEntry = useCallback((id: string) => {
    const newEntries = scheduleEntries.filter((entry) => entry.id !== id);
    saveEntries(newEntries);
  }, [scheduleEntries, saveEntries]);

  // Room operations
  const updateRoom = useCallback((id: string, updates: Partial<Room>) => {
    const newRooms = rooms.map((room) =>
      room.id === id ? { ...room, ...updates } : room
    );
    saveRooms(newRooms);
  }, [rooms, saveRooms]);

  const toggleRoomAvailability = useCallback((id: string) => {
    const room = rooms.find((r) => r.id === id);
    if (room) {
      updateRoom(id, { isAvailable: !room.isAvailable });
    }
  }, [rooms, updateRoom]);

  // Get entries for a specific room
  const getEntriesForRoom = useCallback((roomId: string) => {
    return scheduleEntries.filter((entry) => entry.roomId === roomId);
  }, [scheduleEntries]);

  // Reset to initial data
  const resetToDefaults = useCallback(() => {
    saveRooms(initialRooms);
    saveEntries(initialScheduleEntries);
  }, [saveRooms, saveEntries]);

  return {
    rooms,
    scheduleEntries,
    isLoaded,
    addEntry,
    updateEntry,
    deleteEntry,
    updateRoom,
    toggleRoomAvailability,
    getEntriesForRoom,
    resetToDefaults,
  };
};
