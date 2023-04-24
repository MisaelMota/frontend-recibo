import React, { useEffect, useRef, useState } from 'react'
import ReceiptsBody from './ReceiptsBody'
import "../Styles/Receipts.css"
import dataConexion from '../Data/dataConexion';
import jwtDecode from "jwt-decode"
import { useAuthContext } from '../Contexts/authContext';
import { useNavigate } from 'react-router-dom';


const Receipts = () => {
  const navigate = useNavigate();

  const navigateCreateR = () => {
    navigate('/private/crearRecibo')
  }

  const { LogOut } = useAuthContext();
  const datepicker = useRef(null);
  const [receipts, setReceipts] = useState([])
  const jwtAcs = window.localStorage.getItem("userAcss")

  const fetchReceipts = async () => {
    if (jwtAcs && jwtDecode(jwtAcs).exp > Date.now() / 1000) {
      const decode = jwtDecode(jwtAcs)
      console.log("hola estoy en fetch")

      const fetchedReceipts = await dataConexion.post("/listarRecibo", JSON.stringify({ id_usuario: decode.id }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        credentials: 'include'

      }).then(response => {
        setReceipts(response.data)
      }).catch(err => {
        console.log("no tiene recibos", err)
      })



    }
    else {
      console.log("token invalido")
      LogOut()
    }

  }


  useEffect(() => {
    fetchReceipts()
  }, [])


  return (
    <div>

      <div>
        <h1>Lista de recibos</h1>
      </div>

      <div className='btn-containerR' >
        <div onClick={() => datepicker.current.focus()}>
          <input type="date" ref={datepicker} className='date-picker' />
        </div>
        <div>
          <button type='sumbit' className='btn-createR' onClick={navigateCreateR}>Crear Recibo</button>
        </div>
      </div>

      <div className='receipts-cards-container'>
        {receipts.map(recep => (
          <ReceiptsBody
            key={recep.id_cheque}
            receipts={recep}
          />
        ))}
      </div>


    </div>
  )
}

export default Receipts