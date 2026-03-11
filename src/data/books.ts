export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  year: number;
  available: boolean;
  coverUrl: string;
  block: string; // e.g. "A", "B", "C", "D"
  shelf: number; // shelf number within block
  position: number; // position on shelf
  description: string;
}

export interface LibraryBlock {
  id: string;
  name: string;
  label: string;
  row: number;
  col: number;
  shelves: number;
}

export const libraryBlocks: LibraryBlock[] = [
  { id: "A", name: "Bloque A", label: "Ciencias", row: 0, col: 0, shelves: 4 },
  { id: "B", name: "Bloque B", label: "Literatura", row: 0, col: 1, shelves: 4 },
  { id: "C", name: "Bloque C", label: "Historia", row: 0, col: 2, shelves: 4 },
  { id: "D", name: "Bloque D", label: "Tecnología", row: 1, col: 0, shelves: 4 },
  { id: "E", name: "Bloque E", label: "Arte", row: 1, col: 1, shelves: 4 },
  { id: "F", name: "Bloque F", label: "Derecho", row: 1, col: 2, shelves: 4 },
];

export const sampleBooks: Book[] = [
  {
    id: "1",
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    category: "Literatura",
    isbn: "978-0-06-088328-7",
    year: 1967,
    available: true,
    coverUrl: "",
    block: "B",
    shelf: 1,
    position: 3,
    description: "Obra maestra del realismo mágico que narra la historia de la familia Buendía en el pueblo ficticio de Macondo.",
  },
  {
    id: "2",
    title: "El amor en los tiempos del cólera",
    author: "Gabriel García Márquez",
    category: "Literatura",
    isbn: "978-0-14-024489-4",
    year: 1985,
    available: true,
    coverUrl: "",
    block: "B",
    shelf: 1,
    position: 4,
    description: "Historia de amor que se desarrolla durante más de cincuenta años entre Florentino Ariza y Fermina Daza.",
  },
  {
    id: "3",
    title: "Introducción a los algoritmos",
    author: "Thomas H. Cormen",
    category: "Tecnología",
    isbn: "978-0-262-03384-8",
    year: 2009,
    available: true,
    coverUrl: "",
    block: "D",
    shelf: 2,
    position: 1,
    description: "Texto de referencia completo sobre algoritmos y estructuras de datos para estudiantes de informática.",
  },
  {
    id: "4",
    title: "Breve historia del tiempo",
    author: "Stephen Hawking",
    category: "Ciencias",
    isbn: "978-0-553-38016-3",
    year: 1988,
    available: false,
    coverUrl: "",
    block: "A",
    shelf: 3,
    position: 2,
    description: "Exploración accesible de los conceptos fundamentales de la cosmología y la física teórica.",
  },
  {
    id: "5",
    title: "El arte de la guerra",
    author: "Sun Tzu",
    category: "Historia",
    isbn: "978-1-59030-225-9",
    year: -500,
    available: true,
    coverUrl: "",
    block: "C",
    shelf: 1,
    position: 1,
    description: "Tratado militar chino escrito en el siglo V a.C., considerado el texto más antiguo sobre estrategia militar.",
  },
  {
    id: "6",
    title: "Física universitaria",
    author: "Sears & Zemansky",
    category: "Ciencias",
    isbn: "978-607-32-2471-0",
    year: 2013,
    available: true,
    coverUrl: "",
    block: "A",
    shelf: 1,
    position: 1,
    description: "Texto clásico de física para estudiantes universitarios que cubre mecánica, termodinámica y electromagnetismo.",
  },
  {
    id: "7",
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    category: "Literatura",
    isbn: "978-84-376-0757-3",
    year: 1605,
    available: true,
    coverUrl: "",
    block: "B",
    shelf: 2,
    position: 1,
    description: "La obra cumbre de la literatura en lengua española y una de las más destacadas de la literatura universal.",
  },
  {
    id: "8",
    title: "Derecho constitucional colombiano",
    author: "Vladimiro Naranjo Mesa",
    category: "Derecho",
    isbn: "978-958-35-0987-6",
    year: 2014,
    available: true,
    coverUrl: "",
    block: "F",
    shelf: 1,
    position: 2,
    description: "Análisis completo del sistema constitucional colombiano y sus instituciones jurídicas fundamentales.",
  },
  {
    id: "9",
    title: "Historia del arte",
    author: "Ernst Gombrich",
    category: "Arte",
    isbn: "978-0-7148-3247-4",
    year: 1950,
    available: true,
    coverUrl: "",
    block: "E",
    shelf: 1,
    position: 1,
    description: "Una de las obras más famosas y populares sobre la historia del arte, desde la antigüedad hasta la era moderna.",
  },
  {
    id: "10",
    title: "Ingeniería de software",
    author: "Ian Sommerville",
    category: "Tecnología",
    isbn: "978-607-32-2753-7",
    year: 2011,
    available: false,
    coverUrl: "",
    block: "D",
    shelf: 1,
    position: 2,
    description: "Texto fundamental sobre los principios y prácticas de la ingeniería de software moderna.",
  },
  {
    id: "11",
    title: "Cálculo de una variable",
    author: "James Stewart",
    category: "Ciencias",
    isbn: "978-607-52-2741-8",
    year: 2015,
    available: true,
    coverUrl: "",
    block: "A",
    shelf: 2,
    position: 1,
    description: "Texto de cálculo diferencial e integral ampliamente utilizado en universidades de habla hispana.",
  },
  {
    id: "12",
    title: "La Odisea",
    author: "Homero",
    category: "Literatura",
    isbn: "978-84-376-0208-0",
    year: -800,
    available: true,
    coverUrl: "",
    block: "B",
    shelf: 3,
    position: 1,
    description: "Poema épico griego que narra el viaje de regreso de Odiseo a su hogar en Ítaca tras la Guerra de Troya.",
  },
];
