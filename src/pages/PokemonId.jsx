import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const backgroundByType = {
  grass: 'from-[#82C1C9] to-[#BAD6AA]',
  fire: 'from-[#F96D6F] to-[#E8AE1B]',
  water: 'from-[#133258] to-[#1479FB]',
  bug: 'from-[#729F3F] to-[#A8B820]',
  normal: 'from-[#A4ACAF] to-[#C3C3C1]',
  poison: 'from-[#B97FC9] to-[#A040A0]',
  electric: 'from-yellow-500 to-yellow-300',
  ground: 'from-[#654008] to-[#D69638]',
  fairy: 'from-[#FDB9E9] to-[#EE99AC]',
  fighting: 'from-[#D56723] to-[#EB4971]',
  psychic: 'from-[#F366B9] to-[#FBA8C9]',
  rock: 'from-[#A38C21] to-[#B6A136]',
  ghost: 'from-[#323569] to-[#787DDA]',
  ice: 'from-[#6FBEDF] to-[#BDEBFE]',
  dragon: 'from-[#F16E57] to-[#FCB6A7]',
  dark: 'from-[#030706] to-[#5A5E5D]',
  steel: 'from-[#9EB7B8] to-[#D1D1E0]',
  flying: 'from-[#3DC7EF] to-[#BDB9B8]',
}
const backgroundTextType = {
  grass: 'text-[#BAD6AA]',
  fire: 'text-[#FD7D24]',
  water: 'text-[#4592C4]',
  bug: 'text-[#729F3F]',
  normal: 'text-[#A4ACAF]',
  poison: 'text-[#B97FC9]',
  electric: 'text-[#EED535]',
  ground: 'text-[#AB9842]',
  fairy: 'text-[#FDB9E9]',
  fighting: 'text-[#D56723]',
  psychic: 'text-[#F366B9]',
  rock: 'text-[#A38C21]',
  ghost: 'text-[#7B62A3]',
  ice: 'text-[#51C4E7]',
  dragon: 'text-[#F16E57]',
  dark: 'text-[#707070]',
  steel: 'text-[#9EB7B8]',
  flying: 'text-[#3DC7EF]',
}

const PokemonId = () => {
  const [pokemon, setPokemon] = useState()

  const {id} = useParams()

  useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`

    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err))
}, [])

    const getParcentStatBar = (stat_base) => {
      const percentBarProgres = Math.floor((stat_base * 100)/255)
      return `${percentBarProgres}%`
    }
  
  return (
    <section>
        <Header />

        <section className='px-2 py-[70px]'>

            <article className=' max-w-[900px] mx-auto shadow-xl p-2'>

              
                {/* seccion superior */}
                <section className={` bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
                  
                  <div className='w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-16'>
                    <img className='duration-300 transform hover:scale-110 focus:scale-110' src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                  </div>
                </section>
                {/* nformacion general */}
                
                  <section>

                    <div className=' text-center text-[#416460] text-[35px] mt-6'>
                      <h3>#{pokemon?.id}</h3>
                    </div>

                    <div className=' grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
                      <hr />
                      <h2 className={` bg-gradient-to-b ${backgroundTextType[pokemon?.types[0].type.name]} font-bold capitalize text-[45px]`}>
                        {pokemon?.name}
                      </h2>
                      <hr />
                    </div>

                    <div className=' flex justify-center gap-6 text-center'>
                      <div>
                        <h5 className=' font-semibold '>Weight</h5>
                        <span className=' font-bold mb-4'>{pokemon?.weight}</span>
                      </div>

                      <div>
                        <h5 className=' font-semibold '>Height</h5>
                        <span className=' font-bold mb-4'>{pokemon?.height}</span>
                      </div>
                    </div>

                    <section className=' grid ms:grid-cols-2 gap-4 '>
                      {/* tipos */}
                      <section  className=' text-center '>
                        <h3 className=' font-bold my-3'>Types</h3>
                        <section className=' grid grid-cols-2 gap-4 mt-4'>
                          {
                            pokemon?.types.map(type => <article key={type.type.name} className={` p-2 px-8 text-white bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]}  capitalize truncate font-semibold`}>{type.type.name}</article> )
                          }
                        </section>
                      

                      </section>
                        {/* abilidades */}
                        <section  className=' text-center my-3'> 
                        <h3 className='mt-2 font-bold '>Habilities</h3>
                        <section className=' grid grid-cols-2 gap-4 mt-4'>
                          {
                            pokemon?.abilities.map(ability => <article key={ability.ability.name} className=' p-2 px-8 border-[1px] border-gray-300  capitalize truncate font-semibold'>{ability.ability.name}</article> )
                          }
                        </section>

                        </section>

                    </section>

                  </section>

                {/* seccion de stats */}

                
                <section>
                  <div className='flex items-center my-6'> 
                <h3 className=' font-bold text-[32px] mr-1'>Stats</h3>
                <hr className='flex-1 border-t-2 ml-3'/>
                  </div>
                  <section> 
                {
                  pokemon?.stats.map(stat => (
                    <article key={stat.stat.name}>
                      <section className=' flex justify-between my-2'>
                        <h5 className='capitalize'>{stat.stat.name}</h5>

                        <span>{stat.base_stat}/255</span>
                      </section>
                      <div className=' bg-gray-100 h-6 rounded-sm'>
                        <div style={{"width": getParcentStatBar(stat.base_stat)}} className={`h-full bg-gradient-to-r from-yellow-300 to-yellow-500`}></div>
                      </div>
                    </article>
                  ))
                }
                  </section>
                </section>
            </article>

        </section>
    </section>
  )
}

export default PokemonId