import { Tabs } from "expo-router";

export default function TabsLayout() {
 
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Inicio" }} />
      <Tabs.Screen name="explore" options={{ title: "Explorar" }} />
      <Tabs.Screen
        name="estudiantes/index"
        options={{ title: "Lista de Estudiantes" }}
      />
      <Tabs.Screen
        name="cursos/index"
        options={{ title: "Cursos" }}
      />
    </Tabs>
  );
 
}
