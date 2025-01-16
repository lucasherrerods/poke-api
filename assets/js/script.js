const pokemonContainer = document.querySelector('.pokemon-container')

const fetchPokemon = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/5`)
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

  pokemonContainer.style.display = 'flex'

  document.querySelector('#title').textContent = `${json.name} #${json.id}`
  document.querySelector('#img-pokemon').setAttribute('src', json.image)
  document.querySelector('#height').textContent = `${json.height}m`
  document.querySelector('#weight').textContent = `${json.weight}kg`
  document.querySelector('#hp-value').textContent = json.hp
  document.querySelector('#atk-value').textContent = json.atk
  document.querySelector('#def-value').textContent = json.def
  document.querySelector('#spa-value').textContent = json.special_atk
  document.querySelector('#spd-value').textContent = json.special_def
  document.querySelector('#spdd-value').textContent = json.speed
}

fetchPokemon()