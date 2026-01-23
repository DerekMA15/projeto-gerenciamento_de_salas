import { Room, usageTypeLabels } from "@/data/scheduleData";
import { RoomStatus, formatTimeRemaining } from "@/hooks/useRoomStatus";
import { StatusBadge } from "./StatusBadge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, BookOpen, Users, ChevronRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
  status: RoomStatus;
  onClick: () => void;
}

export const RoomCard = ({ room, status, onClick }: RoomCardProps) => {
  const { status: roomStatus, currentEntry, nextEntry, timeUntilNextEntry, timeUntilFree, occupiedSeats } = status;

  const getBorderColor = () => {
    switch (roomStatus) {
      case "available":
        return "border-l-status-available";
      case "occupied":
        return "border-l-status-occupied";
      case "unavailable":
        return "border-l-status-unavailable";
    }
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group",
        "border-l-4",
        getBorderColor(),
        roomStatus === "unavailable" && "opacity-75"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg text-foreground">{room.name}</h3>
            <p className="text-sm text-muted-foreground">{room.building}</p>
          </div>
          <StatusBadge status={roomStatus} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {roomStatus === "unavailable" ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-status-unavailable">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Sala indisponível</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Fora do horário de funcionamento ou bloqueada
            </p>
          </div>
        ) : roomStatus === "occupied" && currentEntry ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-status-occupied">
              <BookOpen className="w-4 h-4" />
              <span className="font-mono font-semibold">{currentEntry.courseCode}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {currentEntry.courseName || usageTypeLabels[currentEntry.usageType]}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Libera em {formatTimeRemaining(timeUntilFree)}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-status-available">
              <span className="text-sm font-medium">Livre agora!</span>
            </div>
            {nextEntry && timeUntilNextEntry !== null ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>
                  Próxima aula em {formatTimeRemaining(timeUntilNextEntry)}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Livre pelo resto do dia</span>
              </div>
            )}
          </div>
        )}

        {/* Capacity indicator */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
          <Users className="w-4 h-4" />
          {roomStatus === "occupied" && occupiedSeats > 0 ? (
            <span>
              <span className="font-medium text-foreground">{occupiedSeats}</span>
              <span className="text-muted-foreground">/{room.capacity} lugares</span>
            </span>
          ) : (
            <span>{room.capacity} lugares</span>
          )}
        </div>

        <div className="flex items-center justify-end text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Ver grade</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
};
