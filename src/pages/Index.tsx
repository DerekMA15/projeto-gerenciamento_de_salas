import { useState, useMemo } from "react";
import { rooms } from "@/data/scheduleData";
import { useCurrentTime, getRoomStatusForAllRooms } from "@/hooks/useRoomStatus";
import { RoomCard } from "@/components/RoomCard";
import { ScheduleModal } from "@/components/ScheduleModal";
import { DigitalClock } from "@/components/DigitalClock";
import { Room } from "@/data/scheduleData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Building2, Filter } from "lucide-react";

const Index = () => {
  const currentTime = useCurrentTime();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const roomStatuses = useMemo(
    () => getRoomStatusForAllRooms(rooms, currentTime),
    [currentTime]
  );

  const filteredRooms = useMemo(() => {
    if (!showOnlyAvailable) return rooms;
    return rooms.filter((room) => {
      const status = roomStatuses.get(room.id);
      return status && !status.isOccupied;
    });
  }, [showOnlyAvailable, roomStatuses]);

  const availableCount = useMemo(() => {
    return rooms.filter((room) => {
      const status = roomStatuses.get(room.id);
      return status && !status.isOccupied;
    }).length;
  }, [roomStatuses]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Didática 1</h1>
                <p className="text-sm text-muted-foreground">
                  Espaços Acadêmicos
                </p>
              </div>
            </div>
            <DigitalClock />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 space-y-6">
        {/* Stats & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-card rounded-xl border">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-status-available">
                {availableCount}
              </div>
              <div className="text-xs text-muted-foreground">Disponíveis</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-status-occupied">
                {rooms.length - availableCount}
              </div>
              <div className="text-xs text-muted-foreground">Ocupadas</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {rooms.length}
              </div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Label
              htmlFor="filter-available"
              className="text-sm font-medium cursor-pointer"
            >
              Apenas disponíveis
            </Label>
            <Switch
              id="filter-available"
              checked={showOnlyAvailable}
              onCheckedChange={setShowOnlyAvailable}
            />
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((room, index) => {
            const status = roomStatuses.get(room.id);
            if (!status) return null;

            return (
              <div
                key={room.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <RoomCard
                  room={room}
                  status={status}
                  onClick={() => setSelectedRoom(room)}
                />
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredRooms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
              <Building2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Nenhuma sala disponível
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Todas as salas estão ocupadas no momento
            </p>
          </div>
        )}
      </main>

      {/* Schedule Modal */}
      <ScheduleModal
        room={selectedRoom}
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
      />

      {/* Footer */}
      <footer className="border-t py-6 mt-8">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            Sistema de Gestão de Espaços Acadêmicos — Didática 1
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
