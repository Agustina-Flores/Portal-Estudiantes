import { createContext, ReactNode, useContext,useState } from "react"

type StudentsContextType = {
  estudiantes: any[];
  setEstudiantes: React.Dispatch<React.SetStateAction<any[]>>;
};

const contextoEstudiantes = createContext<StudentsContextType | undefined>(undefined);

export const ProveedoresEstudiantes =  ({ children } :{ children : ReactNode}) => 
{
    const [estudiantes, setEstudiantes] = useState<any[]>([]);


    return(
        <contextoEstudiantes.Provider value={{estudiantes,setEstudiantes}}>
            { children }
        </contextoEstudiantes.Provider>
    );
};

export const useEstudiantes = () => { 
    const contexto = useContext(contextoEstudiantes);
    if (!contexto) {
        throw new Error("useStudents debe usarse dentro de StudentsProvider")
    }
    return contexto;
 }