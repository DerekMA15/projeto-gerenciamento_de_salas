import { cn } from "@/lib/utils";
import { RoomStatusType } from "@/hooks/useRoomStatus";

interface StatusBadgeProps {
  status: RoomStatusType;
  className?: string;
}

const statusConfig: Record<RoomStatusType, { label: string; bgClass: string; textClass: string; dotClass: string }> = {
  available: {
    label: "Disponível",
    bgClass: "bg-status-available/10",
    textClass: "text-status-available",
    dotClass: "bg-status-available",
  },
  occupied: {
    label: "Ocupada",
    bgClass: "bg-status-occupied/10",
    textClass: "text-status-occupied",
    dotClass: "bg-status-occupied",
  },
  unavailable: {
    label: "Indisponível",
    bgClass: "bg-status-unavailable/10",
    textClass: "text-status-unavailable",
    dotClass: "bg-status-unavailable",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
        config.bgClass,
        config.textClass,
        className
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          config.dotClass,
          status !== "unavailable" && "animate-pulse"
        )}
      />
      {config.label}
    </span>
  );
};
