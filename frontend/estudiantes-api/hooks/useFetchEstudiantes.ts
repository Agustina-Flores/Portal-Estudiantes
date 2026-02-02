 
import {obtenerEstudiantesPorId  } from "@/src/api/estudiantesApi";
import {Estudiante} from "../types/Estudiante";
  

export const useFetchEstudiantes  = () => {  

    const obtenerEstudiante = async (id: number): Promise<Estudiante> => {
        return await obtenerEstudiantesPorId(id); 
    }
    return {obtenerEstudiante};
};