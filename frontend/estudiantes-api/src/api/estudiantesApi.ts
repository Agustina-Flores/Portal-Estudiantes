import axios from "axios";
import {Estudiante} from "../../types/Estudiante";

export const apiCliente = axios.create({
  //baseURL: "http://localhost:4000",
  baseURL: "http://192.168.1.14:3001",
});
 

export const obtenerEstudiantesApi = async (): Promise<Estudiante[]> => {
  const response = await apiCliente.get<Estudiante[]>("/estudiantes");
  console.log("datos", response.data);
  return response.data;
};

export const obtenerEstudiantesPorId = async (id: number) : Promise<Estudiante> => {
  const response = await apiCliente.get<Estudiante>(`/estudiantes/${id}`);
  console.log(response.data);
  return response.data;
};

export const agregarEstudianteApi = async (estudiante: Estudiante) : Promise<Estudiante> => {
  const response = await apiCliente.post<Estudiante>("/estudiantes", estudiante);
  console.log("nuevos datos", response.data);
  return response.data;
};

export const editarEstudianteApi = async (id: string , estudiante: Estudiante) : Promise<Estudiante> => {
  const response = await apiCliente.put<Estudiante>(`/estudiantes/${id}`, estudiante);
  console.log("datos a editar" , response.data);
  return response.data;
};

export const eliminarEstudianteApi  = async (id: number) => {
  const response = await apiCliente.delete(`/estudiantes/${id}`);
  console.log("dato eliminado" , response.data);
  return response.data;
};
