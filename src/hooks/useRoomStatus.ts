import { useState, useEffect, useMemo } from "react";
import { Room, ScheduleEntry, timeSlots } from "@/data/scheduleData";

export type RoomStatusType = "available" | "occupied" | "unavailable";

export interface RoomStatus {
  status: RoomStatusType;
  currentEntry: ScheduleEntry | null;
  nextEntry: ScheduleEntry | null;
  timeUntilNextEntry: number | null; // in minutes
  timeUntilFree: number | null; // in minutes
  occupiedSeats: number;
}

const getDayName = (date: Date): string => {
  const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  return days[date.getDay()];
};

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const getCurrentTimeInMinutes = (date: Date): number => {
  return date.getHours() * 60 + date.getMinutes();
};

// Operating hours: 07:30 - 22:15
const OPERATING_START = timeToMinutes("07:30");
const OPERATING_END = timeToMinutes("22:15");

export const formatTimeRemaining = (minutes: number | null): string => {
  if (minutes === null) return "";
  if (minutes < 1) return "Agora";
  if (minutes < 60) return `${Math.floor(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
};

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
};

export const useRoomStatus = (
  room: Room,
  entries: ScheduleEntry[],
  currentTime: Date
): RoomStatus => {
  return useMemo(() => {
    // Check if room is manually marked as unavailable
    if (!room.isAvailable) {
      return {
        status: "unavailable",
        currentEntry: null,
        nextEntry: null,
        timeUntilNextEntry: null,
        timeUntilFree: null,
        occupiedSeats: 0,
      };
    }

    const dayName = getDayName(currentTime);
    const currentMinutes = getCurrentTimeInMinutes(currentTime);

    // Check if outside operating hours
    if (currentMinutes < OPERATING_START || currentMinutes > OPERATING_END) {
      return {
        status: "unavailable",
        currentEntry: null,
        nextEntry: null,
        timeUntilNextEntry: null,
        timeUntilFree: null,
        occupiedSeats: 0,
      };
    }

    // Filter entries for this room and today
    const todayEntries = entries
      .filter((entry) => entry.roomId === room.id && entry.day === dayName)
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    // Check if currently in a class
    const currentEntry = todayEntries.find((entry) => {
      const startMinutes = timeToMinutes(entry.startTime);
      const endMinutes = timeToMinutes(entry.endTime);
      return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    });

    // Find next class
    const nextEntry = todayEntries.find((entry) => {
      const startMinutes = timeToMinutes(entry.startTime);
      return startMinutes > currentMinutes;
    });

    // Calculate time until next class
    const timeUntilNextEntry = nextEntry
      ? timeToMinutes(nextEntry.startTime) - currentMinutes
      : null;

    // Calculate time until current class ends
    const timeUntilFree = currentEntry
      ? timeToMinutes(currentEntry.endTime) - currentMinutes
      : null;

    return {
      status: currentEntry ? "occupied" : "available",
      currentEntry: currentEntry || null,
      nextEntry: nextEntry || null,
      timeUntilNextEntry,
      timeUntilFree,
      occupiedSeats: currentEntry?.occupiedSeats || 0,
    };
  }, [room, entries, currentTime]);
};

export const getRoomStatusForAllRooms = (
  rooms: Room[],
  entries: ScheduleEntry[],
  currentTime: Date
): Map<string, RoomStatus> => {
  const statusMap = new Map<string, RoomStatus>();
  const dayName = getDayName(currentTime);
  const currentMinutes = getCurrentTimeInMinutes(currentTime);
  const isOutsideOperatingHours = currentMinutes < OPERATING_START || currentMinutes > OPERATING_END;

  rooms.forEach((room) => {
    if (!room.isAvailable || isOutsideOperatingHours) {
      statusMap.set(room.id, {
        status: "unavailable",
        currentEntry: null,
        nextEntry: null,
        timeUntilNextEntry: null,
        timeUntilFree: null,
        occupiedSeats: 0,
      });
      return;
    }

    const todayEntries = entries
      .filter((entry) => entry.roomId === room.id && entry.day === dayName)
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    const currentEntry = todayEntries.find((entry) => {
      const startMinutes = timeToMinutes(entry.startTime);
      const endMinutes = timeToMinutes(entry.endTime);
      return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    });

    const nextEntry = todayEntries.find((entry) => {
      const startMinutes = timeToMinutes(entry.startTime);
      return startMinutes > currentMinutes;
    });

    const timeUntilNextEntry = nextEntry
      ? timeToMinutes(nextEntry.startTime) - currentMinutes
      : null;

    const timeUntilFree = currentEntry
      ? timeToMinutes(currentEntry.endTime) - currentMinutes
      : null;

    statusMap.set(room.id, {
      status: currentEntry ? "occupied" : "available",
      currentEntry: currentEntry || null,
      nextEntry: nextEntry || null,
      timeUntilNextEntry,
      timeUntilFree,
      occupiedSeats: currentEntry?.occupiedSeats || 0,
    });
  });

  return statusMap;
};
