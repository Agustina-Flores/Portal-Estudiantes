import { Estudiante } from "../types/Estudiante"; 

export type EstudiantesContextType = {
  estudiantes: Estudiante[];
  editarEstudiantes: (id: string, estudiante: Estudiante) => Promise<Estudiante>;
  agregarNuevoEstudiantes: (nuevo: Estudiante) => Promise<Estudiante>;
  eliminarEstudiantes: (id: number ) => void;
};