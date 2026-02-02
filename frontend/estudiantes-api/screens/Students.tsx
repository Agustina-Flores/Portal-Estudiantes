import { useState } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Modal, TextInput  } from "react-native";
import { EstudianteCard } from "@/components/EstudianteCard";
import { LinearGradient } from 'expo-linear-gradient';
import { useToast } from "react-native-toast-notifications";
import { Estudiante } from "@/types/Estudiante";
import { useRouter } from "expo-router";
import { useEstudiantes } from "../hooks/useEstudiantes";
import { Buscador } from "@/components/Buscador";
import { useFetchCursos } from "../hooks/useFetchCursos";
import Checkbox from 'expo-checkbox'; 
import { useFocusEffect } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export default function Students() {

  const toast = useToast();
  const { estudiantes, editarEstudiantes,agregarNuevoEstudiantes,eliminarEstudiantes } = useEstudiantes();
  const [modalAgregarVisible, setModalAgregarVisible] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState<number | null>(null);
  const [estudianteEnEdicion, setEstudianteEnEdicion] = useState<Estudiante | null>(null);
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");
  const [promedio, setPromedio] = useState(""); 
  const [edad, setEdad] = useState(""); 
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const { cursos } = useFetchCursos();
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [cursosEditar, setCursosEditar] = useState<number[]>([]);
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
   
  const handleAgregar = async () => {
    const ultimoId = estudiantes.length > 0
    ? Number(estudiantes[estudiantes.length - 1].id)
    : 0;
 
    const nuevoParaEnviar =({ 
      id: String(ultimoId + 1),
      nombre,
      curso : seleccionados,
      promedio: Number(promedio), 
    });

    console.log("antes de agregar" , nuevoParaEnviar);
    const nuevoEstudiante = await agregarNuevoEstudiantes(nuevoParaEnviar);

    setNombre("");
    setCurso("");
    setPromedio("");
    setEdad("");
    setModalAgregarVisible(false);

    console.log("nuevo estudiante ya listo" , nuevoEstudiante);
    toast.show(`Estudiante creado: ${nuevoEstudiante.nombre} correctamente`, {
      type: "success",
      duration: 4000,
      placement: "top",
      style: {
        backgroundColor: "#4caf50",
        padding: 15,
        borderRadius: 12,
      },
      textStyle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white"
      }
    });
  }

  const abrirConfirmacion = (id: any ) => {
  setIdAEliminar(id);
  setMostrarConfirmacion(true);
  };

  const confirmarEliminar = async () => {
  if (idAEliminar !== null) {
    try {
      await handleEliminar(idAEliminar);
      toast.show("Estudiante eliminado", { type: "success" });
    } catch {
      toast.show("Error al eliminar", { type: "danger" });
    }
  }
  setMostrarConfirmacion(false);
  };

  const handleEliminar  = async (id: number) => {
    try {
      await eliminarEstudiantes(id);
      toast.show("Estudiante eliminado correctamente", { type: "success" });
     
    } catch {
      toast.show("Error al eliminar", { type: "danger" });
    }
  } 
 
  const actualizarCampo = (campo: keyof Estudiante, valor: any) => {
    
   if (campo === "id") return;

    setEstudianteEnEdicion(prev => ({
      ...(prev as Estudiante),
      [campo]: valor
    }));

  console.log(" actualizar campo" , estudianteEnEdicion);
  };
 
  const actualizarEstudiante = async (estudiante:Estudiante) => {

    console.log(" actualizar Estudiante antes" , estudianteEnEdicion);
    setCursosEditar(estudiante.curso ?? []); 

    setEstudianteEnEdicion({
    ...estudiante,
    id: String(estudiante.id), 
    edad: estudiante.edad ? Number(estudiante.edad) : undefined,
    promedio: Number(estudiante.promedio)
    });
    
    console.log(" actualizar Estudiante despues" , estudianteEnEdicion);
    setModalEditarVisible(true);
  }

  const guardarCambios = async () => { 
    try {
      if (!estudianteEnEdicion?.id) {
        console.error("El estudiante no tiene ID");
        return;
      }
    
      const estudianteParaEnviar = {
          ...estudianteEnEdicion,
          id: String(estudianteEnEdicion.id),
          edad: estudianteEnEdicion.edad ? Number(estudianteEnEdicion.edad) : undefined,
          promedio: Number(estudianteEnEdicion.promedio),
          curso: cursosEditar, 
        };
    
    await editarEstudiantes(
      estudianteParaEnviar.id,
      estudianteParaEnviar
    );

    console.log("estudiante a editar", estudianteParaEnviar);
    setModalEditarVisible(false);
      
    } catch (error) {
      console.error(error);
    }
  };

  const toggleCurso = (id: number) => {
      setSeleccionados(prev =>
        prev.includes(id)
          ? prev.filter(c => c !== id)
          : [...prev, id]
      );
      console.log("cursos seleccionados" , seleccionados);
  };

  const toggleCursoEditar = (id: number) => {
      setCursosEditar(prev =>
        prev.includes(id)
          ? prev.filter(c => c !== id)
          : [...prev, id]
      );
        console.log("Cursos Editar" , cursosEditar);
  }; 

  const filtrosEstudiantes = estudiantes.filter(e =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase()) 
  );
 

  return (

    <LinearGradient
      colors={['#9b1bbd', '#350a3d']}
      style={styles.background}
    >
       <View style={styles.container}>
        <View style={styles.header}>
           <Text style={styles.title}>Estudiantes</Text>       
          <Buscador
            value={busqueda}
            onChange={setBusqueda}
            placeholder="Buscar estudiante..."
          />
         </View>
         <FlatList
          data={busqueda.trim() === "" ? estudiantes : filtrosEstudiantes}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={({ item }) => (
            <EstudianteCard 
              estudiante={item} 
              onEliminar={() => abrirConfirmacion(item.id!)}
              onEditar={() => actualizarEstudiante(item)}
            />
          )}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalAgregarVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <Modal visible={modalAgregarVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle1}>Agregar Estudiante</Text>             
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#ccc"
                value={nombre}
                onChangeText={setNombre}
              />
             {cursos.map(curso => (
                  <View 
                    key={curso.id} 
                    style={{ flexDirection: "row", alignItems: "center", marginVertical: 4 }}
                  >
                    <Checkbox
                      value={seleccionados.includes(curso.id!)}
                      onValueChange={() => toggleCurso(curso.id!)}
                      color="#9b1bbd"
                    />

                    <Text style={{ color: "white", marginLeft: 8 }}>
                      {curso.nombre}
                    </Text>
                  </View>
                ))}
              <TextInput
                style={styles.input}
                placeholder="Edad"
                keyboardType="numeric"
                placeholderTextColor="#ccc"
                value={edad}
                onChangeText={setEdad}
              />

              <TextInput
                style={styles.input}
                placeholder="Promedio"
                keyboardType="numeric"
                placeholderTextColor="#ccc"
                value={promedio}
                onChangeText={setPromedio}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.btnCancelar}
                  onPress={() => setModalAgregarVisible(false)}>
                  <Text style={styles.btnText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnGuardar}
                  onPress={handleAgregar}>
                  <Text style={styles.btnText}>Guardar</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>

        <Modal
          transparent
          visible={mostrarConfirmacion}
          animationType="fade"
        >
          <View style={styles.overlay}>
            <View style={styles.modalContent}>

              <Text style={styles.modalTitle}>¿Eliminar estudiante?</Text>
              <Text style={styles.modalMessage}>
                Esta acción no se puede deshacer.
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setMostrarConfirmacion(false)}
                >
                  <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => confirmarEliminar()}
                >
                  <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>   

        <Modal visible={modalEditarVisible} animationType="slide" transparent={true}>
           <View style={styles.modalContainer}> 
          <View style={styles.modalCard}>

          <Text style={styles.modalTitle1}>Editar estudiante</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={estudianteEnEdicion?.nombre}
            onChangeText={(t) => actualizarCampo("nombre", t)}
          />
          {cursos.map(curso => (
            <View 
              key={curso.id} 
              style={{ flexDirection: "row", alignItems: "center", marginVertical: 4 }}
            >
              <Checkbox
                value={cursosEditar.includes(curso.id!)}
                onValueChange={() => toggleCursoEditar(curso.id!)}
                color="#9b1bbd"
              />
              <Text style={{ color: "white", marginLeft: 8 }}>
                {curso.nombre}
              </Text>
            </View>
          ))}
          <TextInput
              style={styles.input}
              placeholder="Edad"
              keyboardType="numeric"
              value={String(estudianteEnEdicion?.edad)}
              onChangeText={(t) => actualizarCampo("edad", Number(t))}
          />

          <TextInput
              style={styles.input}
              placeholder="Promedio"
              keyboardType="numeric"
              value={String(estudianteEnEdicion?.promedio)}
              onChangeText={(t) => actualizarCampo("promedio", Number(t))}
          />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.btnCancelar}
                 onPress={() => setModalEditarVisible(false)}>
                  <Text style={styles.btnText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.btnGuardar}
                onPress={guardarCambios}
              >
                <Text style={styles.btnText}>Guardar Cambios</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
        </Modal> 
          
       <TouchableOpacity
        style={styles.verCursosBtn}
        onPress={() => router.push("/(tabs)/cursos")}
      >
        <Text style={styles.verCursosText}>Ver todos los cursos</Text>
      </TouchableOpacity>
      </View>   
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
   flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 34,
    paddingBottom: 120,
  },
  header: {
    width: "100%",
    marginTop: 50,     
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,   
    alignSelf: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#7c6cff",
    width: 50,
    height: 50,
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
    fontSize: 30,
    marginTop: -2,
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

  //modal eliminar
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
      width: "80%",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 12,
      elevation: 6, // Android sombra
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 2 }, // iOS sombra
      alignItems: "center",
  },

  modalTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 10,
      textAlign: "center",
      color: "#222",
  },

  modalMessage: {
  fontSize: 15,
  color: "#555",
  textAlign: "center",
  marginBottom: 20,
  },

  buttonRow: {
  flexDirection: "row",
    width: "100%",
  justifyContent: "space-between",
  },

  cancelButton: {
  flex: 1,
  paddingVertical: 10,
  marginRight: 8,
  backgroundColor: "#e6e6e6",
  borderRadius: 8,
  alignItems: "center",
  },

  cancelText: {
  color: "#333",
  fontWeight: "500",
  },

  deleteButton: {
  flex: 1,
  paddingVertical: 10,
  marginLeft: 8,
  backgroundColor: "#ff3b30",
  borderRadius: 8,
  alignItems: "center",
  },

  deleteText: {
  color: "#fff",
  fontWeight: "600",
  },

  verCursosBtn: {
  marginTop: 20,
  backgroundColor: "#4a90e2",
  paddingVertical: 12,
  paddingHorizontal: 28,
  borderRadius: 10,
  alignItems: "center",
  alignSelf: "center",
  },
  verCursosText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
  },
  btnSeleccionar: {
  backgroundColor: "#3b82f6", // azul lindo (Tailwind blue-500 style)
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 10,
  alignSelf: "center",
  marginBottom: 15,

  // sombra leve para levantar el botón visualmente
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 4,
},
});