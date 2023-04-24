import { createContext, useState, useCallback, useMemo, useContext } from "react";
import dataConexion from '../Data/dataConexion';
import swal from 'sweetalert';
import PropTypes from "prop-types";

export const AuthContext = createContext();


export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(window.localStorage.getItem("userAcss") ?? false);
  console.log (isAuthenticated)
  

  // usar useCallback para que sean funciones que no dependan del renderizado general.
  const UserLogin = useCallback(async (data, e) => {
    e.preventDefault()
    try {
      const response = await dataConexion.post("/postLogin", JSON.stringify({ ...data }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          credentials: 'include'

        }

      ).then((respuesta) => {
        console.log(respuesta.data.jtName)
        console.log(respuesta.data.userAcss)
        if (typeof respuesta.data.jtName === 'undefined' || typeof respuesta.data.userAcss === 'undefined') {
          swal({
            title: "Correo incorrecto",
            text: "Es Probable que estes ingresando un correo incorrecto, por favor ingresa las credenciales nuevamente",
            icon: "error",
            buttons: "Ok",

          })
        } else {

          swal({
            title: "inicio de sesión satisfactorio",
            icon: "success",
            buttons: "Ok",

          })
          window.localStorage.setItem(respuesta.data.jtName, respuesta.data.userAcss);
          console.log("se ha establecido el token!!")
          setIsAuthenticated(true)
        }

      })



    } catch (error) {
      if (error.request.status === 500) {
        swal({
          title: "Ocurrio un error",
          text: "Correo o Contraseña incorrectos, ingrese sus credenciales nuevamente",
          icon: "error",
          button: "Ok",
        })

      }
      console.log(error)
    }

  }, []);


  const LogOut = useCallback(() => {
    window.localStorage.removeItem("userAcss")
    setIsAuthenticated(false);
  }, []);

  // useMemo para guardar los valores del login
  const valueMem = useMemo(() => ({
    UserLogin,
    LogOut,
    isAuthenticated
  }), [UserLogin, LogOut, isAuthenticated])

  return <AuthContext.Provider value={valueMem}>{children}</AuthContext.Provider>
}

AuthContextProvider.propTypes = {
  children: PropTypes.object
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}