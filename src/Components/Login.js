import React, { useRef, useState } from 'react'
import Logo from "../Assets/Logo.svg"
import { useForm } from "react-hook-form"
import { json, useNavigate } from 'react-router-dom';
import "../Styles/Login.css"
import dataConexion from '../Data/dataConexion';
import swal from 'sweetalert';
import PrincipalMenu from './PrincipalMenu';
import { useAuthContext } from '../Contexts/authContext';
import ReciboImg from "../Assets/ReciboImg.svg"

const Login = () => {

  const { UserLogin } = useAuthContext()

  const emailPattern = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/


  const { register, formState: { errors }, handleSubmit } = useForm();
  let history = useNavigate();






  return (
    <div className='principal-container'>


      <div className='form-login-container'>
        <div className='form-name-container'>
          <img className='img-logo' src={Logo} />
        </div>


        <form className='form-container' onSubmit={handleSubmit(UserLogin)}>

          <div className='input-login-container'>

            <label className='label-login'>Correo electronico</label>
            <input className='input-login'
              type="text"
              placeholder='example@gmail.com'
              {...register("correo_usuario", {
                required: true,
                pattern: emailPattern
              })}
            />
            {errors.correo_usuario?.type === "required" && <span className='form-error-message'>El correo es requerido</span>}
            {errors.correo_usuario?.type === "pattern" && <span className='form-error-message'>El correo tiene un formato incorrecto</span>}
          </div>

          <div className='input-login-container'>
            <label className='label-login'>Contraseña</label>
            <input className='input-login'
              type="password"
              {...register("contrasena", {
                required: true,
              })}
            />
            {errors.contrasena?.type === "required" && <span className='form-error-message'>La contraseña es requerida</span>}
          </div>

          <div className='btn-container'>
            <button type='sumbit' className='btn-login'>Iniciar sesión</button>
          </div>

        </form>

      </div>

      <div className='image-login'>
          <img src={ReciboImg}/>
        </div>

    </div>

  )
}

export default Login
