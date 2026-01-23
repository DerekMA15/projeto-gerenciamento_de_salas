import React, { createContext, useContext, ReactNode } from "react";
import { useScheduleStorage } from "@/hooks/useScheduleStorage";
import { Room, ScheduleEntry } from "@/data/scheduleData";

interface ScheduleContextType {
  rooms: Room[];
  scheduleEntries: ScheduleEntry[];
  isLoaded: boolean;
  addEntry: (entry: Omit<ScheduleEntry, "id">) => ScheduleEntry;
  updateEntry: (id: string, updates: Partial<ScheduleEntry>) => void;
  deleteEntry: (id: string) => void;
  updateRoom: (id: string, updates: Partial<Room>) => void;
  toggleRoomAvailability: (id: string) => void;
  getEntriesForRoom: (roomId: string) => ScheduleEntry[];
  resetToDefaults: () => void;
}

const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const storage = useScheduleStorage();

  return (
    <ScheduleContext.Provider value={storage}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
};
