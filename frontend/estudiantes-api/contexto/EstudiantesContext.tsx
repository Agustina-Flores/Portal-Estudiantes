import { createContext, useEffect, useState , ReactNode} from "react";
import { obtenerEstudiantesApi, editarEstudianteApi,agregarEstudianteApi,eliminarEstudianteApi } from "../src/api/estudiantesApi";
import { Estudiante } from "../types/Estudiante"; 
import { EstudiantesContextType } from "../tipoContexto/EstudiantesContextTipe";

export const EstudiantesContext = createContext<EstudiantesContextType | undefined>(undefined);

export const EstudiantesProvider = ({ children }: { children: ReactNode }) => {

  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  // Cargar estudiantes al iniciar
  useEffect(() => {
    obtenerEstudiantesApi().then(setEstudiantes);
  }, []);

  // 👉 ESTE es el place correcto para ver cambios
  useEffect(() => {
    console.log("CAMBIARON estudiantes EDITAR:", estudiantes);
  }, [estudiantes]);

  const editarEstudiantes = async (id:string, estudiante: Estudiante) => { 
    
    const actualizado = await editarEstudianteApi(id, estudiante);
    console.log("actualizado despues de editar API:", actualizado);

     setEstudiantes(prev =>
    prev.map(e => (e.id === id ? actualizado : e)) // sin number
  );

  return actualizado;
    
};

 const agregarNuevoEstudiantes = async (nuevo: Omit<Estudiante, "id">) => {

  const creado = await agregarEstudianteApi(nuevo);

   console.log("credo" ,creado);

  setEstudiantes(prev => [...prev, creado]);

  return creado;
};

const eliminarEstudiantes = async (id: number | string) => {
  const idNumber = Number(id);

  await eliminarEstudianteApi(idNumber);

  // actualizar el estado local
  setEstudiantes(prev => prev.filter(e => Number(e.id) !== idNumber));
};
  return (
    <EstudiantesContext.Provider value={{
      estudiantes,
      editarEstudiantes,
      agregarNuevoEstudiantes,
      eliminarEstudiantes,
    }}>
      {children}
    </EstudiantesContext.Provider>
  );
};