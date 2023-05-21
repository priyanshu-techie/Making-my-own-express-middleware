const express = require('express')
const app = express()

function loggingMiddleware(req, res, next) {
    console.log(`${new Date()}  :=> ${req.originalUrl}`);
    next(); // if i wont give next then it will be stuck in the middleware and wont move forward.
}
// this will work for the whole app
app.use(loggingMiddleware);

// if you want the middleware to run only for a certain route then put it in middle of get.

function usersOnlyMiddleware(req, res, next) {
    if (req.query.admin === 'true') {
        // i can add some data to the request object which can be used by controller
        req.dataAdded="my name is priyanhsu agrawal";
        next()
    } 
    else {
        // dont allow the controll to go to the controller and run the below statement
        res.send('ERROR: You must be an admin')
    }
}

// middleware works in the order they are used
app.use(middlewareThree)
app.use(middlewareOne)

app.get('/', middlewareTwo, middlewareFour, (req, res) => {
  console.log('Inside Home Page')
  res.send('Home Page')
})



// you dont need to call 👇👇
app.get('/users', usersOnlyMiddleware, (req, res) => {
    console.log(req.dataAdded);``
    res.send('Users Page')
})

app.get('*', (req, res) => { res.send("404@!! page not found ") });

app.listen(3000, () => console.log('Server Started at 3000'));


function middlewareOne(req, res, next) {
    console.log('Middleware One')
    next()
  }
  
  function middlewareTwo(req, res, next) {
    console.log('Middleware Two')
    next()
  }
  
  function middlewareThree(req, res, next) {
    console.log('Middleware Three')
    next()
  }
  
  function middlewareFour(req, res, next) {
    console.log('Middleware Four')
    next()
  }