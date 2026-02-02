import { View,Text,StyleSheet,TouchableOpacity} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Curso } from "@/types/Curso";
import { useFocusEffect } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { router } from "expo-router";
import { API_URL } from "@/config/api";

export default function CoursesDetail() {
  
const { id } = useLocalSearchParams<{ id: string }>();
const [cursos, setCursos] = useState<Curso | null>(null);
const navigation = useNavigation();

  useFocusEffect(
        useCallback(() => {
          navigation.setOptions({
            tabBarStyle: { display: "none" },
          });
  
          return () => {
            navigation.setOptions({
              tabBarStyle: undefined,
            });
          };
        }, [])
  );

  
  useEffect(() => {
    if (!id) return; 

   // cursos
   fetch(`${API_URL}/cursos/${id}`)
  .then(r => r.json())
  .then(data => {
    console.log("cursos backend:", data);
    setCursos(data);
  });
  }, [id]);

  console.log("cursos detalle:", cursos);

  if (!cursos) return <Text>Cargando...</Text>;

  return (
        <View style={styles.container}>
           <View style={styles.card}> 
            <Text style={styles.title}>Detalle del Curso</Text> 
                  <Text style={styles.label}>Nombre</Text>
                  <Text style={styles.text}>{cursos.nombre}</Text>
                  <Text style={styles.label}>Duración</Text>
                  <Text style={styles.text}>{cursos.duracion}</Text>
                  <Text style={styles.label}>Descipcion</Text>
                  <Text style={styles.text}>{cursos.descripcion}</Text>
                  <Text style={styles.label}>Programa</Text>
                  {cursos.programa.map((item, index) => (
                  <Text key={index} style={styles.programa}>
                    • {item}
                  </Text>
                  ))}
                   <TouchableOpacity style={styles.backButton} 
                   onPress={() => router.push(`/(tabs)/estudiantes/${id}`)}>
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
label: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#bb86fc",
  marginTop: 10,
},
text: {
  fontSize: 16,
  color: "#ddd",
  marginBottom: 6,
},
programa: {
  fontSize: 15,
  color: "#ccc",
  marginLeft: 10,
  marginBottom: 4,
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