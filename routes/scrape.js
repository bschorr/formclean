var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var beautify_html = require('js-beautify').html;
var path = require('path');
var mime = require('mime');


var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {

  var url = req.body.url;

  request(url, function(error, response, html){
    if(!error){

      //load html to cheerio
      var $ = cheerio.load(html);

      //extract html form tag and beautify it
      var form = $.html('form');
      form = (beautify_html(form, { indent_size: 2 }));

      //write file to server
      fs.writeFile('form.html', form, function(err){
        console.log('File successfully written! - Check your project directory for the form.html file');
      })

      //auto download magic
      var file = __dirname + '/../form.html';

      var filename = path.basename(file);
      var mimetype = mime.lookup(file);

      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      res.setHeader('Content-type', mimetype);

      var filestream = fs.createReadStream(file);
      filestream.pipe(res);

    }
  })
});

module.exports = router;
