import React from "react";
import { Slot } from "expo-router"; 
import { ToastProvider } from "react-native-toast-notifications";
import { EstudiantesProvider } from "@/contexto/EstudiantesContext";

export default function RootLayout() {
  return (
    <EstudiantesProvider>
    <ToastProvider
        placement="top"
        successColor="#4caf50"
        dangerColor="#ff5252"
        warningColor="#ffca28"
        textStyle={{ fontSize: 25 }}
    >
      <Slot />
    </ToastProvider>
    </EstudiantesProvider>
  );
}
