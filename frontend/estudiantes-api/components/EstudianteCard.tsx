import React from "react";
import { View, Text, StyleSheet,TouchableOpacity  } from "react-native";
import { Estudiante } from "@/types/Estudiante";
import { useRouter } from "expo-router";

type EstudianteCardProps = {
  estudiante: Estudiante;
  onEliminar: () => void;
  onEditar: () => void;
};

export const EstudianteCard = ({ estudiante, onEliminar, onEditar }: EstudianteCardProps) => {
  const router = useRouter();

  console.log("estudiante id", estudiante.id);
return (
   <View style={estilos.card}>
        <Text style={estilos.nombre}>Nombre: {estudiante.nombre}</Text>
        <Text style={estilos.info}>
          Cursos inscriptos: {estudiante.curso?.length ?? 0}
        </Text>
        <Text style={estilos.info}>Promedio: {estudiante.promedio}</Text>   
         <TouchableOpacity
            onPress={() => {
              if (!estudiante.id) return; 
              router.push({
                pathname: "/estudiantes/[id]",
                params: { id: String(estudiante.id) }
              });
            }}
         >
       <Text style={estilos.detalleBtnText}>Ver detalles</Text>
          </TouchableOpacity>
          
          <View style={estilos.accionesContainer}>
          <TouchableOpacity  style={estilos.botonAccion}>
            <Text style={estilos.accionTexto}
            onPress={onEditar}>✏️</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={onEliminar} 
            style={estilos.botonAccion}>
            <Text style={estilos.accionTexto}>🗑️</Text>
          </TouchableOpacity>

        </View>
  </View>
    ); 
 }

const estilos = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: "#9b1bbd",
    
  },
 nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f6f1f1",
  },

  info: {
    fontSize: 15,
    color: "#cfcfcf",
    marginTop: 4,
  },

  accionesContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
    gap: 10,
  },
  botonAccion: {
     width: 40,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 10, 
    justifyContent: "center",
    alignItems: "center",
  },
  accionTexto: {
    fontSize: 20, 
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 16,
    width: "80%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f6f1f1",
    marginBottom: 12,
  },
  cerrarBtn: {
    marginTop: 20,
    backgroundColor: "#9b1bbd",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  }, 
  detalleBtn: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#4F46E5", // violeta tipo indigo
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  detalleBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  }
});
