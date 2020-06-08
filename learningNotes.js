//for loop from lesson 192
for (var i = 0; i<5; i++) {
  document.querySelectorAll("button")[i].addEventListener('click', function(){
    document.querySelector("h1").style.color = "purple";
  });
};
//simple for loop:
for (var i = 0; i<5; i++) {
  console.log(i)
};











app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  var result = num1 + num2;
  res.send('The result is ' + result);
}); //in order to use express we need to require it first by setting the constant:
const express = require("express");

//and use one of it's functions:
const app = express();
//The next get method below is to specifiy what to send back to the browser
// after getting the request on the root (homepage (/)) page:
app.get("/", function(request, response) {
  response.send("<h1>Hello</h1>");
});
//The first parameter is the location, here homepage and second a function
// with two inputs, request and response, the request is what the browser sends
// response is what you want to return to the computer use method send, refresh the
// server (stop start) and refresh browser

//However, best practise is to use the short hand for the varibles in the fuction:
app.get("/", function(req, res) {
  res.send("<h1>Hello</h1>");
});

// One more time to show anothe example of this CALLBACK function
// The first part in the function (here:about (for the about page)) is to say if
// this happens than carryout the anoynoumus
// callback function (here: function(req, res))
app.get("about", function(req, res) {
  res.send("Hi this is me.");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});


// JS code: Lesson 248. Responding to Requests with HTML Files

//We still get an error at this point, as our server can't accept any posts
//Therefore we would have to add another app:
app.post("/", function(req, res) {
  res.send('Thank for that');
});

//inorder to used the data sent by the bowser we need to install npm parser, require it
//and get express to use it in the following steps:
// % npm install body-parser
const bodyParser = require('body-parser');

app.use(bodyParser);

//body parser comes with a few different modes i.e. what time of body to pass on
//here will use urlencoded as this is used to use forms encoded in the body of a website

app.use(bodyParser.urlencoded());

//and we add an option as this is needed by parser but we don't really need it there
//it's for allowes to post nested objects

app.use(bodyParser.urlencoded({
  extended: true
}));

//now we're using bodyparser, it can be used:
app.post("/", function(req, res) {
  console.log(req.body);
  res.send('Thank for that');
});
// note whats new:
console.log(req.body);
//by doing this the request that is usually lots of codeded stuff is now only the reqest
//that has passed by the parser here it would be the form part:
{
  num1: '2',
  num2: '4',
  submit: ''
}
// remember the num1 and num2 come from the html tag name='' inside the form

//further we can tap into this request by adding .num1 as if they were properties of body
console.log(req.body.num1);
//the result of that change is that we now only get the first number logged as text
'1'

// we can used this to save them in varibles and do thing with it and then send a response:
app.post("/", function(req, res) {
  var num1 = req.body.num1;
  var num2 = req.body.num2;

  var result = num1 + num2;
  res.send('The result is ' + result);
});

//however, remeber it's in string form and needs to be converted if used as a interger:
app.post("/", function(req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  var result = num1 + num2;
  res.send('The result is ' + result);
});

// IMPORTANT: all this code on the server is now NOT visible to the client(browser )
//anymore you can't inspect it in the browser so it's a web application




// 258. Making GET Requests with the Node HTTPS Module
// 259. How to Parse JSON


//To request data from another website (or server) through an API, use the provided
//url
//to do this with node the native (in node) request can be used like here:
//first you have to require it:
const https = require("https");

//nothing else needs to be added as it's part of node and can be used like that.
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=682376772f00e805da42c942de9cef6b&q=Cheltenham"
https.get(url, function(res) {
  console.log(res);
});
//here the url has been saved into a constant as it's so long. It would make it hared
//read
//use https.get to get the data, you need to specifiy where from (the api url and the response only in the function.
//and what to do with it.
//here, we're logging the data in the terminal console.

//instead of printing the response in the terminal we can add .statusCode in inorder
//to print the status code see on the mdn website https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
//for HTTPS status codes for showing
//you what each means but here 200 means ok

https.get(url, function(res) {
  console.log(res.statusCode);
});

//below we are respond if we get some data back with the callback functions

https.get(url, function(res) {
  console.log(res.statusCode);

  res.on('data', function(data) {
    console.log(data);
  });
});

//you'll print the data in hexadecimal code (can be converted online if you want to cryptii.com)

//more usful is a javascript object to do this unpack the data with JSON.parse

https.get(url, function(res) {
  console.log(res.statusCode);

  res.on('data', function(data) {
    const weatherData = JSON.parse(data);
    console.log(weatherData);
  });
});

//now after refreshing the website the terminal is printing the data in javascript
//objects
//the opposite would be the method from json using JSON.stringify(data)

// to get specifiy pieces of the data use the path like this

https.get(url, function(res) {
  console.log(res.statusCode);

  res.on('data', function(data) {
    const weatherData = JSON.parse(data);
    console.log(weatherData);
    const temp = weatherData.main.temp
    console.log(temp)
  });
});

