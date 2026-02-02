import { Curso } from "@/types/Curso";
import { View,Text,StyleSheet,Image} from "react-native";

type CursoCardProps = {
    curso : Curso; 
};

export const iconMap: Record<string, any> = {
  react: require('../assets/iconos/react.png'),
  angular: require('../assets/iconos/angular.png'),
  nodejs: require('../assets/iconos/nodejs.png'),
  csharp: require('../assets/iconos/csharp.png'),
  sql: require('../assets/iconos/sql.png'),
  qa: require('../assets/iconos/qa.png'),
  python: require('../assets/iconos/python.png'),
  postman: require('../assets/iconos/postman.png'),
  postgresql: require('../assets/iconos/postgresql.png'),
  mongo: require('../assets/iconos/mongo.png'),
  math: require('../assets/iconos/math.png'),
  java: require('../assets/iconos/java.png'),
  english: require('../assets/iconos/english.png'),
  c: require('../assets/iconos/c.png'),
  algebra: require('../assets/iconos/algebra.png'),
  git: require('../assets/iconos/git.png'),
  disenio: require('../assets/iconos/disenio.png'),
  baseDatos: require('../assets/iconos/baseDatos.png'),
  js: require('../assets/iconos/js.png'), 
  go: require('../assets/iconos/go.png'),
};

export const CursoCard = ({ curso }: CursoCardProps) => {

     return (
        <View style={estilos.card}>
          <View style={estilos.iconoContainer}>
          {iconMap[curso.icono] && (
            <Image
              source={iconMap[curso.icono]}
              style={{ width: 50, height: 50, marginBottom: 10 }}
            />
          )}
          </View>
            <Text style={estilos.nombre}>Nombre: {curso.nombre}</Text>
            <Text style={estilos.info}>Curso: {curso.descripcion}</Text>
            <Text style={estilos.info}>Duracion: {curso.duracion}</Text>  
        </View>
   ); 
}

const estilos = StyleSheet.create({
card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 18,
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
iconoContainer: {
  marginBottom: 8,      
  alignSelf: "flex-start",  
} 
});