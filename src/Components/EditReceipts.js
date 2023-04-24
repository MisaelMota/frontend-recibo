import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import dataConexion from '../Data/dataConexion';
import jwtDecode from "jwt-decode"
import { useAuthContext } from '../Contexts/authContext';



const EditReceipts = () => {

  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const jwtAcs = window.localStorage.getItem("userAcss")
  const decode = jwtDecode(jwtAcs)
  const [tenants, setTetants] = useState([])
  const [direccions, setDireccions] = useState([])
  const [user, setUser] = useState([])
  const { LogOut } = useAuthContext();
  const isNumber = (value) => !isNaN(value);

  const { id_detalle } = useParams()


  const FetchReceipts = async (data, e) => {
    if (jwtAcs && jwtDecode(jwtAcs).exp > Date.now() / 1000) {
      console.log(decode)
      console.log("hola estoy en fetch")

      const fetchedReceipts = await dataConexion.post(`/reciboPorId/${id_detalle}`, JSON.stringify({ id_detalle: decode.id }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        credentials: 'include'

      }).then(response => {
        setTetants(response.data)
        console.log(response.data)
      }).catch(err => {
        console.log("no tiene inquilinos", err)
      })



    }
    else {
      console.log("token invalido")
      LogOut()
    }

  }

  const FetchTenants = async (data, e) => {
    if (jwtAcs && jwtDecode(jwtAcs).exp > Date.now() / 1000) {
      console.log(decode)
      console.log("hola estoy en fetch")

      const fetchedTenant = await dataConexion.post("/listarInquilinos", JSON.stringify({ usuario_rb: decode.id }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        credentials: 'include'

      }).then(response => {
        setTetants(response.data)
        console.log(response.data)
      }).catch(err => {
        console.log("no tiene inquilinos", err)
      })



    }
    else {
      console.log("token invalido")
      LogOut()
    }

  }

  const FetchDireccions = async (data, e) => {
    if (jwtAcs && jwtDecode(jwtAcs).exp > Date.now() / 1000) {
      console.log(decode)
      console.log("hola estoy en fetch")

      const fetchedDireccion = await dataConexion.post("/listarDirecciones", JSON.stringify({ usuario_rb: decode.id }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        credentials: 'include'

      }).then(response => {
        setDireccions(response.data)
        console.log(response.data)
      }).catch(err => {
        console.log("no tiene direcciones de casa", err)
      })



    }
    else {
      console.log("token invalido")
      LogOut()
    }

  }

  const FetchUser = async (data, e) => {
    if (jwtAcs && jwtDecode(jwtAcs).exp > Date.now() / 1000) {
      console.log(decode)
      console.log("hola estoy en fetch")

      const fetchedUser = await dataConexion.post("/usuarioPorId", JSON.stringify({ id_usuario: decode.id }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        credentials: 'include'

      }).then(response => {
        setUser(response.data)
        console.log(response.data)
      }).catch(err => {
        console.log("no tiene usuario", err)
      })



    }
    else {
      console.log("token invalido")
      LogOut()
    }

  }

  useEffect(() => {
    FetchTenants()
    FetchDireccions()
    FetchUser()
  }, [])





  return (
    <div>EditReceipts</div>
  )
}

export default EditReceipts