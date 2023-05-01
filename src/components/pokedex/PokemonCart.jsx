import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const borderByType = {
  grass: "border-green-500",
  fire:   "border-red-500",
  water:  "border-blue-500",
  bug:    "border-gray-700",
  normal: "border-red-900"
}
const backgroundByType = {
  grass: "from-green-500 to-black",
  fire:   "from-red-500 to-black",
  water:  "from-blue-500 to-black",
  bug:    "from-gray-700 to-black",
  normal: "from-red-900 to-black"
}

const PokemonCart = ({pokemonUrl}) => {
    const [pokemon, setPokemon] = useState()

    const types = pokemon?.types.slice(0, 2).map((type) => type.type.name).join(" / ") 

    useEffect(() => {
        

        axios
          .get(pokemonUrl)
          .then((res) => setPokemon(res.data))
          .catch((err) => console.log(err))
    }, [])
  return (
    <Link to={`/pokedex/${pokemon?.id}`} className={` text-center border-[10px] rounded-md ${borderByType[pokemon?.types[0].type.name]}`}>
      {/* seccion superior  */}
      <section className={` bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
        <div className=' absolute -bottom-[70px] w-[200px] left-1/2 -translate-x-1/2'>
        <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </div>
      </section>
      {/* seccion inferior */}
      <section>

        <h3 className=' mt-[70px] uppercase font-bold text-[22px]'>
          {
            pokemon?.name
          }
        </h3>
        <h4 className=' text-gray-500'>
          {
            types
          }
        </h4>
        <span className=' text-gray-400 grid gap-2'>Type</span>

        <hr className=' mt-3' />

        <section className=' grid grid-cols-3 gap-2 p-4 '>
          {
            pokemon?.stats.map((stat) => (
              <div key={stat.stat.name}>
                <h5 className=' text-gray-400'>{stat.stat.name}</h5>
                <span>{stat.base_stat}</span>
              </div>
          ))}
        </section>

      </section>

    </Link>
  )
}

export default PokemonCart