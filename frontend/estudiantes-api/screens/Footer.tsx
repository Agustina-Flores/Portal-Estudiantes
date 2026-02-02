import { View, Text,StyleSheet} from "react-native"; 
import React from "react";

export default function Footer() {

    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 Portal de Estudiantes</Text>
            <Text style={styles.footerText}>Desarrollado por Agustina Flores</Text>
          </View>
    );
}

const styles = StyleSheet.create({
 footer:{
  marginTop: 40,
  paddingVertical: 18,
  alignItems: "center",
  opacity: 0.7,
},

footerText:{
  color: "#fff",
  fontSize: 15,
},

footerVersion:{
  color: "#fff",
  fontSize: 15,
  marginTop: 4,
  opacity: 0.6,
},

});