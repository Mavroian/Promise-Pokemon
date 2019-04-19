(() => {
  class Pokemonager {
    // This should return an array of all the names of n Pokemon from the Pokemon API.
    findNames(n) {
      const pokemonNames = fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${n}`
      );
      return pokemonNames
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          throw err;
        })
        .then((json) => {
          return json.results.map((pokemon) => pokemon.name);
        });
    }

    // This should return an array of all the Pokemon that are under a particular weight.

    findUnderWeight(weight) {
      let promiseArray = [];
      for (let i = 1; i <= 10; i++) {
        promiseArray.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`));
      }

      return Promise.all(promiseArray)
        .then((responseArray) => {
          let newArray = responseArray.map((response) => {
            return response.json();
          });
          return Promise.all(newArray);
        })
        .then((pokemons) => {
          return pokemons.filter((pokemon) => {
            return pokemon.weight < weight;
          });
        });
    }
  }

  window.Pokemonager = Pokemonager;
})();
