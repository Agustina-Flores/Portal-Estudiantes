import { Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {Curso} from "../types/Curso";

export default function CourseDetail() {
  const { id } = useLocalSearchParams();
  const [curso, setCurso] = useState<Curso | null>(null);

  useEffect(() => {
    if (!id) return;

    const cargarCurso = async () => {
      const res = await fetch(`http://192.168.100.107:3001/api/cursos/${id}`);
      const data = await res.json();
      setCurso(data);
    };

    cargarCurso();
  }, [id]);

  if (!curso) return <Text>Cargando...</Text>;

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>{curso.nombre}</Text>
      <Text style={{ marginTop: 15, fontSize: 18 }}>Docente: {curso.docente}</Text>
      <Text style={{ marginTop: 5, fontSize: 18 }}>Horarios: {curso.horarios}</Text>

      <Text style={{ marginTop: 15, fontSize: 20, fontWeight: "bold" }}>
        Programa:
      </Text>

      {curso.programa.map((p, index) => (
        <Text key={index} style={{ marginLeft: 10, fontSize: 16 }}>
          • {p}
        </Text>
      ))}
    </ScrollView>
  );
}