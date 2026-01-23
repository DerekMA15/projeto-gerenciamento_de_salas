import { Room, ScheduleEntry, days, timeSlots, usageTypeLabels } from "@/data/scheduleData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrentTime } from "@/hooks/useRoomStatus";
import { cn } from "@/lib/utils";

interface ScheduleModalProps {
  room: Room | null;
  entries: ScheduleEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleModal = ({ room, entries, isOpen, onClose }: ScheduleModalProps) => {
  const currentTime = useCurrentTime();

  if (!room) return null;

  const roomEntries = entries.filter((e) => e.roomId === room.id);

  const getDayName = (date: Date): string => {
    const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    return dayNames[date.getDay()];
  };

  const getCurrentTimeInMinutes = (): number => {
    return currentTime.getHours() * 60 + currentTime.getMinutes();
  };

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const currentDay = getDayName(currentTime);
  const currentMinutes = getCurrentTimeInMinutes();

  const getClassForSlot = (day: string, slot: { start: string; end: string }) => {
    return roomEntries.find(
      (entry) =>
        entry.day === day &&
        entry.startTime === slot.start &&
        entry.endTime === slot.end
    );
  };

  const isCurrentSlot = (day: string, slot: { start: string; end: string }) => {
    if (day !== currentDay) return false;
    const startMinutes = timeToMinutes(slot.start);
    const endMinutes = timeToMinutes(slot.end);
    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b bg-muted/30">
          <DialogTitle className="text-xl font-bold">{room.name}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {room.building} • {room.capacity} lugares
            {!room.isAvailable && (
              <span className="ml-2 text-status-unavailable">(Indisponível)</span>
            )}
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(85vh-100px)]">
          <div className="p-4 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-xs font-medium text-muted-foreground text-left w-20">
                    Horário
                  </th>
                  {days.map((day) => (
                    <th
                      key={day}
                      className={cn(
                        "p-2 text-xs font-medium text-center",
                        day === currentDay
                          ? "text-primary bg-primary/5 rounded-t-lg"
                          : "text-muted-foreground"
                      )}
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot.start} className="border-t border-border/50">
                    <td className="p-2 text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {slot.start}
                      <br />
                      {slot.end}
                    </td>
                    {days.map((day) => {
                      const classEntry = getClassForSlot(day, slot);
                      const isCurrent = isCurrentSlot(day, slot);

                      return (
                        <td
                          key={`${day}-${slot.start}`}
                          className={cn(
                            "p-1 text-center",
                            day === currentDay && "bg-primary/5"
                          )}
                        >
                          {classEntry ? (
                            <div
                              className={cn(
                                "p-2 rounded-lg text-xs",
                                isCurrent
                                  ? "bg-status-occupied text-white ring-2 ring-status-occupied ring-offset-2"
                                  : "bg-muted"
                              )}
                            >
                              <div className="font-semibold font-mono">
                                {classEntry.courseCode}
                              </div>
                              <div className="text-[10px] opacity-80 line-clamp-1 mt-0.5">
                                {classEntry.courseName || usageTypeLabels[classEntry.usageType]}
                              </div>
                            </div>
                          ) : (
                            <div
                              className={cn(
                                "p-2 rounded-lg text-xs",
                                isCurrent
                                  ? "bg-status-available/20 text-status-available ring-2 ring-status-available ring-offset-2"
                                  : "text-muted-foreground/40"
                              )}
                            >
                              —
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
