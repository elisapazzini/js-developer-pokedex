const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const voltarAoTopoButton = document.getElementById('voltarAoTopoButton')

const maxRecords = 151
const limit = 6
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemonLi ${pokemon.type}">
            <span class="number">#${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtRecordNextPage = offset + limit

    if(qtRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

voltarAoTopoButton.addEventListener('click', () => window.scrollTo(0, 0))


// pokeApi.getPokemons().then((pokemonsTotal = []) => { //converter a lista de objetos em uma lista de html
//     pokemonsList.innerHTML += pokemonsTotal.map(convertPokemonToLi.join(''))

    /*
    ESTE TRECHO FOI SUBSTITUIDO PELO MÉTODO MAP
    const listItens = []
    for (let i = 0; i < pokemonsTotal.length; i++) { //recebe body convertido, percorre cada um dos resultados recebidos e os adiciona em lista no HTML
        const pokemon = pokemonsTotal[i];
        listItens.push(convertPokemonToLi(pokemonsTotal)) //soma no final da lista do HTML, mais um item
    }
    */