//sometimes this isn't easy if there are lots of objects, use the installed
//chorme extension 'json awesome'. copy the url path into the brower use the
//extension to copy the path after clicking on the wanted piece and using the left
//hand side icon

https.get(url, function(res) {
  console.log(res.statusCode);

  res.on('data', function(data) {

    const weatherData = JSON.parse(data);
    console.log(weatherData);

    const temp = weatherData.main.temp;
    console.log(temp);

    const weatherDescription = weatherData.weather[0].description;
    console.log(weatherDescription);

  });
});

//Now, to use the data that we got, we have to send it back to our website to
//use it or display it

app.get("/", function(req, res) {


  const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=682376772f00e805da42c942de9cef6b&q=Cheltenham"

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on('data', function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description
      res.send("<h1>The temperature in Cheltenham is " + temp + " C.</h1>")
    });
  });

});

// note the changes here, the whole https function is rapped in the app.get funciton
//We got rid of all the console logs and changed the res in the https functionsto
//response so that it's not confusing with the res from the app.get function.
//also we have removed the res.send in the https function as only one res.send
//can be executed. As this is always the end of the function( final thing that
//happends) Also note the res.send is rapped in a h1 tag.
//if multiple lines should be printed use res.write() first, that can be used
//more than once and once that's done use res.send(); empty to send all of
//the written parts. (note below only snapshot out of code):

response.on('data', function(data) {
  const weatherData = JSON.parse(data);
  const temp = weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description
  res.write("<h1>The temperature in Cheltenham is " + temp + " C.</h1>");
  res.write("The weather is currently " + weatherDescription);
  res.send();
});

// in order to use an image that is provided by the API source add
//what image you want (here via a code), save the url in a constant
// and res.write() with an html img tag:

response.on('data', function(data) {
  const weatherData = JSON.parse(data);

  const icon = weatherData.weather[0].icon; //grabbing the code
  const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; //putting url togehter
  res.write("<img src=" + imageURL + ">") //writting the img tag
  res.send(); //sending the img tag
});


//261. Using Body Parser to Parse POST Requests to the Server

//in order to add costumers input, first we restructure the url

app.get("/", function(req, res) {

  const city = "Cheltenham"
  const userId = "682376772f00e805da42c942de9cef6"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?units=" + unit + "&appid=" + userId + "b&q=" + city

  //for the next section see below in the html part

  //and complete all the steps that we have previously looked at to fetch the data passed inspect
  //with app.get, app.post and bodyParser
  //use the path to get the cityname that has been passed in:

  req.body.cityName;

  //use it to add to the already programmed code as a substituted for the hardcoded city name:
  app.post("/", function(req, res) {
    const city = req.body.cityName; // here it is, the rest is already coded
    const userId = "682376772f00e805da42c942de9cef6"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?units=" + unit + "&appid=" + userId + "b&q=" + city

    https.get(url, function(response) {
      console.log(response.statusCode);

      response.on('data', function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<h1>The temperature in Cheltenham is " + temp + " C.</h1>");
        res.write("The weather is currently " + weatherDescription);
        res.write("<img src=" + imageURL + ">")
        res.send();
      });
    });
  });




  263. Setting Up the Sign Up Page
  //in order to have a site with static files on a server we need to add app.use(express.static());
  //static files included CSS sheets linked to the html file and/or Images

  app.use(express.static("public"));

  //now a new folder has to be created in the same location as the html file. Here called public.
  //all static files have to be moved into this folder
  //all static files that should be linked need to point to this static folder public. Start the path as if in the folder but not including
  //the folder


  265. Adding Success and Failure Pages

  //use an if statment if you wanted to send different responses back depending on the status code that comes back.

  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {

      if (response.statusCode === 200) { //here we're checking if the respnse status was okay
        res.sendFile(__dirname + "/success.html"); //the res here comes from further up in the app.get function not included here
      } else {
        res.sendFile(__dirname + "/failure.html")
      };

      console.log(JSON.parse(data));
      console.log(response.statusCode);

    });
  });
  request.write(jsonData);
  request.end();
});

//now we have the different paths to failure or success html, we add a button on the html failure to redirect
//back to the homepage, make sure the button is of the type submit and the form has a action of "/failure" and
//a method of 'post'
//then add a app.post to redirect You

app.post("/failure", function(req, res) { //basically if receiving /failure than redirect to homepage ("/")
  res.redirect("/");
});

266. Deploying Your Server with Heroku

Heroku is choosing it 's own port:
app.listen(process.env.PORT || 3000, function() { //process.env.PORT is defined by Heroku and enables Heroku to choose the port locally but to test it for us we also add an or statment || to check locally as well
  console.log("I'm up and running on port 3000, you're the greatest")
});




283. Creating Your First EJS Templates

