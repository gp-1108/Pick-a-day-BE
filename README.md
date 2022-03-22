<h3 align="center">
  <a href="https://pick-a-day.herokuapp.com/" style="color: black; font-weight: 1;">
    <img src="readme-sources/logo.png" width="200px" />
  <br>
  Pick a day Backend
  </a>
</h3>

---

<h1 id="top">Pick-a-day-BE</h1>

This projects is a simple, yet effective, rest API developed by myself for a small webapp called (you guessed it) **Pick a day**.

List of content:
<li><a href="#why" style="text-decoration: none; color: black">What it does?</a></li>
<li><a href="#prerequisites" style="text-decoration: none; color: black">Prerequisite</a></li>
<li><a href="#installation" style="text-decoration: none; color: black">How to run it</a></li>
<li><a href="#documentation" style="text-decoration: none; color: black">Documentation</a></li>
<li><a href="#credits" style="text-decoration: none; color: black">Credits</a></li>
<li><a href="#aboutme" style="text-decoration: none; color: black">About Me</a></li>
<li><a href="#supportme" style="text-decoration: none; color: black">Support Me</a></li>

---
<h2 align="center" id="why"> What it does?</h2>

_Pick a day_ is simple event organizer that allows partecipant to create events and share them with your friends, tracking who can or cannot partecipate in which days. The frontend side of this app was developed by [Giacomo](https://github.com/giacomoschiavo) and [Enrico](https://github.com/enricopro) and it is available [here](https://www.pickaday.live).

By choosing the name and the days of an event it is possible to show when one partecipant is available or not.

---

<h2 align="center" id="prerequisites">Prerequisites</h2>

This app has a few prerequisites that you need to fulfill in order to run it:
<ul>
<li><a href="https://nodejs.org/en/" >node</a> and <a href="https://www.npmjs.com/" >npm</a> installed
<li> an <a href="https://www.mongodb.com/atlas"> Atlas account </a> </li>
</ul>

>The project was run on node v16.14.2 and npm v8.4.1 
---

<h2 align="center" id="installation">How to run it</h2>

First of all make sure to fullfill **all** the requirements.
Firstly, we will setup your accounts on Atlas and Heroku (skip heroku if your main goal is not deploying it).
* follow the guidelines at [atlas](https://docs.atlas.mongodb.com/getting-started/) to properly get started
  * I recommend to make your database available to all IPs by setting it to _0.0.0.0/0_
  * skip the _Connect to your cluster_ for now
  * make sure to remember name and password created at the step _Create a Database User for Your Cluster_


We are now ready to run the actual app:
1. Clone this repository onto your PC ```git clone https://github.com/gp-1108/Pick-a-day-BE```
2. Enter the repository and run the following command: ```npm i```
3. Create a ```.env``` file in the main repository
4. Navigate to your database Atlas, click on _Connect_ -> _Connect your application_ -> copy the string provided (_Driver: Node.js || Version: 4.0 or later_).
5. Edit the ```.env``` file just created and add the previously copied string like this:
  MONGO_URI=```mongodb+srv://<username>:<password>@clustername.mongodb.net/myFirstDatabase?retryWrites=true&w=majority```
  Please be aware you will need to change the password accordingly to whatever you have chosen previously while setting up your atlas account. Also it is reccomended to choose a meaningful name four your collection instead of ```myFirstDatabase```
6. (Additional) configure a second line in your .env file specifying a port where the server will be listening
  PORT=```5000``` is the default one
7. Run the command ```$ npm start``` in the main directory of the project. If everything goes fine you should have in return a ```Server listening on port xxxx``` in your console (where xxxx represents the port used in the previous step).
8. Visit ```localhost:xxxx``` on your browser.

---

<h2 id="documentation" align="center"> Documentation </h2>

The documenation of this API is available [here][back-url].

---

<h2 id="credits" align="center">Credits</h2>

This app would have not been possible without these packages:
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://www.npmjs.com/package/express)
* [express-async-errors](https://www.npmjs.com/package/express-async-errors)
* [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
* [helmet](https://www.npmjs.com/package/helmet)
* [http-status-codes](https://www.npmjs.com/package/http-status-codes)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [xss-clean](https://www.npmjs.com/package/xss-clean)

A big thank you to all of them.

---
<h2 align="center" id="aboutme"> About Me </h2>

Hi, I'm Pietro an Italian former software engineer. I like to experiment with webapps, mainly in the backend (but I do know some frontend libraries and frameworks).

---

<h2 align="center" id="supportme"> Support Me </h2>

If my work in any means helped you along your journey, please consider supporting me with a simple coffe through paypal to ```pietrogirotto00@gmail.com```

[back-url]: https://pick-a-day.herokuapp.com/