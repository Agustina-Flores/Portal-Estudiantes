import { obtenerCursos} from "@/src/api/cursosApi";
import {Curso} from "../types/Curso";
import { useEffect, useState } from "react";

export const useFetchCursos  = () => {

    const [cursos, setCursos] = useState<Curso[]>([]); 

     useEffect(() => {
             const cargarCursos = async ()=> {
                 const response = await obtenerCursos();
                 setCursos(response);
             };
             cargarCursos();
         }, []);
   
    return { cursos};

}; 