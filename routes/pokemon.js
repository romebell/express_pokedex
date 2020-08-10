var express = require('express');
const axios = require('axios');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
// router.post('/', function(req, res) {
//   // TODO: Get form data and add a new record to DB
//   res.send(req.body);
// });

router.get('/:id', (req, res) => {
  const poke = req.params.name;
  const URL = `http://pokeapi.co/api/v2/pokemon/${poke}`;
  axios.get(URL)
  .then(response => {
    console.log(response.data);
    let pokemon = response.data;

    res.render('details', { pokemon });
  });
});

router.post('/', (req, res) => {
  db.pokemon.create({
    name: req.body.name
  }).then(() => {
    res.redirect('/pokemon');
  }).catch(err => {
    console.log('Error', err);
  });
});

router.delete('/:pokemon', (req, res) => {
  console.log(req);
  db.pokemon.destroy({
    where: { name: req.params.pokeName }
  })
  .then(() => {
    res.redirect('/pokemon');
  });
});

module.exports = router;
