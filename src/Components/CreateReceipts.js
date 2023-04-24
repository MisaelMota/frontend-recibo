import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import dataConexion from '../Data/dataConexion';
import jwtDecode from "jwt-decode"
import { useAuthContext } from '../Contexts/authContext';

const CreateReceipts = () => {

    const { register, formState: { errors }, handleSubmit } = useForm()
    const jwtAcs = window.localStorage.getItem("userAcss")
    const decode = jwtDecode(jwtAcs)
    const [tenants, setTetants] = useState([])
    const [direccions, setDireccions] = useState([])
    const [user, setUser] = useState([])
    const { LogOut } = useAuthContext();
    const isNumber = (value) => !isNaN(value);


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



    const onSubmit = (data) => {
        const additionalData = {
            id_usuario: decode.id
        }

        const formData = { ...data, ...additionalData }

        console.log(formData);
    }



    return (
        <div className='create-principal-container'>
            <h1>Nuevo Recibo</h1>
            <form onSubmit={handleSubmit(SaveReceipts)}>
                <div className='create-receipts-container'>

                    <header className='create-header-receipts'>
                        <h2>Recibo</h2>
                        <input type="date"
                            {...register("fecha", {
                                // valueAsDate: true,
                                // validate:isDateValid
                                required: true

                            })}
                            name="fecha"
                        />
                    </header>
                    {errors.fecha && <span className='form-error-message'>Ingresa una fecha</span>}
                    <div className='create-dataP-recreipts'>
                        <div className='create-dataP-detail'>
                            <h4>ENTREGADO A:</h4>
                            <select className='create-input-entregado'
                                {...register("recibi_de", {
                                    valueAsNumber: true,
                                    validate: isNumber

                                })}

                            >
                                <option value=""></option>
                                {tenants.map(tenant => (
                                    <option key={tenant.id_inquilino} value={tenant.id_inquilino}>{tenant.Nombre_Completo}</option>
                                ))}
                            </select>
                        </div>
                        {errors.recibi_de && <span className='form-error-message'>Selecciona una opción</span>}
                        <div className='create-dataP-detail'>
                            <h4>DIRECCIÓN:</h4>
                            <select className='create-input-entregado'
                                {...register("id_casa", {
                                    valueAsNumber: true,
                                    validate: isNumber
                                })}
                            >
                                <option value=""></option>
                                {direccions.map(direccion => (
                                    <option key={direccion.id_casa} value={direccion.id_casa}>{direccion.direccion_casa}</option>
                                ))}
                            </select>
                        </div>
                        {errors.id_casa && <span className='form-error-message'>Selecciona una opción</span>}

                        <div className='create-dataP-detail'>
                            <h4>LA SUMA:</h4>
                            <input className='create-input-suma' type="number"
                                {...register("suma_de", {
                                    valueAsNumber: true,
                                    validate: isNumber

                                })}
                                min={0}
                            />
                        </div>
                        {/* {errors.suma_de?.type === "required" && <span className='form-error-message'>Ingresa un monto</span>} */}
                        {errors.suma_de && <span className='form-error-message'>Ingresa un monto</span>}


                        <div className='create-dataP-detail'>
                            <h4>POR CONCEPTO:</h4>
                            <input className='create-input-concepto' type="text"
                                {...register("concepto_de", {
                                    required: true,
                                    maxLength: 100
                                })}
                            />
                        </div>
                        {errors.concepto_de?.type === "required" && <span className='form-error-message'>Ingresa un concepto</span>}
                        {errors.concepto_de?.type === "maxLength" && <span className='form-error-message'>Ha exedido el maximo de caracteres</span>}

                        <div className='create-dataP-detail'>
                            <h4 className='create-input-title'>TITULAR:</h4>
                            {user.map(user => (
                                <input
                                    readOnly
                                    value={user.nombre_completo}
                                    className='create-input-signature' type="text"
                                    key={user.id_usuario}
                                />
                            ))}

                        </div>

                    </div>



                </div>
                <div className='btn-container'>
                    <button type='sumbit' className='btn-save'>Guardar</button>
                </div>

            </form>
        </div>
    )
}

export default CreateReceipts
