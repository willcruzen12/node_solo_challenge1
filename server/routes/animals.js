var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/Omicron';
var population = require('./population.js');

router.get('/', function(req, res) {
  pg.connect(connectionString, function (err, client, done) {
   if (err) {
     res.sendStatus(500);
   } else {
   client.query('SELECT * FROM animals', function (err, result) {
     done();
     if (err) {
       res.sendStatus(500);
     } else{
     res.send(result.rows);
        }
      });
    }
  });
});
router.post('/', function (req, res) {
  var animal = req.body;
  console.log(req.body);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(req.body);
      res.sendStatus(500);
    }
    client.query('INSERT INTO animals (animal_type, population) ' + 'VALUES ($1, $2)',
                [animal.animal_type, animal.population],
                function (err, result) {
                  done();
                  if (err) {
                    res.sendStatus(500);
                  } else {
                  res.sendStatus(201);
                }
              });
  });
});

module.exports = router;
