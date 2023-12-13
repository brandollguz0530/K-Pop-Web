import React from 'react'
import { setNameTrainer } from '../slices/nameTrainer.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.nameTrainer.value))
        navigate("/pokedex")
    }


  return (
    <section className='min-h-screen grid grid-rows-[1fr_auto]'>
        {/* Parte superior  */}
        <section  className="flex justify-center items-center">
            <article>
                <div className="flex justify-center items-center">
                    <img src="/images/K-POP.jpg" alt="" className="w-[350px] h-[250px]"/>
                </div>
                <div className="text-center mt-6"> 
                <h2 className='text-5xl font-bold bg-gradient-to-l from-orange-500 to-yellow-400 bg-clip-text text-transparent'>¡Primera convención nacional de Fandoms!</h2>
                <h2 className='text-3xl font-bold bg-gradient-to-l from-orange-500 to-yellow-400 bg-clip-text text-transparent'>Costa Rica </h2>
                <p className=' mb-4 font-bold mt-3 bg-gradient-to-l from-orange-500 to-yellow-400 bg-clip-text text-transparent'>Ingresa tu nombre para empezar:</p>
                <form onSubmit={handleSubmit}>
                    <input id='nameTrainer' className="bg-[#FFFFFF] shadow-xl  p-2 px-10 border border-orange-500" type="text" placeholder='Tu nombre aca...'/>
                    <button className="bg-orange-500 text-white py-2 px-4 transition duration-300 transform hover:scale-110 focus:scale-110 mt-4">comenzar !</button>
                </form>
                </div>
            </article>

        </section>
    </section>
  )
}

export default Home