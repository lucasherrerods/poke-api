const fetchPokemon = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/1`)
    const pokemon = await response.json()

    showPokemon({
      name: pokemon.species.name,
      id: pokemon.id,
      image: pokemon.sprites.other["official-artwork"].front_default,
      type: pokemon.types.map((typeInfo => typeInfo.type.name)), //percorrendo e criando um novo array com o tipo de cada pokemon
      height: pokemon.height,
      weight: pokemon.weight,
      hp: pokemon.stats[0].base_stat,
      atk: pokemon.stats[1].base_stat,
      def: pokemon.stats[2].base_stat,
      special_atk: pokemon.stats[3].base_stat,
      special_def: pokemon.stats[4].base_stat,
      speed: pokemon.stats[5].base_stat
    })

  } catch (error) {
    throw new Error(`Erro ao buscar os dados do Pokémon: ${error}`)
  }
}

const showPokemon = (json) => {
  console.log(json)
}

fetchPokemon()