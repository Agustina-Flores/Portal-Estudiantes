import axios from "axios";
import {Curso} from "../../types/Curso";
import { API_URL } from "@/config/api";

export const apiCliente = axios.create({
 // baseURL: "http://localhost:4000",  
  baseURL: API_URL,
});

export const obtenerCursos = async (): Promise<Curso[]> => {
    const response = await apiCliente.get<Curso[]>("/cursos");
    console.log(response.data);
    return response.data;
}