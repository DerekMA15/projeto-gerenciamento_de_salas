import { useCurrentTime } from "@/hooks/useRoomStatus";
import { Clock } from "lucide-react";

export const DigitalClock = () => {
  const currentTime = useCurrentTime();

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="flex items-center gap-3 bg-card border rounded-xl px-4 py-3 shadow-sm">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Clock className="w-5 h-5 text-primary" />
      </div>
      <div>
        <div className="font-mono text-2xl font-bold tracking-tight text-foreground">
          {formatTime(currentTime)}
        </div>
        <div className="text-xs text-muted-foreground capitalize">
          {formatDate(currentTime)}
        </div>
      </div>
    </div>
  );
};
