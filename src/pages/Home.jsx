import React from 'react'
import Footer from '../components/Footer'
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
        <section  className=" flex justify-center items-center">
            <article>
                <div>
                    <img src="/images/pokedex.png" alt="" />
                </div>
                <div className="text-center mt-6"> 
                <h2 className='font-bold text-5xl text-[#FE1936]'>¡hello trainer!</h2>
                <p className=' mb-4 font-semibold mt-3'>Give me your name to start:</p>
                <form onSubmit={handleSubmit}>
                    <input id='nameTrainer' className="bg-[#FFFFFF] shadow-xl  p-2 px-10 border border-red-500" type="text" placeholder='Your name...'/>
                    <button className="bg-[#D93F3F] text-white py-2 px-4 transition duration-300 transform hover:scale-110 focus:scale-110 mt-4">Start!</button>
                </form>
                </div>
            </article>

        </section>
        {/* Footer */}
        <Footer />
    </section>
  )
}

export default Home