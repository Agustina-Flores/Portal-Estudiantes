import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface Props {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}


export const Buscador = ({ value, onChange, placeholder }: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || "Buscar..."}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 16,      
    marginBottom: 12,
  },
  input: {
     backgroundColor: "white",
    height: 50,         
    paddingHorizontal: 16,
    borderRadius: 14,
    fontSize: 16,
    color: "#000",
    elevation: 4,     
    shadowColor: "#000", 
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
});
