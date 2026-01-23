export type UsageType = "aula" | "grupo_estudo" | "coworking";

export interface ScheduleEntry {
  id: string;
  roomId: string;
  day: string;
  startTime: string;
  endTime: string;
  courseCode: string;
  courseName?: string;
  usageType: UsageType;
  occupiedSeats: number;
  canBeUsedForStudy: boolean;
}

export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  isAvailable: boolean; // false = manually marked as unavailable
}

// Time slots pattern: 07:30-09:10, 09:20-11:00, 11:10-12:50, 14:00-15:40, 15:50-17:30, 17:40-19:20, 19:30-21:10, 21:15-22:15

export const initialRooms: Room[] = [
  { id: "001", name: "DID1 - 001", building: "Didática 1", capacity: 40, isAvailable: true },
  { id: "002", name: "DID1 - 002", building: "Didática 1", capacity: 35, isAvailable: true },
  { id: "003", name: "DID1 - 003", building: "Didática 1", capacity: 50, isAvailable: true },
  { id: "004", name: "DID1 - 004", building: "Didática 1", capacity: 30, isAvailable: true },
  { id: "005", name: "DID1 - 005", building: "Didática 1", capacity: 45, isAvailable: true },
];

let entryIdCounter = 1;
const generateId = () => `entry_${entryIdCounter++}`;

