import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Details from "@/screens/Details";
import { useFetchEstudiantes } from "@/hooks/useFetchEstudiantes";
import { Estudiante } from "@/types/Estudiante";

export default function StudentsTab(){
  const { id } = useLocalSearchParams();
  const [estudiante, setEstudiante] = useState<Estudiante | null>(null);
  const { obtenerEstudiante } = useFetchEstudiantes();
  
  useEffect(() => {
    if (id) {
      cargar();
    }
  }, [id]);

  const cargar = async () => {
    const data = await obtenerEstudiante(Number(id));
    setEstudiante(data);
  };

  if (!estudiante) {
    return null;  
  }

  return <Details/>;
}