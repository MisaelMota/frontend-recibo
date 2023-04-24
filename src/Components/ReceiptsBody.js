import {Link} from "react-router-dom"
import React from 'react'
import "../Styles/ReceiptsBody.css"

const ReceiptsBody = ({ receipts }) => {
      const { id_cheque, inquilino_nombre, direccion_casa } = receipts

    return (
        <div className="Rbody-container">
            <div className="info-Rbody-container">
                <h3>{inquilino_nombre}</h3>
                <p>{direccion_casa}</p>
            </div>
            <div className="btn-Rbody-container">
                <Link to={`/private/editarRecibo/${id_cheque}`} className="link-Rbody-container">Editar</Link>
                <button className="borrar-Rbody-container">Borrar</button>
            </div>
        </div>
    )
}

export default ReceiptsBody