//switch statments again:
switch (currentDay) { //this is the same as in a if statment if (currentDay === 0)
  case 0: // see line above is here continued rather than in the switch ()
    day = "Sunday"; //same as "then do this"
    break;
  case 1: // again but here you don't have to write the whole equation again like in a if statment
    day = "Monday";
    break;
  default: // is like saying else (anything that is not accounted for above do this)
}
//below is the same but with a if statment. switch statments can be used if longer than say 6 cases (makes it a bit less repetetive)
if (currentDay === 0) {
  day = "Sunday";
} else if (currentDay === 1) { // see more repetetive here
  day = "Monday";
} else {};

EJS

app.set('view engine', 'ejs'); // setting up the ejs template, set up the viewengine to later renders the template

app.get("/", function(req, res) {
  var day = "exampleName"
}
res.render('list', { //make sure the view engine is rendering the right file inside the view folder (here it's list)
  kindOfDay: day // note here the kindOfDay links to the html(ejs)file with the varible like so: <%= kindOfDay %> and the day is the varible in here app.get function
  //see html part below for html example
});

});

285. Passing Data from Your Webpage to Your Server

//in order to render more items just add them to the object inside the render function:
res.render('list', {
  kindOfDay: day,
  addItem: items//second item
});
// however, once the computer has run pass this point it won't be able to render anything again later on.
// Use redirect to tell the MAC to start again at a specified route here the root route (homepage)
res.redirect('/');



                    287. Adding Pre-Made CSS Stylesheets to Your Website

// in order to tell the server to serve up the public folder add app.use to the app.js

app.use(express.static('public'));

// then you can use link the css and everything else just like we learned for a static Website



                        288. Understanding Templating vs. Layouts

//adding new page to the website via the server, created another app.get and app.post route but not from and to the root route (www.dalfjd/)
//instead here /work route (www.dljfafjdf/work):
Templating


app.get('/work',function(req, res) {
  res.render('list', {
    titleList: 'Work List',
    newListItems: workItems
  });
});

app.post('/work', function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.render('/work');
});

//because the form method specifies the root route it will be picked up by the app.post('/') not app.post('/work') to solve this understand:
// if we
app.post('/', function(req, res) {
  console.log(req.body);
  ...
//the terminal showes us what we would get back:
{ newItem: 'test', button: 'a value' }
// this is because the form has these attributes
//see the html code below

//these can be used to add some logic to our root route in order to add and redirect acorrding to which route was used to imput into the from:
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

//in oderer to change the "button:" input depending which app.get() route has been selected, we use another ejs variable into the button value like so: see html again

Layouts

//now if we wanted to keep the same style on other pages but not the content we can use the layout tags (see ejs website)
//<%- -%>
//create new files such as header.ejs and footer.ejs in the views folder(so the'd get rendered) and include header and footer
//html code to be used on all sides. Then go and tag the pages where the header and footer should be included. Note
//if they style is to be included make sure header includes link to CSS and so on.

<%- include('header'); -%>
//rest of the html code
<%- include('footer'); -%>














HTML code:

  Lesson 248. Responding to Requests with HTML Files

  <
  form action = "/"
method = "post" > //The action is where the we post the respond to
  <
  input type = "text"
name = "num1"
placeholder = "First Number" >
  <
  input type = "text"
name = "num2"
placeholder = "Second Number" >
  <
  button type = "submit"
name = "submit" > Calulate < /button> <
  /form>
  // The name is like a varible that can be used later to point to it.
  // in the form tag, the method post is there to tell it to send the content of
  // the form to the server and action is to which site of the server. (here the homepage)
  // if no action is specified, then the default is that it will send to the current webpage,
  // so really the action="/method" is not needed here



  //261. Using Body Parser to Parse POST Requests to the Server

  //setting up a form with a input, and button first:

  <
  form action = "/"
method = "post" > //The action is where the we post the respond to
  <
  label
for = "cityInput" > Enter City name: < /label> <
  /form>









  <
  input id = "cityInput"
type = "text"
name = "cityName"
name = "cityName"
placeholder = "City" >
  <
  button type = "submit"
name = "button" > Go < /button> <
  /form>



              283. Creating Your First EJS Templates

below is an example of ejs taggs used within the html(ejs)file.
each line of js code needs to be inclosed with <% %> brackets and <%= varible %>
for the varible taken from the js file
  <ul>
  <%  for(var i=0; i<list.length; i++){ %>
    <li><%=list[i]%></li>
      <%  } %>
  </ul>

                288. Understanding Templating vs. Layouts

<form class="item" action="/" method="post">
  <input type="text" name="newItem" placeholder="New Item" autocomplete="off">
  <button type="submit" name="button" value="a value">+</button>
</form>

//after editing the button. Here we used the ejs variable of the titel that should be displayed after a specific route has been put in the urlencoded
//but note what I notice is that if there is more than one word used, only one will be sent.
<form class="item" action="/" method="post">
  <input type="text" name="newItem" placeholder="New Item" autocomplete="off">
  <button type="submit" name="list" value=<%=titleList%>>+</button>
</form>
