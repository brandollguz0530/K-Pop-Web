import React from 'react'
import { useDispatch } from 'react-redux'
import { setNameTrainer } from '../../slices/nameTrainer.slice'



const Header = () => {

  const dispatch = useDispatch()

  const handleClickLogout = () => {
        dispatch(setNameTrainer(""))
  }

  return (
    <header> 
    <section className=' relative'>
        <div className=' h-14 bg-red-600 grid items-end '>
            <div className='ml-2 max-w-[200px] sm:max-w-[300px]  sm:ml-10'> 
            <img src="/images/pokedex.png" alt="" />
            </div>
        </div>

        <div className=' h-10 bg-black'></div>

        <div className=' h-[70px] aspect-square rounded-full bg-white border-[8px] border-black absolute -bottom-3 right-0 -translate-x-1/2 after:content-[""] after:h-[44px] after:aspect-square after:rounded-full after:bg-gray-700 after:absolute after:border-[7px] after:border-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2'><i onClick={handleClickLogout} className='bx bxs-log-out-circle  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10 text-3xl hover:text-red-600 duration-300 transform hover:scale-110 focus:scale-110' ></i></div>
    </section>
    </header>
  )
}

export default Header