export const initialScheduleEntries: ScheduleEntry[] = [
  // Room 001
  { id: generateId(), roomId: "001", day: "Segunda", startTime: "07:30", endTime: "09:10", courseCode: "FIS0101", courseName: "Física I", usageType: "aula", occupiedSeats: 35, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Segunda", startTime: "09:20", endTime: "11:00", courseCode: "FIS0101", courseName: "Física I", usageType: "aula", occupiedSeats: 35, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Segunda", startTime: "14:00", endTime: "15:40", courseCode: "QUI0201", courseName: "Química Geral", usageType: "aula", occupiedSeats: 28, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Segunda", startTime: "19:30", endTime: "21:10", courseCode: "ENG0301", courseName: "Introdução à Engenharia", usageType: "aula", occupiedSeats: 40, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Terça", startTime: "07:30", endTime: "09:10", courseCode: "MAT0102", courseName: "Cálculo II", usageType: "aula", occupiedSeats: 32, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Terça", startTime: "11:10", endTime: "12:50", courseCode: "EST0101", courseName: "Estatística Básica", usageType: "aula", occupiedSeats: 25, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Terça", startTime: "15:50", endTime: "17:30", courseCode: "PRG0201", courseName: "Programação I", usageType: "aula", occupiedSeats: 30, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Quarta", startTime: "09:20", endTime: "11:00", courseCode: "FIS0102", courseName: "Física II", usageType: "aula", occupiedSeats: 38, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Quarta", startTime: "14:00", endTime: "15:40", courseCode: "QUI0201", courseName: "Química Geral", usageType: "aula", occupiedSeats: 28, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Quarta", startTime: "17:40", endTime: "19:20", courseCode: "ENG0302", courseName: "Desenho Técnico", usageType: "aula", occupiedSeats: 22, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Quinta", startTime: "07:30", endTime: "09:10", courseCode: "MAT0102", courseName: "Cálculo II", usageType: "aula", occupiedSeats: 32, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Quinta", startTime: "09:20", endTime: "11:00", courseCode: "FIS0101", courseName: "Física I", usageType: "aula", occupiedSeats: 35, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Quinta", startTime: "19:30", endTime: "21:10", courseCode: "ENG0301", courseName: "Introdução à Engenharia", usageType: "aula", occupiedSeats: 40, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Sexta", startTime: "11:10", endTime: "12:50", courseCode: "EST0101", courseName: "Estatística Básica", usageType: "aula", occupiedSeats: 25, canBeUsedForStudy: false },
  { id: generateId(), roomId: "001", day: "Sexta", startTime: "14:00", endTime: "15:40", courseCode: "PRG0201", courseName: "Programação I", usageType: "aula", occupiedSeats: 30, canBeUsedForStudy: false },

  // Room 002 (from image)
  { id: generateId(), roomId: "002", day: "Segunda", startTime: "07:30", endTime: "09:10", courseCode: "MAT0153", courseName: "Álgebra Linear", usageType: "aula", occupiedSeats: 30, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Segunda", startTime: "09:20", endTime: "11:00", courseCode: "MAT0153", courseName: "Álgebra Linear", usageType: "aula", occupiedSeats: 30, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Segunda", startTime: "11:10", endTime: "12:50", courseCode: "CIC0097", courseName: "Banco de Dados", usageType: "aula", occupiedSeats: 28, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Segunda", startTime: "14:00", endTime: "15:40", courseCode: "CIC0097", courseName: "Banco de Dados", usageType: "aula", occupiedSeats: 28, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Segunda", startTime: "15:50", endTime: "17:30", courseCode: "CIC0004", courseName: "Estrutura de Dados", usageType: "aula", occupiedSeats: 25, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Segunda", startTime: "19:30", endTime: "21:10", courseCode: "ADM0201", courseName: "Gestão de Projetos", usageType: "aula", occupiedSeats: 32, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Terça", startTime: "07:30", endTime: "09:10", courseCode: "CIC0182", courseName: "Redes de Computadores", usageType: "aula", occupiedSeats: 27, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Terça", startTime: "09:20", endTime: "11:00", courseCode: "CIC0182", courseName: "Redes de Computadores", usageType: "aula", occupiedSeats: 27, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Terça", startTime: "14:00", endTime: "15:40", courseCode: "MAT0154", courseName: "Cálculo III", usageType: "aula", occupiedSeats: 35, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Terça", startTime: "17:40", endTime: "19:20", courseCode: "CIC0003", courseName: "Algoritmos", usageType: "aula", occupiedSeats: 30, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Quarta", startTime: "07:30", endTime: "09:10", courseCode: "MAT0153", courseName: "Álgebra Linear", usageType: "aula", occupiedSeats: 30, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Quarta", startTime: "11:10", endTime: "12:50", courseCode: "CIC0097", courseName: "Banco de Dados", usageType: "aula", occupiedSeats: 28, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Quarta", startTime: "15:50", endTime: "17:30", courseCode: "CIC0004", courseName: "Estrutura de Dados", usageType: "aula", occupiedSeats: 25, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Quarta", startTime: "19:30", endTime: "21:10", courseCode: "ADM0201", courseName: "Gestão de Projetos", usageType: "aula", occupiedSeats: 32, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Quinta", startTime: "09:20", endTime: "11:00", courseCode: "CIC0182", courseName: "Redes de Computadores", usageType: "aula", occupiedSeats: 27, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Quinta", startTime: "14:00", endTime: "15:40", courseCode: "MAT0154", courseName: "Cálculo III", usageType: "aula", occupiedSeats: 35, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Quinta", startTime: "17:40", endTime: "19:20", courseCode: "CIC0003", courseName: "Algoritmos", usageType: "aula", occupiedSeats: 30, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Sexta", startTime: "07:30", endTime: "09:10", courseCode: "CIC0097", courseName: "Banco de Dados", usageType: "aula", occupiedSeats: 28, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Sexta", startTime: "11:10", endTime: "12:50", courseCode: "CIC0004", courseName: "Estrutura de Dados", usageType: "aula", occupiedSeats: 25, canBeUsedForStudy: false },
  { id: generateId(), roomId: "002", day: "Sexta", startTime: "14:00", endTime: "15:40", courseCode: "MAT0154", courseName: "Cálculo III", usageType: "aula", occupiedSeats: 35, canBeUsedForStudy: false },

  // Room 003
  { id: generateId(), roomId: "003", day: "Segunda", startTime: "09:20", endTime: "11:00", courseCode: "BIO0101", courseName: "Biologia Celular", usageType: "aula", occupiedSeats: 45, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Segunda", startTime: "14:00", endTime: "15:40", courseCode: "BIO0102", courseName: "Genética", usageType: "aula", occupiedSeats: 42, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Segunda", startTime: "17:40", endTime: "19:20", courseCode: "MED0101", courseName: "Anatomia I", usageType: "aula", occupiedSeats: 50, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Terça", startTime: "07:30", endTime: "09:10", courseCode: "QUI0301", courseName: "Química Orgânica", usageType: "aula", occupiedSeats: 38, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Terça", startTime: "11:10", endTime: "12:50", courseCode: "BIO0101", courseName: "Biologia Celular", usageType: "aula", occupiedSeats: 45, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Terça", startTime: "15:50", endTime: "17:30", courseCode: "BIO0102", courseName: "Genética", usageType: "aula", occupiedSeats: 42, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Terça", startTime: "19:30", endTime: "21:10", courseCode: "MED0102", courseName: "Fisiologia", usageType: "aula", occupiedSeats: 48, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Quarta", startTime: "07:30", endTime: "09:10", courseCode: "QUI0301", courseName: "Química Orgânica", usageType: "aula", occupiedSeats: 38, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Quarta", startTime: "09:20", endTime: "11:00", courseCode: "BIO0101", courseName: "Biologia Celular", usageType: "aula", occupiedSeats: 45, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Quarta", startTime: "17:40", endTime: "19:20", courseCode: "MED0101", courseName: "Anatomia I", usageType: "aula", occupiedSeats: 50, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Quinta", startTime: "11:10", endTime: "12:50", courseCode: "BIO0102", courseName: "Genética", usageType: "aula", occupiedSeats: 42, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Quinta", startTime: "14:00", endTime: "15:40", courseCode: "QUI0301", courseName: "Química Orgânica", usageType: "aula", occupiedSeats: 38, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Quinta", startTime: "19:30", endTime: "21:10", courseCode: "MED0102", courseName: "Fisiologia", usageType: "aula", occupiedSeats: 48, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Sexta", startTime: "09:20", endTime: "11:00", courseCode: "BIO0101", courseName: "Biologia Celular", usageType: "aula", occupiedSeats: 45, canBeUsedForStudy: false },
  { id: generateId(), roomId: "003", day: "Sexta", startTime: "15:50", endTime: "17:30", courseCode: "MED0101", courseName: "Anatomia I", usageType: "aula", occupiedSeats: 50, canBeUsedForStudy: false },

  // Room 004
  { id: generateId(), roomId: "004", day: "Segunda", startTime: "07:30", endTime: "09:10", courseCode: "DIR0101", courseName: "Direito Civil I", usageType: "aula", occupiedSeats: 28, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Segunda", startTime: "11:10", endTime: "12:50", courseCode: "DIR0102", courseName: "Direito Penal", usageType: "aula", occupiedSeats: 26, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Segunda", startTime: "15:50", endTime: "17:30", courseCode: "ECO0101", courseName: "Microeconomia", usageType: "aula", occupiedSeats: 22, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Terça", startTime: "09:20", endTime: "11:00", courseCode: "DIR0101", courseName: "Direito Civil I", usageType: "aula", occupiedSeats: 28, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Terça", startTime: "14:00", endTime: "15:40", courseCode: "ECO0102", courseName: "Macroeconomia", usageType: "aula", occupiedSeats: 24, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Terça", startTime: "17:40", endTime: "19:20", courseCode: "ADM0101", courseName: "Administração I", usageType: "aula", occupiedSeats: 30, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Terça", startTime: "21:15", endTime: "22:15", courseCode: "DIR0103", courseName: "Seminário Jurídico", usageType: "aula", occupiedSeats: 20, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Quarta", startTime: "07:30", endTime: "09:10", courseCode: "DIR0101", courseName: "Direito Civil I", usageType: "aula", occupiedSeats: 28, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Quarta", startTime: "11:10", endTime: "12:50", courseCode: "DIR0102", courseName: "Direito Penal", usageType: "aula", occupiedSeats: 26, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Quarta", startTime: "14:00", endTime: "15:40", courseCode: "ECO0101", courseName: "Microeconomia", usageType: "aula", occupiedSeats: 22, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Quarta", startTime: "19:30", endTime: "21:10", courseCode: "ADM0101", courseName: "Administração I", usageType: "aula", occupiedSeats: 30, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Quinta", startTime: "09:20", endTime: "11:00", courseCode: "ECO0102", courseName: "Macroeconomia", usageType: "aula", occupiedSeats: 24, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Quinta", startTime: "15:50", endTime: "17:30", courseCode: "DIR0102", courseName: "Direito Penal", usageType: "aula", occupiedSeats: 26, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Sexta", startTime: "07:30", endTime: "09:10", courseCode: "ECO0101", courseName: "Microeconomia", usageType: "aula", occupiedSeats: 22, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Sexta", startTime: "11:10", endTime: "12:50", courseCode: "ADM0101", courseName: "Administração I", usageType: "aula", occupiedSeats: 30, canBeUsedForStudy: false },
  { id: generateId(), roomId: "004", day: "Sexta", startTime: "17:40", endTime: "19:20", courseCode: "DIR0103", courseName: "Seminário Jurídico", usageType: "aula", occupiedSeats: 20, canBeUsedForStudy: false },

  // Room 005
  { id: generateId(), roomId: "005", day: "Segunda", startTime: "09:20", endTime: "11:00", courseCode: "PSI0101", courseName: "Psicologia Geral", usageType: "aula", occupiedSeats: 40, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Segunda", startTime: "14:00", endTime: "15:40", courseCode: "SOC0101", courseName: "Sociologia I", usageType: "aula", occupiedSeats: 38, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Segunda", startTime: "19:30", endTime: "21:10", courseCode: "FIL0101", courseName: "Filosofia I", usageType: "aula", occupiedSeats: 35, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Terça", startTime: "07:30", endTime: "09:10", courseCode: "HIS0101", courseName: "História Contemporânea", usageType: "aula", occupiedSeats: 42, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Terça", startTime: "11:10", endTime: "12:50", courseCode: "PSI0101", courseName: "Psicologia Geral", usageType: "aula", occupiedSeats: 40, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Terça", startTime: "15:50", endTime: "17:30", courseCode: "SOC0102", courseName: "Antropologia", usageType: "aula", occupiedSeats: 36, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Quarta", startTime: "09:20", endTime: "11:00", courseCode: "PSI0101", courseName: "Psicologia Geral", usageType: "aula", occupiedSeats: 40, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Quarta", startTime: "14:00", endTime: "15:40", courseCode: "SOC0101", courseName: "Sociologia I", usageType: "aula", occupiedSeats: 38, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Quarta", startTime: "17:40", endTime: "19:20", courseCode: "HIS0101", courseName: "História Contemporânea", usageType: "aula", occupiedSeats: 42, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Quarta", startTime: "21:15", endTime: "22:15", courseCode: "FIL0102", courseName: "Ética", usageType: "aula", occupiedSeats: 30, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Quinta", startTime: "07:30", endTime: "09:10", courseCode: "HIS0101", courseName: "História Contemporânea", usageType: "aula", occupiedSeats: 42, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Quinta", startTime: "11:10", endTime: "12:50", courseCode: "SOC0102", courseName: "Antropologia", usageType: "aula", occupiedSeats: 36, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Quinta", startTime: "19:30", endTime: "21:10", courseCode: "FIL0101", courseName: "Filosofia I", usageType: "aula", occupiedSeats: 35, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Sexta", startTime: "09:20", endTime: "11:00", courseCode: "PSI0102", courseName: "Psicologia Social", usageType: "aula", occupiedSeats: 38, canBeUsedForStudy: false },
  { id: generateId(), roomId: "005", day: "Sexta", startTime: "14:00", endTime: "15:40", courseCode: "SOC0101", courseName: "Sociologia I", usageType: "aula", occupiedSeats: 38, canBeUsedForStudy: false },
];

export const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

export const timeSlots = [
  { start: "07:30", end: "09:10" },
  { start: "09:20", end: "11:00" },
  { start: "11:10", end: "12:50" },
  { start: "14:00", end: "15:40" },
  { start: "15:50", end: "17:30" },
  { start: "17:40", end: "19:20" },
  { start: "19:30", end: "21:10" },
  { start: "21:15", end: "22:15" },
];

export const usageTypeLabels: Record<UsageType, string> = {
  aula: "Aula",
  grupo_estudo: "Grupo de Estudo",
  coworking: "Coworking",
};
