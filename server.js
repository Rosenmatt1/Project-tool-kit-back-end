require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const PORT = process.env.PORT || 4000
const app = express()

// Set up Auth0 configuration
const authConfig = {
  domain: 'rosenmatt1.auth0.com',
  audience: 'http://localhost4000'
}

// Define middleware that validates incoming bearer tokens
// using JWKS from YOUR_DOMAIN
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ['RS256']
})

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())  //give body parsing

// Sequelize Models
const db = require('./models')
const Category = db.Category
const Product = db.Product

// Router files

// app.post('/api/checkout', async (req, res, next) => {
//   const lineItem = req.body
//   const lineItems = [lineItem]

//   try {
//     //Create the session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: lineItems,
//       success_url: 'http://localhost:3000/success',
//       cancel_url: 'http://localhost:3000/cancel',
//     })
//     //send session to client
//     res.json({ session })
//   }
//   catch (error) {
//     next(error)
//     // res.status(400).json({ error })
//   }
// })

// Routes
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Route working'
  })
  // const error = new Error('it blew up')
  // next(error)
})

app.get('/api/categories', (req, res, next) => {
  Category.findAll({
    include: [{ model: Product }]
  })
    .then(categories => {
      res.json({
        categories
      })
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/categories', (req, res) => {
  const name = req.body.name;
  db.Category.create({
    name: name,
  })
    .then(newCategory => {
      res.json(newCategory);
    })
});

app.get('/api/products', (req, res, next) => {
  Product.findAll({
    include: [{ model: Category }]
  })
    .then(products => {
      res.json({
        products
      })
    })
    .catch(error => {
      next(error)
    })
})

app.get('/api/products/:id', (req, res, next) => {
  const id = req.params.id
  Product.findByPk(id)
    .then(product => {
      res.json({
        product
      })
    })
    .catch(error => {
      console.log(error)
    })
})

// Define an endpoint that must be called with an access token
app.get('/api/external', checkJwt, (req, res) => {
  res.send({
    msg: 'Your Access Token was successfully validated!'
  })
})


// Error handling
// The following 2 `app.use`'s MUST follow ALL your routes/middleware
app.use(notFound)
app.use(errorHandler)

// eslint-disable-next-line
function notFound(req, res, next) {
  res.status(404).send({ error: 'Not found!', status: 404, url: req.originalUrl })
}

// eslint-disable-next-line
// 4 arguments indicate set up to handle errors
function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  const stack = process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({ error: err.message, stack, url: req.originalUrl })
}

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})

