export interface ScheduleEntry {
  day: string;
  startTime: string;
  endTime: string;
  courseCode: string;
  courseName?: string;
}

export interface Room {
  id: string;
  name: string;
  building: string;
  capacity?: number;
  schedule: ScheduleEntry[];
}

// Time slots pattern: 07:30-09:10, 09:20-11:00, 11:10-12:50, 14:00-15:40, 15:50-17:30, 17:40-19:20, 19:30-21:10, 21:15-22:15

export const rooms: Room[] = [
  {
    id: "001",
    name: "DID1 - 001",
    building: "Didática 1",
    capacity: 40,
    schedule: [
      // Segunda
      { day: "Segunda", startTime: "07:30", endTime: "09:10", courseCode: "FIS0101", courseName: "Física I" },
      { day: "Segunda", startTime: "09:20", endTime: "11:00", courseCode: "FIS0101", courseName: "Física I" },
      { day: "Segunda", startTime: "14:00", endTime: "15:40", courseCode: "QUI0201", courseName: "Química Geral" },
      { day: "Segunda", startTime: "19:30", endTime: "21:10", courseCode: "ENG0301", courseName: "Introdução à Engenharia" },
      // Terça
      { day: "Terça", startTime: "07:30", endTime: "09:10", courseCode: "MAT0102", courseName: "Cálculo II" },
      { day: "Terça", startTime: "11:10", endTime: "12:50", courseCode: "EST0101", courseName: "Estatística Básica" },
      { day: "Terça", startTime: "15:50", endTime: "17:30", courseCode: "PRG0201", courseName: "Programação I" },
      // Quarta
      { day: "Quarta", startTime: "09:20", endTime: "11:00", courseCode: "FIS0102", courseName: "Física II" },
      { day: "Quarta", startTime: "14:00", endTime: "15:40", courseCode: "QUI0201", courseName: "Química Geral" },
      { day: "Quarta", startTime: "17:40", endTime: "19:20", courseCode: "ENG0302", courseName: "Desenho Técnico" },
      // Quinta
      { day: "Quinta", startTime: "07:30", endTime: "09:10", courseCode: "MAT0102", courseName: "Cálculo II" },
      { day: "Quinta", startTime: "09:20", endTime: "11:00", courseCode: "FIS0101", courseName: "Física I" },
      { day: "Quinta", startTime: "19:30", endTime: "21:10", courseCode: "ENG0301", courseName: "Introdução à Engenharia" },
      // Sexta
      { day: "Sexta", startTime: "11:10", endTime: "12:50", courseCode: "EST0101", courseName: "Estatística Básica" },
      { day: "Sexta", startTime: "14:00", endTime: "15:40", courseCode: "PRG0201", courseName: "Programação I" },
    ],
  },
  {
    id: "002",
    name: "DID1 - 002",
    building: "Didática 1",
    capacity: 35,
    schedule: [
      // Segunda
      { day: "Segunda", startTime: "07:30", endTime: "09:10", courseCode: "MAT0153", courseName: "Álgebra Linear" },
      { day: "Segunda", startTime: "09:20", endTime: "11:00", courseCode: "MAT0153", courseName: "Álgebra Linear" },
      { day: "Segunda", startTime: "11:10", endTime: "12:50", courseCode: "CIC0097", courseName: "Banco de Dados" },
      { day: "Segunda", startTime: "14:00", endTime: "15:40", courseCode: "CIC0097", courseName: "Banco de Dados" },
      { day: "Segunda", startTime: "15:50", endTime: "17:30", courseCode: "CIC0004", courseName: "Estrutura de Dados" },
      { day: "Segunda", startTime: "19:30", endTime: "21:10", courseCode: "ADM0201", courseName: "Gestão de Projetos" },
      // Terça
      { day: "Terça", startTime: "07:30", endTime: "09:10", courseCode: "CIC0182", courseName: "Redes de Computadores" },
      { day: "Terça", startTime: "09:20", endTime: "11:00", courseCode: "CIC0182", courseName: "Redes de Computadores" },
      { day: "Terça", startTime: "14:00", endTime: "15:40", courseCode: "MAT0154", courseName: "Cálculo III" },
      { day: "Terça", startTime: "17:40", endTime: "19:20", courseCode: "CIC0003", courseName: "Algoritmos" },
      // Quarta
      { day: "Quarta", startTime: "07:30", endTime: "09:10", courseCode: "MAT0153", courseName: "Álgebra Linear" },
      { day: "Quarta", startTime: "11:10", endTime: "12:50", courseCode: "CIC0097", courseName: "Banco de Dados" },
      { day: "Quarta", startTime: "15:50", endTime: "17:30", courseCode: "CIC0004", courseName: "Estrutura de Dados" },
      { day: "Quarta", startTime: "19:30", endTime: "21:10", courseCode: "ADM0201", courseName: "Gestão de Projetos" },
      // Quinta
      { day: "Quinta", startTime: "09:20", endTime: "11:00", courseCode: "CIC0182", courseName: "Redes de Computadores" },
      { day: "Quinta", startTime: "14:00", endTime: "15:40", courseCode: "MAT0154", courseName: "Cálculo III" },
      { day: "Quinta", startTime: "17:40", endTime: "19:20", courseCode: "CIC0003", courseName: "Algoritmos" },
      // Sexta
      { day: "Sexta", startTime: "07:30", endTime: "09:10", courseCode: "CIC0097", courseName: "Banco de Dados" },
      { day: "Sexta", startTime: "11:10", endTime: "12:50", courseCode: "CIC0004", courseName: "Estrutura de Dados" },
      { day: "Sexta", startTime: "14:00", endTime: "15:40", courseCode: "MAT0154", courseName: "Cálculo III" },
    ],
  },
  {
    id: "003",
    name: "DID1 - 003",
    building: "Didática 1",
    capacity: 50,
    schedule: [
      // Segunda
      { day: "Segunda", startTime: "09:20", endTime: "11:00", courseCode: "BIO0101", courseName: "Biologia Celular" },
      { day: "Segunda", startTime: "14:00", endTime: "15:40", courseCode: "BIO0102", courseName: "Genética" },
      { day: "Segunda", startTime: "17:40", endTime: "19:20", courseCode: "MED0101", courseName: "Anatomia I" },
      // Terça
      { day: "Terça", startTime: "07:30", endTime: "09:10", courseCode: "QUI0301", courseName: "Química Orgânica" },
      { day: "Terça", startTime: "11:10", endTime: "12:50", courseCode: "BIO0101", courseName: "Biologia Celular" },
      { day: "Terça", startTime: "15:50", endTime: "17:30", courseCode: "BIO0102", courseName: "Genética" },
      { day: "Terça", startTime: "19:30", endTime: "21:10", courseCode: "MED0102", courseName: "Fisiologia" },
      // Quarta
      { day: "Quarta", startTime: "07:30", endTime: "09:10", courseCode: "QUI0301", courseName: "Química Orgânica" },
      { day: "Quarta", startTime: "09:20", endTime: "11:00", courseCode: "BIO0101", courseName: "Biologia Celular" },
      { day: "Quarta", startTime: "17:40", endTime: "19:20", courseCode: "MED0101", courseName: "Anatomia I" },
      // Quinta
      { day: "Quinta", startTime: "11:10", endTime: "12:50", courseCode: "BIO0102", courseName: "Genética" },
      { day: "Quinta", startTime: "14:00", endTime: "15:40", courseCode: "QUI0301", courseName: "Química Orgânica" },
      { day: "Quinta", startTime: "19:30", endTime: "21:10", courseCode: "MED0102", courseName: "Fisiologia" },
      // Sexta
      { day: "Sexta", startTime: "09:20", endTime: "11:00", courseCode: "BIO0101", courseName: "Biologia Celular" },
      { day: "Sexta", startTime: "15:50", endTime: "17:30", courseCode: "MED0101", courseName: "Anatomia I" },
    ],
  },
  {
    id: "004",
    name: "DID1 - 004",
    building: "Didática 1",
    capacity: 30,
    schedule: [
      // Segunda
      { day: "Segunda", startTime: "07:30", endTime: "09:10", courseCode: "DIR0101", courseName: "Direito Civil I" },
      { day: "Segunda", startTime: "11:10", endTime: "12:50", courseCode: "DIR0102", courseName: "Direito Penal" },
      { day: "Segunda", startTime: "15:50", endTime: "17:30", courseCode: "ECO0101", courseName: "Microeconomia" },
      // Terça
      { day: "Terça", startTime: "09:20", endTime: "11:00", courseCode: "DIR0101", courseName: "Direito Civil I" },
      { day: "Terça", startTime: "14:00", endTime: "15:40", courseCode: "ECO0102", courseName: "Macroeconomia" },
      { day: "Terça", startTime: "17:40", endTime: "19:20", courseCode: "ADM0101", courseName: "Administração I" },
      { day: "Terça", startTime: "21:15", endTime: "22:15", courseCode: "DIR0103", courseName: "Seminário Jurídico" },
      // Quarta
      { day: "Quarta", startTime: "07:30", endTime: "09:10", courseCode: "DIR0101", courseName: "Direito Civil I" },
      { day: "Quarta", startTime: "11:10", endTime: "12:50", courseCode: "DIR0102", courseName: "Direito Penal" },
      { day: "Quarta", startTime: "14:00", endTime: "15:40", courseCode: "ECO0101", courseName: "Microeconomia" },
      { day: "Quarta", startTime: "19:30", endTime: "21:10", courseCode: "ADM0101", courseName: "Administração I" },
      // Quinta
      { day: "Quinta", startTime: "09:20", endTime: "11:00", courseCode: "ECO0102", courseName: "Macroeconomia" },
      { day: "Quinta", startTime: "15:50", endTime: "17:30", courseCode: "DIR0102", courseName: "Direito Penal" },
      // Sexta
      { day: "Sexta", startTime: "07:30", endTime: "09:10", courseCode: "ECO0101", courseName: "Microeconomia" },
      { day: "Sexta", startTime: "11:10", endTime: "12:50", courseCode: "ADM0101", courseName: "Administração I" },
      { day: "Sexta", startTime: "17:40", endTime: "19:20", courseCode: "DIR0103", courseName: "Seminário Jurídico" },
    ],
  },
  {
    id: "005",
    name: "DID1 - 005",
    building: "Didática 1",
    capacity: 45,
    schedule: [
      // Segunda
      { day: "Segunda", startTime: "09:20", endTime: "11:00", courseCode: "PSI0101", courseName: "Psicologia Geral" },
      { day: "Segunda", startTime: "14:00", endTime: "15:40", courseCode: "SOC0101", courseName: "Sociologia I" },
      { day: "Segunda", startTime: "19:30", endTime: "21:10", courseCode: "FIL0101", courseName: "Filosofia I" },
      // Terça
      { day: "Terça", startTime: "07:30", endTime: "09:10", courseCode: "HIS0101", courseName: "História Contemporânea" },
      { day: "Terça", startTime: "11:10", endTime: "12:50", courseCode: "PSI0101", courseName: "Psicologia Geral" },
      { day: "Terça", startTime: "15:50", endTime: "17:30", courseCode: "SOC0102", courseName: "Antropologia" },
      // Quarta
      { day: "Quarta", startTime: "09:20", endTime: "11:00", courseCode: "PSI0101", courseName: "Psicologia Geral" },
      { day: "Quarta", startTime: "14:00", endTime: "15:40", courseCode: "SOC0101", courseName: "Sociologia I" },
      { day: "Quarta", startTime: "17:40", endTime: "19:20", courseCode: "HIS0101", courseName: "História Contemporânea" },
      { day: "Quarta", startTime: "21:15", endTime: "22:15", courseCode: "FIL0102", courseName: "Ética" },
      // Quinta
      { day: "Quinta", startTime: "07:30", endTime: "09:10", courseCode: "HIS0101", courseName: "História Contemporânea" },
      { day: "Quinta", startTime: "11:10", endTime: "12:50", courseCode: "SOC0102", courseName: "Antropologia" },
      { day: "Quinta", startTime: "19:30", endTime: "21:10", courseCode: "FIL0101", courseName: "Filosofia I" },
      // Sexta
      { day: "Sexta", startTime: "09:20", endTime: "11:00", courseCode: "PSI0102", courseName: "Psicologia Social" },
      { day: "Sexta", startTime: "14:00", endTime: "15:40", courseCode: "SOC0101", courseName: "Sociologia I" },
    ],
  },
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
