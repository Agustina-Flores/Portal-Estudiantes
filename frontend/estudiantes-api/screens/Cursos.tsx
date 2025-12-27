import { useFetchCursos } from "@/hooks/useFetchCursos";
import { View,FlatList,StyleSheet,Text,TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Footer from "./Footer";
import { CursoCard } from "@/components/CursoCard"; 
import { useRouter } from "expo-router";
import { useState } from "react";
import { Buscador } from "@/components/Buscador";
 
export default function Cursos() {

   const { cursos } = useFetchCursos();
   const router = useRouter();
   const [busqueda, setBusqueda] = useState("");
 
   const filtrosCursos = cursos.filter(e =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase()) 
    );

   console.log("busqueda cursos" , busqueda);

    return(
        <LinearGradient
            colors={['#9b1bbd', '#350a3d']}
            style={styles.background}
              
            >
              <View style={styles.container}>
                 <Buscador
                  value={busqueda}
                  onChange={setBusqueda}
                  placeholder="Buscar cursos..."
                />
                <Text style={styles.title}>Cursos Disponibles</Text>
                 <FlatList
                    data={busqueda.trim() === "" ? cursos : filtrosCursos}
                    keyExtractor={(item) => item.id!.toString()}
                    renderItem={({ item }) => (
                    <CursoCard
                      curso={item}  
                    />
                  )}
                /> 
              </View>       
              
              <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(tabs)/estudiantes")}>
                <Text style={styles.backButtonText}>Volver</Text>
              </TouchableOpacity>
          <Footer></Footer>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    alignSelf: "center",
  },
   addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#825cff",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  addButtonText: {
    color: "white",
    fontSize: 35,
    marginTop: -3,
  },
  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "85%",
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 15,
  },
  modalTitle1: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2b2b2b",
    padding: 12,
    borderRadius: 10,
    color: "white",
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btnCancelar: {
    backgroundColor: "#555",
    padding: 12,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  btnGuardar: {
    backgroundColor: "#825cff",
    padding: 12,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
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