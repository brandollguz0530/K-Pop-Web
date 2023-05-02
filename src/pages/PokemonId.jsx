import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const backgroundByType = {
  grass: "from-green-500 to-black",
  fire:   "from-red-500 to-black",
  water:  "from-blue-500 to-black",
  bug:    "from-gray-700 to-black",
  normal: "from-red-900 to-black"
}
const backgroundTextType = {
  grass: "text-green-500 to-black",
  fire:   "from-red-500 to-black",
  water:  "from-blue-500 to-black",
  bug:    "from-gray-700 to-black",
  normal: "from-red-900 to-black"
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
                    <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                  </div>
                </section>
                {/* nformacion general */}
                
                  <section>

                    <div className=' text-center'>
                      <h3>#{pokemon?.id}</h3>
                    </div>

                    <div className=' grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
                      <hr />
                      <h2 className={` bg-gradient-to-b ${backgroundTextType[pokemon?.types[0].type.name]} font-bold capitalize text-[20px]`}>
                        {pokemon?.name}
                      </h2>
                      <hr />
                    </div>

                    <div className=' flex justify-center gap-6 text-center'>
                      <div>
                        <h5>Weight</h5>
                        <span>{pokemon?.weight}</span>
                      </div>

                      <div>
                        <h5>Height</h5>
                        <span>{pokemon?.height}</span>
                      </div>
                    </div>

                    <section className=' grid ms:grid-cols-2 gap-4 '>
                      {/* tipos */}
                      <section  className=' text-center '>
                        <h3>Types</h3>
                        <section className=' grid grid-cols-2 gap-4 mt-4'>
                          {
                            pokemon?.types.map(type => <article key={type.type.name} className={` p-2 px-8 text-white bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]}  capitalize truncate`}>{type.type.name}</article> )
                          }
                        </section>
                      

                      </section>
                        {/* abilidades */}
                        <section  className=' text-center '> 
                        <h3 className='mt-2'>Habilities</h3>
                        <section className=' grid grid-cols-2 gap-4 mt-4'>
                          {
                            pokemon?.abilities.map(ability => <article key={ability.ability.name} className=' p-2 px-8 border-[1px] border-gray-300  capitalize truncate'>{ability.ability.name}</article> )
                          }
                        </section>

                        </section>

                    </section>

                  </section>

                {/* seccion de stats */}

                
                <section>
                <h3>Stats</h3>
                  <section> 
                {
                  pokemon?.stats.map(stat => (
                    <article key={stat.stat.name}>
                      <section className=' flex justify-between'>
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