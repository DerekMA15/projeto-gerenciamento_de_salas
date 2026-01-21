import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  isOccupied: boolean;
  className?: string;
}

export const StatusBadge = ({ isOccupied, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
        isOccupied
          ? "bg-status-occupied/10 text-status-occupied"
          : "bg-status-available/10 text-status-available",
        className
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full animate-pulse",
          isOccupied ? "bg-status-occupied" : "bg-status-available"
        )}
      />
      {isOccupied ? "Ocupada" : "Disponível"}
    </span>
  );
};
