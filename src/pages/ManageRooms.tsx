import { useState, useMemo } from "react";
import { useSchedule } from "@/contexts/ScheduleContext";
import { ScheduleEntry, UsageType, days, timeSlots, usageTypeLabels } from "@/data/scheduleData";
import { DigitalClock } from "@/components/DigitalClock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  RotateCcw,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface EntryFormData {
  roomId: string;
  day: string;
  startTime: string;
  endTime: string;
  usageType: UsageType;
  courseCode: string;
  courseName: string;
  occupiedSeats: number;
  canBeUsedForStudy: boolean;
}

const defaultFormData: EntryFormData = {
  roomId: "001",
  day: "Segunda",
  startTime: "07:30",
  endTime: "09:10",
  usageType: "aula",
  courseCode: "",
  courseName: "",
  occupiedSeats: 0,
  canBeUsedForStudy: true,
};

const ManageRooms = () => {
  const {
    rooms,
    scheduleEntries,
    isLoaded,
    addEntry,
    updateEntry,
    deleteEntry,
    toggleRoomAvailability,
    resetToDefaults,
  } = useSchedule();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ScheduleEntry | null>(null);
  const [formData, setFormData] = useState<EntryFormData>(defaultFormData);

  // Filters
  const [filterRoom, setFilterRoom] = useState<string>("all");
  const [filterUsageType, setFilterUsageType] = useState<string>("all");
  const [filterDay, setFilterDay] = useState<string>("all");

  const filteredEntries = useMemo(() => {
    return scheduleEntries.filter((entry) => {
      if (filterRoom !== "all" && entry.roomId !== filterRoom) return false;
      if (filterUsageType !== "all" && entry.usageType !== filterUsageType) return false;
      if (filterDay !== "all" && entry.day !== filterDay) return false;
      return true;
    }).sort((a, b) => {
      // Sort by room, then day, then time
      if (a.roomId !== b.roomId) return a.roomId.localeCompare(b.roomId);
      const dayOrder = days.indexOf(a.day) - days.indexOf(b.day);
      if (dayOrder !== 0) return dayOrder;
      return a.startTime.localeCompare(b.startTime);
    });
  }, [scheduleEntries, filterRoom, filterUsageType, filterDay]);

  const handleOpenCreate = () => {
    setEditingEntry(null);
    setFormData(defaultFormData);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (entry: ScheduleEntry) => {
    setEditingEntry(entry);
    setFormData({
      roomId: entry.roomId,
      day: entry.day,
      startTime: entry.startTime,
      endTime: entry.endTime,
      usageType: entry.usageType,
      courseCode: entry.courseCode,
      courseName: entry.courseName || "",
      occupiedSeats: entry.occupiedSeats,
      canBeUsedForStudy: entry.canBeUsedForStudy,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.courseCode.trim()) {
      toast.error("O código da disciplina/grupo é obrigatório");
      return;
    }

    const room = rooms.find((r) => r.id === formData.roomId);
    if (room && formData.occupiedSeats > room.capacity) {
      toast.error(`Lugares ocupados não pode exceder a capacidade da sala (${room.capacity})`);
      return;
    }

    if (editingEntry) {
      updateEntry(editingEntry.id, {
        roomId: formData.roomId,
        day: formData.day,
        startTime: formData.startTime,
        endTime: formData.endTime,
        usageType: formData.usageType,
        courseCode: formData.courseCode.trim(),
        courseName: formData.courseName.trim() || undefined,
        occupiedSeats: formData.occupiedSeats,
        canBeUsedForStudy: formData.canBeUsedForStudy,
      });
      toast.success("Ocupação atualizada com sucesso!");
    } else {
      addEntry({
        roomId: formData.roomId,
        day: formData.day,
        startTime: formData.startTime,
        endTime: formData.endTime,
        usageType: formData.usageType,
        courseCode: formData.courseCode.trim(),
        courseName: formData.courseName.trim() || undefined,
        occupiedSeats: formData.occupiedSeats,
        canBeUsedForStudy: formData.canBeUsedForStudy,
      });
      toast.success("Ocupação criada com sucesso!");
    }

    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteEntry(id);
    toast.success("Ocupação removida com sucesso!");
  };

  const handleReset = () => {
    if (confirm("Tem certeza que deseja restaurar os dados iniciais? Todas as alterações serão perdidas.")) {
      resetToDefaults();
      toast.success("Dados restaurados para o padrão!");
    }
  };

  const getRoomName = (roomId: string) => {
    return rooms.find((r) => r.id === roomId)?.name || `Sala ${roomId}`;
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="p-2 bg-primary rounded-xl">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Gestão de Salas</h1>
                <p className="text-sm text-muted-foreground">
                  Administração de Ocupações
                </p>
              </div>
            </div>
            <DigitalClock />
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Room Availability Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Disponibilidade das Salas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">{room.name}</p>
                    <p className="text-xs text-muted-foreground">{room.capacity} lugares</p>
                  </div>
                  <Switch
                    checked={room.isAvailable}
                    onCheckedChange={() => toggleRoomAvailability(room.id)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleOpenCreate} className="gap-2">
              <Plus className="w-4 h-4" />
              Nova Ocupação
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Restaurar Padrão
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filterRoom} onValueChange={setFilterRoom}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sala" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Salas</SelectItem>
                {rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterUsageType} onValueChange={setFilterUsageType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Tipos</SelectItem>
                <SelectItem value="aula">Aula</SelectItem>
                <SelectItem value="grupo_estudo">Grupo de Estudo</SelectItem>
                <SelectItem value="coworking">Coworking</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterDay} onValueChange={setFilterDay}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Dia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Dias</SelectItem>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Entries Table */}
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="max-h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sala</TableHead>
                    <TableHead>Dia</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead className="hidden md:table-cell">Nome</TableHead>
                    <TableHead className="hidden sm:table-cell">Tipo</TableHead>
                    <TableHead className="hidden lg:table-cell">Lugares</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Nenhuma ocupação encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{getRoomName(entry.roomId)}</TableCell>
                        <TableCell>{entry.day}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {entry.startTime} - {entry.endTime}
                        </TableCell>
                        <TableCell className="font-mono">{entry.courseCode}</TableCell>
                        <TableCell className="hidden md:table-cell max-w-[150px] truncate">
                          {entry.courseName || "-"}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {usageTypeLabels[entry.usageType]}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{entry.occupiedSeats}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenEdit(entry)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(entry.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground text-center">
          Total: {filteredEntries.length} ocupações
        </p>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingEntry ? "Editar Ocupação" : "Nova Ocupação"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roomId">Sala</Label>
                <Select
                  value={formData.roomId}
                  onValueChange={(value) => setFormData({ ...formData, roomId: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="day">Dia</Label>
                <Select
                  value={formData.day}
                  onValueChange={(value) => setFormData({ ...formData, day: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Início</Label>
                <Select
                  value={formData.startTime}
                  onValueChange={(value) => {
                    const slot = timeSlots.find((s) => s.start === value);
                    setFormData({
                      ...formData,
                      startTime: value,
                      endTime: slot?.end || formData.endTime,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot.start} value={slot.start}>
                        {slot.start}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Término</Label>
                <Select
                  value={formData.endTime}
                  onValueChange={(value) => setFormData({ ...formData, endTime: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot.end} value={slot.end}>
                        {slot.end}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="usageType">Tipo de Uso</Label>
              <Select
                value={formData.usageType}
                onValueChange={(value: UsageType) =>
                  setFormData({ ...formData, usageType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aula">Aula</SelectItem>
                  <SelectItem value="grupo_estudo">Grupo de Estudo</SelectItem>
                  <SelectItem value="coworking">Coworking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseCode">Código da Disciplina/Grupo *</Label>
              <Input
                id="courseCode"
                value={formData.courseCode}
                onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                placeholder="Ex: MAT0153"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseName">Nome (opcional)</Label>
              <Input
                id="courseName"
                value={formData.courseName}
                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                placeholder="Ex: Álgebra Linear"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupiedSeats">Lugares Ocupados</Label>
              <Input
                id="occupiedSeats"
                type="number"
                min={0}
                value={formData.occupiedSeats}
                onChange={(e) =>
                  setFormData({ ...formData, occupiedSeats: parseInt(e.target.value) || 0 })
                }
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="canBeUsedForStudy"
                checked={formData.canBeUsedForStudy}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, canBeUsedForStudy: checked })
                }
              />
              <Label htmlFor="canBeUsedForStudy" className="cursor-pointer">
                Pode ser usada para estudo
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editingEntry ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageRooms;
