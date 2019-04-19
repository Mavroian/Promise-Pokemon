(() => {
  class Pokemonager {
    // This should return an array of all the names of n Pokemon from the Pokemon API.
    findNames(n) {
      const pokemonNames = axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${n}`
      );
      return pokemonNames
        .catch((err) => {
          throw err;
        })
        .then((json) => {
          return json.data.results.map((pokemon) => pokemon.name);
        });
    }

    // This should return an array of all the Pokemon that are under a particular weight.

    findUnderWeight(weight) {
      let promiseArray = [];
      for (let i = 1; i <= 10; i++) {
        promiseArray.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
      }

      return Promise.all(promiseArray).then((pokemons) => {
        return pokemons
          .map((responseObj) => {
            return responseObj.data;
          })
          .filter((pokemon) => {
            return pokemon.weight < weight;
          });
      });
    }
  }

  window.Pokemonager = Pokemonager;
})();
