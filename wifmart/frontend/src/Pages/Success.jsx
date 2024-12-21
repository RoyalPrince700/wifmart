import React from 'react'
import SUCCESSIMAGE from '../assets/success.gif'
import { Link } from 'react-router-dom'


const Success = () => {
  return (
    <div  className=' w-full m-2 max-w-md mx-auto flex justify-center flex-col items-center'>
            <img src={SUCCESSIMAGE}
            
            width={250} height={150}
           className='mix-blend-multiply' />
           
              <p className='text-green-600 font-bold text-xl'>Payment Successful</p>
            <Link to={"/order"} className='p-2 px-3 font-semibold
             text-green-600 rounded border-2 border-green-600 mt-3
             hover:bg-green-600 hover:text-white '>See Order</Link>

           </div>
  )
}

export default Success