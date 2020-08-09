require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models');

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET - main index of site
app.get('/', function(req, res) {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl).then(response => {
    let pokemon = response.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

const pikachu = { name: 'Pikachu' };
// db.pokemon.create(pikachu)
// .then(newPokemon => {
//   console.log(`The new pokemon created is called: ${newPokemon.name}`);
// });

db.pokemon.findAll()
.then(pokemon => {
  console.log('===== pokemon ====', pokemon);
});

const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = server;
