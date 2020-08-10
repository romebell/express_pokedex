var express = require('express');
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
