import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth"; // Actualiza la autenticación
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Firestore
import { motion } from "framer-motion";
import { auth, db } from "../components/firebase-config"; // Importar desde la carpeta 'components'
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirigir

function Profile() {
  const [user, setUser] = useState(null); // Agregar estado local para el usuario
  const [username, setUsername] = useState(""); // Nombre de usuario
  const [bio, setBio] = useState("Esta es mi biografía..."); // Biografía
  const [phone, setPhone] = useState("123-456-7890"); // Número de teléfono
  const [image, setImage] = useState(""); // Imagen de perfil
  const [editMode, setEditMode] = useState(false); // Estado de edición
  const [error, setError] = useState(""); // Mensajes de error
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  // Obtener el usuario actual desde Firebase Authentication
  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser); // Guardar usuario en el estado local

    if (currentUser) {
      const loadUserProfile = async () => {
        try {
          const userRef = doc(db, "users", currentUser.uid); // Accede al documento del usuario en Firestore
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            // Si el documento existe, carga los datos
            setUsername(docSnap.data().name || "");
            setBio(docSnap.data().bio || "Esta es mi biografía...");
            setPhone(docSnap.data().phone || "");
            setImage(docSnap.data().photoURL || "https://via.placeholder.com/400x400");
          } else {
            // Si no hay datos en Firestore
            setError("No se encontraron datos del perfil.");
          }
        } catch (err) {
          setError("Error al cargar el perfil: " + err.message);
        } finally {
          setLoading(false); // Detén el cargando una vez que se haya completado la carga
        }
      };

      loadUserProfile();
    } else {
      setLoading(false); // Detén la carga si no hay usuario autenticado
      setError("No estás autenticado.");
    }
  }, []); // El efecto solo se ejecuta una vez cuando el componente se monta

  // Función para cambiar la imagen de perfil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Guardar imagen seleccionada como URL temporal
    }
  };

  // Función para entrar en modo de edición
  const handleEditProfile = () => {
    setEditMode(true); // Activar modo de edición
  };

  // Función para guardar el perfil después de la edición
  const handleSaveProfile = async () => {
    if (!user) {
      setError("No estás autenticado.");
      return;
    }

    try {
      // Validación de los campos
      if (!username || !image) {
        setError("Por favor, completa todos los campos.");
        return;
      }

      // Log para ver el estado antes de guardar
      console.log("Guardando perfil...");
      console.log("Username:", username, "Bio:", bio, "Phone:", phone, "Image:", image);

      // Actualizar el perfil en Firebase Authentication
      await updateProfile(user, {
        displayName: username,
        photoURL: image,
      });

      // Verificar si la actualización fue exitosa
      console.log("Perfil actualizado en Firebase Authentication");

      // Guardar los datos en Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name: username,
        photoURL: image,
        bio,
        phone,
      });

      console.log("Perfil guardado en Firestore.");

      alert("Perfil actualizado correctamente.");

      // Actualiza los datos en el estado local para reflejar inmediatamente los cambios
      setUsername(username); // Asegurarse de que el nombre actualizado se mantenga
      setBio(bio); // Asegurarse de que la biografía actualizada se mantenga
      setPhone(phone); // Asegurarse de que el número actualizado se mantenga
      setImage(image); // Asegurarse de que la imagen actualizada se mantenga

      setEditMode(false); // Salir del modo de edición

      // Opcionalmente, redirigir al perfil actualizado
      // navigate("/profile"); // Redirige al perfil con los cambios aplicados

    } catch (err) {
      setError("Error al actualizar el perfil: " + err.message);
      console.error("Error al actualizar:", err.message); // Mensaje de error en consola
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <motion.div
      className="relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fondo de imagen sin opacidad */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-90"
        style={{
          backgroundImage: `url('/images/background-profile.jpg')`, // Ruta de la imagen de fondo
        }}
      ></div>

      <div className="flex justify-center items-center min-h-screen relative z-10 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          {/* Si hay error, mostrar el mensaje */}
          {error && <div className="text-red-500">{error}</div>}

          {/* Botón de editar en la esquina superior derecha */}
          {!editMode && (
            <button
              onClick={handleEditProfile}
              className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              Editar
            </button>
          )}

          {/* Formulario de perfil */}
          <div className="text-center">
            {/* Imagen de perfil */}
            <img
              src={image}
              alt=""
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            {/* El texto "Imagen de perfil" ha sido eliminado */}
            {/* Botón para cambiar imagen solo si estamos en modo de edición */}
            {editMode && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-4"
                />
              </>
            )}

            <div className="mb-4">
              <label className="block text-gray-700">Nombre de Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!editMode}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Biografía</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={!editMode}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Teléfono</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!editMode}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
            </div>

            {/* Botón de guardar */}
            {editMode && (
              <button
                onClick={handleSaveProfile}
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              >
                Guardar
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Profile;
