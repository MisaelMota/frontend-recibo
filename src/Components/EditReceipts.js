import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import dataConexion from '../Data/dataConexion';
import { useForm } from "react-hook-form"
import ReceiptComp from './ReceiptComp';
import swal from 'sweetalert';
import jwtDecode from "jwt-decode"
import { bool } from 'prop-types';
const EditReceipts = () => {



  const { reset } = useForm()
  const { id } = useParams()
  const title = "Editar Recibo"
  const jwtAcs = window.localStorage.getItem("userAcss")
  const decode = jwtDecode(jwtAcs)
  const [active, setActive] = useState(Boolean)
  console.log(id)

  const SaveEditReceipts = async (data, e) => {
    e.preventDefault();


    const formData = { ...data, id_usuario: decode.id }
    console.log(formData)
    try {
      const response = await dataConexion.put(`/editarRecibo/${id}`,formData,

        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${jwtAcs}`
          },
          withCredentials: true,
          credentials: 'include',


        }
      ).then(() => {
        swal({
          title: "El recibo se ha actualizado correctamente",
          icon: "success",
          buttons: "OK"
        })
      })
    } catch (error) {
      if (error.request.status === 500) {
        swal({
          title: "Ocurrio un error",
          text: "ingrese los datos nuevamente",
          icon: "error",
          button: "Ok",
        })

      }
      console.log(error)

    }
  }


  useEffect(() => {
    setActive(true)
  }, [])
  console.log(active)


  return (
    <div>
      <ReceiptComp
        functionReceipt={SaveEditReceipts}
        title={title}
        idReceipt={id}
        dataReceipt={active}
      />
    </div>
  )
}

export default EditReceipts
