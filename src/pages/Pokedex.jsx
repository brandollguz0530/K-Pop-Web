import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCart from '../components/pokedex/PokemonCart'


const Pokedex = () => {
  const [pokemons, setpokemons] = useState([])
  const [pokemonName, setPokemonName] = useState("")
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState("")
  const nameTrainer = useSelector(store => store.nameTrainer)

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
  }
  const pokemonByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))
  
    useEffect(() => {
      if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon"

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
    
  return (

    <section className='min-h-screen'>
      <Header />
      {/* SECCION DE FILTROS Y SALUDOS */}
      <section className=' py-5 px-3'>
        <div className='w-full sm:w-auto'> 
        <h3><span className=' text-red-500 font-semibold'>Welcome {nameTrainer},</span> here you can find your favorite Pokemon</h3>
        <form onSubmit={handleSubmit} className='flex items-center justify-center'>
          <div className=' grid grid-cols-1 sm:grid-cols-none  items-center sm:justify-center sm:w-full '> 
          <div className=' max-w-[200px] sm:max-w-[300px] mx-auto flex flex-col items-center sm:flex-row sm:items-center'> 
          <input id='pokemonName' className="bg-[#FFFFFF] shadow-xl  p-2 px-10 mt-4 sm:mt-6 ml-[80px]" type="text" placeholder='search your pokemon...'/>
          <button className="bg-[#D93F3F] text-white py-2 px-4 transition duration-300 transform hover:scale-110 focus:scale-110 mt-4  sm:text-center sm:mt-6">Search</button>
          </div>
          </div>
          
          <select onChange={(e) => setCurrentType(e.target.value)} className='bg-[#FFFFFF] shadow-xl p-2 px-6 mt-[170px] sm:mt-6 ml-2 sm:mr-[600px] sm:w-[300px] max-w-[200px] sm:max-w-full'>
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
          pokemonByName.map(pokemon => <PokemonCart  key={pokemon.url} pokemonUrl={pokemon.url}/>)
        }
      </section>
    </section>
  )
}

export default Pokedex