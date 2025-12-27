import React from "react";
import { View, Text, Image,StyleSheet,TouchableOpacity} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import Footer from "./Footer";
import { useWindowDimensions } from "react-native";

export default function Home() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (

<LinearGradient
  colors={['#9b1bbd', '#350a3dff']}
  start={{ x: 0, y: 0 }}
  end={{ x: 0, y: 1 }}
  style={styles.background}
>
  <View style={styles.container}>
    <View style={styles.card}>

  {/* Imagen SOLO mobile */}
  {isMobile && (
    <Image
      source={require("../assets/inicio.jpg")}
      style={styles.image}
      resizeMode="cover"
    />
  )}

  <View style={styles.left}>
    <Text style={styles.bienvenido}>Bienvenidos al</Text>
    <Text style={styles.title}>Portal de Estudiantes</Text>
    <Text style={styles.subtitle}>
      Administrá estudiantes y cursos de forma sencilla
    </Text>

    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/(tabs)/estudiantes")}
    >
      <Text style={styles.buttonText}>Ver Estudiantes</Text>
    </TouchableOpacity>
  </View>

</View>
  </View> 
   <Footer></Footer>
</LinearGradient>

  );
}


const styles = StyleSheet.create({
  background:{
    flex: 1,
  },

  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card:{
    width: "90%",
    backgroundColor: "black",
    borderRadius: 20,
    overflow: "hidden",

    minHeight: 260, // 👈 CLAVE
    
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },

  left:{  
  padding: 20,  
  },

  right:{ 
  flex: 1.2
  
  },

  bienvenido:{ 
  fontSize: 20,
  color: "#7e6e6efe",
  marginBottom: 6
  },

  title:{ 
  fontSize: 23,
  fontWeight: "bold",
  color: "#f6f1f1fe",
  marginBottom: 10
  },

  subtitle:{ 
  fontSize: 15,
  color: "#f6f1f1fe",
  marginBottom: 25
  },

  button:{
    backgroundColor: "#825cff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignSelf: "stretch",
    alignItems: "center",
  },

  buttonText:{ 
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },

  image:{ 
     width: "100%",
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
 
});
 