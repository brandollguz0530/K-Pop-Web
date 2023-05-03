import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCart from '../components/pokedex/PokemonCart'


const Pokedex = () => {
  const [pokemons, setpokemons] = useState([])
  const [pokemonName, setPokemonName] = useState("")
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const input = useRef(null)

  const nameTrainer = useSelector(store => store.nameTrainer)

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
  }
  const pokemonByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))


  const paginationLogic = () => {
    // Cantidad de pokemons por pagina 
    const POKEMONS_PER_PAGE = 15

    // Pokemon que se van a mostrar en la magina actual 
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE
    const pokemonInPege = pokemonByName.slice(sliceStart, sliceEnd)

    // Ultima paguina 
    const lastPage = Math.ceil(pokemonByName.length / POKEMONS_PER_PAGE) || 1

    // Bloque actual 
    const PAGES_PER_BLOCK = 5
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    // Paginas que se van a mostrar en el bloque actual 
    const pagesInBlock = []
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1 
    const maxPege = actualBlock * PAGES_PER_BLOCK
    for (let i = minPage; i <= maxPege; i++) {
          if(i <= lastPage){
            pagesInBlock.push(i)
          }
        }

        return {
          pokemonInPege,
          lastPage,
          pagesInBlock
        }
  }

  const {pokemonInPege,
          lastPage,
          pagesInBlock
        } = paginationLogic()

        const handleClickPreviusPage = () => {
          const newCurrentPage = currentPage - 1 
          if (newCurrentPage >= 1) {
            setCurrentPage(newCurrentPage)
          }
          
        }

        const handleClickNextPage = () => {
          const nextCurrentPage = currentPage + 1 
          if (nextCurrentPage <= lastPage) {
            setCurrentPage(nextCurrentPage)
          }
          
        }
  
    useEffect(() => {
      if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281"

      axios
        .get(URL)
        .then((res) => setpokemons(res.data.results))
        .catch((err) => console.log(err))
      }
    }, [currentType])

    useEffect(() => {
      
        const URL = "https://pokeapi.co/api/v2/type"
      
      axios
        .get(URL)
        .then((res) => {
          const newTypes = res.data.results.map(type => type.name)
          setTypes(newTypes)
        })
        .catch((err) => console.log(err))
      
    }, [])
    
     useEffect(() => {
      if (currentType) {
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`
      
      axios
        .get(URL)
        .then((res) => {
          const pokemonByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
          setpokemons(pokemonByType)
        })
        .catch((err) => console.log(err))
      }
    }, [currentType])

    useEffect(() => {
      setCurrentPage(1)
  }, [pokemonName, currentType])

  useEffect(() => {
    setPokemonName("")
    input.current.value = ""
  }, [currentType])
  
    
  return (

    <section className='min-h-screen'>

      <Header />
      {/* SECCION DE FILTROS Y SALUDOS */}
      <section className=' py-5 px-3'>
        <div className='w-full sm:w-auto'> 
        <h3><span className=' text-red-500 font-semibold'>Welcome {nameTrainer},</span> here you can find your favorite Pokemon</h3>
        <form onSubmit={handleSubmit} className='flex items-center justify-center'>
          <div className=' grid grid-cols-1 sm:grid-cols-none  items-center sm:justify-center sm:w-full mt-10'> 
          <div className=' max-w-[200px] sm:max-w-[300px] mx-auto flex flex-col items-center sm:flex-row sm:items-center'> 
          <input ref={input} id='pokemonName' className="bg-[#FFFFFF] shadow-xl  p-2 px-10 mt-4 sm:mt-6 ml-[80px] border-[1px] border-red-500 ms:b" type="text" placeholder='search your pokemon...'/>
          <button className="bg-[#D93F3F] text-white py-2 px-4 transition duration-300 transform hover:scale-110 focus:scale-110 mt-4  sm:text-center sm:mt-6 sm:mr-[600px]">Search</button>
          </div>
          </div>
          
          <select onChange={(e) => setCurrentType(e.target.value)} className='bg-[#FFFFFF] shadow-xl py-2 px-12 mt-[230px] sm:mt-6 mr-[120px] sm:mb-[80px] sm:w-[300px] max-w-[200px] sm:max-w-full sm:static duration-300 transform hover:scale-110 focus:scale-110'>
            <option value="">All pokemon</option>
            {
              types.map(type => <option className='capitalize' value={type} key={type}>{type}</option>)
            }
          </select>
        </form>
        </div>
      </section>
      {/* seccion lista de pokemons  */}
      <section className=' px-2 grid gap-10 auto-rows-auto grid-cols-[repeat(auto-fill,_250px)] justify-center'>
        {
          pokemonInPege.map(pokemon => <PokemonCart  key={pokemon.url} pokemonUrl={pokemon.url}/>)
        }
      </section>


      {/* Paginacion */}

      <ul className=' flex gap-10 justify-center px-2 flex-wrap '>
        {/* pagina en paguina */}
        <li onClick={handleClickPreviusPage} className=' bg-red-500 p-3 font-bold text-white rounded-md mb-[50px] text-[20px] cursor-pointer duration-300 transform hover:scale-110 focus:scale-110 border-[2px] border-black bg-gradient-to-b from-red-600 to-black'><i className='bx bxs-left-arrow-circle bx-flashing bx-flip-vertical' ></i></li>
        {/* primera paguina  */}
        <li onClick={() => setCurrentPage(1)} className=' bg-red-500 p-3 font-bold text-white rounded-md mb-[50px] text-[20px] cursor-pointer duration-300 transform hover:scale-110 focus:scale-110 border-[2px] border-black bg-gradient-to-b from-red-600 to-black'><i className='bx bxs-chevron-left-circle bx-fade-left' ></i></li>
        {
          pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} key={numberPage} className={` bg-red-500 p-3 font-bold text-white rounded-md mb-[50px] text-[20px] cursor-pointer ${numberPage === currentPage && "bg-red-300"} duration-300 transform hover:scale-110 focus:scale-110 border-[2px] border-black bg-gradient-to-b from-red-600 to-black`}>{numberPage}</li>)
        }
        {/* paguina en paguibna hacia adelante */}
        <li onClick={handleClickNextPage} className=' bg-red-500 p-3 font-bold text-white rounded-md mb-[50px] text-[20px] cursor-pointer duration-300 transform hover:scale-110 focus:scale-110 border-[2px] border-black bg-gradient-to-b from-red-600 to-black'><i className='bx bxs-chevron-right-circle bx-fade-right' ></i></li>
        {/* ultima paguina  */}
        <li onClick={() => setCurrentPage(lastPage)} className=' bg-red-500 p-3 font-bold text-white rounded-md mb-[50px] text-[20px] cursor-pointer duration-300 transform hover:scale-110 focus:scale-110 border-[2px] border-black bg-gradient-to-b from-red-600 to-black'><i className='bx bxs-right-arrow-circle bx-flashing bx-flip-vertical' ></i></li>
      </ul>
    </section>
  )
}

export default Pokedex