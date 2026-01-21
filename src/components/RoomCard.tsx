import { Room } from "@/data/scheduleData";
import { RoomStatus, formatTimeRemaining } from "@/hooks/useRoomStatus";
import { StatusBadge } from "./StatusBadge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, BookOpen, Users, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
  status: RoomStatus;
  onClick: () => void;
}

export const RoomCard = ({ room, status, onClick }: RoomCardProps) => {
  const { isOccupied, currentClass, nextClass, timeUntilNextClass, timeUntilFree } = status;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group",
        "border-l-4",
        isOccupied ? "border-l-status-occupied" : "border-l-status-available"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg text-foreground">{room.name}</h3>
            <p className="text-sm text-muted-foreground">{room.building}</p>
          </div>
          <StatusBadge isOccupied={isOccupied} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {isOccupied && currentClass ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-status-occupied">
              <BookOpen className="w-4 h-4" />
              <span className="font-mono font-semibold">{currentClass.courseCode}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {currentClass.courseName}
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
            {nextClass && timeUntilNextClass !== null ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>
                  Próxima aula em {formatTimeRemaining(timeUntilNextClass)}
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

        {room.capacity && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
            <Users className="w-4 h-4" />
            <span>{room.capacity} lugares</span>
          </div>
        )}

        <div className="flex items-center justify-end text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Ver grade</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
};
