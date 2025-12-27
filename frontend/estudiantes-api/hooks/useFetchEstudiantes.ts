import { useEffect, useState } from "react";
import {obtenerEstudiantesPorId  } from "@/src/api/estudiantesApi";
import {Estudiante} from "../types/Estudiante";
  

export const useFetchEstudiantes  = () => {
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);  

    const obtenerEstudiante = async (id: number): Promise<Estudiante> => {
        const estudiantePorId = await obtenerEstudiantesPorId(id);
        return estudiantePorId;
    }
    return {obtenerEstudiante};
};