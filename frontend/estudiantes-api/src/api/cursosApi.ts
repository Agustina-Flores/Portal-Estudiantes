 import axios from "axios";
 import {Curso} from "../../types/Curso";

export const apiCliente = axios.create({
 // baseURL: "http://localhost:4000",  
  baseURL: "http://192.168.1.14:3001",
});

export const obtenerCursos = async (): Promise<Curso[]> => {
    const response = await apiCliente.get<Curso[]>("/cursos");
    console.log(response.data);
    return response.data;
}