
export const useUpload = () => {
  const IP = "192.168.1.14";
  
    const subirImagen = async (imagenUri: string): Promise<string> => {
    const formData = new FormData();

    formData.append("file", {
      uri: imagenUri,
      name: "foto.jpg",
      type: "image/jpeg",
    } as any);

    console.log("SUBIENDO IP:", IP);

    const res = await fetch(`http://${IP}:3001/upload`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = await res.json();
    return data.url;
  };

  return { subirImagen };
};