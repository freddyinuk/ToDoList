const express = require('express');
const bodyParser = require("body-parser");

const app = express();



var items = ["Buy Food", "Cook Food", "Eater Food"];

app.set('view engine', 'ejs'); // setting up the ejs template, set up the viewengine to later renders the template

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  };

  var day = today.toLocaleDateString("en-US", options);


  res.render('list', {kindOfDay: day, newListItems: items});

});

app.post('/', function(req, res){
  var item = req.body.newItem;

  items.push(item);

  res.redirect('/');

});


app.listen(3000, function() {
  console.log("I'm up and running on port 3000. You're the best!")
});
