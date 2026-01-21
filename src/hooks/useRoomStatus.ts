import { useState, useEffect, useMemo } from "react";
import { Room, ScheduleEntry, timeSlots } from "@/data/scheduleData";

export interface RoomStatus {
  isOccupied: boolean;
  currentClass: ScheduleEntry | null;
  nextClass: ScheduleEntry | null;
  timeUntilNextClass: number | null; // in minutes
  timeUntilFree: number | null; // in minutes
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

export const useRoomStatus = (room: Room, currentTime: Date): RoomStatus => {
  return useMemo(() => {
    const dayName = getDayName(currentTime);
    const currentMinutes = getCurrentTimeInMinutes(currentTime);

    // Filter schedule for today
    const todaySchedule = room.schedule
      .filter((entry) => entry.day === dayName)
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    // Check if currently in a class
    const currentClass = todaySchedule.find((entry) => {
      const startMinutes = timeToMinutes(entry.startTime);
      const endMinutes = timeToMinutes(entry.endTime);
      return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    });

    // Find next class
    const nextClass = todaySchedule.find((entry) => {
      const startMinutes = timeToMinutes(entry.startTime);
      return startMinutes > currentMinutes;
    });

    // Calculate time until next class
    const timeUntilNextClass = nextClass
      ? timeToMinutes(nextClass.startTime) - currentMinutes
      : null;

    // Calculate time until current class ends
    const timeUntilFree = currentClass
      ? timeToMinutes(currentClass.endTime) - currentMinutes
      : null;

    return {
      isOccupied: !!currentClass,
      currentClass: currentClass || null,
      nextClass: nextClass || null,
      timeUntilNextClass,
      timeUntilFree,
    };
  }, [room, currentTime]);
};

export const getRoomStatusForAllRooms = (rooms: Room[], currentTime: Date): Map<string, RoomStatus> => {
  const statusMap = new Map<string, RoomStatus>();
  
  rooms.forEach((room) => {
    const dayName = getDayName(currentTime);
    const currentMinutes = getCurrentTimeInMinutes(currentTime);

    const todaySchedule = room.schedule
      .filter((entry) => entry.day === dayName)
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    const currentClass = todaySchedule.find((entry) => {
      const startMinutes = timeToMinutes(entry.startTime);
      const endMinutes = timeToMinutes(entry.endTime);
      return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    });

    const nextClass = todaySchedule.find((entry) => {
      const startMinutes = timeToMinutes(entry.startTime);
      return startMinutes > currentMinutes;
    });

    const timeUntilNextClass = nextClass
      ? timeToMinutes(nextClass.startTime) - currentMinutes
      : null;

    const timeUntilFree = currentClass
      ? timeToMinutes(currentClass.endTime) - currentMinutes
      : null;

    statusMap.set(room.id, {
      isOccupied: !!currentClass,
      currentClass: currentClass || null,
      nextClass: nextClass || null,
      timeUntilNextClass,
      timeUntilFree,
    });
  });

  return statusMap;
};
