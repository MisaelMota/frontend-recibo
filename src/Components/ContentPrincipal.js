import React from 'react'
import ReciboImg from "../Assets/ReciboImg.svg"

const ContentPrincipal = () => {
  return (
   <>
    <div className='content-principalMenu-container'>
        <div className='content-principalMenu-slogan'>
          <h2>
            Crea tus recibos
            <br/>
            facil y rapido
          </h2>
          
          <p>
            Aplicación que crea recibos para tus inquilinos.
          </p>
        </div>

        <div className='content-principalMenu-image'>
          <img src={ReciboImg}/>
        </div>
      </div>

   </>
  )
}

export default ContentPrincipal