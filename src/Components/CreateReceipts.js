import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import dataConexion from '../Data/dataConexion';
import jwtDecode from "jwt-decode"
import ReceiptComp from './ReceiptComp';

const CreateReceipts = () => {


    const jwtAcs = window.localStorage.getItem("userAcss")
    const decode = jwtDecode(jwtAcs)
    const title="Nuevo Recibo"

    const SaveReceipts = async (data, e) => {
        e.preventDefault();


        const formData = { ...data, id_usuario: decode.id }
        console.log(formData)
        try {
            const response = await dataConexion.post("/reciboSave", formData,

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
                    title: "El recibo se ha guardado correctamente",
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

    return (
       <ReceiptComp
        functionReceipt={SaveReceipts}
        title={title}
       />
    )
}

export default CreateReceipts
