const express = require('express');
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eater Food"];
let workItems = [];

app.set('view engine', 'ejs'); // setting up the ejs template, set up the viewengine to later renders the template

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render('list', {
    titleList: day,
    newListItems: items
  });
});

app.post('/', function(req, res) {

  console.log(req.body);
  if (req.body.list === 'Work') {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
  } else {
    let item = req.body.newItem;
    items.push(item);
    res.redirect('/');
  }

});

app.get('/work', function(req, res) {
  res.render('list', {
    titleList: 'Work List',
    newListItems: workItems
  });
});

app.get('/about', function(req, res){
  res.render('about');
});



app.listen(3000, function() {
  console.log("I'm up and running on port 3000. You're the best!")
});
