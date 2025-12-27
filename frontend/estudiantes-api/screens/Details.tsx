import { View, Text, Image,StyleSheet,TouchableOpacity} from "react-native";
import { Estudiante } from "@/types/Estudiante";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Curso } from "@/types/Curso";
 
export default function Details() {

  const { id } = useLocalSearchParams();
  const [estudiante, setEstudiante] = useState<Estudiante | null>(null);
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
      fetch(`http://192.168.100.107:3001/api/estudiantes/${id}`)
    .then(r => r.json())
    .then(data => setEstudiante(data));

  // Traer todos los cursos
  fetch("http://192.168.100.107:3001/api/cursos")
    .then(r => r.json())
    .then(data => setCursos(data));
  }, [id]);

   if (!estudiante) return <Text>Cargando...</Text>;

  const cursosIds = Array.isArray(estudiante.curso)
  ? estudiante.curso.map(n => Number(n))          // si es array -> convertir a números
  : estudiante.curso                               // si es un número
    ? [Number(estudiante.curso)]                   // vuelvo array
    : [];   

   const cursosDelEstudiante = cursos.filter(c =>
    cursosIds.includes(Number(c.id))
  );

  return (
      <View style={styles.container}>
         <View style={styles.card}> 
            <Text style={styles.title}>Detalle del Estudiante</Text> 
            {estudiante.imagen && (
              <Image
                source={{ uri: estudiante.imagen }}
                style={styles.image}
                resizeMode="cover"
              />
            )}
            <Text style={styles.text}>Nombre: {estudiante.nombre}</Text>
            <Text style={styles.text}>Cursos:</Text> 
              {cursosDelEstudiante.length === 0 && (
              <Text style={styles.data}>No tiene cursos asignados</Text>
            )}

            {cursosDelEstudiante.map(curso => (
              <TouchableOpacity
                key={curso.id}
                onPress={() =>
                  router.push({
                    pathname: "/cursos/[id]",
                    params: { id: String(curso.id) }
                  })
                }
              >
                <Text
                  style={[
                    styles.data,
                    { color: "#4da6ff", textDecorationLine: "underline" }
                  ]}
                >
                  • {curso.nombre}
                </Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.text}>Edad: {estudiante.edad}</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(tabs)/estudiantes")}>
                <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: "#110011",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
  backgroundColor: "#1a1a1a",
  width: "100%",
  borderRadius: 18,
  padding: 20,
  shadowColor: "#000",
  shadowOpacity: 0.4,
  shadowOffset: { width: 0, height: 3 },
  shadowRadius: 6,
  borderLeftWidth: 5,
  borderLeftColor: "#9b1bbd",
  },

  title: {
  fontSize: 24,
  fontWeight: "bold",
  color: "#fff",
  marginBottom: 20,
  textAlign: "center",
  },

  image: {
  width: 120,
  height: 120,
  borderRadius: 60,
  alignSelf: "center",
  marginBottom: 20,
  borderWidth: 2,
  borderColor: "#9b1bbd",
  },

  text: {
  fontSize: 18,
  color: "#ddd",
  marginBottom: 10,
  },

 data: {
  fontWeight: "bold",
  color: "#bb86fc",
  },

  backButton: {
  marginTop: 25,
  backgroundColor: "#9b1bbd",
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: "center",
  },

  backButtonText: {
  color: "white",
  fontSize: 18,
  fontWeight: "bold",
  },
});