var pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 151; i++) 
    {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}` ;
        promises.push(fetch(url).then((res) => res.json()));
    }
        
    Promise.all(promises).then((results) => {

        const pokemon = results.map((result) => ({
        name: result.name,
        image: result.sprites.front_default, 
        id: result.id,
        type: result.types.map((type) => type.type.name).join(', '),
    }));
  displayPokemon(pokemon);
})

}

const displayPokemon = (pokemon) => {
     const pokemonHTML = pokemon.map((pokemon) =>
      `  <li class="card">
          <img class="card-image" src="${pokemon.image}">
          <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
           <p class="card-subtitle"> Type: ${pokemon.type}</p>
          </li>`
     ).join('');
     document.getElementById("pokedex").innerHTML = pokemonHTML; 
}

fetchPokemon();
    