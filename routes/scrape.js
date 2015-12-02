var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {

  var url = req.body.url;

  request(url, function(error, response, html){
    if(!error){
      res.send("'"+ html + "'");
    }
  })

});

module.exports = router;
