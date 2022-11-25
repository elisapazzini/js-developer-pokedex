
const pokeApi = {} //Objeto que representa/centraliza toda a poke-api

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.order = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

/*
Fetch nos retorna uma promisse (importante para lidar com o 
assincronismo dentro do js - respost não vem imediatamente na mesma hora,
demora um tempo de processamento. a promisse é uma promessa de um resultado)
.then(function(response)) significa 'quando a promessa for cumprida com sucesso, execute a função resposta'
.catch(function(error)) para manipular algum erro quando requisicao falhar
.finally(function()) fazer uma operaçào quando a requisicao terminar, independente do sucesso ou
do fracasso dela

Encadeamento de .then() - o que vai pro 1o é o retorno da promisse e o que vai pro 2o é o retorno do 1o
*/