const form = document.querySelector('.search-container')
const pokemonContainer = document.querySelector('.pokemon-container')
const alert = document.querySelector('#alert')
const typesContainer = document.querySelector('.types')

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const inputPokemon = document.querySelector('#pokemon-input').value
  const value = inputPokemon.trim().toLowerCase()

  if (!value) {
    alert.classList.add('show')
    return showAlert('Pokémon não encontrado')
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
    const pokemon = await response.json()

    alert.style.display = 'none'
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
    pokemonContainer.style.display = 'none'
    alert.style.display = 'flex'
    showAlert('Erro ao buscar os dados do Pokémon.')
  }
})

const showPokemon = (json) => {
  showAlert('')
  pokemonContainer.style.display = 'flex'

  let newElement = ''

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

  //criando dinamicamente a quantidade especifica de tipo de cada pokemon
  json.type.forEach(type => {
    newElement += `
      <p>${type}</p>
    `
  })
  typesContainer.innerHTML = newElement
}

const showAlert = (msg) => {
  alert.innerHTML = msg
}